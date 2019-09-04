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
      <v-container fluid>
        <v-row dense>
          <v-col>
            <people-card :todayEvents="todayEvents"></people-card>
            <v-card>
              <v-card-title>Blog</v-card-title>
            </v-card>
          </v-col>

          <v-col>
            <v-card class="mb-2">
              <v-card-title>Teams/Projects</v-card-title>
              <v-card-text></v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Wiki feed</v-card-title>
            </v-card>
          </v-col>

          <v-col>
            <v-card>
              <v-card-title>Quacks</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

import PeopleCard from './components/PeopleCard';

export default {
  name: 'App',
  components: {
    PeopleCard,
  },
  data: () => ({
    todayEvents: [],
  }),
  mounted() {
    document.cookie = "crowd.token_key=1qEdMUF9RyKRPjJGZOqegw00";
    axios.get('/api/today').then(({ data }) => (
      this.todayEvents = data.map((item) => ({
        type: item.type,
        person: {
          name: item.user,
          avatar: item.person.avatar,
        },
      }))
    ))
  },
};
</script>
