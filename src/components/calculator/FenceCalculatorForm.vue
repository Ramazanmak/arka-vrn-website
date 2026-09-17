<script setup>
import {
    reactive,
    watch,
} from "vue";

import MaterialSelector from "./MaterialSelector.vue";

import {
    getSolution,
} from "../../calculator/getSolution.js";

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
    lengthFrontMeters: 25,
    heightFenceMeters: 2,
    heightColumnMeters: 2.5,
    columnsCount: 10,

    gatesCount: 0,
    gatesLengthMeters: [],

    materials: {
        columnBlock: {
            productId:
                "column-block-300x300x190",
            finishId: "gray",
        },

        fenceBlock: {
            productId:
                "fence-block-390x190x190",
            finishId: "gray",
        },

        columnCover: {
            productId:
                "column-cover-four-slope-300x300x50",
            finishId: "gray",
        },

        parapet: {
            productId:
                "parapet-flat-390x190x50",
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
        open: true,

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
        open: true,

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


watch(
    [
        () => form.gatesCount,
        () => form.columnsCount,
    ],

    ([gatesValue, columnsValue]) => {
        const maximumGatesCount = Math.max(
            0,
            Math.floor(
                Number(columnsValue) || 0
            ) - 1
        );

        const normalizedCount = Math.min(
            maximumGatesCount,
            Math.max(
                0,
                Math.floor(
                    Number(gatesValue) || 0
                )
            )
        );

        if (form.gatesCount !== normalizedCount) {
            form.gatesCount = normalizedCount;
        }

        while (
            form.gatesLengthMeters.length
            < normalizedCount
        ) {
            form.gatesLengthMeters.push(
                DEFAULT_GATE_LENGTH_METERS
            );
        }

        if (
            form.gatesLengthMeters.length
            > normalizedCount
        ) {
            form.gatesLengthMeters.splice(
                normalizedCount
            );
        }
    },

    {
        immediate: true,
    }
);


function metersToMillimeters(value) {
    return Math.round(
        Number(value) * 1000
    );
}


function findProduct(
    catalog,
    productId,
    fieldName
) {
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

    return createBlock(
        product,
        selection.finishId
    );
}


function handleSubmit() {
    /*
     * Просим родителя убрать предыдущие
     * результаты и ошибки.
     */
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

        const fenceParams = {
            lengthFront: metersToMillimeters(
                form.lengthFrontMeters
            ),

            heightFence: metersToMillimeters(
                form.heightFenceMeters
            ),

            heightColumn: metersToMillimeters(
                form.heightColumnMeters
            ),

            columnsCount: Number(
                form.columnsCount
            ),

            gatesLength:
                form.gatesLengthMeters.map(
                    (length) => {
                        return metersToMillimeters(
                            length
                        );
                    }
                ),

            ...selectedMaterials,
        };

        const result = getSolution(
            fenceParams
        );

        if (!result) {
            emit(
                "calculation-error",
                "Не удалось выполнить расчёт"
            );

            return;
        }

        if (result.error) {
            emit(
                "calculation-error",
                result.error
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
        <details
            class="form-section"
            open
        >
            <summary>
                Размеры и конструкция
            </summary>

            <div class="form-section-content">
                <label class="form-field">
                    <span>
                        Длина участка забора, м
                    </span>

                    <input
                        v-model.number="
                            form.lengthFrontMeters
                        "
                        type="number"
                        min="1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>
                        Высота полотна, м
                    </span>

                    <input
                        v-model.number="
                            form.heightFenceMeters
                        "
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>
                        Высота столбов, м
                    </span>

                    <input
                        v-model.number="
                            form.heightColumnMeters
                        "
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>
                        Количество основных столбов
                    </span>

                    <input
                        v-model.number="
                            form.columnsCount
                        "
                        type="number"
                        min="2"
                        step="1"
                        required
                    />
                </label>

                <label class="form-field">
                    <span>
                        Количество ворот
                    </span>

                    <input
                        v-model.number="
                            form.gatesCount
                        "
                        type="number"
                        min="0"
                        :max="
                            Math.max(
                                0,
                                form.columnsCount - 1
                            )
                        "
                        step="1"
                        required
                    />
                </label>

                <label
                    v-for="(_, index) in
                        form.gatesLengthMeters"
                    :key="index"
                    class="form-field"
                >
                    <span>
                        Длина ворот
                        №{{ index + 1 }}, м
                    </span>

                    <input
                        v-model.number="
                            form.gatesLengthMeters[index]
                        "
                        type="number"
                        min="0.1"
                        step="0.01"
                        required
                    />
                </label>
            </div>
        </details>

        <details
            v-for="group in materialGroups"
            :key="group.title"
            class="form-section"
            :open="group.open"
        >
            <summary>
                {{ group.title }}
            </summary>

            <div class="form-section-content">
                <MaterialSelector
                    v-for="material in group.items"
                    :key="material.key"
                    v-model="
                        form.materials[material.key]
                    "
                    :material="material"
                />
            </div>
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
    gap: 16px;
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
    border-bottom:
        1px solid var(--global-500);
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

.form-field input {
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

.form-field input:focus {
    border-color: var(--second-main-color);
    outline: 2px solid
        var(--second-main-color-pale);
}

.calculate-button {
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    background-color:
        var(--second-main-color);
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
    .calculator-form {
        padding: 18px;
    }

    .form-section summary {
        padding: 14px 16px;
    }

    .form-section-content {
        padding: 14px 16px;
    }
}
</style>