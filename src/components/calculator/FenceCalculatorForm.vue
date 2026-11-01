<script setup>
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";

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

const geometryPanel = ref(null);
const closingAnimations = new Map();

const totalLengthMeters = computed(() => {
    return form.sides.reduce((total, side) => {
        const length = Number(side.lengthMeters);
        return total + (Number.isFinite(length) ? length : 0);
    }, 0);
});

function formatMeters(value) {
    if (value === "" || !Number.isFinite(Number(value))) {
        return "—";
    }

    return Number(value).toLocaleString("ru-RU", {
        maximumFractionDigits: 3,
    });
}

function getSideSummary(side) {
    const openings = Number(side.gatesCount) === 0
        ? "без проёмов"
        : `проёмов: ${side.gatesCount || "—"}`;

    return `${formatMeters(side.lengthMeters)} м · ${openings}`;
}

function getMaterialGroupSummary(group) {
    const selected = group.items.flatMap((item) => {
        const selection = form.materials[item.key];
        const product = item.catalog.find(
            (entry) => entry.id === selection.productId
        );

        return product ? [{ item, product }] : [];
    });

    if (selected.length === 0) {
        return "Не используются";
    }

    return selected.map(({ item, product }) => {
        if (item.key === "columnBlock") {
            return `Столбовой ${product.lengthMm} × ${product.widthMm} мм`;
        }

        if (item.key === "fenceBlock") {
            return `Рядовой ${product.lengthMm} × ${product.widthMm} мм`;
        }

        return item.label;
    }).join(" · ");
}

function revealInvalidField(event) {
    let section = event.target.closest("details");

    while (section) {
        section.open = true;
        section = section.parentElement?.closest("details");
    }
}

function closeGeometrySections() {
    const panel = geometryPanel.value;

    if (!panel) {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    for (const section of panel.querySelectorAll("details[open]")) {
        if (closingAnimations.has(section)) {
            continue;
        }

        const summary = section.querySelector("summary");

        if (!summary || reduceMotion || typeof section.animate !== "function") {
            section.open = false;
            continue;
        }

        const previousOverflow = section.style.overflow;
        const previousPointerEvents = section.style.pointerEvents;
        const style = getComputedStyle(section);
        const closedHeight = summary.getBoundingClientRect().height
            + (parseFloat(style.borderTopWidth) || 0)
            + (parseFloat(style.borderBottomWidth) || 0);

        section.style.overflow = "hidden";
        section.style.pointerEvents = "none";

        const animation = section.animate(
            [
                { height: `${section.getBoundingClientRect().height}px` },
                { height: `${closedHeight}px` },
            ],
            { duration: 250, easing: "ease-in-out", fill: "forwards" }
        );

        const cleanup = () => {
            animation.cancel();
            section.style.overflow = previousOverflow;
            section.style.pointerEvents = previousPointerEvents;
            closingAnimations.delete(section);
        };

        closingAnimations.set(section, cleanup);

        animation.finished.then(() => {
            section.open = false;
            cleanup();
        }, cleanup);
    }
}

onBeforeUnmount(() => {
    for (const cleanup of closingAnimations.values()) {
        cleanup();
    }
});

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
        closeGeometrySections();
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
        class="calculator-card calculator-form"
        aria-labelledby="calculator-form-title"
        @submit.prevent="handleSubmit"
        @invalid.capture="revealInvalidField"
    >
        <details class="calculator-group" open>
            <summary class="calculator-card-header">
                <h2 id="calculator-form-title">Параметры расчёта</h2>
                <span class="calculator-group-meta">
                    <span class="calculator-caption">
                        Сторон: {{ form.sides.length }}
                        · {{ formatMeters(totalLengthMeters) }} м
                    </span>
                    <span class="calculator-group-chevron" aria-hidden="true"></span>
                </span>
            </summary>

            <div class="calculator-columns">
                <section
                    ref="geometryPanel"
                    class="calculator-column"
                    aria-labelledby="calculator-geometry-title"
                >
                    <h3
                        id="calculator-geometry-title"
                        class="calculator-column-title"
                    >
                        Конструкция и стороны
                    </h3>

                    <details class="calculator-accordion">
                        <summary>
                            <span class="calculator-summary-text">
                                <span>Размеры и конструкция</span>
                                <small>
                                    Пролёт {{ formatMeters(form.heightFenceMeters) }} м
                                    · столбы {{ formatMeters(form.heightColumnMeters) }} м
                                </small>
                            </span>
                        </summary>

                        <div class="calculator-accordion-content">
                            <label class="form-field">
                                <span>Высота пролёта, м</span>
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
                                <span>Длина пролёта, м</span>
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

                            <p class="calculator-note">
                                Стороны вводятся последовательно. Соседние стороны
                                имеют общий угловой столб. Для замкнутого контура
                                последняя сторона соединяется с первой.
                            </p>
                        </div>
                    </details>

                    <details
                        v-for="side in form.sides"
                        :key="side.id"
                        class="calculator-accordion"
                    >
                        <summary>
                            <span class="calculator-summary-text">
                                <span>{{ side.name }}</span>
                                <small>{{ getSideSummary(side) }}</small>
                            </span>
                        </summary>

                        <div class="calculator-accordion-content">
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
                                <span>Количество проёмов</span>
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
                                <span>Длина проёма №{{ index + 1 }}, м</span>
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

                <section
                    class="calculator-column"
                    aria-labelledby="calculator-materials-title"
                >
                    <h3
                        id="calculator-materials-title"
                        class="calculator-column-title"
                    >
                        Материалы
                    </h3>

                    <details
                        v-for="group in materialGroups"
                        :key="group.title"
                        class="calculator-accordion"
                    >
                        <summary>
                            <span class="calculator-summary-text">
                                <span>{{ group.title }}</span>
                                <small>{{ getMaterialGroupSummary(group) }}</small>
                            </span>
                        </summary>

                        <div class="calculator-accordion-content">
                            <MaterialSelector
                                v-for="material in group.items"
                                :key="material.key"
                                v-model="form.materials[material.key]"
                                :material="material"
                            />
                        </div>
                    </details>
                </section>
            </div>

            <footer class="calculator-form-footer">
                <span class="calculator-caption">
                    Сторон: {{ form.sides.length }}
                    · общая длина {{ formatMeters(totalLengthMeters) }} м
                </span>
                <button class="calculate-button" type="submit">
                    Рассчитать
                </button>
            </footer>
        </details>
    </form>
</template>
