<template>
    <div class="container px-4 py-6 md:py-12 text-left text-sm md:text-base xl:w-10/12 mx-auto">
      <section class="text-white lg:w-3/4">
        <h2 class="font-semibold text-xl md:text-2xl mb-2 uppercase">About</h2>
        <p class="font-semibold">{{ $t('about.headline') }}</p>
        <hr class="my-4">
        <p class="mt-2 leading-6 md:leading-7">{{ $t('about.paragraph1') }}</p>
        <p class="mt-2 leading-6 md:leading-7">{{ $t('about.paragraph2') }}</p>
      </section>
      <div class="w-full mt-8 mb-2 flex justify-between">
          <button class="transition hover:text-yellow-500 py-3 px-0 rounded-lg text-white font-semibold uppercase" @click="$router.back()"> <font-awesome-icon :icon="['fas', 'chevron-left']" class="mr-2" />{{ $t('general.back') }}</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>