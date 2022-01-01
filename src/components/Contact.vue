<template>
    <div class="container-xl bg-white p-6 md:p-12 text-left md:mt-8 md:mb-4 text-sm lg:w-1/2 mx-auto md:rounded-lg flex justify-between flex-wrap">
        <div class="w-full md:w-1/2">
            <h1 class="mb-4 text-2xl font-semibold">Kontakt</h1>
            <p class="font-semibold">Christian Eckardt</p>
            <p class="mb-8 font-semibold">22301 Hamburg</p>
            <p class="mb-8 font-semibold"><a href="eckeecke.github.io">eckeecke.github.io</a></p>
            <p class="mb-6 flex">
                <a href="https://github.com/EckeEcke" target="_blank"><img class="h-10 mr-4" src="../assets/images/github.svg" /></a>
                <a href="https://www.linkedin.com/in/christian-eckardt-41527216a/" target="_blank"><img class="h-10 mr-4" src="../assets/images/linkedin.svg" /></a>
                <a href="https://www.xing.com/profile/Christian_Eckardt21/cv" target="_blank"><img class="h-10 mr-4" src="../assets/images/xing.svg" /></a>
            </p>
        </div>
        <form name="contact" method="POST" data-netlify="true" class="w-full md:w-1/2">
        <input type="hidden" name="form-name" value="contact" />
            <h1 class="mb-4 text-2xl font-semibold">Feedback senden</h1>
            <p class="mb-4">Schick mir eine Nachricht</p>
            <p class="mb-2">
                <label>Name:</label>
                <br>
                <input type="text" name="name" class="border border-gray-300 p-2 rounded w-52" required />   
            </p>
            <p class="mb-2">
                <label>Email:</label>
                <br>
                 <input type="email" name="email" class="border border-gray-300 p-2 rounded w-52" required />
            </p>
            <p class="mb-2">
                <label>Nachricht:</label>
                <br>
                <textarea name="message" class="border border-gray-300 p-2 rounded w-52" required></textarea>
            </p>
            <p class="">
                <button class="bg-yellow-500 p-3 text-gray-900 text-semibold rounded-lg shadow-lg" type="submit">Absenden</button>
            </p>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>