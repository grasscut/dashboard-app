<template>
  <v-app style="background-color: #FFFFFF">
    <app-bar @menuClicked="showMenu = !showMenu"></app-bar>
    <menu-drawer :showMenu="showMenu"></menu-drawer>
    <v-content>
      <v-container fluid :pa-0="$vuetify.breakpoint.smAndDown" style="max-width: 2000px; margin: 48px auto 0 auto; width: 80%">
        <v-row dense>
          <v-col sm="12" md="6">
            <people-card></people-card>
          </v-col>
          <v-col md="6" v-if="!$vuetify.breakpoint.smAndDown">
            <v-img contain
                   height="488"
                   src="./assets/images/pro.png"
            ></v-img>
          </v-col>
          <v-col sm="12" md="12">
            <news-feed-card></news-feed-card>
          </v-col>
          <v-col sm="12" md="6">
            <teams-projects-card></teams-projects-card>
          </v-col>
          <v-col sm="12" md="6">
            <wiki-feed-card></wiki-feed-card>
          </v-col>
          <v-col sm="12" md="12">
            <blog-card></blog-card>
          </v-col>
          <v-col sm="12" md="12">
            <protube-card></protube-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <services-card></services-card>
  </v-app>
</template>

<script>
import PeopleCard from './components/PeopleCard';
import WikiFeedCard from './components/WikiFeedCard';
import BlogCard from './components/blog/BlogCard';
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
    document.cookie = "crowd.token_key=c5QMyoRZeBnwbx9Xu1dYdA00";
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
    -webkit-line-clamp: 1;
    line-height: 1.2;
  }

  .ellipsis-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4 !important;
  }

  .container {
    background-color: #FFFFFF;
  }

</style>
