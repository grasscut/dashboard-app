<template>
  <v-card class="mb-2 d-flex flex-column" height="488">
    <v-card-title>
      <h4>Blog</h4>
    </v-card-title>
    <v-card-text class="pa-0" style="overflow: auto; margin: 0 16px 16px;">
      <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
      <v-row>
        <template v-for="post in posts">
          <v-col sm="12" md="6" lg="6" :key="post.title" :pa="$vuetify.breakpoint.smAndDown ? 0 : 2" class="blog-container" v-resize="resizeCard">
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
      resizeCard () {
        let windowSize = window.innerWidth;
        let elements = document.getElementsByClassName('blog-container');
        if(windowSize < 1200) {
          for( let i in elements){
            elements[i].classList.remove("col-md-6");
          }
        }
        else if( windowSize > 2000){
          for( let i in elements){
            elements[i].classList.remove("col-lg-6");
            elements[i].classList.add("col-lg-4");
          }
        }
        else {
          for( let i in elements){
            elements[i].classList.add("col-md-6");
            elements[i].classList.remove("col-lg-4");
            elements[i].classList.add("col-lg-6");
          }
        }
      }
    },
    components: {
      blogPost,
    }
  };
</script>
