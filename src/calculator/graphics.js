function drawBlock(block, point) {
    return `
        <rect
            x="${point.x}"
            y="${point.y}"
            width="${block.lengthMm}"
            height="${block.heightMm}"
            fill="lightgray"
            stroke="${block.color || "black"}"
            stroke-width="5"
        />
    `;
}


function drawColumn(
    countBlocks,
    block,
    coverBlock,
    xy
) {
    let svg = "";

    for (let bl = 0; bl < countBlocks; bl++) {
        const xyBlock = {
            x: xy.x,
            y: xy.y - block.heightMm * (bl + 1),
        };

        svg += drawBlock(block, xyBlock);
    }

    if (coverBlock) {
        const xyCoverBlock = {
            x: xy.x,
            y:
                xy.y
                - block.heightMm * countBlocks
                - coverBlock.heightMm,
        };

        svg += drawBlock(coverBlock, xyCoverBlock);
    }

    return svg;
}
// Отрисовка пролета
function drawSpan(
    countBlocksRow,
    countBlocksColumn,
    block,
    blockCutted,
    coverBlock,
    coverBlockCutted,
    n,
    xy
) {
    let svg = "";

    const hasCuttedBlock = Boolean(blockCutted);
    const hasCuttedCover = Boolean(coverBlockCutted);

    const blockCuttedLength = hasCuttedBlock
        ? blockCutted.lengthMm
        : 0;

    // При двух подрезках сначала идёт левая подрезка
    const leftCutOffset =
        hasCuttedBlock && n === 2
            ? blockCuttedLength
            : 0;

    for (
        let column = 0;
        column < countBlocksColumn;
        column++
    ) {
        const yOffset =
            xy.y - block.heightMm * (column + 1);

        // Левая подрезка
        if (hasCuttedBlock && n === 2) {
            const xyBlockCuttedLeft = {
                x: xy.x,
                y: yOffset,
            };

            svg += drawBlock(
                blockCutted,
                xyBlockCuttedLeft
            );
        }

        // Полные блоки
        for (let row = 0; row < countBlocksRow; row++) {
            const xyBlock = {
                x:
                    xy.x
                    + leftCutOffset
                    + block.lengthMm * row,

                y: yOffset,
            };

            svg += drawBlock(block, xyBlock);
        }

        // Правая подрезка
        if (hasCuttedBlock && (n === 1 || n === 2)) {
            const xyBlockCuttedRight = {
                x:
                    xy.x
                    + leftCutOffset
                    + block.lengthMm * countBlocksRow,

                y: yOffset,
            };

            svg += drawBlock(
                blockCutted,
                xyBlockCuttedRight
            );
        }
    }

    // Верхняя граница рядовых блоков
    const wallTopY =
        xy.y - block.heightMm * countBlocksColumn;

    // Левая подрезанная крышка
    if (hasCuttedCover && n === 2) {
        const xyCoverCuttedLeft = {
            x: xy.x,
            y: wallTopY - coverBlockCutted.heightMm,
        };

        svg += drawBlock(
            coverBlockCutted,
            xyCoverCuttedLeft
        );
    }

    // Полные крышки
    if (coverBlock) {
        for (let row = 0; row < countBlocksRow; row++) {
            const xyCoverBlock = {
                x:
                    xy.x
                    + leftCutOffset
                    + block.lengthMm * row,

                y: wallTopY - coverBlock.heightMm,
            };

            svg += drawBlock(
                coverBlock,
                xyCoverBlock
            );
        }
    }

    // Правая подрезанная крышка
    if (hasCuttedCover && (n === 1 || n === 2)) {
        const xyCoverCuttedRight = {
            x:
                xy.x
                + leftCutOffset
                + block.lengthMm * countBlocksRow,

            y: wallTopY - coverBlockCutted.heightMm,
        };

        svg += drawBlock(
            coverBlockCutted,
            xyCoverCuttedRight
        );
    }

    return svg;
}

