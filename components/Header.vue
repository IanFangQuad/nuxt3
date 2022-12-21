<template>
  <div class="flex justify-between items-center mt-0">
    <h2 class="h3 flex items-center mx-6">{{ props.title }}</h2>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String,
})

</script>
