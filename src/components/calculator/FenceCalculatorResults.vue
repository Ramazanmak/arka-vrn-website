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


</script>


<template>
    <div class="side-calculation">
        <details class="calculator-accordion">
            <summary>
                <span class="calculator-summary-text">
                    <span>Параметры стороны</span>
                    <small>
                        Пролётов: {{ solution.fenceSpansCount }}
                        · длина пролёта {{ formatMeters(solution.spansLength) }} м
                    </small>
                </span>
            </summary>

            <div class="calculator-accordion-content">
                <dl class="calculator-list">
                    <div class="calculator-row">
                        <dt>Фактическая высота пролёта</dt>
                        <dd>{{ formatMeters(solution.actualFenceHeightMm) }} м</dd>
                    </div>
                    <div class="calculator-row">
                        <dt>Фактическая высота столбов</dt>
                        <dd>{{ formatMeters(solution.actualColumnHeightMm) }} м</dd>
                    </div>
                    <div class="calculator-row">
                        <dt>Количество столбов</dt>
                        <dd>{{ solution.columnsCount }}</dd>
                    </div>
                    <div class="calculator-row">
                        <dt>Количество пролётов</dt>
                        <dd>{{ solution.fenceSpansCount }}</dd>
                    </div>
                    <div class="calculator-row">
                        <dt>Длина одного пролёта</dt>
                        <dd>{{ formatMeters(solution.spansLength) }} м</dd>
                    </div>
                    <div class="calculator-row">
                        <dt>Количество проёмов</dt>
                        <dd>{{ gatesLength.length }}</dd>
                    </div>
                    <div
                        v-for="(gateLength, index) in gatesLength"
                        :key="index"
                        class="calculator-row"
                    >
                        <dt>Длина проёма №{{ index + 1 }}</dt>
                        <dd>{{ formatMeters(gateLength) }} м</dd>
                    </div>
                </dl>
            </div>
        </details>

        <details class="calculator-accordion">
            <summary>Количество материалов</summary>
            <div class="calculator-accordion-content">
                <dl class="calculator-list">
                    <div
                        v-for="row in materialCountRows"
                        :key="row.id"
                        class="calculator-row"
                    >
                        <dt>{{ row.label }}</dt>
                        <dd>{{ row.value }} шт.</dd>
                    </div>
                </dl>
                <p class="calculator-note">
                    Изделия под подрезку поставляются целыми.
                    Подрезку выполняет покупатель.
                </p>
            </div>
        </details>

        <details class="calculator-accordion">
            <summary>Информация о подрезке</summary>
            <div class="calculator-accordion-content">
                <section
                    v-for="group in cutGroups"
                    :key="group.id"
                    class="cut-result"
                >
                    <h4>{{ group.title }}</h4>
                    <dl v-if="group.cuts > 0" class="calculator-list">
                        <div class="calculator-row">
                            <dt>Количество подрезок {{ group.scope }}</dt>
                            <dd>{{ group.cuts }}</dd>
                        </div>
                        <div class="calculator-row">
                            <dt>Длина подрезанного изделия</dt>
                            <dd>{{ formatNumber(group.length, 1) }} мм</dd>
                        </div>
                    </dl>
                    <p v-else class="calculator-note">
                        Подрезка не требуется.
                    </p>
                </section>
            </div>
        </details>


    </div>
</template>
