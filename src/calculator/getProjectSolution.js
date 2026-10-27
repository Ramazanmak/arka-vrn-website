import { getSolution } from "./getSolution.js";

const MATERIAL_GROUPS = [
    [
        "columnBlock",
        "Столбовые блоки",
        ["totalColumnBlocks"],
    ],
    [
        "fenceBlock",
        "Рядовые блоки",
        [
            "totalFullFenceBlocks",
            "totalCuttedFenceBlocks",
        ],
    ],
    [
        "columnCoverBlock",
        "Крышки столбов",
        ["totalColumnCoverBlocks"],
    ],
    [
        "fenceCoverBlock",
        "Парапеты",
        [
            "totalFullFenceCoverBlocks",
            "totalCuttedFenceCoverBlocks",
        ],
    ],
    [
        "columnBaseUnderBlock",
        "Основания столбов",
        ["totalColumnBaseUnderBlocks"],
    ],
    [
        "columnBaseCapBlock",
        "Подкрышники столбов",
        ["totalColumnBaseCapBlocks"],
    ],
    [
        "fenceBaseUnderBlock",
        "Основания пролётов",
        [
            "totalFullFenceBaseUnderBlocks",
            "totalCuttedFenceBaseUnderBlocks",
        ],
    ],
    [
        "fenceBaseCapBlock",
        "Подкрышники пролётов",
        [
            "totalFullFenceBaseCapBlocks",
            "totalCuttedFenceBaseCapBlocks",
        ],
    ],
];

export function getProjectSolution({
    commonParams,
    sides,
    closedContour = false,
}) {
    if (
        !Array.isArray(sides)
        || sides.length < 1
        || sides.length > 4
    ) {
        throw new Error(
            "Укажите от одной до четырёх сторон"
        );
    }

    if (closedContour && sides.length < 3) {
        throw new Error(
            "Для замкнутого контура нужны минимум три стороны"
        );
    }

    const sideSolutions = sides.map((side, index) => {
        const sideName =
            side.name || `Сторона ${index + 1}`;

        try {
            const solution = getSolution({
                ...commonParams,

                lengthFront: side.lengthFront,
                gatesLength: side.gatesLength ?? [],
            });

            if (solution.error) {
                throw new Error(solution.error);
            }

            return {
                ...solution,
                sideId: side.id ?? index + 1,
                sideName,
            };
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "Не удалось выполнить расчёт";

            throw new Error(
                `${sideName}: ${message}`
            );
        }
    });

    // Стороны идут последовательно.
    // Соседние стороны имеют общий угловой столб.
    const sharedCornersCount = closedContour
        ? sides.length
        : sides.length - 1;

    const sum = (field) => sideSolutions.reduce(
        (total, solution) =>
            total + solution[field],
        0
    );

    const first = sideSolutions[0];

    const totals = {
        sidesCount: sides.length,
        sharedCornersCount,

        totalLengthMm: sideSolutions.reduce(
            (total, solution) =>
                total + solution.fenceParams.lengthFront,
            0
        ),

        gatesCount: sideSolutions.reduce(
            (total, solution) =>
                total + solution.fenceParams.gatesLength.length,
            0
        ),

        columnsCount:
            sum("columnsCount") - sharedCornersCount,

        fenceSpansCount: sum("fenceSpansCount"),

        actualColumnHeightMm:
            first.actualColumnHeightMm,

        actualFenceHeightMm:
            first.actualFenceHeightMm,
    };

    // Складываем количества материалов всех сторон.
    for (const [, , fields] of MATERIAL_GROUPS) {
        for (const field of fields) {
            totals[field] = sum(field);
        }
    }

    // Пересчитываем изделия столбов без повторов углов.
    // Материалы и высоты столбов общие для всего проекта.
    totals.totalColumnBlocks =
        totals.columnsCount
        * first.columnBlocksPerColumnCount;

    totals.totalColumnCoverBlocks =
        first.columnCoverBlock
            ? totals.columnsCount
            : 0;

    totals.totalColumnBaseUnderBlocks =
        first.columnBaseUnderBlock
            ? totals.columnsCount
            : 0;

    totals.totalColumnBaseCapBlocks =
        first.columnBaseCapBlock
            ? totals.columnsCount
            : 0;

    const materials = MATERIAL_GROUPS
        .filter(([key]) => Boolean(first[key]))
        .map(([key, label, fields]) => ({
            key,
            label,
            block: first[key],

            count: fields.reduce(
                (total, field) => total + totals[field],
                0
            ),
        }));

    // Массу и стоимость считаем после устранения повторов.
    // massKg и priceRub уже проверены в getSolution().
    totals.totalMass = materials.reduce(
        (total, item) =>
            total
            + item.count * Number(item.block.massKg),
        0
    );

    totals.totalPrice = materials.reduce(
        (total, item) =>
            total
            + item.count * Number(item.block.priceRub),
        0
    );

    return {
        sideSolutions,
        totals,
        materials,
        closedContour,
        error: null,
    };
}