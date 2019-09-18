<template>
    <v-card class="mb-2 d-flex flex-column" height="488">
        <v-card-title>
            <h4>News Feed</h4>
        </v-card-title>
        <v-card-text style="overflow-y: auto; overflow-x: hidden;">
            <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
            <v-row dense>
                <template v-for="post in posts">
                    <v-col cols="12" xl="6" :key="post.title" :class="$vuetify.breakpoint.smAndDown ? 'px-0' : ''">
                       <v-card height="270" max-width="350" style="margin: 0 auto;" class="pa-0">
                           <v-img height="180" :src="'https://intra.proekspert.ee/'+ post.image"></v-img>
                           <v-card-text class="subtitle-1 black--text font-weight-bold">
                               <span class="ellipsis" :title="post.title">{{ post.title }}</span>
                           </v-card-text>
                           <v-card-actions>
                             <span class="caption">{{ moment(post.date).calendar() }}</span>
                             <v-spacer></v-spacer>
                             <div>
                                 <span class="mr-1">
                                  <v-icon>mdi-heart-outline</v-icon> {{ post.likes }}
                                 </span>
                                 <span>
                                  <v-icon>mdi-comment-outline</v-icon> {{ post.comments ? post.comments : 0 }}
                                 </span>
                             </div>
                           </v-card-actions>
                       </v-card>
                    </v-col>
                </template>
            </v-row>
          <!--  <v-btn v-if="posts.length > 0" text width="100%" @click="() => loadMore()" :loading="loadMoreProgress">Load more</v-btn>-->
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
            axios.get('api/pages?parent=144933200&order=date&limit=12&_=1568639049560').then(({ data }) => {
                this.posts = data;
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