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
                threshold: "-100"
            }
        }
    },
    mounted() {
        this.observer = new IntersectionObserver( entries => {
            this.handleIntersect(entries[0])
        
        },this.options);
        this.observer.observe(this.$refs.trigger)
    },
    destroyed() {
        this.observer.disconnect()
    },
    methods: {
        handleIntersect(entry) {
            if(entry.isIntersecting){
                this.$emit("triggerIntersected")
            }
        }
    }
}
</script>
