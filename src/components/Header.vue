<template>
    <header class="w-full h-16 md:h-20 bg-gradient-to-b from-red-700 to-red-600 z-10 shadow-md flex">
        <section class="container mx-auto h-full px-1 md:px-4 xl:w-10/12 flex">
            <router-link to="/" tag="h1" class="text-xl md:text-3xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
              TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
            </router-link>
        </section>
        
    </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>