function createSegments(fenceSolution) {
    const segments = [];

    const fenceCount =
        fenceSolution.fenceSpansCount;

    const columnLength =
        fenceSolution.columnBlock.lengthMm;

    const spanLength =
        fenceSolution.spansLength;

    const gatesLength = Array.isArray(
        fenceSolution.fenceParams.gatesLength
    )
        ? fenceSolution.fenceParams.gatesLength
        : [];

    segments.push(["column", columnLength]);

    for (let span = 0; span < fenceCount; span++) {
        segments.push(["span", spanLength]);
        segments.push(["column", columnLength]);

        if (span < gatesLength.length) {
            segments.push([
                "gate",
                gatesLength[span],
            ]);

            segments.push([
                "column",
                columnLength,
            ]);
        }
    }

    return segments;
}
function drawGate(
    gateLength,
    gateHeight,
    xy
) {
    const topY = xy.y - gateHeight;
    const middleX = xy.x + gateLength / 2;

    return `
        <g>
            <rect
                x="${xy.x}"
                y="${topY}"
                width="${gateLength}"
                height="${gateHeight}"
                fill="#d9d9d9"
                stroke="black"
                stroke-width="5"
            />

            <line
                x1="${middleX}"
                y1="${topY}"
                x2="${middleX}"
                y2="${xy.y}"
                stroke="black"
                stroke-width="5"
            />

            <line
                x1="${xy.x}"
                y1="${topY}"
                x2="${middleX}"
                y2="${xy.y}"
                stroke="black"
                stroke-width="5"
            />

            <line
                x1="${gateLength + xy.x}"
                y1="${topY}"
                x2="${middleX}"
                y2="${xy.y}"
                stroke="black"
                stroke-width="5"
            />
        </g>
    `;
}
export function drawAll(fenceSolution) {
    if (!fenceSolution || fenceSolution.error) {
        return "";
    }

    // Основные параметры столбов
    const countColumnBlocks =
        fenceSolution.columnBlocksPerColumn;

    const columnBlock =
        fenceSolution.columnBlock;

    // Основные параметры пролётов
    const countFenceBlocksX =
        fenceSolution.fenceBlocksPerRowX;

    const countFenceBlocksY =
        fenceSolution.fenceBlocksPerRowY;

    const fenceBlock =
        fenceSolution.fenceBlock;

    // Крышки
    const fenceCoverBlock =
        fenceSolution.fenceCoverBlock ?? null;

    const columnCoverBlock =
        fenceSolution.columnCoverBlock ?? null;

    // Подрезанные блоки
    let blockCutted = null;
    let fenceCoverBlockCutted = null;

    if (fenceSolution.cuttedBlockLength > 0) {
        blockCutted = {
            ...fenceBlock,
            lengthMm: fenceSolution.cuttedBlockLength,
            color: "purple",
        };

        if (fenceCoverBlock) {
            fenceCoverBlockCutted = {
                ...fenceCoverBlock,
                lengthMm: fenceSolution.cuttedBlockLength,
                color: "yellow",
            };
        }
    }

    const drawingHeight = getDrawingHeight(fenceSolution);

    // Начальная точка находится снизу слева
    const xy = {
        x: 0,
        y: drawingHeight,
    };

    let svg = "";

    const segments = createSegments(fenceSolution);

    let x = xy.x;

    for (const [segmentType, segmentLength] of segments) {
        const segmentPoint = {
            x: x,
            y: xy.y,
        };

        if (segmentType === "column") {
            svg += drawColumn(
                countColumnBlocks,
                columnBlock,
                columnCoverBlock,
                segmentPoint
            );
        }

        if (segmentType === "span") {
            svg += drawSpan(
                countFenceBlocksX,
                countFenceBlocksY,
                fenceBlock,
                blockCutted,
                fenceCoverBlock,
                fenceCoverBlockCutted,
                fenceSolution.fenceBlocksPerRowXCutted,
                segmentPoint
            );
        }

        if (segmentType === "gate") {
        svg += drawGate(
            segmentLength,
            fenceSolution.fenceParams.heightFence,
            segmentPoint
        );
}

        x += segmentLength;
    }

    return svg;
}
function getDrawingHeight(fenceSolution) {
    const columnCoverHeight =
        fenceSolution.columnCoverBlock?.heightMm ?? 0;

    const fenceCoverHeight =
        fenceSolution.fenceCoverBlock?.heightMm ?? 0;

    return Math.max(
        fenceSolution.fenceParams.heightColumn
            + columnCoverHeight,

        fenceSolution.fenceParams.heightFence
            + fenceCoverHeight
    );
}

export function createFenceSvg(fenceSolution) {
    const svgContent = drawAll(fenceSolution);

    const width =
        fenceSolution.fenceParams.lengthFront;

    const height =
        getDrawingHeight(fenceSolution);

    const padding = 20;

    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="
                ${-padding}
                ${-padding}
                ${width + padding * 2}
                ${height + padding * 2}
            "
            preserveAspectRatio="xMidYMid meet"
        >
            ${svgContent}
        </svg>
    `;
}

