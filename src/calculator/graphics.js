/*
 * Отрисовка одного изделия.
 */
function drawBlock(
    block,
    point,
    isCutted = false
) {
    if (!block) {
        return "";
    }

    const fillColor =
        block.color || "lightgray";

    return `
        <rect
            x="${point.x}"
            y="${point.y}"
            width="${block.lengthMm}"
            height="${block.heightMm}"
            fill="${fillColor}"
            stroke="black"
            stroke-width="5"
            stroke-dasharray="${
                isCutted ? "20 10" : "none"
            }"
        />
    `;
}


/*
 * Проверка высоты изделия.
 */
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


/*
 * Создание подрезанного изделия.
 */
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
 * Отрисовка одного горизонтального ряда.
 *
 * При одной подрезке:
 * [целые блоки][подрезка]
 *
 * При двух подрезках:
 * [подрезка][целые блоки][подрезка]
 */
function drawLinearRow({
    block,
    fullCount,
    cutsCount,
    cuttedLength,
    point,
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


    // Левая подрезка
    if (cuttedBlock && safeCutsCount === 2) {
        svg += drawBlock(
            cuttedBlock,
            {
                x: point.x,
                y: point.y,
            },
            true
        );
    }


    // Целые изделия
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
            }
        );
    }


    // Правая подрезка
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
            true
        );
    }

    return svg;
}


/*
 * Центрирование крышек, оснований
 * и подкрышников относительно столба.
 */
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


/*
 * Отрисовка одного столба.
 *
 * Снизу вверх:
 * основание;
 * столбовые блоки;
 * подкрышник;
 * крышка.
 */
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


    // Основание столба
    if (columnBaseUnderBlock) {
        const blockHeight = getBlockHeight(
            columnBaseUnderBlock
        );

        currentTop -= blockHeight;

        svg += drawBlock(
            columnBaseUnderBlock,
            {
                x: getCenteredX(
                    point.x,
                    columnBlock,
                    columnBaseUnderBlock
                ),

                y: currentTop,
            }
        );
    }


    // Столбовые блоки
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
            }
        );
    }

    currentTop =
        columnBodyBottom
        - columnBlock.heightMm * countBlocks;


    // Подкрышник столба
    if (columnBaseCapBlock) {
        const blockHeight = getBlockHeight(
            columnBaseCapBlock
        );

        currentTop -= blockHeight;

        svg += drawBlock(
            columnBaseCapBlock,
            {
                x: getCenteredX(
                    point.x,
                    columnBlock,
                    columnBaseCapBlock
                ),

                y: currentTop,
            }
        );
    }


    // Крышка столба
    if (columnCoverBlock) {
        const blockHeight = getBlockHeight(
            columnCoverBlock
        );

        currentTop -= blockHeight;

        svg += drawBlock(
            columnCoverBlock,
            {
                x: getCenteredX(
                    point.x,
                    columnBlock,
                    columnCoverBlock
                ),

                y: currentTop,
            }
        );
    }

    return svg;
}


/*
 * Отрисовка одного пролёта.
 *
 * Снизу вверх:
 * основание;
 * рядовые блоки;
 * подкрышник;
 * парапет.
 *
 * Каждый вид изделия использует
 * собственное количество и подрезку.
 */
function drawSpan(
    fenceSolution,
    point
) {
    let svg = "";

    let currentTop = point.y;


    /*
     * Основание пролёта.
     */
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
        });
    }


    /*
     * Рядовые блоки.
     */
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
        });
    }

    currentTop =
        fenceBodyBottom
        - fenceSolution.fenceBlock.heightMm
            * fenceSolution.fenceBlocksPerRowYCount;


    /*
     * Подкрышник пролёта.
     */
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
        });
    }


    /*
     * Парапет.
     */
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
        });
    }

    return svg;
}


/*
 * Создание последовательности:
 *
 * столб → пролёт → столб →
 * ворота → столб → пролёт...
 */
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


/*
 * Отрисовка ворот.
 */
function drawGate(
    gateLength,
    gateHeight,
    point
) {
    const topY =
        point.y - gateHeight;

    const middleX =
        point.x + gateLength / 2;

    return `
        <g>
            <rect
                x="${point.x}"
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
                y2="${point.y}"
                stroke="black"
                stroke-width="5"
            />

            <line
                x1="${point.x}"
                y1="${topY}"
                x2="${middleX}"
                y2="${point.y}"
                stroke="black"
                stroke-width="5"
            />

            <line
                x1="${point.x + gateLength}"
                y1="${topY}"
                x2="${middleX}"
                y2="${point.y}"
                stroke="black"
                stroke-width="5"
            />
        </g>
    `;
}


/*
 * Полная высота столба.
 */
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


/*
 * Полная высота пролёта.
 */
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


/*
 * Общая высота схемы.
 */
function getDrawingHeight(fenceSolution) {
    return Math.max(
        getColumnDrawingHeight(fenceSolution),
        getSpanDrawingHeight(fenceSolution),
        fenceSolution.fenceParams.heightColumn,
        fenceSolution.fenceParams.heightFence
    );
}


/*
 * Дополнительное место слева и справа,
 * если крышка или основание шире столба.
 */
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

    return Math.max(
        20,
        overhang + 10
    );
}


/*
 * Отрисовка всего забора.
 */
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
                    fenceSolution
                        .columnCoverBlock,

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


/*
 * Создание готового SVG.
 */
export function createFenceSvg(fenceSolution) {
    if (
        !fenceSolution
        || fenceSolution.error
    ) {
        return "";
    }

    const svgContent =
        drawAll(fenceSolution);

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