<template>
    <div class="relative flex justify-center mx-auto w-64 h-64 absolute">
        <lottie-animation
            ref="anim"
            :animationData="require('@/assets/images/new-animation.json')"
            :loop=true
            class="w-64"
        />
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'NewAnimation',
  components: {
    LottieAnimation
  }
}
</script>