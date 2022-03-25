<template>
    <span ref="trigger"/>
</template>

<script>
export default {
    data() {
        return {
            observer: null,
            options: {
                root: null,
                threshold: "0"
            }
        }
    },
    props: {
        current: Number,
        maximum: Number
    },
    mounted() {
        this.observer = new IntersectionObserver( entries => {
            this.handleIntersect(entries[0])
            setTimeout(this.handleIntersect(entries[0],100))
        
        },this.options);
        this.observer.observe(this.$refs.trigger)
    },
    destroyed() {
        this.observer.disconnect()
    },
    methods: {
        handleIntersect(entry) {
            if(entry.isIntersecting && this.current != this.maximum){
                   this.$emit("triggerIntersected")
                }            
        }
    }
}
</script>
