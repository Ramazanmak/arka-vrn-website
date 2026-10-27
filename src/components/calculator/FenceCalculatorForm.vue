<script setup>
import { reactive, watch } from "vue";

import MaterialSelector from "./MaterialSelector.vue";

import {
    getProjectSolution,
} from "../../calculator/getProjectSolution.js";

import {
    columnBlocks,
    fenceBlocks,
    columnCoverBlocks,
    parapetBlocks,
    columnBaseUnderCapBlocks,
    fenceBaseUnderCapBlocks,
    createBlock,
    hasCompleteDimensions,
} from "../../calculator/blocksCatalog.js";

const DEFAULT_GATE_LENGTH_METERS = 3;

const emit = defineEmits([
    "calculation-started",
    "calculated",
    "calculation-error",
]);

const form = reactive({
    heightFenceMeters: 2,
    heightColumnMeters: 2.5,
    desiredSpanLengthMeters: 2,

    sidesCount: 1,
    closedContour: false,

    sides: [
        {
            id: 1,
            name: "Сторона 1",
            lengthMeters: 25,
            gatesCount: 0,
            gatesLengthMeters: [],
        },
    ],

    materials: {
        columnBlock: {
            productId: "column-block-300x300x190",
            finishId: "gray",
        },
        fenceBlock: {
            productId: "fence-block-390x190x190",
            finishId: "gray",
        },
        columnCover: {
            productId:
                "column-cover-four-slope-300x300x50",
            finishId: "gray",
        },
        parapet: {
            productId: "parapet-flat-390x190x50",
            finishId: "gray",
        },
        columnBase: {
            productId: null,
            finishId: "gray",
        },
        columnUnderCap: {
            productId: null,
            finishId: "gray",
        },
        fenceBase: {
            productId: null,
            finishId: "gray",
        },
        fenceUnderCap: {
            productId: null,
            finishId: "gray",
        },
    },
});

const materialGroups = [
    {
        title: "Основные блоки",
        open: false,
        items: [
            {
                key: "columnBlock",
                label: "Столбовой блок",
                catalog: columnBlocks,
                required: true,
            },
            {
                key: "fenceBlock",
                label: "Рядовой блок",
                catalog: fenceBlocks,
                required: true,
            },
        ],
    },
    {
        title: "Крышки и парапеты",
        open: false,
        items: [
            {
                key: "columnCover",
                label: "Крышка столба",
                catalog: columnCoverBlocks,
                required: false,
                emptyLabel: "Без крышки",
            },
            {
                key: "parapet",
                label: "Парапет пролёта",
                catalog: parapetBlocks,
                required: false,
                emptyLabel: "Без парапета",
            },
        ],
    },
    {
        title: "Основания и подкрышники",
        open: false,
        items: [
            {
                key: "columnBase",
                label: "Основание столба",
                catalog: columnBaseUnderCapBlocks,
                required: false,
                emptyLabel: "Без основания",
            },
            {
                key: "columnUnderCap",
                label: "Подкрышник столба",
                catalog: columnBaseUnderCapBlocks,
                required: false,
                emptyLabel: "Без подкрышника",
            },
            {
                key: "fenceBase",
                label: "Основание пролёта",
                catalog: fenceBaseUnderCapBlocks,
                required: false,
                emptyLabel: "Без основания",
            },
            {
                key: "fenceUnderCap",
                label: "Подкрышник пролёта",
                catalog: fenceBaseUnderCapBlocks,
                required: false,
                emptyLabel: "Без подкрышника",
            },
        ],
    },
];

// Добавление и удаление сторон
watch(
    () => form.sidesCount,
    (count) => {
        if (
            !Number.isInteger(count)
            || count < 1
            || count > 4
        ) {
            return;
        }

        while (form.sides.length < count) {
            const number = form.sides.length + 1;

            form.sides.push({
                id: number,
                name: `Сторона ${number}`,
                lengthMeters: 25,
                gatesCount: 0,
                gatesLengthMeters: [],
            });
        }

        if (form.sides.length > count) {
            form.sides.splice(count);
        }

        if (count < 3) {
            form.closedContour = false;
        }
    }
);

