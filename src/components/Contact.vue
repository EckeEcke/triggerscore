<template>
    <div class="container text-white px-4 py-6 md:py-12 md:pb-8 text-left xl:w-10/12 mx-auto md:rounded-lg flex justify-start flex-wrap gap-12">
        <div v-if="!submitted" class="mr-8 max-w-full">
            <h1 v-if="$route.query.comment" class="mb-4 text-xl md:text-2xl font-semibold uppercase">{{ $t('contact.reportHeadline') }}</h1>
            <h1 v-else class="mb-4 text-xl md:text-2xl font-semibold uppercase">{{ $t('contact.sendFeedback') }}</h1>
            <form name="contact" class="w-full p-8 bg-gradient-to-r from-gray-950 to-gray-800 rounded text-gray-900" method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field" @submit.prevent="handleSubmit"
            >
                <p class="hidden"><input name="bot-field"></p>
                <div class="flex flex-col gap-1 mb-4">
                    <label class="font-semibold mb-2 text-white">{{ $t('contact.name') }}</label>
                    <input v-model="form.name" type="text" name="name" class="border border-gray-300 p-2 rounded w-72 max-w-full" :placeholder="$t('contact.placeholderName')" required />   
                </div>
                <div class="flex flex-col gap-1 mb-4">
                    <label class="font-semibold mb-2 text-white">{{ $t('contact.email') }}</label>
                    <input v-model="form.mail" type="email" name="mail" class="border border-gray-300 p-2 rounded w-72 max-w-full" :placeholder="$t('contact.placeholderEmail')" required />
                </div>
                <div class="flex flex-col gap-1 mb-6">
                    <label class="font-semibold mb-2 text-white">{{ $t('contact.message') }}</label>
                    <textarea v-model="form.message" name="message" class="border border-gray-300 p-2 rounded w-72 max-w-full" :placeholder="$t('contact.placeholderMessage')" required></textarea>
                </div>
                <p>
                    <button class="w-full text-white bg-yellow-500 p-3 text-semibold rounded-lg shadow-lg transition hover:bg-yellow-600 font-semibold uppercase" type="submit">{{ $t('contact.send') }}</button>
                </p>
            </form>
        </div>
        <div v-else class="w-full sm:w-1/2 lg:w-1/4 h-64 bg-green-500 rounded-lg flex flex-col align-center justify-center">
            <SuccessAnimation />
            <p class="p-4 text-white font-semibold text-center self-center -mt-8">{{ $t('contact.success') }}</p>
        </div>
        <div class="">
            <h1 class="mb-4 text-xl md:text-2xl font-semibold uppercase">{{ $t('header.contact') }}</h1>
            <p class="font-semibold">Christian Eckardt</p>
            <p class="mb-8 font-semibold">22301 Hamburg</p>
            <p class="mb-8 font-semibold"><a href="https://eckeecke.github.io">eckeecke.github.io</a></p>
            <p class="mb-8 flex">
                <a href="https://github.com/EckeEcke" target="_blank"><img class="h-10 mr-4 filter invert" src="../assets/images/github.svg" /></a>
                <a href="https://www.linkedin.com/in/christian-eckardt-41527216a/" target="_blank"><img class="h-10 mr-4" src="../assets/images/linkedin.svg" /></a>
                <a href="https://www.xing.com/profile/Christian_Eckardt21/cv" target="_blank"><img class="h-10 mr-4" src="../assets/images/xing.svg" /></a>
            </p>
        </div>  
    </div>
</template>

<script>
import axios from "axios";
import SuccessAnimation from "./SuccessAnimation.vue";
export default {
  name: 'Contact',
  components: {
    SuccessAnimation
  },
  data(){
      return {
          form: {
              name: '',
              mail: '',
              message: ''
          },
          submitted: false
      }
  },
  computed: {
    reportedMovie: function(){
        return this.$route.params.id
    }
  },
  methods: {
      encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit () {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "contact",
          ...this.form
        }),
        axiosConfig
      )
      .then(this.submitted = true)
      .catch((error)=>console.log(error))
    }
  },
  mounted(){
    if(this.$route.query.comment){
            this.form.message = this.$t("contact.report") + this.$route.query.id + " - '" + this.$route.query.comment + "...'"
        }
    console.log(this.form.message)
  }
  
}
</script>
