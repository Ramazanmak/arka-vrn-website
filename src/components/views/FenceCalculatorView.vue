<script setup>
import { ref } from "vue";
import { useHead } from "@unhead/vue";

import {
    getFenceCalculatorSeo,
} from "../../seo.js";

import ComHeader from
    "../common/ComHeader/ComHeader.vue";

import ComFooter from
    "../common/ComFooter.vue";

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


const fenceSolution = ref(null);
const calculationError = ref("");


function clearCalculation() {
    fenceSolution.value = null;
    calculationError.value = "";
}


function showSolution(solution) {
    calculationError.value = "";
    fenceSolution.value = solution;
}


function showCalculationError(message) {
    fenceSolution.value = null;
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
                Укажите размеры конструкции,
                выберите изделия и вариант
                их исполнения.
            </p>

            <div class="calculator-content">
                <FenceCalculatorForm
                    @calculation-started="
                        clearCalculation
                    "
                    @calculated="
                        showSolution
                    "
                    @calculation-error="
                        showCalculationError
                    "
                />

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

                <FenceCalculatorResults
                    v-else-if="fenceSolution"
                    :solution="fenceSolution"
                />
            </div>

            <FencePreview
                v-if="fenceSolution"
                :solution="fenceSolution"
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
    background-color:
        var(--main-bg-color);
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

@media (min-width: 900px) {
    .calculator-content {
        grid-template-columns:
            minmax(360px, 1fr)
            minmax(360px, 1fr);
        align-items: start;
    }
}

@media (max-width: 600px) {
    .calculation-error {
        padding: 18px;
    }
}
</style>