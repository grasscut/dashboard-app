<template>
    <v-card class="mb-2 d-flex flex-column" height="688">
        <v-card-title>
            <h4>ProTube</h4>
        </v-card-title>
        <iframe
                height="300"
                frameborder="0"
                style="max-width: 650px"
                allowfullscreen
                :src="'http://www.youtube.com/embed/'+this.videoId" ></iframe>
        <v-row>
            <template  v-for="video in this.videos">
                <v-col xl="4" :key="video.id">
                    <v-card class="d-flex flex-column pa-0"
                            flat="true"
                            @click="videoId = video.id">
                            <v-img class="white--text pa-0"
                                   xl="4"
                                   :src="'http:///img.youtube.com/vi/'+video.id+'/0.jpg'">
                            </v-img>
                            <v-text class="subtitle-1 ellipsis-2">{{ video.title }}</v-text>
                            <v-subheader>{{ video.views }} views</v-subheader>
                            <v-subheader>{{ moment( video.date).calendar() }}</v-subheader>
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