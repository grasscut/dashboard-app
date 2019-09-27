<template>
    <v-card
            class="my-2 d-flex flex-column"
            height="630"
            flat
            style="overflow-x: auto;"
    >
        <v-card-title>
            <h4>Newsfeed</h4>
        </v-card-title>
        <slider :posts="posts"></slider>
        <v-card-text class="my-3">
            <v-progress-circular v-if="posts.length === 0" indeterminate class="progressSpinner"></v-progress-circular>

          <!--  <v-btn v-if="posts.length > 0" text width="100%" @click="() => loadMore()" :loading="loadMoreProgress">Load more</v-btn>-->
        </v-card-text>
    </v-card>
</template>

<script>
    import moment from '../utils/moment';
    import axios from 'axios';
    import Slider from "./slider/Slider";


    export default {
        data: () => ({
            posts: [],
            nextPageUrl: '',
            loadMoreProgress: false,
            index: 4
        }),
        components: {
            Slider
        },
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

</style>