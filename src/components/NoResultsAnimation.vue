<template>
    <div class="w-64 mx-auto">
        <lottie-animation
        class="w-64"
            :animationData="require('@/assets/images/noresults-animation.json')"
            :loop=true
            :autoPlay=true
            
        />        
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'NoResultsAnimation',
  components: {
    LottieAnimation
  }
}
</script>