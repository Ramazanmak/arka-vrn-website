<script setup>
import { computed, nextTick, ref } from "vue";
import { useHead } from "@unhead/vue";

import "../calculator/calculator.css";

import { getFenceCalculatorSeo } from "../../seo.js";

import ComHeader from "../common/ComHeader/ComHeader.vue";
import ComFooter from "../common/ComFooter.vue";

import FenceCalculatorForm from
    "../calculator/FenceCalculatorForm.vue";

import FenceCalculatorResults from
    "../calculator/FenceCalculatorResults.vue";

import FencePreview from
    "../calculator/FencePreview.vue";

import { createPdf } from "../calculator/createPdf/createPdf.js";

const seo = getFenceCalculatorSeo();

useHead({
    title: seo.title,

    meta: [
        {
            name: "description",
            content: seo.description,
        },
        {
            property: "og:title",
            content: seo.title,
        },
        {
            property: "og:description",
            content: seo.description,
        },
        {
            property: "og:url",
            content: seo.canonical,
        },
    ],

    link: [
        {
            rel: "canonical",
            href: seo.canonical,
        },
    ],
});

const projectSolution = ref(null);
const calculationError = ref("");
const activeSideIndex = ref(0);
const resultsGroup = ref(null);

const pdfLoading = ref(false);
const pdfError = ref("");

const activeSideSolution = computed(() => {
    return projectSolution.value
        ?.sideSolutions[activeSideIndex.value]
        ?? null;
});

function formatNumber(value, digits = 0) {
    return Number(value).toLocaleString("ru-RU", {
        maximumFractionDigits: digits,
    });
}

const summaryRows = computed(() => {
    const totals = projectSolution.value?.totals;

    if (!totals) {
        return [];
    }

    return [
        [
            "Количество сторон",
            totals.sidesCount,
        ],
        [
            "Общая длина, м",
            formatNumber(totals.totalLengthMm / 1000, 3),
        ],
        [
            "Количество столбов",
            totals.columnsCount,
        ],
        [
            "Количество пролётов",
            totals.fenceSpansCount,
        ],
        [
            "Количество проёмов",
            totals.gatesCount,
        ],
        [
            "Фактическая высота пролёта, м",
            formatNumber(totals.actualFenceHeightMm / 1000, 3),
        ],
        [
            "Фактическая высота столбов, м",
            formatNumber(totals.actualColumnHeightMm / 1000, 3),
        ],
        [
            "Полных поддонов",
            formatNumber(totals.totalFullPallets),
        ],
    ];
});

function clearCalculation() {
    projectSolution.value = null;
    calculationError.value = "";
    activeSideIndex.value = 0;
}

function showSolution(solution) {
    calculationError.value = "";
    activeSideIndex.value = 0;
    projectSolution.value = solution;

    nextTick(() => {
        if (resultsGroup.value) {
            resultsGroup.value.open = true;
        }
    });
}

function showCalculationError(message) {
    projectSolution.value = null;
    calculationError.value = message;
}

async function handleDownloadPdf() {
    if (!projectSolution.value || pdfLoading.value) {
        return;
    }

    pdfLoading.value = true;
    pdfError.value = "";

    try {
        // Передаём готовый расчёт в функцию создания PDF.
        await createPdf(projectSolution.value);
    } catch (error) {
        console.error(error);

        pdfError.value = error instanceof Error
            ? error.message
            : "Не удалось создать PDF";
    } finally {
        pdfLoading.value = false;
    }
}

</script>

