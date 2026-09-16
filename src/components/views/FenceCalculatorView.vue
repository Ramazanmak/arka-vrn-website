<script setup>
import {
    computed,
    reactive,
    ref,
    watch,
} from "vue";

import ComHeader from "../common/ComHeader/ComHeader.vue";
import ComFooter from "../common/ComFooter.vue";

import {
    getSolution,
} from "../../calculator/getSolution.js";

import {
    createFenceSvg,
    getDrawingLegend,
} from "../../calculator/graphics.js";

import {
    columnBlocks,
    fenceBlocks,
    columnCoverBlocks,
    parapetBlocks,
    columnBaseUnderCapBlocks,
    fenceBaseUnderCapBlocks,
    createBlock,
    getAvailableFinishes,
    hasCompleteDimensions,
} from "../../calculator/blocksCatalog.js";


const DEFAULT_GATE_LENGTH_METERS = 3;


const form = reactive({
    lengthFrontMeters: 25,
    heightFenceMeters: 2,
    heightColumnMeters: 2.5,
    columnsCount: 10,

    gatesCount: 0,
    gatesLengthMeters: [],

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


const fenceSolution = ref(null);
const calculationError = ref("");
const fenceSvg = ref("");


const drawingLegendItems = computed(() => {
    return getDrawingLegend(fenceSolution.value);
});





watch(
    [
        () => form.gatesCount,
        () => form.columnsCount,
    ],

    ([gatesValue, columnsValue]) => {
        const maximumGatesCount = Math.max(
            0,
            Math.floor(Number(columnsValue) || 0) - 1
        );

        const normalizedCount = Math.min(
            maximumGatesCount,
            Math.max(
                0,
                Math.floor(Number(gatesValue) || 0)
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
    return Math.round(Number(value) * 1000);
}


function formatNumber(value, digits = 0) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return number.toLocaleString("ru-RU", {
        maximumFractionDigits: digits,
    });
}


function formatMeters(valueInMillimeters) {
    return formatNumber(
        Number(valueInMillimeters) / 1000,
        2
    );
}


function formatPrice(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return number.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
    });
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


function getSelectedProduct(material) {
    const selection =
        form.materials[material.key];

    if (!selection?.productId) {
        return null;
    }

    return material.catalog.find(
        (product) => {
            return product.id === selection.productId;
        }
    ) ?? null;
}


function getMaterialFinishes(material) {
    return getAvailableFinishes(
        getSelectedProduct(material)
    );
}


function synchronizeMaterialFinish(material) {
    const selection =
        form.materials[material.key];

    /*
     * Для варианта «не использовать»
     * исполнение выбирать не нужно.
     */
    if (!selection.productId) {
        return;
    }

    const finishes =
        getMaterialFinishes(material);

    const finishIsAvailable = finishes.some(
        (finish) => {
            return finish.id === selection.finishId;
        }
    );

    if (!finishIsAvailable) {
        selection.finishId =
            finishes[0]?.id ?? null;
    }
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


const materialCountRows = computed(() => {
    const solution = fenceSolution.value;

    if (!solution) {
        return [];
    }

    return [
        {
            id: "column-blocks",
            label: "Столбовые блоки",
            value: solution.totalColumnBlocks,
            visible: true,
        },
        {
            id: "full-fence-blocks",
            label: "Целые рядовые блоки",
            value: solution.totalFullFenceBlocks,
            visible: true,
        },
        {
            id: "cut-fence-blocks",
            label: "Подрезанные рядовые блоки",
            value: solution.totalCuttedFenceBlocks,
            visible: true,
        },
        {
            id: "column-covers",
            label: "Крышки столбов",
            value: solution.totalColumnCoverBlocks,
            visible: Boolean(
                solution.columnCoverBlock
            ),
        },
        {
            id: "full-parapets",
            label: "Целые парапеты",
            value:
                solution.totalFullFenceCoverBlocks,
            visible: Boolean(
                solution.fenceCoverBlock
            ),
        },
        {
            id: "cut-parapets",
            label: "Подрезанные парапеты",
            value:
                solution.totalCuttedFenceCoverBlocks,
            visible: Boolean(
                solution.fenceCoverBlock
            ),
        },
        {
            id: "column-bases",
            label: "Основания столбов",
            value:
                solution.totalColumnBaseUnderBlocks,
            visible: Boolean(
                solution.columnBaseUnderBlock
            ),
        },
        {
            id: "column-under-caps",
            label: "Подкрышники столбов",
            value:
                solution.totalColumnBaseCapBlocks,
            visible: Boolean(
                solution.columnBaseCapBlock
            ),
        },
        {
            id: "full-fence-bases",
            label: "Целые основания пролётов",
            value:
                solution.totalFullFenceBaseUnderBlocks,
            visible: Boolean(
                solution.fenceBaseUnderBlock
            ),
        },
        {
            id: "cut-fence-bases",
            label: "Подрезанные основания пролётов",
            value:
                solution.totalCuttedFenceBaseUnderBlocks,
            visible: Boolean(
                solution.fenceBaseUnderBlock
            ),
        },
        {
            id: "full-fence-under-caps",
            label: "Целые подкрышники пролётов",
            value:
                solution.totalFullFenceBaseCapBlocks,
            visible: Boolean(
                solution.fenceBaseCapBlock
            ),
        },
        {
            id: "cut-fence-under-caps",
            label: "Подрезанные подкрышники пролётов",
            value:
                solution.totalCuttedFenceBaseCapBlocks,
            visible: Boolean(
                solution.fenceBaseCapBlock
            ),
        },
    ].filter((row) => row.visible);
});


const cutGroups = computed(() => {
    const solution = fenceSolution.value;

    if (!solution) {
        return [];
    }

    return [
        {
            id: "fence-block",
            title: "Рядовые блоки",
            cuts: solution.fenceBlocksCuts,
            length: solution.cuttedBlockLength,
            scope: "в одном ряду пролёта",
            visible: Boolean(solution.fenceBlock),
        },
        {
            id: "parapet",
            title: "Парапеты",
            cuts: solution.fenceCoverBlockCuts,
            length:
                solution.fenceCoverBlockCuttedLength,
            scope: "в одном пролёте",
            visible: Boolean(
                solution.fenceCoverBlock
            ),
        },
        {
            id: "fence-base",
            title: "Основания пролётов",
            cuts:
                solution.fenceBaseUnderBlockCuts,
            length:
                solution
                    .fenceBaseUnderBlockCuttedLength,
            scope: "в одном пролёте",
            visible: Boolean(
                solution.fenceBaseUnderBlock
            ),
        },
        {
            id: "fence-under-cap",
            title: "Подкрышники пролётов",
            cuts:
                solution.fenceBaseCapBlockCuts,
            length:
                solution
                    .fenceBaseCapBlockCuttedLength,
            scope: "в одном пролёте",
            visible: Boolean(
                solution.fenceBaseCapBlock
            ),
        },
    ].filter((group) => group.visible);
});


function handleSubmit() {
    calculationError.value = "";
    fenceSolution.value = null;
    fenceSvg.value = "";

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

        const result =
            getSolution(fenceParams);

        if (!result) {
            calculationError.value =
                "Не удалось выполнить расчёт";

            return;
        }

        if (result.error) {
            calculationError.value =
                result.error;

            return;
        }

        fenceSolution.value = result;
        fenceSvg.value =
            createFenceSvg(result);

        console.log(
            "Результат расчёта:",
            result
        );
    } catch (error) {
        console.error(error);

        calculationError.value =
            error instanceof Error
                ? error.message
                : "Произошла ошибка при расчёте";
    }
}
</script>


<template>
    <ComHeader />

    <main class="calculator-page">
        <div class="calculator-container">
            <h1 class="calculator-title">
                Калькулятор забора
            </h1>

            <p class="calculator-description">
                Укажите размеры конструкции, выберите
                изделия и вариант их исполнения.
            </p>

            <div class="calculator-content">
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
                                        form
                                            .gatesLengthMeters[
                                                index
                                            ]
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
                            <div
                                v-for="material in
                                    group.items"
                                :key="material.key"
                                class="material-card"
                            >
                                <label class="form-field">
                                    <span>
                                        {{ material.label }}
                                    </span>

                                    <select
                                        v-model="
                                            form.materials[
                                                material.key
                                            ].productId
                                        "
                                        :required="
                                            material.required
                                        "
                                        @change="
                                            synchronizeMaterialFinish(
                                                material
                                            )
                                        "
                                    >
                                        <option
                                            v-if="
                                                !material.required
                                            "
                                            value=""
                                        >
                                            {{
                                                material.emptyLabel
                                                    ?? "Не использовать"
                                            }}
                                        </option>

                                        <option
                                            v-for="product in
                                                material.catalog"
                                            :key="product.id"
                                            :value="product.id"
                                            :disabled="
                                                !hasCompleteDimensions(
                                                    product
                                                )
                                            "
                                        >
                                            {{ product.name }}

                                            {{
                                                hasCompleteDimensions(
                                                    product
                                                )
                                                    ? ""
                                                    : " — размеры требуют уточнения"
                                            }}
                                        </option>
                                    </select>
                                </label>

                                <label
                                    v-if="
                                        form.materials[
                                            material.key
                                        ].productId
                                    "
                                    class="form-field"
                                >
                                    <span>
                                        Исполнение
                                    </span>

                                    <select
                                        v-model="
                                            form.materials[
                                                material.key
                                            ].finishId
                                        "
                                        required
                                    >
                                        <option
                                            v-for="finish in
                                                getMaterialFinishes(
                                                    material
                                                )"
                                            :key="finish.id"
                                            :value="finish.id"
                                        >
                                            {{ finish.name }}
                                        </option>
                                    </select>
                                </label>

                                <p
                                    v-if="
                                        getSelectedProduct(
                                            material
                                        )?.note
                                    "
                                    class="material-note"
                                >
                                    {{
                                        getSelectedProduct(
                                            material
                                        ).note
                                    }}
                                </p>
                            </div>
                        </div>
                    </details>

                    <button
                        class="calculate-button"
                        type="submit"
                    >
                        Рассчитать
                    </button>
                </form>

                <section
                    v-if="calculationError"
                    class="calculation-error"
                    aria-live="polite"
                >
                    <h2>
                        Ошибка расчёта
                    </h2>

                    <p>
                        {{ calculationError }}
                    </p>
                </section>

                <section
                    v-else-if="fenceSolution"
                    class="calculation-result"
                >
                    <h2>
                        Результат расчёта
                    </h2>

                    <div class="result-groups">
                        <details class="result-group">
                            <summary>
                                Параметры забора
                            </summary>

                            <div class="result-group-content">
                                <div class="result-row">
                                    <span>
                                        Общее количество столбов
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .columnsCount
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Количество пролётов
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .fenceSpansCount
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Длина одного пролёта
                                    </span>

                                    <strong>
                                        {{
                                            formatMeters(
                                                fenceSolution
                                                    .spansLength
                                            )
                                        }}
                                        м
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Количество ворот
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .fenceParams
                                                .gatesLength
                                                .length
                                        }}
                                    </strong>
                                </div>

                                <div
                                    v-for="(
                                        gateLength,
                                        index
                                    ) in fenceSolution
                                        .fenceParams
                                        .gatesLength"
                                    :key="index"
                                    class="result-row"
                                >
                                    <span>
                                        Длина ворот
                                        №{{ index + 1 }}
                                    </span>

                                    <strong>
                                        {{
                                            formatMeters(
                                                gateLength
                                            )
                                        }}
                                        м
                                    </strong>
                                </div>
                            </div>
                        </details>

                        <details class="result-group">
                            <summary>
                                Количество материалов
                            </summary>

                            <div class="result-group-content">
                                <div
                                    v-for="row in
                                        materialCountRows"
                                    :key="row.id"
                                    class="result-row"
                                >
                                    <span>
                                        {{ row.label }}
                                    </span>

                                    <strong>
                                        {{ row.value }}
                                    </strong>
                                </div>
                            </div>
                        </details>

                        <details class="result-group">
                            <summary>
                                Информация о подрезке
                            </summary>

                            <div class="result-group-content">
                                <div
                                    v-for="group in cutGroups"
                                    :key="group.id"
                                    class="cut-result"
                                >
                                    <h3>
                                        {{ group.title }}
                                    </h3>

                                    <template
                                        v-if="group.cuts > 0"
                                    >
                                        <div class="result-row">
                                            <span>
                                                Количество подрезок
                                                {{ group.scope }}
                                            </span>

                                            <strong>
                                                {{ group.cuts }}
                                            </strong>
                                        </div>

                                        <div class="result-row">
                                            <span>
                                                Длина подрезанного
                                                изделия
                                            </span>

                                            <strong>
                                                {{
                                                    formatNumber(
                                                        group.length,
                                                        1
                                                    )
                                                }}
                                                мм
                                            </strong>
                                        </div>
                                    </template>

                                    <p
                                        v-else
                                        class="no-cuts-message"
                                    >
                                        Подрезка не требуется.
                                    </p>
                                </div>
                            </div>
                        </details>

                        <details
                            class="
                                result-group
                                result-group-total
                            "
                            open
                        >
                            <summary>
                                Масса и стоимость
                            </summary>

                            <div class="result-group-content">
                                <div class="result-row">
                                    <span>
                                        Масса всех изделий
                                    </span>

                                    <strong>
                                        {{
                                            formatNumber(
                                                fenceSolution
                                                    .totalMass,
                                                1
                                            )
                                        }}
                                        кг
                                    </strong>
                                </div>

                                <div class="result-row result-price">
                                    <span>
                                        Стоимость материалов
                                    </span>

                                    <strong>
                                        {{
                                            formatPrice(
                                                fenceSolution
                                                    .totalPrice
                                            )
                                        }}
                                    </strong>
                                </div>
                            </div>
                        </details>
                    </div>
                </section>
            </div>

            <section
                v-if="fenceSvg"
                class="fence-preview"
            >
                <h2>
                    Схема забора
                </h2>

                <div class="fence-preview-content">
                    <div
                        class="fence-svg"
                        v-html="fenceSvg"
                    ></div>

                    <aside
                        v-if="drawingLegendItems.length"
                        class="fence-legend"
                        aria-label="Условные обозначения"
                    >
                        <h3>
                            Обозначения
                        </h3>

                        <ul>
                            <li
                                v-for="item in
                                    drawingLegendItems"
                                :key="item.id"
                            >
                                <span
                                    class="legend-sample"
                                    :class="{
                                        'legend-sample-dashed':
                                            item.dashed,
                                    }"
                                    :style="{
                                        borderColor:
                                            item.color,
                                    }"
                                ></span>

                                <span>
                                    {{ item.label }}
                                </span>
                            </li>
                        </ul>
                    </aside>
                </div>
            </section>
        </div>
    </main>

    <ComFooter />
