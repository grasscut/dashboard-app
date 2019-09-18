<template>
    <v-card class="mb-2 d-flex flex-column" height="688">
        <v-card-title>
            <h4>ProTube</h4>
        </v-card-title>

        <iframe
                height="500"
                frameborder="0"
                style="max-width: 650px"
                allowfullscreen
                :src="'http://www.youtube.com/embed/'+this.videoId"
        />
        <v-row style="overflow-y: auto">
            <template  v-for="video in this.videos">
                <v-col cols="6" sm="6" md="6" lg="4" xl="4" :key="video.id">
                    <v-card class="d-flex flex-column pa-0"
                            flat
                            @click="videoId = video.id">
                            <v-img class="white--text pa-0"
                                   xl="4"
                                   style="max-height: 300px"
                                   :src="'http:///img.youtube.com/vi/'+video.id+'/0.jpg'">
                            </v-img>
                            <v-card-text class="subtitle-1 ellipsis-2 font-weight-bold">{{ video.title }}</v-card-text>
                            <v-card-text class="caption">{{ video.views }} views</v-card-text>
                            <v-card-text class="caption">{{ moment( video.date).calendar() }}</v-card-text>
                    </v-card>
                </v-col>
            </template>
        </v-row>
    </v-card>
</template>
<script>

    import moment from '../utils/moment';
    export default {
        name: "TeamsProjectsCard",
        data: () => ({
            videoId:'x-ISMhDsLGA',
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