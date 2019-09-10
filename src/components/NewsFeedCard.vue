<template>
  <v-card class="mb-2">
    <v-card-title>
      <h2>News Feed</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <template v-for="item in news">
          <v-col :key="item.items[0].url" sm="12" lg="6">
            <v-card class="ma-2 fill-height">
              <v-img src="https://isolutions.co.ke/wp-content/uploads/2018/08/post-2.jpg" height="120px"></v-img>
              <v-card-title>
                <a :href="item.items[0].url" target="_blank">
                  <h6 class="d-block text-center">{{ item.items[0].title }}</h6>
                </a>
                <v-subheader>{{ new Date(item.items[0].modifiedAt).toLocaleDateString() }}</v-subheader>
              </v-card-title>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    news: [],
  }),
  mounted() {
    axios.get('api/wiki?blogSpace=dashboard&type=BLOG&count=6').then(({ data }) => {
      this.news = data.groups;
    });
  },
};
</script>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit !important;
  }
</style>