</template>


<style scoped>
.calculator-page {
    min-height: 100vh;
    padding:
        calc(var(--headerHeight) + 40px)
        var(--side-padding)
        60px;
    background-color: var(--main-bg-color);
}

.calculator-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.calculator-title {
    margin: 0;
    font-size: var(--h2-font-size);
}

.calculator-description {
    margin: 12px 0 0;
    color: var(--global-700);
}

.calculator-content {
    display: grid;
    gap: 30px;
    margin-top: 30px;
}

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
    outline: 2px solid
        var(--second-main-color-pale);
}

.material-card {
    display: grid;
    gap: 14px;
    padding: 16px;
    border: 1px solid var(--global-500);
    border-radius: 9px;
    background-color: #fafafa;
}

.material-note {
    margin: 0;
    color: var(--global-700);
    font-size: 0.88rem;
    line-height: 1.4;
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

.calculation-result,
.calculation-error {
    padding: 24px;
    border-radius: 14px;
    background-color: white;
}

.calculation-result {
    border: 1px solid var(--global-600);
}

.calculation-error {
    border: 1px solid #b42318;
    color: #b42318;
}

.calculation-result h2,
.calculation-error h2 {
    margin-top: 0;
}

.result-groups {
    display: grid;
    gap: 12px;
}

.result-group {
    overflow: hidden;
    border: 1px solid var(--global-500);
    border-radius: 10px;
    background-color: white;
}

.result-group summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 16px 20px;
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
    user-select: none;
    transition: background-color var(--duration);
}

