<script setup>
import { computed } from "vue";

import {
    getAvailableFinishes,
    hasCompleteDimensions,
} from "../../calculator/blocksCatalog.js";


const props = defineProps({
    material: {
        type: Object,
        required: true,
    },

    modelValue: {
        type: Object,
        required: true,
    },
});


const emit = defineEmits([
    "update:modelValue",
]);


/*
 * Выбранное изделие из каталога.
 */
const selectedProduct = computed(() => {
    if (!props.modelValue.productId) {
        return null;
    }

    return props.material.catalog.find(
        (product) => {
            return product.id
                === props.modelValue.productId;
        }
    ) ?? null;
});


/*
 * Доступные исполнения выбранного изделия.
 */
const availableFinishes = computed(() => {
    return getAvailableFinishes(
        selectedProduct.value
    );
});


/*
 * Значение первого select.
 *
 * При выборе другого изделия дополнительно
 * проверяем, доступно ли старое исполнение.
 */
const productId = computed({
    get() {
        return props.modelValue.productId;
    },

    set(value) {
        const product =
            props.material.catalog.find(
                (item) => item.id === value
            ) ?? null;

        const finishes =
            getAvailableFinishes(product);

        const currentFinishIsAvailable =
            finishes.some((finish) => {
                return finish.id
                    === props.modelValue.finishId;
            });

        emit("update:modelValue", {
            productId: value,

            finishId:
                !value
                    ? props.modelValue.finishId
                    : currentFinishIsAvailable
                        ? props.modelValue.finishId
                        : finishes[0]?.id ?? null,
        });
    },
});


/*
 * Значение select с исполнением.
 */
const finishId = computed({
    get() {
        return props.modelValue.finishId;
    },

    set(value) {
        emit("update:modelValue", {
            ...props.modelValue,
            finishId: value,
        });
    },
});
</script>


<template>
    <div class="material-card">
        <label class="form-field">
            <span>
                {{ material.label }}
            </span>

            <select
                v-model="productId"
                :required="material.required"
            >
                <option
                    v-if="!material.required"
                    :value="null"
                >
                    {{
                        material.emptyLabel
                            ?? "Не использовать"
                    }}
                </option>

                <option
                    v-for="product in material.catalog"
                    :key="product.id"
                    :value="product.id"
                    :disabled="
                        !hasCompleteDimensions(product)
                    "
                >
                    {{ product.name }}

                    {{
                        hasCompleteDimensions(product)
                            ? ""
                            : " — размеры требуют уточнения"
                    }}
                </option>
            </select>
        </label>

        <label
            v-if="productId"
            class="form-field"
        >
            <span>
                Исполнение
            </span>

            <select
                v-model="finishId"
                required
            >
                <option
                    v-for="finish in availableFinishes"
                    :key="finish.id"
                    :value="finish.id"
                >
                    {{ finish.name }}
                </option>
            </select>
        </label>

        <p
            v-if="selectedProduct?.note"
            class="material-note"
        >
            {{ selectedProduct.note }}
        </p>
    </div>
</template>


<style scoped>
.material-card {
    display: grid;
    gap: 14px;
    padding: 16px;
    border: 1px solid var(--global-500);
    border-radius: 9px;
    background-color: #fafafa;
}

.form-field {
    display: grid;
    gap: 8px;
}

.form-field span {
    font-weight: 500;
}

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

.form-field select:focus {
    border-color: var(--second-main-color);
    outline: 2px solid
        var(--second-main-color-pale);
}

.material-note {
    margin: 0;
    color: var(--global-700);
    font-size: 0.88rem;
    line-height: 1.4;
}
</style>