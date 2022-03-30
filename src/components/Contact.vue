<template>
    <div class="container text-white px-4 py-6 md:py-12 text-left xl:w-10/12 mx-auto md:rounded-lg flex justify-start flex-wrap gap-12">
        <div v-if="!submitted" class="mr-8 max-w-full">
            <h1 class="mb-4 text-xl md:text-2xl font-semibold">{{ $t('contact.sendFeedback') }}</h1>
            <form name="contact" class="w-full p-8 bg-red-900 rounded-lg" method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field" @submit.prevent="handleSubmit"
                :style="{'background-image': 'linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))'}">
                <p class="hidden"><input name="bot-field"></p>
                <div class="flex flex-col gap-1 mb-4">
                    <label class="font-semibold mb-2 text-white">{{ $t('contact.name') }}</label>
                    <input v-model="form.name" type="text" name="name" class="border border-gray-300 p-2 rounded w-72 max-w-full" :placeholder="$t('contact.placeholderName')" required />   
                </div>
                <div class="flex flex-col gap-1 mb-4">
                    <label class="font-semibold mb-2 text-white">{{ $t('contact.email') }}</label>
                    <input v-model="form.mail" type="email" name="mail" class="border border-gray-300 p-2 rounded w-72 max-w-full" :placeholder="$t('contact.placeholderEmail')" required />
                </div>
                <div class="flex flex-col gap-1 mb-4">
                    <label class="font-semibold mb-2 text-white">{{ $t('contact.message') }}</label>
                    <textarea v-model="form.message" name="message" class="border border-gray-300 p-2 rounded w-72 max-w-full" :placeholder="$t('contact.placeholderMessage')" required></textarea>
                </div>
                <p class="">
                    <button class="w-full bg-yellow-500 p-3 text-gray-900 text-semibold rounded-lg shadow-lg transition hover:bg-yellow-600 font-semibold" type="submit">{{ $t('contact.send') }}</button>
                </p>
            </form>
        </div>
        <div v-else class="w-full sm:w-1/2">
            <p class="p-4 bg-green-500 text-white rounded-lg shadow-lg font-semibold text-center">{{ $t('contact.success') }} <font-awesome-icon :icon="['fas', 'check']" class="text-white" /></p>
        </div>
        <div class="">
            <h1 class="mb-4 text-xl md:text-2xl font-semibold">{{ $t('header.contact') }}</h1>
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
export default {
  name: 'Contact',
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
  }
  
}
</script>
