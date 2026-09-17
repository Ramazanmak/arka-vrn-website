const DRAWING_STYLES = {
    columnBlock: {
        color: "#334155",
        label: "Столбовой блок",
    },
    fenceBlock: {
        color: "#2563eb",
        label: "Рядовой блок",
    },
    cuttedBlock: {
        color: "#f97316",
        label: "Подрезанный элемент",
        dashed: true,
    },
    parapet: {
        color: "#7c3aed",
        label: "Парапет",
    },
    baseUnder: {
        color: "#16a34a",
        label: "Основание",
    },
    baseCap: {
        color: "#be185d",
        label: "Подкрышник",
    },
    columnCover: {
        color: "#dc2626",
        label: "Крышка столба",
    },
    gate: {
        color: "#0891b2",
        label: "Ворота",
    },
};


function drawBlock(
    block,
    point,
    {
        outlineColor = "black",
        isCutted = false,
    } = {}
) {
    if (!block) {
        return "";
    }

    const fillColor =
        block.color || "lightgray";

    const strokeColor = isCutted
        ? DRAWING_STYLES.cuttedBlock.color
        : outlineColor;

    return `
        <rect
            x="${point.x}"
            y="${point.y}"
            width="${block.lengthMm}"
            height="${block.heightMm}"
            fill="${fillColor}"
            stroke="${strokeColor}"
            stroke-width="${isCutted ? 8 : 5}"
            stroke-dasharray="${
                isCutted ? "20 10" : "none"
            }"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
        />
    `;
}


function getBlockHeight(block) {
    if (!block) {
        return 0;
    }

    if (
        !Number.isFinite(block.heightMm)
        || block.heightMm <= 0
    ) {
        throw new Error(
            `У изделия «${block.name ?? "Без названия"}» `
            + "не указана корректная высота"
        );
    }

    return block.heightMm;
}


function createCuttedBlock(
    block,
    cuttedLength
) {
    if (
        !block
        || !Number.isFinite(cuttedLength)
        || cuttedLength <= 0
    ) {
        return null;
    }

    return {
        ...block,
        lengthMm: cuttedLength,
    };
}


/*
 * Один горизонтальный ряд любого изделия.
 * Тип изделия задаётся цветом outlineColor.
 * Любая подрезка дополнительно выделяется
 * оранжевым пунктирным контуром.
 */
function drawLinearRow({
    block,
    fullCount,
    cutsCount,
    cuttedLength,
    point,
    outlineColor,
}) {
    if (!block) {
        return "";
    }

    let svg = "";

    const safeFullCount =
        Number.isInteger(fullCount)
            ? fullCount
            : 0;

    const safeCutsCount =
        Number.isInteger(cutsCount)
            ? cutsCount
            : 0;

    const cuttedBlock = createCuttedBlock(
        block,
        cuttedLength
    );

    const leftCutLength =
        cuttedBlock && safeCutsCount === 2
            ? cuttedBlock.lengthMm
            : 0;


    if (cuttedBlock && safeCutsCount === 2) {
        svg += drawBlock(
            cuttedBlock,
            {
                x: point.x,
                y: point.y,
            },
            {
                outlineColor,
                isCutted: true,
            }
        );
    }


    for (
        let index = 0;
        index < safeFullCount;
        index++
    ) {
        svg += drawBlock(
            block,
            {
                x:
                    point.x
                    + leftCutLength
                    + block.lengthMm * index,

                y: point.y,
            },
            {
                outlineColor,
            }
        );
    }


    if (
        cuttedBlock
        && (
            safeCutsCount === 1
            || safeCutsCount === 2
        )
    ) {
        svg += drawBlock(
            cuttedBlock,
            {
                x:
                    point.x
                    + leftCutLength
                    + block.lengthMm
                        * safeFullCount,

                y: point.y,
            },
            {
                outlineColor,
                isCutted: true,
            }
        );
    }

    return svg;
}


function getCenteredX(
    columnX,
    columnBlock,
    additionalBlock
) {
    return (
        columnX
        + (
            columnBlock.lengthMm
            - additionalBlock.lengthMm
        ) / 2
    );
}


