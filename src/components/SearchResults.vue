<template>
    <v-card
            class="mx-auto pa-0"
            :max-width="$vuetify.breakpoint.xs ? 'auto' : '350px'"
            tile
            fixed
            id="searchMenu"
            v-if="this.$store.state.showSearchResults"
    >
        <v-form ref="form"
                style="position: relative; bottom: 0; top: 10px; left: 10px; max-width: 370px; min-width: 360px"
                v-if="$vuetify.breakpoint.xs"
        >
            <v-text-field required placeholder="Search e.g. augmented reality"
                          v-model="globalSearch" class="pa-1" style="font-size: small"
                          @change="this.$store.state.showSearchResults = true"
            >
            </v-text-field>
        </v-form>
        <template v-for="result in searchResults" style="overflow-y: auto">
            <v-list-item two-line :href="'https://intra.proekspert.ee/'+result.url" target="_blank" :key="result.key">
                <v-list-item-content>
                    <v-list-item-title>
                            <span>
                                <v-icon class="mr-2" :style="'color: '+getSearchResultIcon(result.class).color">{{ getSearchResultIcon(result.class).icon }}</v-icon>
                            </span>
                        {{ result.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ result.space }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </template>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {
        data: () => ({
            searchResults: [],
            recentSearch: [],
        }),
        props: ['globalSearch'],
        mounted: function() {
            this.getRecentlyViewed();
        },
        watch: {
            globalSearch: function (val) {
                if (val.length == 0) {
                    this.getRecentlyViewed();
                }
                else if (val.length > 2) {
                    this.$store.state.showSearchResults = true;
                    axios
                        .get('/rest/quicknav/1/search?query='+val)
                        .then(({ data }) => {
                            if(data.contentNameMatches.length > 0) {
                                let results = [];
                                for (let index in data.contentNameMatches){
                                    const matches = data.contentNameMatches[index];
                                    for(let i in matches){
                                        let classname = matches[i].className;
                                        if("search-for" !== classname) {
                                            let res = {
                                                title: matches[i].name,
                                                space: matches[i].spaceName,
                                                key: matches[i].href,
                                                url: matches[i].href,
                                                class: matches[i].className
                                            };
                                            results.push(res);
                                        }
                                        else {
                                            results.push({
                                                title: "Search for "+val,
                                                url: matches[i].href,
                                                class: matches[i].className
                                            })
                                        }
                                    }
                                }
                                this.searchResults = results;
                            }
                            else {
                                this.searchResults = this.recentSearch;
                            }
                        });
                }
                else {
                    this.$store.state.showSearchResults = false;
                }
            },
        },
        methods: {
            getRecentlyViewed: function () {
                axios
                    .get('/rest/recentlyviewed/1.0/recent?limit=8')
                    .then(({ data }) => {
                        this.recentSearch = data;
                        this.searchResults = data;
                    });
            },
            getSearchResultIcon: function (className) {
                if(className === 'content-type-page') {
                    return {
                        icon:'mdi-book-open-page-variant',
                        color: 'cornflowerblue'
                    };
                }
                else if (className === 'content-type-attachment-html') {
                    return {
                        icon:'mdi-application',
                        color: 'indianred'
                    };
                }
                else if (className === 'content-type-attachment-pdf') {
                    return {
                        icon:'mdi-file-pdf-outline',
                        color: 'indianred'
                    };
                }
                else if (className === 'content-type-attachment-powerpoint') {
                    return {
                        icon:'mdi-office',
                        color: 'indianred'
                    };
                }
                else if (className === 'content-type-attachment-image') {
                    return {
                        icon:'mdi-file-image-outline',
                        color: 'indianred'
                    };
                }
                else if (className === 'content-type-spacedesc') {
                    return {
                        icon:'mdi-folder-outline',
                        color: 'darkorchid'
                    };
                }
                else if (className === 'content-type-userinfo') {
                    return {
                        icon:'mdi-account',
                        color: 'cadetblue'
                    };
                }
                else if (className === 'calendar-item') {
                    return {
                        icon:'mdi-calendar-month-outline',
                        color: 'chocolate'
                    };
                }
                else if (className === 'search-for') {
                    return {
                        icon:'mdi-magnify',
                        color: 'darkslategrey'
                    };
                }
                else {
                    return {
                        icon:'mdi-file-document-box-outline',
                        color: 'darkblue'
                    };
                }
            },
        }
    }
</script>

<style scoped>

    #searchMenu {
        position: fixed;
        z-index: 5;
        right: 0;
        top: 49px;
        min-width: 300px;
        overflow-y: auto;
        max-height: 80%;
    }

</style>