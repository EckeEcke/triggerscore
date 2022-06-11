<template>
    <div class="container px-4 py-6 md:py-12 text-left text-sm md:text-base xl:w-10/12 mx-auto">
      <section class="text-white lg:w-3/4">
        <h2 class="font-semibold text-xl md:text-2xl mb-2 uppercase">About</h2>
        <p class="font-semibold">{{ $t('about.headline') }}</p>
        <hr class="my-4">
        <p class="mt-2">{{ $t('about.paragraph1') }}</p>
        <p class="mt-2">{{ $t('about.paragraph2') }}</p>
      </section>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>