function drawColumn({
    countBlocks,
    columnBlock,
    columnBaseUnderBlock,
    columnBaseCapBlock,
    columnCoverBlock,
    point,
}) {
    let svg = "";
    let currentTop = point.y;


    if (columnBaseUnderBlock) {
        currentTop -= getBlockHeight(
            columnBaseUnderBlock
        );

        svg += drawBlock(
            columnBaseUnderBlock,
            {
                x: getCenteredX(
                    point.x,
                    columnBlock,
                    columnBaseUnderBlock
                ),
                y: currentTop,
            },
            {
                outlineColor:
                    DRAWING_STYLES.baseUnder.color,
            }
        );
    }


    const columnBodyBottom = currentTop;

    for (
        let index = 0;
        index < countBlocks;
        index++
    ) {
        svg += drawBlock(
            columnBlock,
            {
                x: point.x,
                y:
                    columnBodyBottom
                    - columnBlock.heightMm
                        * (index + 1),
            },
            {
                outlineColor:
                    DRAWING_STYLES.columnBlock.color,
            }
        );
    }

    currentTop =
        columnBodyBottom
        - columnBlock.heightMm * countBlocks;


    if (columnBaseCapBlock) {
        currentTop -= getBlockHeight(
            columnBaseCapBlock
        );

        svg += drawBlock(
            columnBaseCapBlock,
            {
                x: getCenteredX(
                    point.x,
                    columnBlock,
                    columnBaseCapBlock
                ),
                y: currentTop,
            },
            {
                outlineColor:
                    DRAWING_STYLES.baseCap.color,
            }
        );
    }


    if (columnCoverBlock) {
        currentTop -= getBlockHeight(
            columnCoverBlock
        );

        svg += drawBlock(
            columnCoverBlock,
            {
                x: getCenteredX(
                    point.x,
                    columnBlock,
                    columnCoverBlock
                ),
                y: currentTop,
            },
            {
                outlineColor:
                    DRAWING_STYLES.columnCover.color,
            }
        );
    }

    return svg;
}


function drawSpan(
    fenceSolution,
    point
) {
    let svg = "";
    let currentTop = point.y;


    if (fenceSolution.fenceBaseUnderBlock) {
        const block =
            fenceSolution.fenceBaseUnderBlock;

        currentTop -= getBlockHeight(block);

        svg += drawLinearRow({
            block,
            fullCount:
                fenceSolution
                    .fenceBaseUnderBlockCount,
            cutsCount:
                fenceSolution
                    .fenceBaseUnderBlockCuts,
            cuttedLength:
                fenceSolution
                    .fenceBaseUnderBlockCuttedLength,
            point: {
                x: point.x,
                y: currentTop,
            },
            outlineColor:
                DRAWING_STYLES.baseUnder.color,
        });
    }


    const fenceBodyBottom = currentTop;

    for (
        let row = 0;
        row
        < fenceSolution.fenceBlocksPerRowYCount;
        row++
    ) {
        const rowY =
            fenceBodyBottom
            - fenceSolution.fenceBlock.heightMm
                * (row + 1);

        svg += drawLinearRow({
            block: fenceSolution.fenceBlock,
            fullCount:
                fenceSolution
                    .fenceBlocksPerRowXCount,
            cutsCount:
                fenceSolution.fenceBlocksCuts,
            cuttedLength:
                fenceSolution.cuttedBlockLength,
            point: {
                x: point.x,
                y: rowY,
            },
            outlineColor:
                DRAWING_STYLES.fenceBlock.color,
        });
    }

    currentTop =
        fenceBodyBottom
        - fenceSolution.fenceBlock.heightMm
            * fenceSolution.fenceBlocksPerRowYCount;


    if (fenceSolution.fenceBaseCapBlock) {
        const block =
            fenceSolution.fenceBaseCapBlock;

        currentTop -= getBlockHeight(block);

        svg += drawLinearRow({
            block,
            fullCount:
                fenceSolution
                    .fenceBaseCapBlockCount,
            cutsCount:
                fenceSolution
                    .fenceBaseCapBlockCuts,
            cuttedLength:
                fenceSolution
                    .fenceBaseCapBlockCuttedLength,
            point: {
                x: point.x,
                y: currentTop,
            },
            outlineColor:
                DRAWING_STYLES.baseCap.color,
        });
    }


    if (fenceSolution.fenceCoverBlock) {
        const block =
            fenceSolution.fenceCoverBlock;

        currentTop -= getBlockHeight(block);

        svg += drawLinearRow({
            block,
            fullCount:
                fenceSolution
                    .fenceCoverBlockFullCount,
            cutsCount:
                fenceSolution
                    .fenceCoverBlockCuts,
            cuttedLength:
                fenceSolution
                    .fenceCoverBlockCuttedLength,
            point: {
                x: point.x,
                y: currentTop,
            },
            outlineColor:
                DRAWING_STYLES.parapet.color,
        });
    }

    return svg;
}


