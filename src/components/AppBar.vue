<template>
    <div class="app-bar">
        <v-app-bar
                color="white accent-4"
                dense
                light
                fixed
        >
            <v-app-bar-nav-icon @click="() => $emit('menuClicked')" class="pa-2"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <a href="/">
                    <v-img src="../assets/images/proekspert-logo.svg" class="pl-2" style="max-width: 150px; height: 19px; "></v-img>
                </a>
            </v-toolbar-title>

            <div class="flex-grow-1"></div>

            <!-- Search -->
            <v-icon v-if="!$vuetify.breakpoint.xs">mdi-magnify</v-icon>
            <v-btn icon v-else  @click="showSearch = !showSearch; showNotifications = false">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-form ref="form"
                    style="position: relative; bottom: 0; top: 10px; width: 200px; display: flex"
                    v-if="!$vuetify.breakpoint.xs"
            >
                <v-text-field required placeholder="Search e.g. augmented reality"
                              v-model="globalSearch" class="pa-0 pl-1" style="font-size: small"
                              @click="showSearch = !showSearch; showNotifications = false"
                              @change="showSearch = true"
                >
                </v-text-field>
            </v-form>

            <v-btn icon @click="getNotifications">
                <v-badge
                        bottom="bottom"
                        color="teal"
                        left="left"
                        overlap
                        class="align-self-center"
                        :value=showBadge
                        style="padding: 3px;"
                >
                    <template v-slot:badge>
                        <span>{{ notificationCount }}</span>
                    </template>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>


<!--            <v-menu-->
<!--                    left-->
<!--                    bottom-->
<!--            >-->
<!--                <template v-slot:activator="{ on }">-->
<!--                    <v-btn icon v-on="on">-->
<!--                        <v-icon>mdi-dots-vertical</v-icon>-->
<!--                    </v-btn>-->
<!--                </template>-->

<!--                <v-list>-->
<!--                    <v-list-item-->
<!--                            v-for="n in 5"-->
<!--                            :key="n"-->
<!--                            @click="() => {}"-->
<!--                    >-->
<!--                        <v-list-item-title>Option {{ n }}</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                </v-list>-->
<!--            </v-menu>-->
        </v-app-bar>
        <v-card
                class="mx-auto pa-0"
                max-width= 400;
                tile
                fixed
                id="searchMenu"
                v-if="showSearch"
        >
            <v-form ref="form"
                    style="position: relative; bottom: 0; top: 10px; left: 10px; max-width: 370px; min-width: 360px"
                    v-if="$vuetify.breakpoint.xs"
            >
                <v-text-field required placeholder="Search e.g. augmented reality"
                              v-model="globalSearch" class="pa-1" style="font-size: small"
                              @change="showSearch = true"
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
        <v-card
                class="mx-auto pa-0 pt-1"
                max-width="400"
                tile
                fixed
                id="notificationMenu"
                v-if="showNotifications"
        >
            <v-card-title class="title" v-if="notificationResults.length > 0">Notifications</v-card-title>
            <v-card-title class="subtitle-2" v-else>No notifications found</v-card-title>
            <hr v-if="notificationResults.length !== 0">
            <template v-for="result in notificationResults">
                <v-list-item :href="'https://intra.proekspert.ee/wiki/'+result.url" target="_blank" :key="result.key">
                    <v-list-item-content style="display: flex">
                        <v-list-item-title class="subtitle-2">{{ result.title }}</v-list-item-title>
                        <v-list-item-subtitle class="caption">{{ result.updated }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </template>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from '../utils/moment';

    export default {
        name: "AppBar",
        data: () => ({
            showSearch: false,
            showNotifications: false,
            searchResults: [],
            notificationResults: [],
            globalSearch: '',
            recentSearch: [],
            notificationCount: 0,
            showBadge: false
        }),
        mounted: function() {
            axios
                .get('/rest/recentlyviewed/1.0/recent?limit=8')
                .then(({ data }) => {
                    this.recentSearch = data;
                    this.searchResults = data;
                });

            axios
                .get('/rest/mywork/latest/status/notification/count')
                .then((res) => {
                    this.notificationCount = res.data.count;
                });
        },
        watch: {
            globalSearch: function (val) {
                this.showSearch = true;
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
                                }
                            }
                            this.searchResults = results;
                        }
                        else {
                            this.searchResults = this.recentSearch;
                        }
                    });
            },
            notificationCount: function () {
                this.showBadge = this.notificationCount > 0;
            }
        },
        methods: {
            getNotifications: function () {
                if(!this.showNotifications){
                    this.showSearch = false;
                    axios
                        .get('/rest/mywork/latest/notification/nested?limit=30')
                        .then(({ data }) => {
                            let results = [];
                            for (let i in data) {
                                let notification = data[i].notifications[0];
                                let res = {
                                    title: notification.title,
                                    updated: moment(notification.updated).calendar(),
                                    url: notification.url
                                }
                                results.push(res);
                            }
                            this.notificationResults = results;
                        });
                        this.showNotifications = true;
                }
                else this.showNotifications = false;
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
                else {
                    return {
                        icon:'mdi-file-document-box-outline',
                        color: 'darkblue'
                    };
                }
            },
            moment: function (date) {
                return moment(date);
            },
        }
    }
</script>

<style scoped>

    #searchMenu, #notificationMenu {
        position: fixed;
        z-index: 5;
        right: 0;
        top: 49px;
        min-width: 300px;
        overflow-y: auto;
        max-height: 80%;
    }

    .app-bar {
        z-index: 8;
    }


</style>