<template>
    <div class="container-xl bg-white p-6 md:p-12 text-left md:mt-8 md:mb-4 text-sm md:w-8/12 lg:w-1/2 mx-auto md:rounded-lg">
        <h2 class="font-semibold text-xl mb-2">About</h2>
        <p class="font-semibold">Triggerscore - eine neue Art alte Filme zu schauen</p>
        <p class="mt-2">Die Idee für Triggerscore ging aus meiner neu entdeckten Guilty Pleasure hervor: Netflix nach alten Filmen durchstöbern (insbesondere 90er Jahre) und analysieren, wie sehr diese Filme Zuschauer:innen von heute triggern würden. Triggerscore dient dabei als Portal, auf dem User:innen Triigerscore-Bewertungen finden und bewerten können.</p>
        <p class="mt-2">Triggerscore ist ein Ein-Mann-Projekt. Von der Idee, über Konzeptionierung und Design, bis hin zur Entwicklung des Front- und Backends dieser Applikation. Das Frontend basiert auf dem JavaScript-Framework Vue.js mit Vuex-Store für das State-Management und dem CSS-Framework Tailwind. Gehostet wird mein Frontend auf Netlify. Im Backend nutze ich eine MySQL-Datenbank und einen NodeJS-Server, beide gehostet auf Heroku. Meine Backend-Applikation überträgt Bewertungen in meine Bewertungsdatenbank, sendet diese ans Frontend und berechnet die Scores. Als Filmdatenbank nutze ich die TMDB-API. Informationen über Streaminganbieter erhalte ich über die JustWatch-API.</p>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>