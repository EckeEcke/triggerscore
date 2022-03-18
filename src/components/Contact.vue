<template>
    <div class="container-xl bg-white p-6 md:p-12 text-left md:mt-8 md:mb-4 text-sm md:w-8/12 lg:w-1/2 mx-auto md:rounded-lg flex justify-between flex-wrap">
        <div class="w-full sm:w-1/2">
            <h1 class="mb-4 text-2xl font-semibold">Kontakt</h1>
            <p class="font-semibold">Christian Eckardt</p>
            <p class="mb-8 font-semibold">22301 Hamburg</p>
            <p class="mb-8 font-semibold"><a href="https://eckeecke.github.io">eckeecke.github.io</a></p>
            <p class="mb-8 flex">
                <a href="https://github.com/EckeEcke" target="_blank"><img class="h-10 mr-4" src="../assets/images/github.svg" /></a>
                <a href="https://www.linkedin.com/in/christian-eckardt-41527216a/" target="_blank"><img class="h-10 mr-4" src="../assets/images/linkedin.svg" /></a>
                <a href="https://www.xing.com/profile/Christian_Eckardt21/cv" target="_blank"><img class="h-10 mr-4" src="../assets/images/xing.svg" /></a>
            </p>
        </div>
        <div v-if="!submitted" class="w-full sm:w-1/2">
            <h1 class="mb-4 text-2xl font-semibold">Feedback senden</h1>
            <p class="mb-4">Schick mir eine Nachricht</p>
            <form name="contact" class="w-full md:w-1/2" method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field" @submit.prevent="handleSubmit">
                <p class="hidden"><input name="bot-field"></p>
                <p class="mb-2">
                    <label>Name:</label>
                    <br>
                    <input v-model="form.name" type="text" name="name" class="border border-gray-300 p-2 rounded w-52" placeholder="Name eingeben" required />   
                </p>
                <p class="mb-2">
                    <label>Email:</label>
                    <br>
                    <input v-model="form.mail" type="email" name="mail" class="border border-gray-300 p-2 rounded w-52" placeholder="Email-Adresse eingeben" required />
                </p>
                <p class="mb-2">
                    <label>Nachricht:</label>
                    <br>
                    <textarea v-model="form.message" name="message" class="border border-gray-300 p-2 rounded w-52" placeholder="Nachricht eingeben" required></textarea>
                </p>
                <p class="">
                    <button class="bg-yellow-500 p-3 text-gray-900 text-semibold rounded-lg shadow-lg transition hover:bg-yellow-600 font-semibold" type="submit">Absenden</button>
                </p>
            </form>
        </div>
        <div v-else class="w-full sm:w-1/2">
            <p class="p-4 bg-green-500 text-white rounded-lg shadow-lg font-semibold text-center">Nachricht erfolgreich versendet <font-awesome-icon :icon="['fas', 'check']" class="text-white" /></p>
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
