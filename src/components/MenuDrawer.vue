<template>
  <div>
    <!--<v-btn color="primary" small tile fab class="shortcut white&#45;&#45;text" @click.stop="show = !show">
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>-->
    <v-navigation-drawer
        app
        v-model="showMenu"
        temporary
        fixed
        hide-overlay
        stateless
        class="menu-drawer"
    >
      <v-list dense>
        <v-subheader>MY WORK</v-subheader>
        <v-list-item link href="https://intra.proekspert.ee/wiki/#recently-worked">
          <v-list-item-icon>
            <v-icon>mdi-file-document-box-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Recently worked on</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/wiki/#recently-viewed">
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Recently visited</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/wiki/#starred">
          <v-list-item-icon>
            <v-icon>mdi-star-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Saved for later</v-list-item-content>
        </v-list-item>

        <v-subheader>QUICKIES</v-subheader>
        <v-list-item link href="https://intra.proekspert.ee/wiki/pages/viewpage.action?pageId=99093994">
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Karuaabits/Handbook</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/wiki/display/HAN/HOBBY+MAKES+BUTTERFLIES">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Hobbies</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/pulse/">
          <v-list-item-icon>
            <v-icon>mdi-heart-pulse</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Pulse</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/pa/">
          <v-list-item-icon>
            <v-icon>mdi-timer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Project accounting</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/wiki/x/VKEfB">
          <v-list-item-icon>
            <v-icon>mdi-library-books</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Library</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://webmail.proekspert.ee/">
          <v-list-item-icon>
            <v-icon>mdi-outlook</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Mail server</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/jkeskus">
          <v-list-item-icon>
            <v-icon>mdi-account-search</v-icon>
          </v-list-item-icon>
          <v-list-item-content>KesKus (employees)</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/jira/">
          <v-list-item-icon>
            <v-icon>mdi-jira</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Jira</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/bitbucket/">
          <v-list-item-icon>
            <v-icon>mdi-bitbucket</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Bitbucket</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://intra.proekspert.ee/tmt/">
          <v-list-item-icon>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-icon>
          <v-list-item-content>TMT</v-list-item-content>
        </v-list-item>
        <v-list-item link href="http://reports.proekspert.ee/">
          <v-list-item-icon>
            <v-icon>mdi-file-chart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>BO Reports</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://evileye.proekspert.ee/">
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Evileye</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://cloud.proekspert.ee/">
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-content>OwnCloud</v-list-item-content>
        </v-list-item>
        <v-list-item link href="https://piwigo.proekspert.ee/">
          <v-list-item-icon>
            <v-icon>mdi-folder-multiple-image</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Gallery</v-list-item-content>
        </v-list-item>

        <v-subheader>MY SPACES</v-subheader>
        <v-list-item v-for="space in mySpaces" :key="space.url" link :href="space.url">
          <v-list-item-icon>
            <v-icon>mdi-cursor-default</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ space.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['showMenu'],
    data: () => ({
      mySpaces: [],
    }),
    mounted: function() {
      axios
        .get('/rest/experimental/search?cql=type=space%20and%20space.type=favourite%20order%20by%20favourite%20desc&expand=space.icon&limit=100&_=1568818826479')
        .then(({ data }) => {
          this.mySpaces = data.results;
        });
    },

  };
</script>

<style scoped>

  .v-navigation-drawer--fixed {
    position: fixed !important;
  }

  .menu-drawer {
    top: 60px !important;
  }

</style>