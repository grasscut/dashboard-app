<template>
    <div class="app-bar">
        <v-app-bar
                color="white accent-4"
                dense
                light
                fixed
                height="60"
        >
            <v-app-bar-nav-icon @click="() => $emit('menuClicked')" class="pa-2"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <a href="/">
                    <v-img contain src="../assets/images/proekspert-logo.svg" class="pl-2" style="max-width: 150px; height: 19px; "></v-img>
                </a>
            </v-toolbar-title>

            <div class="flex-grow-1"></div>

            <!-- Search -->
            <template v-if="!$store.state.showSearchResults">
                <v-icon v-if="!$vuetify.breakpoint.xs" >mdi-magnify</v-icon>
                <v-btn icon v-else  @click="$store.state.showSearchResults = !$store.state.showSearchResults; showNotifications = false">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
            <template v-else>
<!--                <v-btn icon v-if="!$vuetify.breakpoint.xs" >-->
<!--                    <v-icon>mdi-close</v-icon>-->
<!--                </v-btn>-->
                <v-btn icon @click="$store.state.showSearchResults = false; showNotifications = false;">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
            <v-form ref="form"
                    style="position: relative; bottom: 0; top: 10px; width: 200px; display: flex"
                    v-if="!$vuetify.breakpoint.xs"
                    v-on:submit.prevent
            >
                <v-text-field required placeholder="Search e.g. augmented reality"
                              v-model="globalSearch" class="pa-0 pl-1" style="font-size: small"
                              @click="$store.state.showSearchResults = true; showNotifications = false"
                              @change="$store.state.showSearchResults = true"
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
                    <v-icon :style="showNotifications ? 'color: teal':'color: currentColor'">mdi-bell</v-icon>
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
        <search-results :global-search="globalSearch"></search-results>
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

    import SearchResults from "./SearchResults";

    export default {
        name: "AppBar",
        data: () => ({
            showNotifications: false,
            notificationResults: [],
            globalSearch: '',
            notificationCount: 0,
            showBadge: false
        }),
        components: {
            SearchResults,
        },
        mounted: function() {
            axios
                .get('/rest/mywork/latest/status/notification/count')
                .then((res) => {
                    this.notificationCount = res.data.count;
                });
        },
        watch: {
            notificationCount: function () {
                this.showBadge = this.notificationCount > 0;
            }
        },
        methods: {
            getNotifications: function () {
                if(!this.showNotifications){
                    this.$store.state.showSearchResults = false;
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

            moment: function (date) {
                return moment(date);
            },
        }
    }
</script>

<style scoped>

    #notificationMenu {
        position: fixed;
        z-index: 4;
        right: 0;
        top: 60px;
        min-width: 300px;
        overflow-y: auto;
        max-height: 80%;
    }

    .app-bar {
        z-index: 8;
    }

    .v-toolbar {
        webkit-box-shadow: 0px 0px 1px -1px rgba(0, 0, 0, 0.2), 0px 0px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 0px 0px rgba(0, 0, 0, 0.12);
        box-shadow: 0px 0px 1px -1px rgba(0, 0, 0, 0.2), 0px 0px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 0px 0px rgba(0, 0, 0, 0.12);
    }

</style>