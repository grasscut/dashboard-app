<template>
  <v-card class="mb-2 d-flex flex-column" height="488">
    <v-card-title>
      <h4>Blog</h4>
    </v-card-title>
    <v-card-text class="pa-0" style="overflow: auto; margin: 0 16px 16px;">
      <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
      <v-list>
        <v-list-item v-for="post in posts" class="pa-0">
          <v-list-item-avatar class="align-self-start">
            <v-img :src="post.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <b>{{ post.user }}</b>
            <a :href="post.items[0].url" target="_blank">{{ post.items[0].title }}</a>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              {{ moment(post.items[0].modifiedAt).calendar() }}
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-btn v-if="posts.length > 0" text width="100%" @click="() => loadMore()" :loading="loadMoreProgress">Load more</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from '../utils/moment';
  import axios from 'axios';

  export default {
    data: () => ({
      posts: [],
      nextPageUrl: '',
      loadMoreProgress: false,
    }),
    mounted () {
      axios.get('/api/wiki?blogSpace=dashboard&type=BLOG&count=6').then(({ data }) => {
        this.posts = data.groups;
        this.nextPageUrl = data.nextPageUrl;
      });
    },
    methods: {
      moment: function (date) {
        return moment(date);
      },
      loadMore: function() {
        this.loadMoreProgress = true;
        axios.get(this.nextPageUrl).then(({ data }) => {
          this.posts = [...this.posts, ...data.groups];
          this.nextPageUrl = data.nextPageUrl;
          this.loadMoreProgress = false;
        });
      },
    },
  };
</script>