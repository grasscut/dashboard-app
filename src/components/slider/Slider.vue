<template>
    <div>
        <hooper ref="carousel"
                :settings="hooperSettings"
                style="height: auto"
        >
            <slide  v-for="post in posts" :key="post.url">
                <v-card
                        flat
                        height="450"
                        :href="post.url"
                        target="_blank"
                        @click="() => $emit(post.clickAction, post)"
                >
                    <no-image v-if="!post.image"></no-image>
                    <template v-else>
                        <v-img :src="'https://intra.proekspert.ee/'+ post.image"
                               :height="$vuetify.breakpoint.smAndDown ? 250 : 300"
                               v-if="!post.rawUrl"></v-img>
                        <v-img :src="post.image"
                               :height="$vuetify.breakpoint.smAndDown ? 200 : 250"
                               v-else></v-img>
                    </template>
                    <v-card-text class="title">
                        <span class="ellipsis-2">{{ post.title }}</span>
                        <span class="caption" v-if="post.author"> {{'by ' + post.author }}</span>
                    </v-card-text>

                    <v-card-actions class="card-actions">
                        <span class="caption">{{ moment(post.date).calendar() }}</span>
                        <v-spacer></v-spacer>
                        <div  v-if="post.likes">
                            <span class="mr-1">
                                  <v-icon>mdi-heart-outline</v-icon> {{ post.likes }}
                            </span>
                            <span>
                                  <v-icon >mdi-comment-outline</v-icon> {{ post.comments }}
                            </span>
                        </div>
                    </v-card-actions>
                </v-card>
            </slide>
        </hooper>
        <v-row>
            <v-btn md="6" v-show="this.posts.length > 0" color="white" fab light small  bottom @click="slidePrev">
                <v-icon color="blue">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn v-show="this.posts.length > 0"
                   color="white"
                   style="right: 10px !important;"
                   fab light small absolute @click="slideNext">
                <v-icon color="blue">mdi-arrow-right</v-icon>
            </v-btn>
        </v-row>
    </div>
</template>

<script>
    import { Hooper, Slide } from 'hooper';
    import 'hooper/dist/hooper.css';
    import moment from '../../utils/moment';
    import NoImage from "./NoImage";

    export default {
        data: () => ({
            hooperSettings: {
                itemsToShow: 1,
                breakpoints: {
                    700: {
                        itemsToShow: 2
                    },
                    1040: {
                        itemsToShow: 3
                    },
                    1900: {
                        itemsToShow: 6,
                    }
                }
            }
        }),
        props: ['posts', 'config'],
        components: {
            Hooper,
            Slide,
            NoImage,
        },
        methods: {
            moment(date) {
                return moment(date);
            },
            slidePrev() {
                this.$refs.carousel.slidePrev();
            },
            slideNext() {
                this.$refs.carousel.slideNext();
            },
        },
    };
</script>

<style scoped>
    .card-actions {
        position: absolute;
        bottom: 0;
        width: 90%;
        padding: 16px;
    }

</style>
