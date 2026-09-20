<script setup>
import {
    computed,
    nextTick,
    ref,
    watch,
} from "vue";

import {
    createFenceSvg,
    getDrawingLegend,
} from "../../calculator/graphics.js";


/*
 * Сколько метров забора показываем
 * в окне по умолчанию.
 */
const DEFAULT_VISIBLE_LENGTH_METERS = 20;

/*
 * Минимальный участок при увеличении.
 */
const MIN_VISIBLE_LENGTH_METERS = 10;

/*
 * Шаг кнопок масштабирования.
 */
const ZOOM_STEP_METERS = 5;


const props = defineProps({
    solution: {
        type: Object,
        required: true,
    },
});


const scrollContainer = ref(null);

const visibleLengthMeters = ref(
    DEFAULT_VISIBLE_LENGTH_METERS
);


const fenceSvg = computed(() => {
    return createFenceSvg(
        props.solution
    );
});


const legendItems = computed(() => {
    return getDrawingLegend(
        props.solution
    );
});


/*
 * Общая длина забора в метрах.
 */
const totalLengthMeters = computed(() => {
    const lengthMillimeters =
        Number(
            props.solution
                ?.fenceParams
                ?.lengthFront
        );

    if (
        !Number.isFinite(lengthMillimeters)
        || lengthMillimeters <= 0
    ) {
        return 0;
    }

    return lengthMillimeters / 1000;
});


/*
 * Минимально возможное значение масштаба.
 *
 * Если весь забор короче 10 метров,
 * минимальным значением будет его длина.
 */
const minimumVisibleLengthMeters =
    computed(() => {
        if (totalLengthMeters.value <= 0) {
            return MIN_VISIBLE_LENGTH_METERS;
        }

        return Math.min(
            MIN_VISIBLE_LENGTH_METERS,
            totalLengthMeters.value
        );
    });


/*
 * Насколько внутренний SVG должен быть
 * шире видимой области.
 *
 * Пример:
 *
 * весь забор — 25 м;
 * показываем в окне — 20 м;
 *
 * ширина SVG:
 * 25 / 20 × 100% = 125%.
 */
const drawingWidthPercent = computed(() => {
    const total =
        totalLengthMeters.value;

    const visible =
        visibleLengthMeters.value;

    if (
        total <= 0
        || visible <= 0
    ) {
        return 100;
    }

    return Math.max(
        100,
        total / visible * 100
    );
});


const canZoomIn = computed(() => {
    return (
        visibleLengthMeters.value
        > minimumVisibleLengthMeters.value
    );
});


const canZoomOut = computed(() => {
    return (
        visibleLengthMeters.value
        < totalLengthMeters.value
    );
});


/*
 * При новом расчёте возвращаемся
 * к масштабу 20 метров.
 */
watch(
    totalLengthMeters,

    (totalLength) => {
        if (totalLength <= 0) {
            visibleLengthMeters.value =
                DEFAULT_VISIBLE_LENGTH_METERS;

            return;
        }

        visibleLengthMeters.value =
            Math.min(
                DEFAULT_VISIBLE_LENGTH_METERS,
                totalLength
            );

        resetScroll();
    },

    {
        immediate: true,
    }
);


function zoomIn() {
    visibleLengthMeters.value =
        Math.max(
            minimumVisibleLengthMeters.value,

            visibleLengthMeters.value
                - ZOOM_STEP_METERS
        );
}


function zoomOut() {
    visibleLengthMeters.value =
        Math.min(
            totalLengthMeters.value,

            visibleLengthMeters.value
                + ZOOM_STEP_METERS
        );
}


function showWholeFence() {
    visibleLengthMeters.value =
        totalLengthMeters.value;

    resetScroll();
}


function resetScroll() {
    nextTick(() => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollLeft = 0;
        }
    });
}


function formatMeters(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return number.toLocaleString(
        "ru-RU",
        {
            maximumFractionDigits: 1,
        }
    );
}
</script>


