<template>
    <div>
        <v-app-bar
                color="white accent-4"
                dense
                light
        >
            <v-app-bar-nav-icon @click="() => $emit('menuClicked')" class="pa-2"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-img src="../assets/images/proekspert-logo.svg" class="pl-2" style="max-width: 150px"></v-img>
            </v-toolbar-title>

            <div class="flex-grow-1"></div>

            <!-- Search -->
            <v-form ref="form" v-on:submit.prevent="() => $emit('globalSearchSubmitted', globalSearch)"
                    style="position: relative; bottom: 0; top: 10px; width: 200px; display: flex"
                    v-if="!$vuetify.breakpoint.xs"
            >
                <v-text-field required placeholder="Search e.g. augmented reality"
                              v-model="globalSearch" class="pa-0" style="font-size: small"
                              @focusin="show = true"
                              @change="show = true"
                >
                </v-text-field>
            </v-form>
            <v-btn icon @click="() => $emit('globalSearchSubmitted', globalSearch)"
                   v-if="!$vuetify.breakpoint.xs"
            >
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-menu
                    left
                    bottom
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="n in 5"
                            :key="n"
                            @click="() => {}"
                    >
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-card
                class="mx-auto pa-0 pt-1"
                max-width="400"
                tile
                id="searchMenu"
                v-if="show"
                @mouseleave="show = false"
        >
            <template v-for="result in searchResults">
                <v-list-item two-line :href="'https://intra.proekspert.ee/wiki/'+result.url" target="_blank" :key="result.url">
                    <v-list-item-content>
                        <v-list-item-title>{{ result.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ result.space }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "AppBar",
        data: () => ({
            show: false,
            searchResults: [],
            globalSearch: '',
            recentSearch: []
        }),
        mounted: function() {
            axios
                .get('/rest/recentlyviewed/1.0/recent?limit=8')
                .then(({ data }) => {
                    this.recentSearch = data;
                    this.searchResults = data;
                });
        },
        watch: {
            globalSearch: function (val) {
                axios
                    .get('/rest/quicknav/1/search?query='+val)
                    .then(({ data }) => {
                        if(data.contentNameMatches.length > 0) {
                            let results = [];
                            const matches = data.contentNameMatches[0];
                            for(let i in matches){
                                let res = {
                                    title: matches[i].name,
                                    space: matches[i].spaceName
                                }
                                results.push(res);
                            }
                            this.searchResults = results;
                        }
                        else {
                            this.searchResults = this.recentSearch;
                        }
                    });
            }
        }
    }
</script>

<style scoped>

    #searchMenu {
        position: absolute;
        z-index: 2;
        right: 0;
        top: 50px;
    }


</style>