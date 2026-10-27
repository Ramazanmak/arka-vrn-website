<script setup>
import { computed, ref } from "vue";
import { useHead } from "@unhead/vue";

import { getFenceCalculatorSeo } from "../../seo.js";

import ComHeader from "../common/ComHeader/ComHeader.vue";
import ComFooter from "../common/ComFooter.vue";

import FenceCalculatorForm from
    "../calculator/FenceCalculatorForm.vue";

import FenceCalculatorResults from
    "../calculator/FenceCalculatorResults.vue";

import FencePreview from
    "../calculator/FencePreview.vue";

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
            "Количество столбов без повторов",
            totals.columnsCount,
        ],
        [
            "Количество обычных пролётов",
            totals.fenceSpansCount,
        ],
        [
            "Количество ворот",
            totals.gatesCount,
        ],
        [
            "Фактическая высота полотна, м",
            formatNumber(totals.actualFenceHeightMm / 1000, 3),
        ],
        [
            "Фактическая высота столбов, м",
            formatNumber(totals.actualColumnHeightMm / 1000, 3),
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
}

function showCalculationError(message) {
    projectSolution.value = null;
    calculationError.value = message;
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
                Укажите длины сторон, размеры конструкции
                и выберите материалы.
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
                    aria-live="polite"
                >
                    <h2>Ошибка расчёта</h2>
                    <p>{{ calculationError }}</p>
                </section>

                <div
                    v-else-if="projectSolution"
                    class="project-results"
                >
                    <section class="project-summary">
                        <h2>Итог по всем сторонам</h2>

                        <dl class="project-list">
                            <div
                                v-for="[label, value] in summaryRows"
                                :key="label"
                                class="project-row"
                            >
                                <dt>{{ label }}</dt>
                                <dd>{{ value }}</dd>
                            </div>
                        </dl>

                        <details class="project-materials">
                            <summary>Все материалы</summary>

                            <dl class="project-list">
                                <div
                                    v-for="item in projectSolution.materials"
                                    :key="item.key"
                                    class="project-row"
                                >
                                    <dt>{{ item.label }}</dt>
                                    <dd>{{ item.count }} шт.</dd>
                                </div>
                            </dl>

                            <p class="project-note">
                                Указаны целые изделия к покупке,
                                включая изделия для подрезки.
                            </p>
                        </details>

                        <div class="project-row">
                            <span>Общая масса</span>
                            <strong>
                                {{
                                    formatNumber(
                                        projectSolution.totals.totalMass,
                                        1
                                    )
                                }}
                                кг
                            </strong>
                        </div>

                        <div class="project-row total-price">
                            <span>Стоимость всех материалов</span>
                            <strong>
                                {{
                                    formatNumber(
                                        projectSolution.totals.totalPrice
                                    )
                                }}
                                ₽
                            </strong>
                        </div>
                    </section>

                    <div
                        class="side-tabs"
                        aria-label="Выбор стороны"
                    >
                        <button
                            v-for="(side, index) in projectSolution.sideSolutions"
                            :key="side.sideId"
                            type="button"
                            :class="{
                                active: activeSideIndex === index
                            }"
                            :aria-pressed="activeSideIndex === index"
                            @click="activeSideIndex = index"
                        >
                            {{ side.sideName }}
                        </button>
                    </div>

                    <h2>{{ activeSideSolution.sideName }}</h2>

                    <p class="project-note">
                        В расчёте каждой стороны показаны оба
                        крайних столба. В общем итоге общие
                        угловые столбы учтены один раз.
                    </p>

                    <FenceCalculatorResults
                        :solution="activeSideSolution"
                    />
                </div>
            </div>

            <FencePreview
                v-if="activeSideSolution"
                :key="activeSideSolution.sideId"
                :solution="activeSideSolution"
            />
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

.calculation-error {
    padding: 24px;
    border: 1px solid #b42318;
    border-radius: 14px;
    background-color: white;
    color: #b42318;
}

.calculation-error h2 {
    margin-top: 0;
}

.project-results {
    display: grid;
    gap: 16px;
    min-width: 0;
}

.project-results > h2 {
    margin: 0;
}

.project-summary {
    padding: 24px;
    border: 1px solid var(--global-600);
    border-radius: 14px;
    background: white;
}

.project-summary h2 {
    margin-top: 0;
}

.project-list {
    margin: 0;
}

.project-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--global-500);
}

.project-row dd {
    margin: 0;
    text-align: right;
    font-weight: 600;
    flex-shrink: 0;
}

.project-materials {
    margin: 12px 0;
    padding: 16px;
    border: 1px solid var(--global-500);
    border-radius: 10px;
}

.project-materials summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--second-main-color);
}

.project-materials[open] .project-list {
    margin-top: 12px;
}

.project-note {
    margin: 0;
    color: var(--global-700);
    font-size: 0.88rem;
    line-height: 1.5;
}

.project-materials .project-note {
    margin-top: 12px;
}

.total-price {
    margin-top: 12px;
    padding: 16px;
    border: none;
    border-radius: 8px;
    background: var(--second-main-color);
    color: white;
}

.total-price span,
.total-price strong {
    color: white;
}

.side-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.side-tabs button {
    padding: 10px 14px;
    border: 1px solid var(--second-main-color);
    border-radius: 8px;
    background: white;
    color: var(--second-main-color);
    font: inherit;
    cursor: pointer;
}

.side-tabs button.active {
    background: var(--second-main-color);
    color: white;
}

@media (min-width: 900px) {
    .calculator-content {
        grid-template-columns:
            minmax(360px, 1fr)
            minmax(360px, 1fr);
        align-items: start;
    }
}

@media (max-width: 600px) {
    .calculation-error,
    .project-summary {
        padding: 18px;
    }
}
</style>