<template>
    <div class="w-64 mx-auto -mt-8">
        <lottie-animation
        class="w-64"
            :animationData="require('@/assets/images/success-animation.json')"
            :loop=false
            :autoPlay=true
            
        />        
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'SuccessAnimation',
  components: {
    LottieAnimation
  }
}
</script>