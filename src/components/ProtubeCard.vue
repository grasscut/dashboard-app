<template>
    <v-card class="mb-2" flat>
        <v-card-title>
            <h4>ProTube</h4>
        </v-card-title>
        <v-row>
            <v-col md="12" lg="8">
                <iframe
                        height="500"
                        frameborder="0"
                        style="max-width: 750px; width: inherit"
                        allowfullscreen
                        :src="'http://www.youtube.com/embed/'+this.videoId"
                />
                <span class="caption">{{ video_views }} views</span>
                <span class="caption">{{ moment( video_date).calendar() }}</span>
            </v-col>
            <v-col lg="4">
                <template  v-for="video in this.videos">
                    <v-col :key="video.id" class="pa-0" >
                        <v-card flat
                                style="display: flex; padding: 0"
                                @click="videoId = video.id; video_views = video.views; video_date = video.date">
                            <v-img class="white--text pa-0"
                                   style="height: 120px; width: 280px"
                                   :src="'http:///img.youtube.com/vi/'+video.id+'/0.jpg'">
                            </v-img>
                            <v-card-text lg="6" class="subtitle-1">
                                <p class="ellipsis-2 font-weight-bold">{{ video.title }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </template>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>

    import moment from '../utils/moment';
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
        }

    }
</script>

<style scoped>

</style>