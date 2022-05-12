<template>
    <footer class="w-full h-72 lg:h-64 py-2
    bg-red-800 shadow-md">
      <section class="container mx-auto h-full px-1 md:px-4 xl:w-10/12 flex flex-col md:flex-row justify-around md:justify-between">
        
        <div class="self-center my-2 w-full md:w-auto">
          <h2 class="text-2xl font-extrabold text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE</h2>
        <div class="flex text-white my-4 justify-center lg:justify-start">
          <RouterLink to="/about" class="border-r border-white px-4 lg:pl-0">{{ $t('header.about') }}</RouterLink>
          <RouterLink to="/faq" class="border-r border-white px-4">{{ $t('header.faq') }}</RouterLink>
          <RouterLink to="/contact" class="px-4">{{ $t('header.contact') }}</RouterLink>
        </div>
        <article class="mx-auto text-white w-96 max-w-full text-center lg:text-left text-xs">
            {{ $t('general.slogan') }}
        </article>
        </div>
        <div class="self-center grid my-2 px-2 grid-cols-3 lg:grid-cols-3 gap-4">
          <img class="w-10 lg:w-16 mx-auto" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg">
          <img class="w-14 lg:w-24 mx-auto" src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg">
          <img class="w-6 lg:w-10 mx-auto" src="../assets/images/vue.svg">
          <img class="w-8 lg:w-12 mx-auto" src="../assets/images/tailwind.svg">
          <img class="w-10 lg:w-16 mx-auto" src="../assets/images/node-logo.svg">
          <img class="w-10 lg:w-16 mx-auto" src="../assets/images/mysql-logo.svg">

        </div>
        
      </section>
    </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>