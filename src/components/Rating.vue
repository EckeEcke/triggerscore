<template>
<div class="h-100 p-4">
                    <label>Sexismus</label>
                    
                    <div class="flex w-full justify-between overflow-y-scroll md:overflow-hidden">
                        <button v-for="i in 10" :key="i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full" :class="{ 'bg-green-400': i < 4, 'bg-yellow-400': i > 3 && i < 8, 'bg-red-500': i > 7}">
                            {{i}}
                        </button>
                    </div>
                    <label>Rassismus</label>
                    <div class="flex w-full justify-between overflow-y-scroll md:overflow-hidden">
                        <button v-for="i in 10" :key="i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full" :class="{ 'bg-green-400': i < 4, 'bg-yellow-400': i > 3 && i < 8, 'bg-red-500': i > 7}">
                            {{i}}
                        </button>
                    </div>
                    <label>Sonstige</label>
                    <div class="flex w-full justify-between overflow-y-scroll md:overflow-hidden">
                        <button v-for="i in 10" :key="i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full" :class="{ 'bg-green-400': i < 4, 'bg-yellow-400': i > 3 && i < 8, 'bg-red-500': i > 7}">
                            {{i}}
                        </button>
                    </div>
                    <label>Cringe</label>
                    <div class="flex w-full justify-between overflow-y-scroll md:overflow-hidden">
                        <button v-for="i in 10" :key="i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full" :class="{ 'bg-green-400': i < 4, 'bg-yellow-400': i > 3 && i < 8, 'bg-red-500': i > 7}">
                            {{i}}
                        </button>
                    </div>
                    <button class="bg-red-500 text-white p-3 rounded-lg">Bewerten</button>
                </div>
</template>