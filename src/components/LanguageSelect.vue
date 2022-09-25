<template>
    <div class="relative flex align-center">
        <button v-if="$root.$i18n.locale == 'de'"  @click="showSelection = !showSelection" class="mr-6 sm:mr-10"><img class="w-6" src="../assets/images/germany.svg"></button>
        <button v-if="$root.$i18n.locale == 'en'"  @click="showSelection = !showSelection" class="mr-6 sm:mr-10"><img class="w-6" src="../assets/images/uk.svg"></button>
        <button v-if="$root.$i18n.locale == 'us'"  @click="showSelection = !showSelection" class="mr-6 sm:mr-10"><img class="w-6" src="../assets/images/usa.svg"></button>
        <ul v-if="showSelection" v-on-clickaway="hideSelection" class="absolute -left-2 bg-gradient-to-r from-gray-950 to-gray-800 text-white top-9 md:top-10 p-2 flex flex-col gap-2 w-20">
            <li @click="switchLanguage('us')" class="flex gap-2 cursor-pointer hover:text-yellow-500"><img class="w-6" src="../assets/images/usa.svg">US</li>
            <li @click="switchLanguage('en')" class="flex gap-2 cursor-pointer hover:text-yellow-500"><img class="w-6" src="../assets/images/uk.svg">EN</li>
            <li @click="switchLanguage('de')" class="flex gap-2 cursor-pointer hover:text-yellow-500"><img class="w-6" src="../assets/images/germany.svg">DE</li>
        </ul>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
export default {
    name: "LanguageSelect",
    directives: {
    onClickaway: onClickaway,
  },
    data() {
        return {
            showSelection: false
        };
    },
    methods: {
        hideSelection: function(){
            this.showSelection = false
        },
        switchLanguage: function (language) {
            this.$root.$i18n.locale = language;
            this.$store.commit("setLocale", language);
            this.$store.dispatch("setTriggerscores");
            this.$store.dispatch("setRecentRatings");
            this.$store.dispatch("setTop10Sexism");
            this.$store.dispatch("setTop10Racism");
            this.$store.dispatch("setTop10Others");
            this.$store.dispatch("setTop10Cringe");
            this.$store.dispatch("setBondMovies");
        }
    }
}
</script>