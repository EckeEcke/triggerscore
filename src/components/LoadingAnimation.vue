<template>
    <div class="max-w-screen p-16 relative flex justify-center mx-auto animate-pulse" style="width:600px;max-width:100vw">
        <lottie-animation
            ref="anim"
            :animationData="require('@/assets/images/loading-animation3.json')"
            :loop=true
            style="fill:white"
        />
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2">
            <p class="text-white font-semibold text-4xl">{{  $t('general.loadMovies')}}</p>
        </div>
        
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'LoadingAnimation',
  components: {
    LottieAnimation
  }
}
</script>