<template>
  <v-card class="mb-2 d-flex flex-column" height="488">
    <v-card-title>
      <h4>Blog</h4>
    </v-card-title>
    <v-card-text class="pa-0" style="overflow: auto; margin: 0 16px 16px;">
      <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
      <v-row>
        <v-col v-for="post in posts">
          <blog-post :post="post" :key="post.title"></blog-post>
        </v-col>
      </v-row>
      <v-btn v-if="posts.length > 0" text width="100%" @click="() => loadMore()" :loading="loadMoreProgress">Load more</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from '../utils/moment';
  import axios from 'axios';

  import blogPost from './BlogPost'

  export default {
    data: () => ({
      posts: [],
      nextPageUrl: '',
      loadMoreProgress: false,
    }),
    mounted () {
      axios.get('/api/wiki?blogSpace=dashboard&type=BLOG&count=3').then(({ data }) => {
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
    components: {
      blogPost,
    }
  };
</script>