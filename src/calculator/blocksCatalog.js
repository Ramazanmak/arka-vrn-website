
// null в цене означает, что такое исполнение в прайсе не указано.

export const blockFinishes = [
    {
        id: "gray",
        name: "Серый",
        svgColor: "#b8b8b8",
    },
    {
        id: "colored",
        name: "Цветной",
        svgColor: "#d98245",
    },
    {
        id: "colorMix",
        name: "Колор-микс",
        svgColor: "#9b6544",
    },
];


export const columnBlocks = [
    {
        id: "column-block-500x190x190",
        category: "columnBlock",
        name: "Столбовой блок 500 × 190 × 190 мм",
        dimensionsText: "50 × 19 × 19 см",
        lengthMm: 500,
        widthMm: 190,
        heightMm: 190,
        massKg: 27,
        palletQuantity: 60,
        note: "Отверстия 80 × 170 мм, фаска 10 мм",
        prices: {
            gray: 440,
            colored: 600,
            colorMix: 750,
        },
        sourceRow: 10,
    },
    {
        id: "column-block-300x300x190",
        category: "columnBlock",
        name: "Столбовой блок 300 × 300 × 190 мм",
        dimensionsText: "30 × 30 × 19 см",
        lengthMm: 300,
        widthMm: 300,
        heightMm: 190,
        massKg: 22,
        palletQuantity: 60,
        note: "Отверстие 180 × 180 мм, фаска 15 мм",
        prices: {
            gray: 330,
            colored: 480,
            colorMix: 530,
        },
        sourceRow: 11,
    },
    {
        id: "column-block-380x380x190",
        category: "columnBlock",
        name: "Столбовой блок 380 × 380 × 190 мм",
        dimensionsText: "38 × 38 × 19 см",
        lengthMm: 380,
        widthMm: 380,
        heightMm: 190,
        massKg: 27.5,
        palletQuantity: 30,
        note: "Отверстие 270 × 270 мм, фаска 15 мм",
        prices: {
            gray: 470,
            colored: 650,
            colorMix: 750,
        },
        sourceRow: 16,
    },
];


export const fenceBlocks = [
    {
        id: "fence-block-390x190x190",
        category: "fenceBlock",
        name: "Рядовой блок 390 × 190 × 190 мм",
        dimensionsText: "39 × 19 × 19 см",
        lengthMm: 390,
        widthMm: 190,
        heightMm: 190,
        massKg: 22,
        palletQuantity: 60,
        prices: {
            gray: 310,
            colored: 460,
            colorMix: 510,
        },
        sourceRow: 19,
    },
    {
        id: "fence-block-390x120x190",
        category: "fenceBlock",
        name: "Рядовой блок 390 × 120 × 190 мм",
        dimensionsText: "39 × 12 × 19 см",
        lengthMm: 390,
        widthMm: 120,
        heightMm: 190,
        massKg: 14,
        palletQuantity: 90,
        prices: {
            gray: 270,
            colored: 420,
            colorMix: 470,
        },
        sourceRow: 23,
    },
];


// В прайсе эти изделия указаны одновременно как подкрышники и основания.
export const columnBaseUnderCapBlocks = [
    {
        id: "column-base-undercap-340x340x100",
        category: "columnBaseUnderCap",
        name: "Подкрышник/основание столбовых блоков 340 × 340 × 100 мм",
        dimensionsText: "34 × 34 × 10 см",
        lengthMm: 340,
        widthMm: 340,
        heightMm: 100,
        massKg: 16,
        note: "Узкая часть 300 × 300 мм, отверстие 170 × 170 мм",
        prices: {
            gray: 410,
            colored: 560,
            colorMix: 610,
        },
        sourceRow: 27,
    },
    {
        id: "column-base-undercap-425x425",
        category: "columnBaseUnderCap",
        name: "Подкрышник/основание столбовых блоков 425 × 425 мм",
        dimensionsText: "42,5 × 42,5 см",
        lengthMm: 425,
        widthMm: 425,
        heightMm: 100,
        massKg: 22,
        note: "Узкая часть 380 × 380 мм, отверстие 250 × 250 мм. Высота в прайсе не указана",
        prices: {
            gray: 480,
            colored: 630,
            colorMix: null,
        },
        sourceRow: 32,
    },
];


