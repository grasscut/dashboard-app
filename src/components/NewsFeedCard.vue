<template>
    <v-card
            class="my-2 d-flex flex-column"
            height="650"
            flat
            style="overflow-x: auto;"
    >
        <v-card-title class="title">
            Newsfeed
        </v-card-title>
        <v-card-text class="my-3">
            <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
            <v-row dense class="d-flex overflow-x-auto flex-nowrap wrapper-box">
                <template v-for="(post, i) in posts">
                    <v-col :key="post.title" :class="$vuetify.breakpoint.smAndDown ? 'px-0' : ''">
                       <v-card
                               height="420px"
                               min-width="300px"
                               flat
                               style="margin: 0 auto;" class="pa-0" :href="post.url" target="_blank"
                               :id="'feed_'+i"
                       >
                           <v-img height="300" :src="'https://intra.proekspert.ee/'+ post.image"></v-img>
                           <v-card-text class="title">
                               <span class="ellipsis-2" :title="post.title">{{ post.title }}</span>
                           </v-card-text>
                           <v-card-actions class="card-actions">
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
            <div>
                <v-btn
                        v-show="!hidden"
                        color="white"
                        fab
                        light
                        small
                        absolute
                        right
                        @click="scroll_right"
                >
                    <v-icon color="blue">mdi-arrow-right</v-icon>
                </v-btn>
            </div>
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
            index: 4
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
            scroll_left() {
                let content = document.querySelector(".wrapper-box");
                this.$vuetify.goTo('#today', { container: '#eventsContainer', offset: 270 });
                content.scrollLeft -= 250;
            },
            scroll_right() {
                this.$vuetify.goTo("#feed_4");
                //content.scrollLeft += 250;
            }
        },
    };
</script>

<style scoped>
    .card-actions {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 16px;
    }
</style>