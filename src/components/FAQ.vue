<template>

<div class="container text-white py-6 px-4 md:py-12 xl:w-10/12 text-left text-sm md:text-base mx-auto md:rounded-lg">
        <h2 class="font-semibold text-xl md:text-2xl mb-2">{{ $t('faq.headline') }}</h2>
        <hr class="my-4">
        <section class="mt-4 lg:w-3/4 leading-7">
            <p class="mb-2"><b>{{ $t('faq.question1') }}</b></p>
            <p>{{ $t('faq.answer1') }}</p>
        </section>
        <section class="mt-4 lg:w-3/4 leading-7">
            <p class="mb-2"><b>{{ $t('faq.question2') }}</b></p>
            <p>{{ $t('faq.answer2') }}</p>
        </section>
        <section class="mt-4 lg:w-3/4 leading-7">
            <p class="mb-2"><b>{{ $t('faq.question3') }}</b></p>
            <p>{{ $t('faq.answer3') }}</p>
        </section>
        <section class="mt-4 lg:w-3/4 leading-7">
            <p class="mb-2"><b>{{ $t('faq.question4') }}</b></p>
            <p>{{ $t('faq.answer4') }}</p>
        </section>
        <div class="w-full my-8 flex justify-between px-4 md:px-0">
            <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase" @click="$router.back()"> <font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ $t('general.back') }}</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FAQ'
}
</script>