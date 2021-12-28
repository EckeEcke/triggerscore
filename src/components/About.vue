<template>
    <div class="container-xl bg-white p-6 md:p-12 text-left md:mt-8 text-sm lg:w-10/12 mx-auto md:rounded-lg">
        <h2 class="font-semibold text-lg mb-2">Über Triggerscore</h2>
        <i>"Eine neue Art alte Filme zu schauen"</i>
        <p class="mt-2">Triggerscore ging aus meiner neu entdeckten Guilty Pleasure hervor: Netflix nach alten Filmen durchstöbern (insbesondere 90er Jahre) und schauen, wie sehr alte Filme Zuschauer:innen von heute triggern würden. Triggerscore dient dabei als Portal, auf dem User:innen Filmen den namensgebenden Triggerscore geben können</p>
        <p>Triggerscore ist ein Ein-Mann-Projekt. Angefangen bei der Idee, über das Design, die Frontend-Entwicklung bis hin zur Erstellung der Datenbank und des Backends habe ich dieses Bewertungsportal selbst entwickelt. Für das Frontend greife ich auf Vue.js zurück, inklusive Vuex-Store und Tailwind CSS. Im Backend nutze ich eine MySQL-Datenbank und einen NodeJS-Server. Meine Backend-Applikation überträgt Bewertungen in meine Bewertungsdatenbank, sendet diese ans Frontend und berechnet die Scores. Als Filmdatenbank nutze ich die TMDB-API. Informationen über Streaminganbieter erhalte ich über die JustWatch-API.</p>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>