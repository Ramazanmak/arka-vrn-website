function cutLength(
    block,
    spanLength,
    minBlockLength = 100
) {
    const EPSILON = 0.000001;

    let fullBlocks = Math.floor(
        spanLength / block.lengthMm
    );

    let remainder =
        spanLength % block.lengthMm;

    // Без подрезки
    if (Math.abs(remainder) < EPSILON) {
        return {
            fullBlocks,
            cutBlocks: 0,
            cutBlockLength: 0,
        };
    }

    // Подрезка одного блока
    if (remainder >= minBlockLength) {
        return {
            fullBlocks,
            cutBlocks: 1,
            cutBlockLength: remainder,
        };
    }

    // Пролёт слишком короткий
    if (fullBlocks < 1) {
        throw new Error(
            `Пролёт слишком короткий для изделия `
            + `длиной ${block.lengthMm} мм`
        );
    }

    // Подрезка двух блоков
    fullBlocks -= 1;
    remainder += block.lengthMm;

    return {
        fullBlocks,
        cutBlocks: 2,
        cutBlockLength: remainder / 2,
    };
}

function getBlockHeight(block) {
    return block?.heightMm ?? 0;
}

function calculateMaterialValue(
    block,
    count,
    property
) {
    if (!block || count === 0) {
        return 0;
    }

    const value = Number(block[property]);

    if (!Number.isFinite(value)) {
        throw new Error(
            `У изделия «${block.name ?? "Без названия"}» `
            + `не указано свойство ${property}`
        );
    }

    return count * value;
}


