<script setup>
import { reactive, ref, watch } from "vue";

import ComHeader from "../common/ComHeader/ComHeader.vue";
import ComFooter from "../common/ComFooter.vue";

import {
    getSolution
} from "../../calculator/getSolution.js";

import {
    createFenceSvg
} from "../../calculator/graphics.js";

import {
    blockFinishes,

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


const fenceSolution = ref(null);
const calculationError = ref("");
const fenceSvg = ref("");


watch(
    () => form.gatesCount,
    (value) => {
        const count = Math.max(
            0,
            Math.floor(Number(value) || 0)
        );

        while (
            form.gatesLengthMeters.length < count
        ) {
            form.gatesLengthMeters.push(
                DEFAULT_GATE_LENGTH_METERS
            );
        }

        if (
            form.gatesLengthMeters.length > count
        ) {
            form.gatesLengthMeters.splice(count);
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

    return createBlock(
        product,
        selection.finishId
    );
}

function handleSubmit() {
    calculationError.value = "";
    fenceSolution.value = null;
    fenceSvg.value = "";

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
            "крышка столба"
        ),

        parapetBlock: resolveMaterial(
            parapetBlocks,
            form.materials.parapet,
            "парапет"
        ),

        columnBaseBlock: resolveMaterial(
            columnBaseUnderCapBlocks,
            form.materials.columnBase,
            "основание столба",
            false
        ),

        columnUnderCapBlock: resolveMaterial(
            columnBaseUnderCapBlocks,
            form.materials.columnUnderCap,
            "подкрышник столба",
            false
        ),

        fenceBaseBlock: resolveMaterial(
            fenceBaseUnderCapBlocks,
            form.materials.fenceBase,
            "основание пролёта",
            false
        ),

        fenceUnderCapBlock: resolveMaterial(
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

        columnsCount: form.columnsCount,

        gatesLength: form.gatesLengthMeters.map(
            (length) => metersToMillimeters(length)
        ),

        ...selectedMaterials,
    };

    try {
        const result = getSolution(fenceParams);

        if (!result) {
            calculationError.value =
                "Не удалось выполнить расчёт";

            return;
        }

        if (result.error) {
            calculationError.value = result.error;

            return;
        }

        fenceSolution.value = result;
        fenceSvg.value = createFenceSvg(result);

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
                Укажите размеры забора, количество столбов
                и параметры ворот.
            </p>

            <div class="calculator-content">
                <form
                    class="calculator-form"
                    @submit.prevent="handleSubmit"
                >
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
                            Длина ворот №{{ index + 1 }}, м
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
                        <!-- Параметры забора -->
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

                        <!-- Количество материалов -->
                        <details class="result-group">
                            <summary>
                                Количество материалов
                            </summary>

                            <div class="result-group-content">
                                <div class="result-row">
                                    <span>
                                        Столбовых блоков
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .totalColumnBlocks
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Целых рядовых блоков
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .totalFullFenceBlocks
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Подрезанных рядовых блоков
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .totalCuttedFenceBlocks
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Столбовых крышек
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .totalColumnCoverBlocks
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Целых заборных крышек
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .totalFullFenceCoverBlocks
                                        }}
                                    </strong>
                                </div>

                                <div class="result-row">
                                    <span>
                                        Подрезанных заборных крышек
                                    </span>

                                    <strong>
                                        {{
                                            fenceSolution
                                                .totalCuttedFenceCoverBlocks
                                        }}
                                    </strong>
                                </div>
                            </div>
                        </details>

                        <!-- Подрезка -->
                        <details class="result-group">
                            <summary>
                                Информация о подрезке
                            </summary>

                            <div class="result-group-content">
                                <template
                                    v-if="
                                        fenceSolution
                                            .fenceBlocksPerRowXCutted
                                        > 0
                                    "
                                >
                                    <div class="result-row">
                                        <span>
                                            Количество подрезок
                                            в одном ряду
                                        </span>

                                        <strong>
                                            {{
                                                fenceSolution
                                                    .fenceBlocksPerRowXCutted
                                            }}
                                        </strong>
                                    </div>

                                    <div class="result-row">
                                        <span>
                                            Длина подрезанного блока
                                        </span>

                                        <strong>
                                            {{
                                                formatNumber(
                                                    fenceSolution
                                                        .cuttedBlockLength,
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
                                    Подрезка блоков не требуется.
                                </p>
                            </div>
                        </details>

                        <!-- Масса и стоимость -->
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
                                        Масса блоков и крышек
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

                                <div
                                    class="
                                        result-row
                                        result-price
                                    "
                                >
                                    <span>
                                        Стоимость блоков и крышек
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

                <div
                    class="fence-svg"
                    v-html="fenceSvg"
                ></div>
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
    gap: 20px;
    padding: 24px;
    border: 1px solid var(--global-600);
    border-radius: 14px;
    background-color: white;
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
    padding: 12px 14px;
    border: 1px solid var(--global-600);
    border-radius: 8px;
    font-size: 1rem;
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

    transition:
        transform var(--duration),
        color var(--duration);
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

.fence-svg {
    width: 100%;
    overflow-x: auto;
}

.fence-svg :deep(svg) {
    display: block;
    width: 100%;
    min-width: 800px;
    height: auto;
}

@media (min-width: 900px) {
    .calculator-content {
        grid-template-columns:
            minmax(320px, 1fr)
            1fr;
        align-items: start;
    }
}

@media (max-width: 600px) {
    .calculator-form,
    .calculation-result,
    .calculation-error,
    .fence-preview {
        padding: 18px;
    }

    .result-group summary {
        padding: 14px 16px;
    }

    .result-group-content {
        padding: 10px 16px 14px;
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