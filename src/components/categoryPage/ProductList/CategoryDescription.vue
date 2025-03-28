<script setup>

const descriptionObject = defineProps({
    description:{
        type:String,
        default:"Описания пока что нет :(",
    }
})

</script>

<template>
    <div class="category__description">
        <p class="category__description-text">
            {{ descriptionObject.description }}
        </p>
    </div>
</template>

<style scoped>
    .product-list__description{
        font-size:20px;
        line-height: 1.5em;
    }
</style>