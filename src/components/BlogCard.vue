<template>
  <v-card class="mb-2 d-flex flex-column" height="488">
    <v-card-title>
      <h4>Blog</h4>
    </v-card-title>
    <v-card-text style="overflow-y: auto; overflow-x: hidden;">
      <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
      <v-row>
        <template v-for="post in posts">
          <v-col sm="12" md="12" lg="6" xl="4" :key="post.title" :pa-0="$vuetify.breakpoint.smAndDown" class="blog-container">
            <blog-post :post="post"></blog-post>
          </v-col>
        </template>
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
      fetchNumber: 6
    }),
    mounted () {
      axios.get('/api/wiki?blogSpace=dashboard&type=BLOG&count='+this.fetchNumber).then(({ data }) => {
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
