<template>
    <div class="flex flex-col justify-center items-center w-72 max-w-full">
        <div class="relative max-w-xl w-full">
            <div>
                <input type="range"
                        min=0
                        max=10
                        step="0.1"
                        @input="mintrigger"
                        v-model="minScore"
                        class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer left-0">

                <input type="range" 
                        min=0 
                        max=10
                        step=0.1
                        @input="maxtrigger"
                        v-model="maxScore"
                        class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer left-0">

                <div class="relative z-10 h-2">
                    <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
                    <div class="absolute z-20 top-0 bottom-0 rounded-md bg-yellow-300" :style="'right:'+maxthumb+'%; left:'+minthumb+'%'"></div>
                    <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-yellow-500 rounded-full -mt-2 -ml-1" :style="'left: '+minthumb+'%'"></div>
                    <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-yellow-500 rounded-full -mt-2 -mr-3" :style="'right: '+maxthumb+'%'"></div>
                </div>
            </div>
        </div>
        <div v-if="minScore > 0 || maxScore < 10" class="flex justify-around w-full mt-4 xl:mt-2">
            <span>{{minScore}}</span>
            <span>{{ $t('filter.to') }}</span>
            <span>{{maxScore}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rangeslider',
    data(){
      return {
          min: 0, 
          max: 10,
          minthumb: 0,
          maxthumb: 0, 
      }  
    },
    mounted: function() {
        this.mintrigger()
        this.maxtrigger()
    },
    watch: {
        minScore(newValue){
            if(newValue == 0){
                this.mintrigger()
            }
        },
        maxScore(newValue){
            if(newValue == 10){
                this.maxtrigger()
            }
        }
    },
    computed: {
        minScore: {
        get: function(){
            return this.$store.state.minScore
        },
        set: function(value){
            this.$store.commit("setMinScore",value)
            this.$store.dispatch("filterMovies")
        }
        },
        maxScore: {
        get: function(){
            return this.$store.state.maxScore
        },
        set: function(value){
            this.$store.commit("setMaxScore",value)
            this.$store.dispatch("filterMovies")
        }
        }
    },
    methods: {
            mintrigger: function() {  
                if(this.minScore >= this.maxScore){this.minScore = parseInt(this.maxScore) - 1}
                this.minthumb = ((parseInt(this.minScore) - this.min) / (this.max - this.min)) * 100;
            },
           
            maxtrigger: function() {
                console.log(this.maxScore)
                if(this.maxScore >= this.max){this.maxScore = 10}
                if(parseInt(this.maxScore) <= parseInt(this.minScore)){this.maxScore = parseInt(this.minScore) + 1}
                this.maxthumb = 100 - (((this.maxScore - this.min) / (this.max - this.min)) * 100);    
            }, 
    }
  }
</script>

<style>
  input[type=range]::-webkit-slider-thumb {
	pointer-events: all;
	width: 24px;
	height: 24px;
	/*-webkit-appearance: none;
  /* @apply w-6 h-6 appearance-none pointer-events-auto; */
  }
</style>
