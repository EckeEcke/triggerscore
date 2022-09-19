<template>
    <div class="w-32 -my-8" @click="runAnimation">
        <lottie-animation
            ref="anim"
            :animationData="require('@/assets/images/dislike-animation.json')"
            :loop=false
            :autoPlay=false
        />        
    </div>     
</template>

<script>

import LottieAnimation from '../../node_modules/lottie-web-vue/src/lottie-web-vue.vue'
export default {
  name: 'DislikeAnimation',
  components: {
    LottieAnimation
  },
  data(){
    return {
        dislikeClicked: false
    }
  },
  props: {
    likeClicked: Boolean
  },
  methods: {
    runAnimation: function(){
        this.dislikeClicked = !this.dislikeClicked
        this.$emit('dislikeClicked',this.dislikeClicked)
        if(this.dislikeClicked){
            this.$refs.anim.stop()
            this.$refs.anim.play()
        } else {
            this.$refs.anim.stop()
        }
    }
  },
  watch: {
        likeClicked: function(newVal){
            console.log("change in dislike")
            if(newVal && this.dislikeClicked){
                this.runAnimation()
                console.log("watcher in dislikeclicked"+this.likeClicked)
            }
        }
    }
}
</script>