export function getSolution(fenceParams) {
    const MIN_BLOCK_LENGTH = 100;

    const fenceBlock =
        fenceParams.fenceBlock ?? null;

    const columnBlock =
        fenceParams.columnBlock ?? null;

    // Парапет
    const fenceCoverBlock =
        fenceParams.fenceCoverBlock ?? null;

    const columnCoverBlock =
        fenceParams.columnCoverBlock ?? null;

    // Основания снизу
    const fenceBaseUnderBlock =
        fenceParams.fenceBaseUnderBlock ?? null;

    const columnBaseUnderBlock =
        fenceParams.columnBaseUnderBlock ?? null;

    // Подкрышники
    const fenceBaseCapBlock =
        fenceParams.fenceBaseCapBlock ?? null;

    const columnBaseCapBlock =
        fenceParams.columnBaseCapBlock ?? null;


    if (!columnBlock) {
        throw new Error(
            "Не выбран столбовой блок"
        );
    }

    if (!fenceBlock) {
        throw new Error(
            "Не выбран рядовой блок"
        );
    }


    // Если ворота не указаны, используем пустой массив
    const gatesLength = Array.isArray(
        fenceParams.gatesLength
    )
        ? fenceParams.gatesLength
        : [];

    const gatesCount = gatesLength.length;

    const gatesTotalLength = gatesLength.reduce(
        (total, gateLength) =>
            total + gateLength,
        0
    );


    const fenceSolution = {
        columnsCount: 0,
        fenceSpansCount: 0,
        spansLength: 0,

        // Столбовые блоки
        columnBlocksPerColumnCount: 0,

        // Рядовые блоки
        fenceBlocksPerRowYCount: 0,
        fenceBlocksPerRowXCount: 0,

        fenceBlocksCuts: 0,
        cuttedBlockLength: 0,

        // Парапеты
        fenceCoverBlockFullCount: 0,
        fenceCoverBlockCuttedCount: 0,
        fenceCoverBlockCuts: 0,
        fenceCoverBlockCuttedLength: 0,

        // Столбовые крышки
        columnCoverBlockCount: 0,

        // Основания и подкрышники столбов
        columnBaseUnderBlockCount: 0,
        columnBaseCapBlockCount: 0,

        // Подкрышники пролётов
        fenceBaseCapBlockCount: 0,
        fenceBaseCapBlockCuttedCount: 0,
        fenceBaseCapBlockCuts: 0,
        fenceBaseCapBlockCuttedLength: 0,

        // Основания пролётов
        fenceBaseUnderBlockCount: 0,
        fenceBaseUnderBlockCuttedCount: 0,
        fenceBaseUnderBlockCuts: 0,
        fenceBaseUnderBlockCuttedLength: 0,

        // Общие количества основных блоков
        totalColumnBlocks: 0,
        totalFullFenceBlocks: 0,
        totalCuttedFenceBlocks: 0,

        // Общие количества крышек
        totalColumnCoverBlocks: 0,
        totalFullFenceCoverBlocks: 0,
        totalCuttedFenceCoverBlocks: 0,

        // Общие количества оснований и подкрышников
        totalColumnBaseUnderBlocks: 0,
        totalColumnBaseCapBlocks: 0,

        totalFullFenceBaseUnderBlocks: 0,
        totalCuttedFenceBaseUnderBlocks: 0,

        totalFullFenceBaseCapBlocks: 0,
        totalCuttedFenceBaseCapBlocks: 0,

        totalMass: 0,
        totalPrice: 0,

        actualColumnHeightMm: 0,
        actualFenceHeightMm: 0,

        fenceBlock,
        columnBlock,
        fenceCoverBlock,
        columnCoverBlock,

        fenceBaseCapBlock,
        columnBaseCapBlock,

        fenceBaseUnderBlock,
        columnBaseUnderBlock,

        fenceParams,

        error: null,
    };


    // Общее количество столбов с учётом ворот
    fenceSolution.columnsCount =
        fenceParams.columnsCount + gatesCount;

    // Количество обычных пролётов
    fenceSolution.fenceSpansCount =
        fenceParams.columnsCount - 1;


    if (fenceSolution.fenceSpansCount <= 0) {
        fenceSolution.error =
            "Для расчёта необходимо минимум два столба";

        return fenceSolution;
    }


    const freeLength =
        fenceParams.lengthFront
        - gatesTotalLength
        - fenceSolution.columnsCount
            * columnBlock.lengthMm;


    if (freeLength <= 0) {
        fenceSolution.error =
            "Столбы и ворота не помещаются "
            + "в заданную длину";

        return fenceSolution;
    }


    fenceSolution.spansLength =
        freeLength
        / fenceSolution.fenceSpansCount;


    // Количество блоков по высоте
    fenceSolution.columnBlocksPerColumnCount =
        Math.floor(
            fenceParams.heightColumn
            / columnBlock.heightMm
        );

    fenceSolution.fenceBlocksPerRowYCount =
        Math.floor(
            fenceParams.heightFence
            / fenceBlock.heightMm
        );


    if (
        fenceSolution.columnBlocksPerColumnCount < 1
    ) {
        fenceSolution.error =
            "Высота столба меньше высоты "
            + "столбового блока";

        return fenceSolution;
    }

    if (
        fenceSolution.fenceBlocksPerRowYCount < 1
    ) {
        fenceSolution.error =
            "Высота забора меньше высоты "
            + "рядового блока";

        return fenceSolution;
    }


    /*
     * Рядовые блоки.
     * Раскладка рассчитывается для одного ряда
     * одного пролёта.
     */
    const fenceBlockLayout = cutLength(
        fenceBlock,
        fenceSolution.spansLength,
        MIN_BLOCK_LENGTH
    );

    fenceSolution.fenceBlocksPerRowXCount =
        fenceBlockLayout.fullBlocks;

    fenceSolution.fenceBlocksCuts =
        fenceBlockLayout.cutBlocks;

    fenceSolution.cuttedBlockLength =
        fenceBlockLayout.cutBlockLength;


    /*
     * Парапеты.
     * У них собственная длина и своя подрезка.
     */
    if (fenceCoverBlock) {
        const fenceCoverLayout = cutLength(
            fenceCoverBlock,
            fenceSolution.spansLength,
            MIN_BLOCK_LENGTH
        );

        fenceSolution.fenceCoverBlockFullCount =
            fenceCoverLayout.fullBlocks;

        fenceSolution.fenceCoverBlockCuttedCount =
            fenceCoverLayout.cutBlocks;

        fenceSolution.fenceCoverBlockCuts =
            fenceCoverLayout.cutBlocks;

        fenceSolution.fenceCoverBlockCuttedLength =
            fenceCoverLayout.cutBlockLength;
    }


    /*
     * Основания пролётов.
     */
    if (fenceBaseUnderBlock) {
        const fenceBaseUnderLayout = cutLength(
            fenceBaseUnderBlock,
            fenceSolution.spansLength,
            MIN_BLOCK_LENGTH
        );

        fenceSolution.fenceBaseUnderBlockCount =
            fenceBaseUnderLayout.fullBlocks;

        fenceSolution
            .fenceBaseUnderBlockCuttedCount =
            fenceBaseUnderLayout.cutBlocks;

        fenceSolution.fenceBaseUnderBlockCuts =
            fenceBaseUnderLayout.cutBlocks;

        fenceSolution
            .fenceBaseUnderBlockCuttedLength =
            fenceBaseUnderLayout.cutBlockLength;
    }


    /*
     * Подкрышники пролётов.
     */
    if (fenceBaseCapBlock) {
        const fenceBaseCapLayout = cutLength(
            fenceBaseCapBlock,
            fenceSolution.spansLength,
            MIN_BLOCK_LENGTH
        );

        fenceSolution.fenceBaseCapBlockCount =
            fenceBaseCapLayout.fullBlocks;

        fenceSolution.fenceBaseCapBlockCuttedCount =
            fenceBaseCapLayout.cutBlocks;

        fenceSolution.fenceBaseCapBlockCuts =
            fenceBaseCapLayout.cutBlocks;

        fenceSolution.fenceBaseCapBlockCuttedLength =
            fenceBaseCapLayout.cutBlockLength;
    }


    /*
     * Штучные элементы столбов.
     * Для них подрезка не нужна.
     */
    fenceSolution.columnCoverBlockCount =
        columnCoverBlock
            ? fenceSolution.columnsCount
            : 0;

    fenceSolution.columnBaseUnderBlockCount =
        columnBaseUnderBlock
            ? fenceSolution.columnsCount
            : 0;

    fenceSolution.columnBaseCapBlockCount =
        columnBaseCapBlock
            ? fenceSolution.columnsCount
            : 0;


    /*
     * Общее количество основных блоков.
     */
    fenceSolution.totalColumnBlocks =
        fenceSolution.columnsCount
        * fenceSolution.columnBlocksPerColumnCount;

    fenceSolution.totalFullFenceBlocks =
        fenceSolution.fenceBlocksPerRowYCount
        * fenceSolution.fenceBlocksPerRowXCount
        * fenceSolution.fenceSpansCount;

    fenceSolution.totalCuttedFenceBlocks =
        fenceSolution.fenceBlocksCuts
        * fenceSolution.fenceBlocksPerRowYCount
        * fenceSolution.fenceSpansCount;


    /*
     * Общее количество крышек и парапетов.
     */
    fenceSolution.totalColumnCoverBlocks =
        fenceSolution.columnCoverBlockCount;

    fenceSolution.totalFullFenceCoverBlocks =
        fenceSolution.fenceCoverBlockFullCount
        * fenceSolution.fenceSpansCount;

    fenceSolution.totalCuttedFenceCoverBlocks =
        fenceSolution.fenceCoverBlockCuttedCount
        * fenceSolution.fenceSpansCount;


    /*
     * Общее количество оснований и подкрышников.
     */
    fenceSolution.totalColumnBaseUnderBlocks =
        fenceSolution.columnBaseUnderBlockCount;

    fenceSolution.totalColumnBaseCapBlocks =
        fenceSolution.columnBaseCapBlockCount;

    fenceSolution.totalFullFenceBaseUnderBlocks =
        fenceSolution.fenceBaseUnderBlockCount
        * fenceSolution.fenceSpansCount;

    fenceSolution.totalCuttedFenceBaseUnderBlocks =
        fenceSolution.fenceBaseUnderBlockCuttedCount
        * fenceSolution.fenceSpansCount;

    fenceSolution.totalFullFenceBaseCapBlocks =
        fenceSolution.fenceBaseCapBlockCount
        * fenceSolution.fenceSpansCount;

    fenceSolution.totalCuttedFenceBaseCapBlocks =
        fenceSolution.fenceBaseCapBlockCuttedCount
        * fenceSolution.fenceSpansCount;
    /*
     * Фактическая высота конструкции.
     */
    fenceSolution.actualColumnHeightMm =
        fenceSolution.columnBlocksPerColumnCount
            * columnBlock.heightMm
        + getBlockHeight(columnBaseUnderBlock)
        + getBlockHeight(columnBaseCapBlock)
        + getBlockHeight(columnCoverBlock);

    fenceSolution.actualFenceHeightMm =
        fenceSolution.fenceBlocksPerRowYCount
            * fenceBlock.heightMm
        + getBlockHeight(fenceBaseUnderBlock)
        + getBlockHeight(fenceBaseCapBlock)
        + getBlockHeight(fenceCoverBlock);


    /*
     * Все покупаемые изделия.
     * Подрезанные элементы считаются как целые
     * приобретённые изделия.
     */
    const materials = [
        {
            block: columnBlock,
            count: fenceSolution.totalColumnBlocks,
        },
        {
            block: fenceBlock,
            count:
                fenceSolution.totalFullFenceBlocks
                + fenceSolution
                    .totalCuttedFenceBlocks,
        },
        {
            block: columnCoverBlock,
            count:
                fenceSolution.totalColumnCoverBlocks,
        },
        {
            block: fenceCoverBlock,
            count:
                fenceSolution.totalFullFenceCoverBlocks
                + fenceSolution
                    .totalCuttedFenceCoverBlocks,
        },
        {
            block: columnBaseUnderBlock,
            count:
                fenceSolution
                    .totalColumnBaseUnderBlocks,
        },
        {
            block: columnBaseCapBlock,
            count:
                fenceSolution
                    .totalColumnBaseCapBlocks,
        },
        {
            block: fenceBaseUnderBlock,
            count:
                fenceSolution
                    .totalFullFenceBaseUnderBlocks
                + fenceSolution
                    .totalCuttedFenceBaseUnderBlocks,
        },
        {
            block: fenceBaseCapBlock,
            count:
                fenceSolution
                    .totalFullFenceBaseCapBlocks
                + fenceSolution
                    .totalCuttedFenceBaseCapBlocks,
        },
    ];


    fenceSolution.totalMass = materials.reduce(
        (total, material) =>
            total
            + calculateMaterialValue(
                material.block,
                material.count,
                "massKg"
            ),
        0
    );

    fenceSolution.totalPrice = materials.reduce(
        (total, material) =>
            total
            + calculateMaterialValue(
                material.block,
                material.count,
                "priceRub"
            ),
        0
    );

    return fenceSolution;
}