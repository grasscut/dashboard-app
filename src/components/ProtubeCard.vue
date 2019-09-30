<template>
    <v-card class="mb-2" flat>
        <v-card-title>
            <h4>ProTube</h4>
        </v-card-title>
        <v-col sm="10" lg="8" offset-lg="2" xl="8" offset-xl="2" offset-sm="1">
            <iframe
                    :height=" $vuetify.breakpoint.xl ? 800 : 500"
                    frameborder="0"
                    style="width: inherit;"
                    allowfullscreen
                    :src="'http://www.youtube.com/embed/'+this.videoId"
            />
            <v-row style="width: 100%;">
                <span class="caption col" >{{ video_views }} views</span>
                <span class="caption justify-end">{{ moment( video_date).calendar() }}</span>
            </v-row>
        </v-col>
        <slider :posts="getVideos"  @videoClicked="(video) => videoClicked(video)"></slider>

<!--            <v-col lg="4">-->
<!--                <template  v-for="video in this.videos">-->
<!--                    <v-col :key="video.id" class="pa-0" >-->
<!--                        <v-card flat-->
<!--                                style="display: flex; padding: 0"-->
<!--                                @click="videoId = video.id; video_views = video.views; video_date = video.date">-->
<!--                            <v-img class="white&#45;&#45;text pa-0"-->
<!--                                   style="height: 120px; width: 280px"-->
<!--                                   :src="'http:///img.youtube.com/vi/'+video.id+'/0.jpg'">-->
<!--                            </v-img>-->
<!--                            <v-card-text lg="6" class="subtitle-1">-->
<!--                                <p class="ellipsis-2 font-weight-bold">{{ video.title }}</p>-->
<!--                            </v-card-text>-->
<!--                        </v-card>-->
<!--                    </v-col>-->
<!--                </template>-->

<!--            </v-col>-->

    </v-card>
</template>
<script>

    import moment from '../utils/moment';
    import Slider from "./slider/Slider";

    export default {
        name: "TeamsProjectsCard",
        data: () => ({
            videoId:'x-ISMhDsLGA',
            video_views: 123,
            video_date: "2019-08-27",
            videos:[
                {
                    id:"x-ISMhDsLGA",
                    title:"Proekspert Summer Boot Camp with subs",
                    views: 123,
                    date:"2019-08-27"
                },
                {
                    id:"sqBSFM1llIA",
                    title:"Happy people and beautiful code @Proekspert",
                    views: 13,
                    date:"2019-08-27"
                },
                {
                    id:"zbYf5_S7oJo",
                    title:"Service Design service productisation attempt - pt2",
                    views: 223,
                    date:"2019-08-27"
                },
            ]
        }),
        methods: {
            moment: function (date) {
                return moment(date);
            },
            videoClicked(video) {
                this.videoId = video.id;
                this.video_views = video.views;
                this.video_date = video.date
            }
        },
        components: {
            Slider
        },
        computed: {
            getVideos() {
                return this.videos.map((video) => {
                   let props = {
                       id: video.id,
                       views: video.views,
                       title: video.title,
                        date: video.date,
                        image: 'http:///img.youtube.com/vi/'+video.id+'/0.jpg',
                        rawUrl: true,
                        clickAction: 'videoClicked'
                   } ;
                   return props;
                });
            }
        },

    }
</script>

<style scoped>

</style>