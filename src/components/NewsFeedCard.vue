<template>
    <v-card class="mb-2 d-flex flex-column" height="488">
        <v-card-title>
            <h4>News Feed</h4>
        </v-card-title>
        <v-card-text style="overflow-y: auto; overflow-x: hidden;">
            <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
            <v-row>
                <template v-for="post in posts">
                    <v-col sm="12" md="12" lg="12" xl="6" :key="post.title" :pa-0="$vuetify.breakpoint.smAndDown">
                       <v-card :height="270" max-width="350px" style="margin: 0 auto;" class="pa-0">
                           <v-img height="180px" :src="'https://intra.proekspert.ee/'+ post.image"></v-img>
                           <v-card-text class="subtitle-1 font-weight-bold">
                               <p class="ellipsis"> {{ post.title }} </p>
                           </v-card-text>
                           <v-row cols="12" style="position: absolute; bottom: 0; left:16px; width: 100%;">
                               <span name="sub1" class="justify-start col-7 updated-time caption">{{ moment(post.date).calendar() }}</span>
                               <v-subheader name="sub2" class="justify-end col-5 justify-space-around" >
                                    <span>
                                        <v-icon>mdi-heart-outline</v-icon> {{ post.likes }}
                                    </span>
                                   <span>
                                        <v-icon>mdi-comment-outline</v-icon> {{ post.comments ? post.comments : 0 }}
                                    </span>
                               </v-subheader>
                           </v-row>
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

<style scoped>

    .subtitle-1 {
        color: black !important;
    }

</style>
