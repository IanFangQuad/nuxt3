<template>
  <div class="bg-white py-24">
    <div class="flex flex-col items-center">
      <h1 class="text-8xl font-semibold text-red-500">404</h1>
      <p class="my-8 text-3xl text-gray-800">Not Found</p>
      <p class="mt-8 text-3xl text-gray-600">匹配到的 Params:</p>
      <p class="my-4 text-5xl font-semibold text-violet-500">{{ $route.params.slug }}</p>
      <p class="my-8 text-xl text-gray-800">真的是找不到這個頁面啦</p>
    </div>
  </div>
</template>