// Для каждой стороны создаём нужное количество полей ворот
watch(
    () => form.sides.map((side) => side.gatesCount),
    () => {
        for (const side of form.sides) {
            const count = side.gatesCount;

            if (
                !Number.isInteger(count)
                || count < 0
            ) {
                continue;
            }

            while (side.gatesLengthMeters.length < count) {
                side.gatesLengthMeters.push(
                    DEFAULT_GATE_LENGTH_METERS
                );
            }

            if (side.gatesLengthMeters.length > count) {
                side.gatesLengthMeters.splice(count);
            }
        }
    },
    { immediate: true }
);

function metersToMillimeters(value) {
    return Math.round(Number(value) * 1000);
}

function findProduct(catalog, productId, fieldName) {
    const product = catalog.find(
        (item) => item.id === productId
    );

    if (!product) {
        throw new Error(
            `Не выбрано изделие: ${fieldName}`
        );
    }

    return product;
}

function resolveMaterial(
    catalog,
    selection,
    fieldName,
    required = true
) {
    if (!selection.productId) {
        if (required) {
            throw new Error(
                `Не выбрано изделие: ${fieldName}`
            );
        }

        return null;
    }

    const product = findProduct(
        catalog,
        selection.productId,
        fieldName
    );

    if (!hasCompleteDimensions(product)) {
        throw new Error(
            `У изделия «${product.name}» `
            + "не указаны все размеры"
        );
    }

    return createBlock(product, selection.finishId);
}

function handleSubmit() {
    emit("calculation-started");

    try {
        const selectedMaterials = {
            columnBlock: resolveMaterial(
                columnBlocks,
                form.materials.columnBlock,
                "столбовой блок"
            ),
            fenceBlock: resolveMaterial(
                fenceBlocks,
                form.materials.fenceBlock,
                "рядовой блок"
            ),
            columnCoverBlock: resolveMaterial(
                columnCoverBlocks,
                form.materials.columnCover,
                "крышка столба",
                false
            ),
            fenceCoverBlock: resolveMaterial(
                parapetBlocks,
                form.materials.parapet,
                "парапет",
                false
            ),
            columnBaseUnderBlock: resolveMaterial(
                columnBaseUnderCapBlocks,
                form.materials.columnBase,
                "основание столба",
                false
            ),
            columnBaseCapBlock: resolveMaterial(
                columnBaseUnderCapBlocks,
                form.materials.columnUnderCap,
                "подкрышник столба",
                false
            ),
            fenceBaseUnderBlock: resolveMaterial(
                fenceBaseUnderCapBlocks,
                form.materials.fenceBase,
                "основание пролёта",
                false
            ),
            fenceBaseCapBlock: resolveMaterial(
                fenceBaseUnderCapBlocks,
                form.materials.fenceUnderCap,
                "подкрышник пролёта",
                false
            ),
        };

        if (
            !Number.isInteger(form.sidesCount)
            || form.sidesCount < 1
            || form.sidesCount > 4
            || form.sidesCount !== form.sides.length
        ) {
            throw new Error(
                "Укажите от одной до четырёх сторон"
            );
        }

        for (const side of form.sides) {
            if (
                !Number.isInteger(side.gatesCount)
                || side.gatesCount < 0
                || side.gatesCount
                    !== side.gatesLengthMeters.length
            ) {
                throw new Error(
                    `${side.name}: неверное количество ворот`
                );
            }
        }

        const projectParams = {
            closedContour: form.closedContour,

            commonParams: {
                heightFence: metersToMillimeters(
                    form.heightFenceMeters
                ),

                heightColumn: metersToMillimeters(
                    form.heightColumnMeters
                ),

                desiredSpanLength: metersToMillimeters(
                    form.desiredSpanLengthMeters
                ),

                ...selectedMaterials,
            },

            sides: form.sides.map((side) => ({
                id: side.id,
                name: side.name,

                lengthFront: metersToMillimeters(
                    side.lengthMeters
                ),

                gatesLength: side.gatesLengthMeters.map(
                    metersToMillimeters
                ),
            })),
        };

        const result = getProjectSolution(projectParams);

        if (!result || result.error) {
            emit(
                "calculation-error",
                result?.error ?? "Не удалось выполнить расчёт"
            );

            return;
        }

        emit("calculated", result);
    } catch (error) {
        console.error(error);

        emit(
            "calculation-error",
            error instanceof Error
                ? error.message
                : "Произошла ошибка при расчёте"
        );
    }
}
</script>