function createSegments(fenceSolution) {
    const segments = [];

    const columnLength =
        fenceSolution.columnBlock.lengthMm;

    const gatesLength = Array.isArray(
        fenceSolution.fenceParams.gatesLength
    )
        ? fenceSolution.fenceParams.gatesLength
        : [];

    segments.push([
        "column",
        columnLength,
    ]);

    for (
        let span = 0;
        span < fenceSolution.fenceSpansCount;
        span++
    ) {
        segments.push([
            "span",
            fenceSolution.spansLength,
        ]);

        segments.push([
            "column",
            columnLength,
        ]);

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
    point
) {
    const topY = point.y - gateHeight;
    const middleX = point.x + gateLength / 2;
    const color = DRAWING_STYLES.gate.color;

    return `
        <g
            fill="#d9d9d9"
            stroke="${color}"
            stroke-width="8"
        >
            <rect
                x="${point.x}"
                y="${topY}"
                width="${gateLength}"
                height="${gateHeight}"
                vector-effect="non-scaling-stroke"
            />

            <line
                x1="${middleX}"
                y1="${topY}"
                x2="${middleX}"
                y2="${point.y}"
                vector-effect="non-scaling-stroke"
            />

            <line
                x1="${point.x}"
                y1="${topY}"
                x2="${middleX}"
                y2="${point.y}"
                vector-effect="non-scaling-stroke"
            />

            <line
                x1="${point.x + gateLength}"
                y1="${topY}"
                x2="${middleX}"
                y2="${point.y}"
                vector-effect="non-scaling-stroke"
            />
        </g>
    `;
}


function getColumnDrawingHeight(fenceSolution) {
    return (
        getBlockHeight(
            fenceSolution.columnBaseUnderBlock
        )
        + fenceSolution
            .columnBlocksPerColumnCount
            * fenceSolution.columnBlock.heightMm
        + getBlockHeight(
            fenceSolution.columnBaseCapBlock
        )
        + getBlockHeight(
            fenceSolution.columnCoverBlock
        )
    );
}


function getSpanDrawingHeight(fenceSolution) {
    return (
        getBlockHeight(
            fenceSolution.fenceBaseUnderBlock
        )
        + fenceSolution
            .fenceBlocksPerRowYCount
            * fenceSolution.fenceBlock.heightMm
        + getBlockHeight(
            fenceSolution.fenceBaseCapBlock
        )
        + getBlockHeight(
            fenceSolution.fenceCoverBlock
        )
    );
}


function getDrawingHeight(fenceSolution) {
    return Math.max(
        getColumnDrawingHeight(fenceSolution),
        getSpanDrawingHeight(fenceSolution),
        fenceSolution.fenceParams.heightColumn,
        fenceSolution.fenceParams.heightFence
    );
}


function getHorizontalPadding(fenceSolution) {
    const columnBlocks = [
        fenceSolution.columnBlock,
        fenceSolution.columnCoverBlock,
        fenceSolution.columnBaseUnderBlock,
        fenceSolution.columnBaseCapBlock,
    ].filter(Boolean);

    const maximumLength = Math.max(
        ...columnBlocks.map(
            (block) => block.lengthMm
        )
    );

    const overhang = Math.max(
        0,
        (
            maximumLength
            - fenceSolution.columnBlock.lengthMm
        ) / 2
    );

    return Math.max(20, overhang + 10);
}


export function getDrawingLegend(fenceSolution) {
    if (!fenceSolution) {
        return [];
    }

    const hasCuttedElements = [
        fenceSolution.fenceBlocksCuts,
        fenceSolution.fenceCoverBlockCuts,
        fenceSolution.fenceBaseUnderBlockCuts,
        fenceSolution.fenceBaseCapBlockCuts,
    ].some((count) => Number(count) > 0);

    return [
        {
            id: "column-block",
            ...DRAWING_STYLES.columnBlock,
            visible: Boolean(
                fenceSolution.columnBlock
            ),
        },
        {
            id: "fence-block",
            ...DRAWING_STYLES.fenceBlock,
            visible: Boolean(
                fenceSolution.fenceBlock
            ),
        },
        {
            id: "cutted-block",
            ...DRAWING_STYLES.cuttedBlock,
            visible: hasCuttedElements,
        },
        {
            id: "parapet",
            ...DRAWING_STYLES.parapet,
            visible: Boolean(
                fenceSolution.fenceCoverBlock
            ),
        },
        {
            id: "base-under",
            ...DRAWING_STYLES.baseUnder,
            visible: Boolean(
                fenceSolution.columnBaseUnderBlock
                || fenceSolution.fenceBaseUnderBlock
            ),
        },
        {
            id: "base-cap",
            ...DRAWING_STYLES.baseCap,
            visible: Boolean(
                fenceSolution.columnBaseCapBlock
                || fenceSolution.fenceBaseCapBlock
            ),
        },
        {
            id: "column-cover",
            ...DRAWING_STYLES.columnCover,
            visible: Boolean(
                fenceSolution.columnCoverBlock
            ),
        },
        {
            id: "gate",
            ...DRAWING_STYLES.gate,
            visible:
                fenceSolution.fenceParams
                    .gatesLength.length > 0,
        },
    ].filter((item) => item.visible);
}


export function drawAll(fenceSolution) {
    if (
        !fenceSolution
        || fenceSolution.error
    ) {
        return "";
    }

    const drawingHeight =
        getDrawingHeight(fenceSolution);

    const startPoint = {
        x: 0,
        y: drawingHeight,
    };

    const segments =
        createSegments(fenceSolution);

    let currentX = startPoint.x;
    let svg = "";

    for (
        const [segmentType, segmentLength]
        of segments
    ) {
        const segmentPoint = {
            x: currentX,
            y: startPoint.y,
        };

        if (segmentType === "column") {
            svg += drawColumn({
                countBlocks:
                    fenceSolution
                        .columnBlocksPerColumnCount,
                columnBlock:
                    fenceSolution.columnBlock,
                columnBaseUnderBlock:
                    fenceSolution
                        .columnBaseUnderBlock,
                columnBaseCapBlock:
                    fenceSolution
                        .columnBaseCapBlock,
                columnCoverBlock:
                    fenceSolution.columnCoverBlock,
                point: segmentPoint,
            });
        }

        if (segmentType === "span") {
            svg += drawSpan(
                fenceSolution,
                segmentPoint
            );
        }

        if (segmentType === "gate") {
            svg += drawGate(
                segmentLength,
                fenceSolution
                    .fenceParams
                    .heightFence,
                segmentPoint
            );
        }

        currentX += segmentLength;
    }

    return svg;
}


export function createFenceSvg(fenceSolution) {
    if (
        !fenceSolution
        || fenceSolution.error
    ) {
        return "";
    }

    const svgContent = drawAll(fenceSolution);

    const width =
        fenceSolution.fenceParams.lengthFront;

    const height =
        getDrawingHeight(fenceSolution);

    const horizontalPadding =
        getHorizontalPadding(fenceSolution);

    const verticalPadding = 20;

    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="
                ${-horizontalPadding}
                ${-verticalPadding}
                ${width + horizontalPadding * 2}
                ${height + verticalPadding * 2}
            "
            preserveAspectRatio="xMidYMid meet"
        >
            ${svgContent}
        </svg>
    `;
}
