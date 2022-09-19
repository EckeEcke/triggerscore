<template>
    <div class="w-32 -my-8" @click="runAnimation">
        <lottie-animation
            ref="anim"
            :animationData="require('@/assets/images/like-animation.json')"
            :loop=false
            :autoPlay=false
        />
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'LikeAnimation',
  components: {
    LottieAnimation
  },
  data(){
    return {
        likeClicked: false
    }
  },
  props: {
    dislikeClicked: Boolean
  },
  methods: {
    runAnimation: function(){
        this.likeClicked = !this.likeClicked
        this.$emit('likeClicked',this.likeClicked)
        if(this.likeClicked){
            this.$refs.anim.stop()
            this.$refs.anim.play()
        } else {
            this.$refs.anim.stop()
        }
        
    }
  },
  watch: {
        dislikeClicked: function(newVal){
            if(newVal && this.likeClicked){
                this.runAnimation()
                console.log("watcher in likeclicked"+this.likeClicked)
            }
        }

    }
}
</script>