.result-group summary:hover {
    background-color: #fff7f2;
}

.result-group summary::-webkit-details-marker {
    display: none;
}

.result-group summary::after {
    content: "▼";
    flex-shrink: 0;
    color: var(--second-main-color);
    font-size: 1rem;
    line-height: 1;
    transition: transform var(--duration);
}

.result-group[open] summary::after {
    transform: rotate(180deg);
}

.result-group[open] summary {
    border-bottom: 1px solid var(--global-500);
}

.result-group-content {
    padding: 12px 20px 18px;
}

.result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 12px 0;
    border-bottom: 1px solid var(--global-500);
}

.result-row:last-child {
    border-bottom: none;
}

.result-row strong {
    flex-shrink: 0;
    text-align: right;
}

.cut-result + .cut-result {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--global-500);
}

.cut-result h3 {
    margin: 0 0 6px;
    font-size: 1rem;
}

.no-cuts-message {
    margin: 0;
    padding: 8px 0 0;
    color: var(--global-700);
}

.result-group-total {
    border-color: var(--second-main-color);
}

.result-price {
    margin: 8px 0;
    padding: 16px;
    border: none;
    border-radius: 8px;
    background-color: var(--second-main-color);
    color: white;
}

.result-price span,
.result-price strong {
    color: white;
}