export const fenceBaseUnderCapBlocks = [
    {
        id: "fence-base-undercap-385x240x100",
        category: "fenceBaseUnderCap",
        name: "Подкрышник/основание рядовых блоков 385 × 240 × 100 мм",
        dimensionsText: "38,5 × 24 × 10 см",
        lengthMm: 385,
        widthMm: 240,
        heightMm: 100,
        massKg: 19,
        prices: {
            gray: 370,
            colored: 520,
            colorMix: null,
        },
        sourceRow: 35,
    },
];


export const columnCoverBlocks = [
    {
        id: "column-cover-flat-300x300",
        category: "columnCover",
        style: "flat",
        name: "Крышка на столб «Плоская» 300 × 300 мм",
        dimensionsText: "30 × 30 см",
        lengthMm: 300,
        widthMm: 300,
        heightMm: 100,
        massKg: 5,
        note: "Высота в прайсе не указана",
        prices: { gray: 310, colored: 460, colorMix: null },
        sourceRow: 38,
    },
    {
        id: "column-cover-flat-400x400",
        category: "columnCover",
        style: "flat",
        name: "Крышка на столб «Плоская» 400 × 400 мм",
        dimensionsText: "40 × 40 см",
        lengthMm: 400,
        widthMm: 400,
        heightMm: 100,
        massKg: 15,
        note: "Высота в прайсе не указана",
        prices: { gray: 410, colored: 560, colorMix: null },
        sourceRow: 40,
    },
    {
        id: "column-cover-flat-500x500",
        category: "columnCover",
        style: "flat",
        name: "Крышка на столб «Плоская» 500 × 500 мм",
        dimensionsText: "50 × 50 см",
        lengthMm: 500,
        widthMm: 500,
        heightMm: 100,
        massKg: 33,
        note: "Высота в прайсе не указана",
        prices: { gray: 560, colored: 710, colorMix: null },
        sourceRow: 42,
    },
    {
        id: "column-cover-tile-450x450x180",
        category: "columnCover",
        style: "tile",
        name: "Крышка на столб «Черепица» 450 × 450 × 180 мм",
        dimensionsText: "45 × 45 × 18 см",
        lengthMm: 450,
        widthMm: 450,
        heightMm: 180,
        massKg: 40,
        prices: { gray: 510, colored: 660, colorMix: null },
        sourceRow: 44,
    },
    {
        id: "column-cover-tile-390x390x120",
        category: "columnCover",
        style: "tile",
        name: "Крышка на столб «Черепица» 390 × 390 × 120 мм",
        dimensionsText: "39 × 39 × 12 см",
        lengthMm: 390,
        widthMm: 390,
        heightMm: 120,
        massKg: 18,
        prices: { gray: 460, colored: 610, colorMix: null },
        sourceRow: 46,
    },
    {
        id: "column-cover-tile-340x340x120",
        category: "columnCover",
        style: "tile",
        name: "Крышка на столб «Черепица» 340 × 340 × 120 мм",
        dimensionsText: "34 × 34 × 12 см",
        lengthMm: 340,
        widthMm: 340,
        heightMm: 120,
        massKg: 12.4,
        prices: { gray: 410, colored: 560, colorMix: null },
        sourceRow: 48,
    },
    {
        id: "column-cover-scale-440x440x160",
        category: "columnCover",
        style: "scale",
        name: "Крышка на столб «Чешуя» 440 × 440 × 160 мм",
        dimensionsText: "44 × 44 × 16 см",
        lengthMm: 440,
        widthMm: 440,
        heightMm: 160,
        massKg: 30,
        prices: { gray: 510, colored: 660, colorMix: null },
        sourceRow: 51,
    },
    {
        id: "column-cover-medusa-450x450",
        category: "columnCover",
        style: "medusa",
        name: "Крышка «Медуза» 450 × 450 мм",
        dimensionsText: "45 × 45 см",
        lengthMm: 450,
        widthMm: 450,
        heightMm: 160,
        massKg: 21.5,
        note: "Высота в прайсе не указана",
        prices: { gray: 510, colored: 660, colorMix: null },
        sourceRow: 59,
    },
    {
        id: "column-cover-four-slope-380x380x60",
        category: "columnCover",
        style: "fourSlope",
        name: "Крышка на столб «Четырёхскатная» 380 × 380 × 60 мм",
        dimensionsText: "38 × 38 × 6 см",
        lengthMm: 380,
        widthMm: 380,
        heightMm: 60,
        massKg: 15.5,
        prices: { gray: 410, colored: 560, colorMix: 610 },
        sourceRow: 68,
    },
    {
        id: "column-cover-four-slope-300x300x50",
        category: "columnCover",
        style: "fourSlope",
        name: "Крышка на столб «Четырёхскатная» 300 × 300 × 50 мм",
        dimensionsText: "30 × 30 × 5 см",
        lengthMm: 300,
        widthMm: 300,
        heightMm: 50,
        massKg: 9.5,
        prices: { gray: 310, colored: 460, colorMix: 510 },
        sourceRow: 70,
    },
    {
        id: "column-cover-four-slope-390x390x50",
        category: "columnCover",
        style: "fourSlope",
        name: "Крышка на столб «Четырёхскатная» 390 × 390 × 50 мм",
        dimensionsText: "39 × 39 × 5 см",
        lengthMm: 390,
        widthMm: 390,
        heightMm: 50,
        massKg: 15,
        prices: { gray: 410, colored: 560, colorMix: null },
        sourceRow: 73,
    },
    {
        id: "column-cover-four-slope-490x490x50",
        category: "columnCover",
        style: "fourSlope",
        name: "Крышка на столб «Четырёхскатная» 490 × 490 × 50 мм",
        dimensionsText: "49 × 49 × 5 см",
        lengthMm: 490,
        widthMm: 490,
        heightMm: 50,
        massKg: 22.5,
        prices: { gray: 510, colored: 660, colorMix: null },
        sourceRow: 74,
    },
    {
        id: "column-cover-four-slope-450x450x50",
        category: "columnCover",
        style: "fourSlope",
        name: "Крышка на столб «Четырёхскатная» 450 × 450 × 50 мм",
        dimensionsText: "45 × 45 × 5 см",
        lengthMm: 450,
        widthMm: 450,
        heightMm: 50,
        massKg: 27,
        prices: { gray: 510, colored: 660, colorMix: 710 },
        sourceRow: 76,
    },
    {
        id: "column-cover-lantern-390x390x70",
        category: "columnCover",
        style: "lantern",
        name: "Крышка с отверстием под фонарь 390 × 390 × 70 мм",
        dimensionsText: "39 × 39 × 7 см",
        lengthMm: 390,
        widthMm: 390,
        heightMm: 70,
        massKg: 14,
        note: "Без фонаря",
        prices: { gray: 460, colored: 610, colorMix: null },
        sourceRow: 85,
    },
    {
        id: "column-cover-lantern-340x340x70",
        category: "columnCover",
        style: "lantern",
        name: "Крышка с отверстием под фонарь 340 × 340 × 70 мм",
        dimensionsText: "34 × 34 × 7 см",
        lengthMm: 340,
        widthMm: 340,
        heightMm: 70,
        massKg: 13,
        note: "Без фонаря",
        prices: { gray: 410, colored: 560, colorMix: null },
        sourceRow: 87,
    },
];


