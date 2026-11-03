function formatNumber(value, digits = 0) {
    return Number(value).toLocaleString("ru-RU", {
        maximumFractionDigits: digits,
    });
}

export function getTotalInfo(projectSolution){
    if (!projectSolution?.totals) {
        throw new Error("Сначала выполните расчёт забора");
    }

    const totals = projectSolution.totals;
    const materials = projectSolution.materials;
    const hasMaterial = (key) => materials.some((item) => item.key === key);

    const totalResult = [
        {
            label: "Количество сторон",
            value: totals.sidesCount,
            unit: ''
        },
        {
            label: "Общая длина",
            value: totals.totalLengthMm,
            unit: 'м.'
        },
        {
            label: "Количество столбов",
            value: totals.columnsCount,
            unit: 'шт.'
        },
        {
            label: "Количество пролетов",
            value: totals.fenceSpansCount,
            unit: 'шт.'
        },
        {
            label: "Количество проемов",
            value: totals.gatesCount,
            unit: 'шт.'
        },
        {
            label: "Фактическая высота пролёта",
            value: formatNumber(totals.actualFenceHeightMm / 1000, 3),
            unit: 'м.'
        },
        {
            label: "Фактическая высота столбов",
            value: formatNumber(totals.actualColumnHeightMm / 1000, 3),
            unit: 'м.'
        },
        {
            label: "Общая масса",
            value: formatNumber(totals.totalMass, 1),
            unit: 'кг.'
        },
        {
            label: "Полных поддонов",
            value: formatNumber(totals.totalFullPallets),
            unit: 'шт.'
        },
    ]

    const totalBlocks = [
        {
            id: "column-blocks",
            label: "Столбовые блоки",
            value: totals.totalColumnBlocks,
            visible: true,
        },
        {
            id: "fence-blocks",
            label: "Рядовые блоки",
            value:
                totals.totalFullFenceBlocks + totals.totalCuttedFenceBlocks,
            visible: hasMaterial('fenceBlock'),
        },
        {
            id: "column-covers",
            label: "Крышки столбов",
            value:
                totals.totalColumnCoverBlocks,
            visible: hasMaterial('columnCoverBlock'),
        },
        {
            id: "parapets",
            label: "Парапеты",
            value:
                totals.totalFullFenceCoverBlocks + totals.totalCuttedFenceCoverBlocks,
            visible: hasMaterial('fenceCoverBlock'),
        },
        {
            id: "column-bases",
            label: "Основания столбов",
            value:
                totals
                    .totalColumnBaseUnderBlocks,
            visible: hasMaterial('columnBaseUnderBlock'),
        },
        {
            id: "column-under-caps",
            label: "Подкрышники столбов",
            value:
                totals
                    .totalColumnBaseCapBlocks,
            visible: hasMaterial('columnBaseCapBlock'),
        },
        {
            id: "fence-bases",
            label:
                "Основания пролётов",
            value:
                totals.totalFullFenceBaseUnderBlocks +  totals.totalCuttedFenceBaseUnderBlocks,
            visible: hasMaterial('fenceBaseUnderBlock'),
        },
        {
            id: "fence-under-caps",
            label:
                "Подкрышники пролётов",
            value:
                totals.totalFullFenceBaseCapBlocks + totals.totalCuttedFenceBaseCapBlocks,
            visible: hasMaterial('fenceBaseCapBlock'),
        },
    ].filter((row) => row.visible);

     const cuttedblocksInfo = [
        {
            id: "cut-fence-blocks",
            label:
                "Рядовые блоки под подрезку",
            value:
                totals.totalCuttedFenceBlocks,
            visible: hasMaterial('fenceBlock'),
        },
        {
            id: "cut-parapets",
            label: "Парапеты под подрезку",
            value:
                totals.totalCuttedFenceCoverBlocks,
            visible: hasMaterial('fenceCoverBlock'),
        },
        {
            id: "cut-fence-bases",
            label:
                "Основания пролётов под подрезку",
            value:
                totals
                    .totalCuttedFenceBaseUnderBlocks,
            visible: hasMaterial('fenceBaseUnderBlock'),
        },
        {
            id: "cut-fence-under-caps",
            label:
                "Подкрышники пролётов под подрезку",
            value:
                totals
                    .totalCuttedFenceBaseCapBlocks,
            visible: hasMaterial('fenceBaseCapBlock'),
        },
    ].filter((row) => row.visible);
    return {
        totalResult,
        totalBlocks,
        cuttedblocksInfo,
    }
}