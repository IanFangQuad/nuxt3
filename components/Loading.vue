<template>
    <div id=""
        class="z-10 bg-dark-50 bg-op-40 w-100vw h-120% position-absolute top-0 left-0 justify-center items-center"
        :class="{ flex: props.show, hidden: !props.show }">
        <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<style scoped src="/assets/css/loading.css">
/* scoped 之樣式只限定於此元件，與其他元件內使用 class 名稱相同也不會產生衝突 */
</style>

<script setup lang="ts">
const props = defineProps({
    show: Boolean,
})
</script>