export const parapetBlocks = [
    {
        id: "parapet-two-slope-vibro-500x180x43",
        category: "parapet",
        style: "twoSlopeVibro",
        name: "Парапет «Двускатный» вибролитой 500 × 180 × 43 мм",
        dimensionsText: "50 × 18 × 4,3 см",
        lengthMm: 500,
        widthMm: 180,
        heightMm: 43,
        massKg: 7,
        prices: { gray: 230, colored: 380, colorMix: null },
        sourceRow: 93,
    },
    {
        id: "parapet-two-slope-vibro-500x270",
        category: "parapet",
        style: "twoSlopeVibro",
        name: "Парапет «Двускатный» вибролитой 500 × 270 мм",
        dimensionsText: "50 × 27 см",
        lengthMm: 500,
        widthMm: 270,
        heightMm: 43,
        massKg: 11.7,
        note: "Высота в прайсе не указана",
        prices: { gray: 285, colored: 435, colorMix: null },
        sourceRow: 102,
    },
    {
        id: "parapet-two-slope-vibro-390x350",
        category: "parapet",
        style: "twoSlopeVibro",
        name: "Парапет «Двускатный» вибролитой 390 × 350 мм",
        dimensionsText: "39 × 35 см",
        lengthMm: 390,
        widthMm: 350,
        heightMm: 43,
        massKg: 15.7,
        note: "Высота в прайсе не указана",
        prices: { gray: 290, colored: 440, colorMix: null },
        sourceRow: 104,
    },
    {
        id: "parapet-two-slope-dry-390x260x55",
        category: "parapet",
        style: "twoSlopeDryPressed",
        name: "Парапет «Двускатный» сухопрессованный 390 × 260 × 55 мм",
        dimensionsText: "39 × 26 × 5,5 см",
        lengthMm: 390,
        widthMm: 260,
        heightMm: 55,
        massKg: 11,
        prices: { gray: 270, colored: 420, colorMix: 470 },
        sourceRow: 110,
    },
    {
        id: "parapet-tile-narrow-500x180x70",
        category: "parapet",
        style: "tileNarrow",
        name: "Парапет «Черепица» узкий 500 × 180 × 70 мм",
        dimensionsText: "50 × 18 × 7 см",
        lengthMm: 500,
        widthMm: 180,
        heightMm: 70,
        massKg: 11,
        prices: { gray: 230, colored: 380, colorMix: null },
        sourceRow: 114,
    },
    {
        id: "parapet-scale-500x180x70",
        category: "parapet",
        style: "scale",
        name: "Парапет «Чешуя» 500 × 180 × 70 мм",
        dimensionsText: "50 × 18 × 7 см",
        lengthMm: 500,
        widthMm: 180,
        heightMm: 70,
        massKg: 9,
        prices: { gray: 230, colored: 380, colorMix: null },
        sourceRow: 121,
    },
    {
        id: "parapet-tile-wide-505x455x87",
        category: "parapet",
        style: "tileWide",
        name: "Парапет «Черепица» широкий 505 × 455 × 87 мм",
        dimensionsText: "50,5 × 45,5 × 8,7 см",
        lengthMm: 505,
        widthMm: 455,
        heightMm: 87,
        massKg: 26.5,
        prices: { gray: 510, colored: 660, colorMix: null },
        sourceRow: 128,
    },
    {
        id: "parapet-flat-390x190x50",
        category: "parapet",
        style: "flat",
        name: "Парапет «Плоский» 390 × 190 × 50 мм",
        dimensionsText: "39 × 19 × 5 см",
        lengthMm: 390,
        widthMm: 190,
        heightMm: 50,
        massKg: 9,
        prices: { gray: 250, colored: 400, colorMix: 450 },
        sourceRow: 134,
    },
    {
        id: "parapet-flat-500x190x60",
        category: "parapet",
        style: "flat",
        name: "Парапет «Плоский» 500 × 190 × 60 мм",
        dimensionsText: "50 × 19 × 6 см",
        lengthMm: 500,
        widthMm: 190,
        heightMm: 60,
        massKg: 12,
        prices: { gray: 330, colored: 480, colorMix: 530 },
        sourceRow: 139,
    },
    {
        id: "parapet-flat-390x260x50",
        category: "parapet",
        style: "flat",
        name: "Парапет «Плоский» 390 × 260 × 50 мм",
        dimensionsText: "39 × 26 × 5 см",
        lengthMm: 390,
        widthMm: 260,
        heightMm: 50,
        massKg: 11,
        prices: { gray: 270, colored: 420, colorMix: 470 },
        sourceRow: 140,
    },
];


export const productCatalog = {
    columnBlocks,
    fenceBlocks,
    columnBaseUnderCapBlocks,
    fenceBaseUnderCapBlocks,
    columnCoverBlocks,
    parapetBlocks,
};


export function getAvailableFinishes(product) {
    if (!product) {
        return [];
    }

    return blockFinishes.filter(
        (finish) => Number.isFinite(
            product.prices?.[finish.id]
        )
    );
}


export function createBlock(product, finishId) {
    if (!product) {
        throw new Error("Выбранное изделие не найдено");
    }

    const finish = blockFinishes.find(
        (item) => item.id === finishId
    );

    if (!finish) {
        throw new Error("Выбранный вариант цвета не найден");
    }

    const priceRub = product.prices?.[finishId];

    if (!Number.isFinite(priceRub)) {
        throw new Error(
            `Для изделия «${product.name}» вариант «${finish.name}» недоступен`
        );
    }

    return {
        ...product,
        priceRub,
        color: finish.svgColor,
        finishId: finish.id,
        finishName: finish.name,
    };
}


export function hasCompleteDimensions(product) {
    return Boolean(product)
        && Number.isFinite(product.lengthMm)
        && Number.isFinite(product.widthMm)
        && Number.isFinite(product.heightMm);
}
