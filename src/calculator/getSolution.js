const EPSILON = 0.000001;
const MIN_BLOCK_LENGTH = 100;

// Проверка положительного числового значения
function checkPositiveNumber(value, label) {
    if (!Number.isFinite(value) || value <= 0) {
        throw new Error(
            `${label}: укажите положительное число`
        );
    }
}

// Раскладка изделий по длине одного пролёта
function cutLength(
    block,
    spanLength,
    minBlockLength = MIN_BLOCK_LENGTH
) {
    checkPositiveNumber(
        block.lengthMm,
        "Длина изделия"
    );

    checkPositiveNumber(
        spanLength,
        "Длина пролёта"
    );

    checkPositiveNumber(
        minBlockLength,
        "Минимальная длина подрезки"
    );

    const nearestBlocks = Math.round(
        spanLength / block.lengthMm
    );

    // Учитываем погрешность дробных чисел
    // при точном делении без подрезки.
    if (
        nearestBlocks > 0
        && Math.abs(
            spanLength
            - nearestBlocks * block.lengthMm
        ) < EPSILON
    ) {
        return {
            fullBlocks: nearestBlocks,
            cutBlocks: 0,
            cutBlockLength: 0,
        };
    }

    let fullBlocks = Math.floor(
        spanLength / block.lengthMm
    );

    let remainder =
        spanLength
        - fullBlocks * block.lengthMm;

    // Один подрезанный элемент справа
    if (remainder >= minBlockLength) {
        return {
            fullBlocks,
            cutBlocks: 1,
            cutBlockLength: remainder,
        };
    }

    if (fullBlocks < 1) {
        throw new Error(
            `Пролёт длиной ${spanLength.toFixed(1)} мм `
            + "слишком короткий. "
            + `Минимальная длина подрезки — ${minBlockLength} мм`
        );
    }

    // Заменяем один целый элемент двумя
    // одинаковыми подрезками слева и справа.
    fullBlocks -= 1;
    remainder += block.lengthMm;

    const cutBlockLength = remainder / 2;

    if (cutBlockLength < minBlockLength) {
        throw new Error(
            "Не удалось получить подрезки длиной "
            + `не менее ${minBlockLength} мм`
        );
    }

    return {
        fullBlocks,
        cutBlocks: 2,
        cutBlockLength,
    };
}

// Если изделие не выбрано, его высота равна нулю
function getBlockHeight(block) {
    return block?.heightMm ?? 0;
}

// Расчёт массы или стоимости выбранного изделия
function calculateMaterialValue(
    block,
    count,
    property
) {
    if (!block || count === 0) {
        return 0;
    }

    const rawValue = block[property];
    const value = Number(rawValue);

    if (
        rawValue == null
        || (
            typeof rawValue === "string"
            && rawValue.trim() === ""
        )
        || !Number.isFinite(value)
        || value < 0
    ) {
        throw new Error(
            `У изделия «${block.name ?? "Без названия"}» `
            + `неверно указано свойство ${property}`
        );
    }

    return count * value;
}

// Подбор количества обычных пролётов
function calculateSpansCount({
    sideLength,
    desiredSpanLength,
    columnLength,
    gatesLength,
}) {
    const gatesTotalLength = gatesLength.reduce(
        (total, length) => total + length,
        0
    );

    const availableLength =
        sideLength
        - gatesTotalLength
        - (gatesLength.length + 1) * columnLength;

    if (availableLength <= 0) {
        throw new Error(
            "Недостаточно места для столбов и ворот"
        );
    }

    // На каждый обычный пролёт приходится
    // ещё один столб.
    //
    // Округляем вверх, чтобы фактическая длина
    // пролёта не превышала желаемую максимальную.
    return Math.max(
        1,
        Math.ceil(
            availableLength
            / (desiredSpanLength + columnLength)
        )
    );
}