<template>
    <form
        class="calculator-form"
        @submit.prevent="handleSubmit"
    >
      <section class="form-panel" aria-label="Размеры и стороны">
        <details class="form-section">
            <summary>Размеры и конструкция</summary>

            <div class="form-section-content">
                <label class="form-field">
                    <span>Высота пролета, м</span>
                    <input
                        v-model.number="form.heightFenceMeters"
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>Высота столбов, м</span>
                    <input
                        v-model.number="form.heightColumnMeters"
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>
                        Желаемая максимальная длина пролёта, м
                    </span>
                    <input
                        v-model.number="form.desiredSpanLengthMeters"
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>Количество сторон</span>
                    <select v-model.number="form.sidesCount">
                        <option
                            v-for="count in 4"
                            :key="count"
                            :value="count"
                        >
                            {{ count }}
                        </option>
                    </select>
                </label>

                <label
                    v-if="form.sidesCount >= 3"
                    class="form-checkbox"
                >
                    <input
                        v-model="form.closedContour"
                        type="checkbox"
                    />
                    <span>Замкнутый контур</span>
                </label>

                <p class="form-hint">
                    Стороны вводятся последовательно.
                    Соседние стороны имеют общий угловой столб.
                    Для замкнутого контура последняя сторона
                    соединяется с первой.
                </p>
            </div>
        </details>

        <details
            v-for="side in form.sides"
            :key="side.id"
            class="form-section"

        >
            <summary>{{ side.name }}</summary>

            <div class="form-section-content">
                <label class="form-field">
                    <span>Длина стороны, м</span>
                    <input
                        v-model.number="side.lengthMeters"
                        type="number"
                        min="1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>Количество ворот на этой стороне</span>
                    <input
                        v-model.number="side.gatesCount"
                        type="number"
                        min="0"
                        step="1"
                        required
                    />
                </label>

                <label
                    v-for="(_, index) in side.gatesLengthMeters"
                    :key="index"
                    class="form-field"
                >
                    <span>
                        Длина ворот №{{ index + 1 }}, м
                    </span>
                    <input
                        v-model.number="side.gatesLengthMeters[index]"
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>
            </div>
        </details>
        </section>

        <section class="form-panel" aria-label="Выбор материалов">

        <details
            v-for="group in materialGroups"
            :key="group.title"
            class="form-section"
            :open="group.open"
        >
            <summary>{{ group.title }}</summary>

            <div class="form-section-content">
                <MaterialSelector
                    v-for="material in group.items"
                    :key="material.key"
                    v-model="form.materials[material.key]"
                    :material="material"
                />
            </div>
          </section>
        </details>

        <button
            class="calculate-button"
            type="submit"
        >
            Рассчитать
        </button>
    </form>
</template>

<style scoped>
.calculator-form {
    display: grid;
    gap: 30px;
    align-items: start;
    min-width: 0;
}

.form-panel {
    display: grid;
    gap: 16px;
    min-width: 0;
    padding: 24px;
    border: 1px solid var(--global-600);
    border-radius: 14px;
    background-color: white;
}

.form-section {
    overflow: hidden;
    border: 1px solid var(--global-500);
    border-radius: 10px;
    background-color: white;
}

.form-section summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 15px 18px;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
    user-select: none;
}

.form-section summary::-webkit-details-marker {
    display: none;
}

.form-section summary::after {
    content: "▼";
    flex-shrink: 0;
    color: var(--second-main-color);
    transition: transform var(--duration);
}

.form-section[open] summary::after {
    transform: rotate(180deg);
}

.form-section[open] summary {
    border-bottom: 1px solid var(--global-500);
}

.form-section-content {
    display: grid;
    gap: 18px;
    padding: 18px;
}

.form-field {
    display: grid;
    gap: 8px;
}

.form-field span {
    font-weight: 500;
}

.form-field input,
.form-field select {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 12px 14px;
    border: 1px solid var(--global-600);
    border-radius: 8px;
    background-color: white;
    color: inherit;
    font: inherit;
}

.form-field input:focus,
.form-field select:focus {
    border-color: var(--second-main-color);
    outline: 2px solid var(--second-main-color-pale);
}

.form-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-hint {
    margin: 0;
    color: var(--global-700);
    font-size: 0.88rem;
    line-height: 1.5;
}

.calculate-button {
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    background-color: var(--second-main-color);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity var(--duration);
}

.calculate-button:hover {
    opacity: 0.85;
}

@media (max-width: 600px) {
    .form-panel {
    padding: 18px;
    }

    .form-section summary,
    .form-section-content {
        padding: 14px 16px;
    }
}
@media (min-width: 900px) {
    .calculator-form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>