<template>
    <ComHeader />

    <main class="fence-calculator">
        <div class="calculator-container">
            <h1 class="calculator-title">Калькулятор забора</h1>
            <p class="calculator-description">
                Укажите длины сторон, размеры конструкции и выберите материалы.
            </p>

            <div class="calculator-content">
                <FenceCalculatorForm
                    @calculation-started="clearCalculation"
                    @calculated="showSolution"
                    @calculation-error="showCalculationError"
                />

                <section
                    v-if="calculationError"
                    class="calculation-error"
                    role="alert"
                >
                    <h2>Ошибка расчёта</h2>
                    <p>{{ calculationError }}</p>
                </section>

                <details
                    v-else-if="projectSolution"
                    ref="resultsGroup"
                    class="calculator-card calculator-group"
                    aria-labelledby="calculator-results-title"
                    open
                >
                    <summary class="calculator-card-header">
                        <h2 id="calculator-results-title">Результат расчёта</h2>
                        <span class="calculator-group-meta">
                            <span class="calculator-caption">
                                Сторон: {{ projectSolution.totals.sidesCount }}
                                · {{ formatNumber(projectSolution.totals.totalLengthMm / 1000, 3) }} м
                            </span>
                            <span class="calculator-group-chevron" aria-hidden="true"></span>
                        </span>
                    </summary>

                    <div class="calculator-columns">
                        <section
                            class="calculator-column"
                            aria-labelledby="calculator-total-title"
                        >
                            <h3
                                id="calculator-total-title"
                                class="calculator-column-title"
                            >
                                Общий итог
                            </h3>

                            <dl class="calculator-list">
                                <div
                                    v-for="[label, value] in summaryRows"
                                    :key="label"
                                    class="calculator-row"
                                >
                                    <dt>{{ label }}</dt>
                                    <dd>{{ value }}</dd>
                                </div>

                                <div class="calculator-row">
                                    <dt>Общая масса</dt>
                                    <dd>
                                        {{ formatNumber(projectSolution.totals.totalMass, 1) }} кг
                                    </dd>
                                </div>
                            </dl>

                            <details class="calculator-accordion">
                                <summary>Все материалы</summary>
                                <div class="calculator-accordion-content">
                                    <dl class="calculator-list">
                                        <div
                                            v-for="item in projectSolution.materials"
                                            :key="item.key"
                                            class="calculator-row"
                                        >
                                            <dt>{{ item.label }}</dt>
                                            <dd>{{ item.count }} шт.</dd>
                                        </div>
                                    </dl>
                                    <p class="calculator-note">
                                        Указаны целые изделия к покупке, включая
                                        изделия для подрезки. Подрезку выполняет покупатель.
                                    </p>
                                </div>
                            </details>

                            <div class="calculator-price">
                                <span>Стоимость всех материалов</span>
                                <strong>
                                    {{ formatNumber(projectSolution.totals.totalPrice) }} ₽
                                </strong>
                            </div>

                            <div v-if="projectSolution" style="margin-top: 16px;">
                                <button
                                    class="calculate-button"
                                    type="button"
                                    :disabled="pdfLoading"
                                    @click="handleDownloadPdf"
                                >
                                    {{ pdfLoading ? "Создание PDF…" : "Скачать PDF" }}
                                </button>

                                <p v-if="pdfError" role="alert">
                                    {{ pdfError }}
                                </p>
                            </div>

                            <details
                                class="calculator-accordion pallet-remainders"
                            >
                                <summary>
                                    <span class="calculator-summary-text">
                                        <span>Изделия вне полных поддонов</span>
                                        <small v-if="projectSolution.palletPlan.totalUnpackedItems > 0">
                                            {{ formatNumber(projectSolution.palletPlan.totalUnpackedItems) }} шт.
                                            · комплектация по согласованию
                                        </small>
                                        <small v-else>Остатков нет</small>
                                    </span>
                                </summary>

                                <div class="calculator-accordion-content">
                                    <template v-if="projectSolution.palletPlan.unpackedItems.length">
                                        <dl class="calculator-list">
                                            <div
                                                v-for="item in projectSolution.palletPlan.unpackedItems"
                                                :key="item.key"
                                                class="calculator-row pallet-remainder-row"
                                            >
                                                <dt>
                                                    <span class="pallet-product-name">{{ item.name }}</span>
                                                    <span v-if="item.finishName" class="calculator-caption">
                                                        {{ item.finishName }}
                                                    </span>
                                                    <span class="calculator-note">
                                                        {{ item.palletQuantityNeedsConfirmation
                                                            ? "Норма укладки требует уточнения"
                                                            : `Норма укладки: ${formatNumber(item.palletQuantity)} шт./поддон`
                                                        }}
                                                    </span>
                                                </dt>
                                                <dd>{{ formatNumber(item.unpackedCount) }} шт.</dd>
                                            </div>
                                        </dl>

                                        <p class="calculator-note">
                                            Это целые изделия к отгрузке, включая изделия для подрезки.
                                            Оператор согласует их размещение и количество дополнительных поддонов.
                                        </p>
                                    </template>
                                    <p v-else class="calculator-note">
                                        Все изделия распределены по полным поддонам.
                                    </p>
                                </div>
                            </details>
                        </section>

                        <section
                            class="calculator-column"
                            aria-labelledby="calculator-detail-title"
                        >
                            <div class="calculator-column-heading">
                                <h3
                                    id="calculator-detail-title"
                                    class="calculator-column-title"
                                >
                                    Детализация
                                </h3>
                                <span class="calculator-caption" aria-live="polite">
                                    {{ activeSideSolution.sideName }}
                                </span>
                            </div>

                            <div
                                v-if="projectSolution.sideSolutions.length > 1"
                                class="calculator-side-tabs"
                                role="group"
                                aria-label="Выбор стороны для расчёта и схемы"
                            >
                                <button
                                    v-for="(side, index) in projectSolution.sideSolutions"
                                    :key="side.sideId"
                                    type="button"
                                    :aria-pressed="activeSideIndex === index"
                                    aria-controls="calculator-side-result"
                                    @click="activeSideIndex = index"
                                >
                                    {{ side.sideName }}
                                </button>
                            </div>

                            <FenceCalculatorResults
                                id="calculator-side-result"
                                :solution="activeSideSolution"
                            />

                            <p
                                v-if="projectSolution.sideSolutions.length > 1"
                                class="calculator-note calculator-side-note"
                            >
                                В расчёте стороны показаны оба крайних столба.
                                В общем итоге общие угловые столбы учтены один раз.
                            </p>
                        </section>
                    </div>
                </details>

                <FencePreview
                    v-if="activeSideSolution"
                    :key="activeSideSolution.sideId"
                    :solution="activeSideSolution"
                />
            </div>
        </div>
    </main>

    <ComFooter />
</template>
