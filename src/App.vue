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

    <v-content>
      <v-container fluid :pa-0="$vuetify.breakpoint.smAndDown">
        <v-row dense>
          <v-col sm="6" md="4">
            <people-card></people-card>
          </v-col>
          <v-col sm="6" md="4">
            <wiki-feed-card></wiki-feed-card>
          </v-col>
          <v-col sm="6" md="4">
            <blog-card></blog-card>
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

export default {
  name: 'App',
  components: {
    PeopleCard,
    WikiFeedCard,
    BlogCard,
    ServicesCard,
  },
  data: () => ({
    //
  }),
  mounted() {
    document.cookie = "crowd.token_key=7lpJ1CW08TPPpKBUa5vLGA00";
  },
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
</style>
