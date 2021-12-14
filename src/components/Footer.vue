<template>
    <footer class="w-full h-48 py-2
    bg-gradient-to-b from-red-600 to-red-700 absolute bottom-0 shadow-md">
      <section class="container mx-auto h-full px-1 md:px-4 xl:w-10/12 flex flex-col md:flex-row justify-between">
        
        <div class="self-center my-2 w-full md:w-auto">
          <h2 class="self-center font-extrabold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE</h2>
          <article class="text-white w-96 max-w-full text-center md:text-left text-xs">
            <i>"Eine neue Art alte Filme zu schauen."</i> Triggerscore ist ein Bewertungsportal für Filme, bei dem User bewerten können, wie sehr alte Filme Zuschauer*innen von heute triggern.
          </article>
        </div>
        <div class="self-center my-2 flex justify-center">
          <img class="w-12 md:w-16 mx-4" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg">
          <img class="w-12 md:w-16 mx-4" src="../assets/images/vue.svg">
          <img class="w-12 md:w-16 mx-4" src="../assets/images/tailwind.svg">
        </div>
        
      </section>
    </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>