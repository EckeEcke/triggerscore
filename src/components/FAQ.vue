<template>
    <div class="container text-white py-6 px-4 md:py-12 xl:w-10/12 text-left text-sm md:text-base mx-auto md:rounded-lg">
        <div class="lg:w-3/4">
            <h2 class="font-semibold text-xl md:text-2xl mb-2">{{ $t('faq.headline') }}</h2>
            <p class="font-semibold">{{ $t('faq.subheadline') }}</p>
            <hr class="my-4">
            <section class="mt-4 leading-6 md:leading-7">
                <p class="mb-2"><b>{{ $t('faq.question1') }}</b></p>
                <p>{{ $t('faq.answer1') }}</p>
            </section>
            <section class="mt-4 leading-6 md:leading-7">
                <p class="mb-2"><b>{{ $t('faq.question2') }}</b></p>
                <p>{{ $t('faq.answer2') }}</p>
            </section>
            <section class="mt-4 leading-6 md:leading-7">
                <p class="mb-2"><b>{{ $t('faq.question3') }}</b></p>
                <p>{{ $t('faq.answer3') }}</p>
            </section>
            <section class="mt-4 leading-6 md:leading-7">
                <p class="mb-2"><b>{{ $t('faq.question4') }}</b></p>
                <p>{{ $t('faq.answer4') }}</p>
            </section>
        </div>    
    </div>
</template>

<script>
export default {
  name: 'FAQ'
}
</script>