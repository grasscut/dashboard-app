<template>
    <v-card class="mb-2 d-flex flex-column" height="488">
        <v-card-title>
            <h4>News Feed</h4>
        </v-card-title>
        <v-card-text class="pa-0" style="overflow: auto; margin: 0 16px 16px;">
            <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
            <v-row>
                <template v-for="post in posts">
                    <v-col sm="12" md="6" lg="6" :key="post.title" :pa="$vuetify.breakpoint.smAndDown ? 0 : 2">
                       <v-card :height="200">
                           <v-img :src="'https://intra.proekspert.ee/'+ post.image"></v-img>
                           <v-card-text class="card-title">{{ post.title }}
                           </v-card-text>
                           <v-row cols="12" style="position: absolute; bottom: 0">
                               <v-text name="sub1" class="justify-start col-5 updated-time caption">{{ post.date }}</v-text>
                               <v-subheader name="sub2" class="justify-end col-7 justify-space-around" >
                                    <span>
                                        <v-icon>mdi-heart-outline</v-icon> {{ post.likes }}
                                    </span>
                                   <span>
                                    <v-icon>mdi-comment-outline</v-icon> {{ posts.comments ? posts.comments : 0 }}
                                </span>
                               </v-subheader>
                           </v-row>
                       </v-card>
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

    .card-title {
        max-height: 80px;
        overflow: hidden;
        display: block;
    }

</style>