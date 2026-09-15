export function getSolution(fenceParams) {
    const MIN_BLOCK_LENGTH = 100;

    const fenceBlock = fenceParams.fenceBlock;
    const columnBlock = fenceParams.columnBlock;
    const fenceCoverBlock = fenceParams.fenceCoverBlock ?? null;
    const columnCoverBlock = fenceParams.columnCoverBlock ?? null;

    // Если ворота не указаны, используем пустой массив
    const gatesLength = Array.isArray(fenceParams.gatesLength)
        ? fenceParams.gatesLength
        : [];

    const gatesCount = gatesLength.length;

    const gatesTotalLength = gatesLength.reduce(
        (total, gateLength) => total + gateLength,
        0
    );

    const fenceSolution = {
        columnsCount : 0,
        fenceSpansCount : 0,
        spansLength : 0,

        columnBlocksPerColumn : 0,

        fenceBlocksPerRowY : 0,
        fenceBlocksPerRowX : 0,

        fenceBlocksPerRowXCutted : 0,
        cuttedBlockLength : 0,

        totalColumnBlocks : 0,
        totalFullFenceBlocks : 0,
        totalCuttedFenceBlocks : 0,
        totalColumnCoverBlocks : 0,
        totalFullFenceCoverBlocks : 0,
        totalCuttedFenceCoverBlocks : 0,

        totalMass : 0,
        totalPrice : 0,

        fenceBlock,
        columnBlock,
        fenceCoverBlock,
        columnCoverBlock,
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

        console.error(fenceSolution.error);

        return fenceSolution;
    }

    const freeLength =
        fenceParams.lengthFront
        - gatesTotalLength
        - fenceSolution.columnsCount * columnBlock.lengthMm;

    if (freeLength <= 0) {
        fenceSolution.error =
            "Столбы не помещаются в заданную длину";

        console.error(fenceSolution.error);

        return fenceSolution;
    }

    fenceSolution.spansLength =
        freeLength / fenceSolution.fenceSpansCount;

    let n = 0;

    // Без подрезки
    if (n === 0) {
        const remainder =
            fenceSolution.spansLength % fenceBlock.lengthMm;

        if (remainder !== 0) {
            console.log("Без подрезки не обойтись");
            n = 1;
        } else {
            fenceSolution.fenceBlocksPerRowXCutted = 0;
            fenceSolution.cuttedBlockLength = 0;

            fenceSolution.fenceBlocksPerRowX = Math.floor(
                fenceSolution.spansLength / fenceBlock.lengthMm
            );
        }
    }

    // Подрезка одного блока
    if (n === 1) {
        const fullBlocks = Math.floor(
            fenceSolution.spansLength / fenceBlock.lengthMm
        );

        const remainder =
            fenceSolution.spansLength % fenceBlock.lengthMm;

        if (remainder < MIN_BLOCK_LENGTH) {
            console.log(
                `Длина блока для подрезки меньше ${MIN_BLOCK_LENGTH} мм. `
                + "Необходима подрезка двух блоков."
            );

            n = 2;
        } else {
            fenceSolution.fenceBlocksPerRowX = fullBlocks;
            fenceSolution.cuttedBlockLength = remainder;
            fenceSolution.fenceBlocksPerRowXCutted = 1;
        }
    }

    // Подрезка двух блоков
    if (n === 2) {
        let fullBlocks = Math.floor(
            fenceSolution.spansLength / fenceBlock.lengthMm
        );

        let remainder =
            fenceSolution.spansLength % fenceBlock.lengthMm;

        if (remainder < MIN_BLOCK_LENGTH) {
            fullBlocks -= 1;
            remainder += fenceBlock.lengthMm;
        }

        fenceSolution.fenceBlocksPerRowX = fullBlocks;
        fenceSolution.cuttedBlockLength = remainder / 2;
        fenceSolution.fenceBlocksPerRowXCutted = 2;
    }

    // Количество блоков по высоте
    fenceSolution.columnBlocksPerColumn = Math.floor(
        fenceParams.heightColumn / columnBlock.heightMm
    );

    fenceSolution.fenceBlocksPerRowY = Math.floor(
        fenceParams.heightFence / fenceBlock.heightMm
    );

    fenceSolution.totalColumnBlocks = fenceSolution.columnsCount * fenceSolution.columnBlocksPerColumn
    fenceSolution.totalFullFenceBlocks = fenceSolution.fenceBlocksPerRowY * fenceSolution.fenceBlocksPerRowX * fenceSolution.fenceSpansCount
    fenceSolution.totalCuttedFenceBlocks = fenceSolution.fenceBlocksPerRowXCutted * fenceSolution.fenceBlocksPerRowY * fenceSolution.fenceSpansCount

    // Одна крышка на каждый столб
    fenceSolution.totalColumnCoverBlocks =
        columnCoverBlock
            ? fenceSolution.columnsCount
            : 0;

    // Целые крышки расположены только в верхнем ряду
    fenceSolution.totalFullFenceCoverBlocks =
        fenceCoverBlock
            ? fenceSolution.fenceBlocksPerRowX
                * fenceSolution.fenceSpansCount
            : 0;

    // Подрезанные крышки также только в верхнем ряду
    fenceSolution.totalCuttedFenceCoverBlocks =
        fenceCoverBlock
            ? fenceSolution.fenceBlocksPerRowXCutted
                * fenceSolution.fenceSpansCount
            : 0;

    fenceSolution.totalMass = fenceSolution.totalColumnBlocks * columnBlock.massKg +
        (fenceSolution.totalFullFenceBlocks + fenceSolution.totalCuttedFenceBlocks) * fenceBlock.massKg +
        fenceSolution.totalColumnCoverBlocks * columnCoverBlock.massKg +
        (fenceSolution.totalFullFenceCoverBlocks + fenceSolution.totalCuttedFenceCoverBlocks) * fenceCoverBlock.massKg

    fenceSolution.totalPrice = fenceSolution.totalColumnBlocks * columnBlock.priceRub +
        (fenceSolution.totalFullFenceBlocks + fenceSolution.totalCuttedFenceBlocks) * fenceBlock.priceRub +
        fenceSolution.totalColumnCoverBlocks * columnCoverBlock.priceRub +
        (fenceSolution.totalFullFenceCoverBlocks + fenceSolution.totalCuttedFenceCoverBlocks) * fenceCoverBlock.priceRub

    return fenceSolution;
}