// Расчёт одной прямой стороны забора
export function getSolution(fenceParams) {
    const fenceBlock =
        fenceParams.fenceBlock ?? null;

    const columnBlock =
        fenceParams.columnBlock ?? null;

    // Парапет пролёта
    const fenceCoverBlock =
        fenceParams.fenceCoverBlock ?? null;

    // Крышка столба
    const columnCoverBlock =
        fenceParams.columnCoverBlock ?? null;

    // Основания
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

    // Все длины на входе задаются в миллиметрах
    checkPositiveNumber(
        fenceParams.lengthFront,
        "Длина стороны"
    );

    checkPositiveNumber(
        fenceParams.desiredSpanLength,
        "Желаемая максимальная длина пролёта"
    );

    checkPositiveNumber(
        fenceParams.heightColumn,
        "Высота столбов"
    );

    checkPositiveNumber(
        fenceParams.heightFence,
        "Высота полотна"
    );

    // Проверяем размеры всех выбранных изделий
    const selectedBlocks = [
        columnBlock,
        fenceBlock,
        columnCoverBlock,
        fenceCoverBlock,
        columnBaseUnderBlock,
        fenceBaseUnderBlock,
        columnBaseCapBlock,
        fenceBaseCapBlock,
    ];

    for (const block of selectedBlocks) {
        if (!block) {
            continue;
        }

        const name = block.name ?? "Изделие";

        checkPositiveNumber(
            block.lengthMm,
            `${name}: длина`
        );

        checkPositiveNumber(
            block.heightMm,
            `${name}: высота`
        );
    }

    // Ворота передаются массивом длин
    if (
        fenceParams.gatesLength != null
        && !Array.isArray(fenceParams.gatesLength)
    ) {
        throw new Error(
            "Длины ворот должны быть переданы массивом"
        );
    }

    const gatesLength =
        fenceParams.gatesLength ?? [];

    gatesLength.forEach((length, index) => {
        checkPositiveNumber(
            length,
            `Длина ворот №${index + 1}`
        );
    });

    const gatesCount = gatesLength.length;

    const gatesTotalLength = gatesLength.reduce(
        (total, length) => total + length,
        0
    );

    const fenceSolution = {
        columnsCount: 0,
        fenceSpansCount: 0,

        desiredSpanLength:
            fenceParams.desiredSpanLength,

        spansLength: 0,

        // Столбовые блоки
        columnBlocksPerColumnCount: 0,

        // Рядовые блоки
        fenceBlocksPerRowYCount: 0,
        fenceBlocksPerRowXCount: 0,
        fenceBlocksCuts: 0,
        cuttedBlockLength: 0,

        // Парапеты одного пролёта
        fenceCoverBlockFullCount: 0,
        fenceCoverBlockCuttedCount: 0,
        fenceCoverBlockCuts: 0,
        fenceCoverBlockCuttedLength: 0,

        // Штучные элементы столбов
        columnCoverBlockCount: 0,
        columnBaseUnderBlockCount: 0,
        columnBaseCapBlockCount: 0,

        // Подкрышники одного пролёта
        fenceBaseCapBlockCount: 0,
        fenceBaseCapBlockCuttedCount: 0,
        fenceBaseCapBlockCuts: 0,
        fenceBaseCapBlockCuttedLength: 0,

        // Основания одного пролёта
        fenceBaseUnderBlockCount: 0,
        fenceBaseUnderBlockCuttedCount: 0,
        fenceBaseUnderBlockCuts: 0,
        fenceBaseUnderBlockCuttedLength: 0,

        // Общие количества основных блоков
        totalColumnBlocks: 0,
        totalFullFenceBlocks: 0,
        totalCuttedFenceBlocks: 0,

        // Общие количества крышек и парапетов
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

    // Количество обычных пролётов
    fenceSolution.fenceSpansCount =
        calculateSpansCount({
            sideLength: fenceParams.lengthFront,
            desiredSpanLength:
                fenceParams.desiredSpanLength,
            columnLength: columnBlock.lengthMm,
            gatesLength,
        });

    // Количество столбов с учётом ворот
    fenceSolution.columnsCount =
        fenceSolution.fenceSpansCount
        + gatesCount
        + 1;

    // Длина, оставшаяся для обычных пролётов
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

    // Фактическая длина одного обычного пролёта
    fenceSolution.spansLength =
        freeLength
        / fenceSolution.fenceSpansCount;

    // Количество целых блоков по высоте
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
            "Высота полотна меньше высоты "
            + "рядового блока";

        return fenceSolution;
    }

    // Рядовые блоки:
    // раскладка одного ряда одного пролёта
    const fenceBlockLayout = cutLength(
        fenceBlock,
        fenceSolution.spansLength
    );

    fenceSolution.fenceBlocksPerRowXCount =
        fenceBlockLayout.fullBlocks;

    fenceSolution.fenceBlocksCuts =
        fenceBlockLayout.cutBlocks;

    fenceSolution.cuttedBlockLength =
        fenceBlockLayout.cutBlockLength;

    // Парапеты: собственная раскладка по их длине
    if (fenceCoverBlock) {
        const layout = cutLength(
            fenceCoverBlock,
            fenceSolution.spansLength
        );

        fenceSolution.fenceCoverBlockFullCount =
            layout.fullBlocks;

        fenceSolution.fenceCoverBlockCuttedCount =
            layout.cutBlocks;

        fenceSolution.fenceCoverBlockCuts =
            layout.cutBlocks;

        fenceSolution.fenceCoverBlockCuttedLength =
            layout.cutBlockLength;
    }

    // Основания пролётов
    if (fenceBaseUnderBlock) {
        const layout = cutLength(
            fenceBaseUnderBlock,
            fenceSolution.spansLength
        );

        fenceSolution.fenceBaseUnderBlockCount =
            layout.fullBlocks;

        fenceSolution.fenceBaseUnderBlockCuttedCount =
            layout.cutBlocks;

        fenceSolution.fenceBaseUnderBlockCuts =
            layout.cutBlocks;

        fenceSolution.fenceBaseUnderBlockCuttedLength =
            layout.cutBlockLength;
    }

    // Подкрышники пролётов
    if (fenceBaseCapBlock) {
        const layout = cutLength(
            fenceBaseCapBlock,
            fenceSolution.spansLength
        );

        fenceSolution.fenceBaseCapBlockCount =
            layout.fullBlocks;

        fenceSolution.fenceBaseCapBlockCuttedCount =
            layout.cutBlocks;

        fenceSolution.fenceBaseCapBlockCuts =
            layout.cutBlocks;

        fenceSolution.fenceBaseCapBlockCuttedLength =
            layout.cutBlockLength;
    }

    // По одному выбранному штучному элементу на столб
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

    const spansCount =
        fenceSolution.fenceSpansCount;

    const rowsCount =
        fenceSolution.fenceBlocksPerRowYCount;

    // Общие количества основных блоков
    fenceSolution.totalColumnBlocks =
        fenceSolution.columnsCount
        * fenceSolution.columnBlocksPerColumnCount;

    fenceSolution.totalFullFenceBlocks =
        rowsCount
        * fenceSolution.fenceBlocksPerRowXCount
        * spansCount;

    fenceSolution.totalCuttedFenceBlocks =
        rowsCount
        * fenceSolution.fenceBlocksCuts
        * spansCount;

    // Общие количества крышек и парапетов
    fenceSolution.totalColumnCoverBlocks =
        fenceSolution.columnCoverBlockCount;

    fenceSolution.totalFullFenceCoverBlocks =
        fenceSolution.fenceCoverBlockFullCount
        * spansCount;

    fenceSolution.totalCuttedFenceCoverBlocks =
        fenceSolution.fenceCoverBlockCuttedCount
        * spansCount;

    // Общие количества оснований и подкрышников
    fenceSolution.totalColumnBaseUnderBlocks =
        fenceSolution.columnBaseUnderBlockCount;

    fenceSolution.totalColumnBaseCapBlocks =
        fenceSolution.columnBaseCapBlockCount;

    fenceSolution.totalFullFenceBaseUnderBlocks =
        fenceSolution.fenceBaseUnderBlockCount
        * spansCount;

    fenceSolution.totalCuttedFenceBaseUnderBlocks =
        fenceSolution.fenceBaseUnderBlockCuttedCount
        * spansCount;

    fenceSolution.totalFullFenceBaseCapBlocks =
        fenceSolution.fenceBaseCapBlockCount
        * spansCount;

    fenceSolution.totalCuttedFenceBaseCapBlocks =
        fenceSolution.fenceBaseCapBlockCuttedCount
        * spansCount;

    // Фактическая высота включает основания,
    // подкрышники и крышки
    fenceSolution.actualColumnHeightMm =
        fenceSolution.columnBlocksPerColumnCount
            * columnBlock.heightMm
        + getBlockHeight(columnBaseUnderBlock)
        + getBlockHeight(columnBaseCapBlock)
        + getBlockHeight(columnCoverBlock);

    fenceSolution.actualFenceHeightMm =
        rowsCount * fenceBlock.heightMm
        + getBlockHeight(fenceBaseUnderBlock)
        + getBlockHeight(fenceBaseCapBlock)
        + getBlockHeight(fenceCoverBlock);

    // Для каждой подрезки приобретается
    // одно целое изделие.
    // Повторное использование обрезков
    // здесь не учитывается.
    const materials = [
        {
            block: columnBlock,
            count: fenceSolution.totalColumnBlocks,
        },
        {
            block: fenceBlock,
            count:
                fenceSolution.totalFullFenceBlocks
                + fenceSolution.totalCuttedFenceBlocks,
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
                + fenceSolution.totalCuttedFenceCoverBlocks,
        },
        {
            block: columnBaseUnderBlock,
            count:
                fenceSolution.totalColumnBaseUnderBlocks,
        },
        {
            block: columnBaseCapBlock,
            count:
                fenceSolution.totalColumnBaseCapBlocks,
        },
        {
            block: fenceBaseUnderBlock,
            count:
                fenceSolution.totalFullFenceBaseUnderBlocks
                + fenceSolution.totalCuttedFenceBaseUnderBlocks,
        },
        {
            block: fenceBaseCapBlock,
            count:
                fenceSolution.totalFullFenceBaseCapBlocks
                + fenceSolution.totalCuttedFenceBaseCapBlocks,
        },
    ];

    fenceSolution.totalMass = materials.reduce(
        (total, { block, count }) =>
            total
            + calculateMaterialValue(
                block,
                count,
                "massKg"
            ),
        0
    );

    fenceSolution.totalPrice = materials.reduce(
        (total, { block, count }) =>
            total
            + calculateMaterialValue(
                block,
                count,
                "priceRub"
            ),
        0
    );

    return fenceSolution;
}

