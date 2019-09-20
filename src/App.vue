<template>
  <v-app>
<!--    <v-app-bar app>-->
<!--      <v-toolbar-title class="headline text-uppercase">-->
<!--        <span>Vuetify</span>-->
<!--        <span class="font-weight-light">MATERIAL DESIGN</span>-->
<!--      </v-toolbar-title>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn-->
<!--        text-->
<!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--        target="_blank"-->
<!--      >-->
<!--        <span class="mr-2">Latest Release</span>-->
<!--      </v-btn>-->
<!--    </v-app-bar>-->
    <app-bar @menuClicked="showMenu = !showMenu"></app-bar>
    <menu-drawer :showMenu="showMenu"></menu-drawer>
    <v-content>
      <v-container fluid :pa-0="$vuetify.breakpoint.smAndDown" style="max-width: 2000px; margin: 48px auto 0 auto">
        <v-row dense>
          <v-col sm="6" md="4">
            <people-card></people-card>
          </v-col>
          <v-col sm="6" md="4">
            <news-feed-card></news-feed-card>
          </v-col>
          <v-col sm="6" md="4">
            <teams-projects-card></teams-projects-card>
          </v-col>
          <v-col sm="6" md="4">
            <blog-card></blog-card>
          </v-col>
          <v-col sm="6" md="4">
            <protube-card></protube-card>
          </v-col>
          <v-col sm="6" md="4">
            <wiki-feed-card></wiki-feed-card>
          </v-col>
          <v-col cols="12">
            <services-card></services-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PeopleCard from './components/PeopleCard';
import WikiFeedCard from './components/WikiFeedCard';
import BlogCard from './components/BlogCard';
import ServicesCard from './components/ServicesCard';
import NewsFeedCard from "./components/NewsFeedCard";
import TeamsProjectsCard from "./components/TeamsProjectsCard";
import ProtubeCard from "./components/ProtubeCard";
import MenuDrawer from './components/MenuDrawer';
import AppBar from "./components/AppBar";

export default {
  name: 'App',
  components: {
    NewsFeedCard,
    PeopleCard,
    WikiFeedCard,
    BlogCard,
    ServicesCard,
    TeamsProjectsCard,
    ProtubeCard,
    MenuDrawer,
    AppBar,
  },
  mounted() {
    document.cookie = "crowd.token_key=MkFmd0nkm0us1dgv5WROHQ00";
  },
  data: () => ({
    showMenu: false,
  }),
};
</script>

<style>
  .progressSpinner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* number of lines to show N*/
    line-height: 1.2;       /* fallback X*N */
  }

  .ellipsis-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4 !important;
  }

</style>
