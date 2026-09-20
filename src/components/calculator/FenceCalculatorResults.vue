<script setup>
import { computed } from "vue";


const props = defineProps({
    solution: {
        type: Object,
        required: true,
    },
});


const materialCountRows = computed(() => {
    const solution = props.solution;

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
            value:
                solution.totalFullFenceBlocks,
            visible: Boolean(
                solution.fenceBlock
            ),
        },
        {
            id: "cut-fence-blocks",
            label:
                "Рядовые блоки под подрезку",
            value:
                solution.totalCuttedFenceBlocks,
            visible: Boolean(
                solution.fenceBlock
            ),
        },
        {
            id: "column-covers",
            label: "Крышки столбов",
            value:
                solution.totalColumnCoverBlocks,
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
            label: "Парапеты под подрезку",
            value:
                solution
                    .totalCuttedFenceCoverBlocks,
            visible: Boolean(
                solution.fenceCoverBlock
            ),
        },
        {
            id: "column-bases",
            label: "Основания столбов",
            value:
                solution
                    .totalColumnBaseUnderBlocks,
            visible: Boolean(
                solution.columnBaseUnderBlock
            ),
        },
        {
            id: "column-under-caps",
            label: "Подкрышники столбов",
            value:
                solution
                    .totalColumnBaseCapBlocks,
            visible: Boolean(
                solution.columnBaseCapBlock
            ),
        },
        {
            id: "full-fence-bases",
            label:
                "Целые основания пролётов",
            value:
                solution
                    .totalFullFenceBaseUnderBlocks,
            visible: Boolean(
                solution.fenceBaseUnderBlock
            ),
        },
        {
            id: "cut-fence-bases",
            label:
                "Основания пролётов под подрезку",
            value:
                solution
                    .totalCuttedFenceBaseUnderBlocks,
            visible: Boolean(
                solution.fenceBaseUnderBlock
            ),
        },
        {
            id: "full-fence-under-caps",
            label:
                "Целые подкрышники пролётов",
            value:
                solution
                    .totalFullFenceBaseCapBlocks,
            visible: Boolean(
                solution.fenceBaseCapBlock
            ),
        },
        {
            id: "cut-fence-under-caps",
            label:
                "Подкрышники пролётов под подрезку",
            value:
                solution
                    .totalCuttedFenceBaseCapBlocks,
            visible: Boolean(
                solution.fenceBaseCapBlock
            ),
        },
    ].filter((row) => row.visible);
});


const cutGroups = computed(() => {
    const solution = props.solution;

    return [
        {
            id: "fence-block",
            title: "Рядовые блоки",
            cuts: solution.fenceBlocksCuts,
            length:
                solution.cuttedBlockLength,
            scope: "в одном ряду пролёта",
            visible: Boolean(
                solution.fenceBlock
            ),
        },
        {
            id: "parapet",
            title: "Парапеты",
            cuts:
                solution.fenceCoverBlockCuts,
            length:
                solution
                    .fenceCoverBlockCuttedLength,
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


const gatesLength = computed(() => {
    if (
        Array.isArray(
            props.solution.gatesLength
        )
    ) {
        return props.solution.gatesLength;
    }

    return Array.isArray(
        props.solution
            .fenceParams
            ?.gatesLength
    )
        ? props.solution
            .fenceParams
            .gatesLength
        : [];
});


function formatNumber(value, digits = 0) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return number.toLocaleString("ru-RU", {
        maximumFractionDigits: digits,
    });
}


function formatMeters(
    valueInMillimeters
) {
    return formatNumber(
        Number(valueInMillimeters) / 1000,
        3
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
</script>


<template>
    <section class="calculation-result">
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
                            Фактическая высота полотна
                        </span>

                        <strong>
                            {{
                                formatMeters(
                                    solution
                                        .actualFenceHeightMm
                                )
                            }}
                            м
                        </strong>
                    </div>

                    <div class="result-row">
                        <span>
                            Фактическая высота столбов
                        </span>

                        <strong>
                            {{
                                formatMeters(
                                    solution
                                        .actualColumnHeightMm
                                )
                            }}
                            м
                        </strong>
                    </div>

                    <div class="result-row">
                        <span>
                            Общее количество столбов
                        </span>

                        <strong>
                            {{ solution.columnsCount }}
                        </strong>
                    </div>

                    <div class="result-row">
                        <span>
                            Количество пролётов
                        </span>

                        <strong>
                            {{
                                solution
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
                                    solution.spansLength
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
                            {{ gatesLength.length }}
                        </strong>
                    </div>

                    <div
                        v-for="(
                            gateLength,
                            index
                        ) in gatesLength"
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

                    <p class="result-hint">
                        Изделия под подрезку
                        поставляются целыми.
                        Подрезку выполняет покупатель.
                    </p>
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
                                    solution.totalMass,
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
                            Стоимость материалов
                        </span>

                        <strong>
                            {{
                                formatPrice(
                                    solution.totalPrice
                                )
                            }}
                        </strong>
                    </div>
                </div>
            </details>
        </div>
    </section>
</template>


<style scoped>
.calculation-result {
    padding: 24px;
    border: 1px solid var(--global-600);
    border-radius: 14px;
    background-color: white;
}

.calculation-result h2 {
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
    transition:
        background-color var(--duration);
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
    border-bottom:
        1px solid var(--global-500);
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
    border-bottom:
        1px solid var(--global-500);
}

.result-row:last-child {
    border-bottom: none;
}

.result-row strong {
    flex-shrink: 0;
    text-align: right;
}

.result-hint {
    margin: 14px 0 0;
    color: var(--global-700);
    font-size: 0.88rem;
    line-height: 1.45;
}

.cut-result + .cut-result {
    margin-top: 18px;
    padding-top: 18px;
    border-top:
        1px solid var(--global-500);
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
    border-color:
        var(--second-main-color);
}

.result-price {
    margin: 8px 0;
    padding: 16px;
    border: none;
    border-radius: 8px;
    background-color:
        var(--second-main-color);
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

@media (max-width: 600px) {
    .calculation-result {
        padding: 18px;
    }

    .result-group summary {
        padding: 14px 16px;
    }

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