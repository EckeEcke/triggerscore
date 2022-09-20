<template>
    <div class="w-6 relative inline-block">
        <lottie-animation
        class="absolute w-8 -top-6 -left-1"
            :animationData="require('@/assets/images/angry-animation.json')"
            :loop=true
            :autoPlay=true
            
        />        
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'AngryAnimation',
  components: {
    LottieAnimation
  }
}
</script>