<template>
    <section
        v-if="fenceSvg"
        class="fence-preview"
    >
        <div class="fence-preview-header">
            <div>
                <h2>
                    Схема забора
                </h2>

                <p>
                    В окне отображается участок
                    длиной
                    <strong>
                        {{
                            formatMeters(
                                visibleLengthMeters
                            )
                        }}
                        м
                    </strong>
                </p>
            </div>

            <div
                class="zoom-controls"
                aria-label="Масштаб схемы"
            >
                <button
                    type="button"
                    :disabled="!canZoomOut"
                    title="Уменьшить масштаб"
                    aria-label="Уменьшить масштаб"
                    @click="zoomOut"
                >
                    −
                </button>

                <button
                    type="button"
                    :disabled="!canZoomIn"
                    title="Увеличить масштаб"
                    aria-label="Увеличить масштаб"
                    @click="zoomIn"
                >
                    +
                </button>

                <button
                    type="button"
                    class="show-all-button"
                    :disabled="!canZoomOut"
                    @click="showWholeFence"
                >
                    Весь забор
                </button>
            </div>
        </div>

        <div class="fence-preview-content">
            <div
                ref="scrollContainer"
                class="fence-scroll"
            >
                <div
                    class="fence-svg"
                    :style="{
                        width:
                            `${drawingWidthPercent}%`,
                    }"
                    v-html="fenceSvg"
                ></div>
            </div>

            <aside
                v-if="legendItems.length"
                class="fence-legend"
                aria-label="Условные обозначения"
            >
                <h3>
                    Обозначения
                </h3>

                <ul>
                    <li
                        v-for="item in legendItems"
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
</template>


<style scoped>
.fence-preview {
    margin-top: 30px;
    padding: 24px;
    border: 1px solid var(--global-600);
    border-radius: 14px;
    background-color: white;
}

.fence-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 20px;
}

.fence-preview-header h2 {
    margin: 0;
}

.fence-preview-header p {
    margin: 8px 0 0;
    color: var(--global-700);
    font-size: 0.9rem;
}

.zoom-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.zoom-controls button {
    min-width: 42px;
    min-height: 42px;
    padding: 8px 12px;

    border:
        1px solid var(--global-600);
    border-radius: 8px;

    background-color: white;
    color: inherit;

    font: inherit;
    font-size: 1.15rem;
    font-weight: 600;

    cursor: pointer;

    transition:
        border-color var(--duration),
        background-color var(--duration),
        color var(--duration);
}

.zoom-controls button:hover:not(:disabled) {
    border-color:
        var(--second-main-color);

    background-color:
        var(--second-main-color);

    color: white;
}

.zoom-controls button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
}

.zoom-controls .show-all-button {
    font-size: 0.9rem;
    font-weight: 500;
}

.fence-preview-content {
    display: grid;
    gap: 20px;
}

/*
 * Область, внутри которой прокручивается SVG.
 */
.fence-scroll {
    box-sizing: border-box;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 0 12px;

    scrollbar-color:
        var(--second-main-color)
        var(--global-500);

    scrollbar-width: thin;
}

.fence-scroll::-webkit-scrollbar {
    height: 10px;
}

.fence-scroll::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: var(--global-500);
}

.fence-scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color:
        var(--second-main-color);
}

/*
 * Ширина задаётся вычисляемым style.
 */
.fence-svg {
    min-width: 100%;
}

.fence-svg :deep(svg) {
    display: block;
    width: 100%;
    height: auto;
}

.fence-legend {
    display: grid;
    grid-template-columns:
        auto minmax(0, 1fr);
    align-items: start;
    gap: 12px 24px;

    padding: 14px 16px;
    border: 1px solid var(--global-500);
    border-radius: 10px;
    background-color: #fafafa;
}

.fence-legend h3 {
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
}

.fence-legend ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 22px;

    margin: 0;
    padding: 0;
    list-style: none;
}

.fence-legend li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.92rem;
}

.legend-sample {
    box-sizing: border-box;
    width: 30px;
    height: 15px;
    flex-shrink: 0;

    border: 2px solid;
    border-radius: 3px;
    background-color: #d1d5db;
}

.legend-sample-dashed {
    border-style: dashed;
}

@media (max-width: 700px) {
    .fence-preview {
        padding: 18px;
    }

    .fence-preview-header {
        flex-direction: column;
        gap: 14px;
    }

    .zoom-controls {
        width: 100%;
    }

    .zoom-controls .show-all-button {
        flex-grow: 1;
    }

    .fence-legend {
        grid-template-columns: 1fr;
    }
}
</style>