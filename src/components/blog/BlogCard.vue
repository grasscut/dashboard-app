<template>
  <v-card class="mb-2 d-flex flex-column" height="600" flat>
    <v-card-title>
      <h4>Blog</h4>
      <v-btn v-if="posts.length > 0" text width="100%" @click="loadMore" :loading="loadMoreProgress" class="justify-end">Load more</v-btn>
    </v-card-title>
    <slider :posts="blogPosts"></slider>
    <v-card-text style="overflow-y: auto; overflow-x: hidden;">
      <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from '../../utils/moment';
  import axios from 'axios';

  import blogPost from './BlogPost'
  import Slider from "../slider/Slider";

  export default {
    data: () => ({
      posts: [],
      nextPageUrl: '',
      loadMoreProgress: false,
      fetchNumber: 6,
    }),
    computed: {
      blogPosts() {
        return this.posts.map( (post) => {
          let prop ={
            url:post.items[0].url,
            title:post.items[0].title,
            author: post.user,
            date: post.items[0].modifiedAt
          }
          return prop;
        });
      }
    },
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
      Slider
    }
  };
</script>