.result-price span {
    font-weight: 600;
}

.result-price strong {
    font-size: 1.35rem;
}

.fence-preview {
    margin-top: 30px;
    padding: 24px;
    border: 1px solid var(--global-600);
    border-radius: 14px;
    background-color: white;
}

.fence-preview h2 {
    margin-top: 0;
}

.fence-preview-content {
    display: grid;
    gap: 20px;
}

.fence-svg {
    width: 100%;
    min-width: 0;
    overflow: hidden;
}

.fence-svg :deep(svg) {
    display: block;
    width: 100%;
    height: auto;
}

.fence-legend {
    padding: 16px;
    border: 1px solid var(--global-500);
    border-radius: 10px;
    background-color: #fafafa;
}

.fence-legend h3 {
    margin: 0 0 14px;
    font-size: 1rem;
}

.fence-legend ul {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.fence-legend li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.92rem;
}

.legend-sample {
    box-sizing: border-box;
    width: 38px;
    height: 18px;
    flex-shrink: 0;
    border: 3px solid;
    border-radius: 3px;
    background-color: #d1d5db;
}

.legend-sample-dashed {
    border-style: dashed;
}

@media (min-width: 900px) {
    .calculator-content {
        grid-template-columns:
            minmax(360px, 1fr)
            minmax(360px, 1fr);
        align-items: start;
    }}

@media (max-width: 600px) {
    .calculator-form,
    .calculation-result,
    .calculation-error,
    .fence-preview {
        padding: 18px;
    }

    .form-section summary,
    .result-group summary {
        padding: 14px 16px;
    }

    .form-section-content,
    .result-group-content {
        padding: 14px 16px;
    }

    .result-row {
        align-items: flex-start;
        gap: 12px;
    }

    .result-price {
        padding: 14px;
    }
}
</style>