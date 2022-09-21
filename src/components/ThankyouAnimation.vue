<template>
    <div class="w-72 mx-auto">
        <lottie-animation
        class="w-72"
            :animationData="require('@/assets/images/thankyou-animation.json')"
            :loop=false
            :autoPlay=true
            @complete="complete"
        />        
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'ThankyouAnimation',
  components: {
    LottieAnimation
  },
  methods: {
    complete: function(){
        this.$emit("complete")
    }
  }
}
</script>