
<template>
    <input class="hidden" type="checkbox" name="btn-toggle" id="btn-toggle">
    <div class="toggle-icon rounded flex items-center h-100% hover:bg-slate-2">
        <label for="btn-toggle" class=" flex items-center">
            <div class="i-mdi-menu-left text-2xl toggle-left" />
            <div class="i-mdi-menu-right text-2xl toggle-right" />
        </label>
    </div>

    <div class="position-fixed border border-1 rounded h-100% flex flex-col py-5 px-3 text-dark sidebar-wrapper">
        <div class="border-b my-3">
            <NuxtLink to="/user" class="decoration-none text-dark flex items-center p-3">
                <div class="i-mdi-account-circle text-2xl" />
            </NuxtLink>
        </div>
        <div class="position-relative my-2">
            <NuxtLink to="/" class="decoration-none text-dark flex items-center p-3 rounded sidebar-btn">
                <div class="i-mdi-clipboard-clock-outline text-2xl" />
            </NuxtLink>
            <div class="position-absolute whitespace-nowrap sidebar-label rounded p-2">punch card</div>
        </div>
        <div class="position-relative my-2">
            <NuxtLink to="/attend" class="decoration-none text-dark flex items-center p-3 rounded sidebar-btn">
                <div class="i-mdi-clipboard-check-outline text-2xl" />
            </NuxtLink>
            <div class="position-absolute whitespace-nowrap sidebar-label rounded p-2">attendace</div>
        </div>
        <div class="position-relative my-2">
            <NuxtLink to="/leave" class="decoration-none text-dark flex items-center p-3 rounded sidebar-btn">
                <div class="i-mdi-calendar-edit text-2xl" />
            </NuxtLink>
            <div class="position-absolute whitespace-nowrap sidebar-label rounded p-2">leaves</div>
        </div>
    </div>
</template>

<style scoped src="/assets/css/sider.css">
/* scoped 之樣式只限定於此元件，與其他元件內使用 class 名稱相同也不會產生衝突 */
</style>