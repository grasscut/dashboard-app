<template>
    <v-card height="300px" style="padding: 0px; " :href="post.items[0].url" target="_blank" elevation="2">
        <v-chip v-if="post.items[0].isNew"
                class="new-badge ma-2"
                color="green"
                text-color="white"
        >
            New!
        </v-chip>
        <v-img contain="true"
               height="55%"
               class="white--text pa-0"
                src="../assets/images/placeholder.png"
        ></v-img>
        <v-card-text class="subtitle-1" >
            <p class="ellipsis-2" style="font-weight: bold"> {{ post.items[0].title }}</p>
            <v-text class="caption"> {{ post.user ? 'by ' + post.user  : ''}}</v-text>
        <v-subheader class="caption blog-date" style="padding: 0px;" name="sub2">
            {{ moment(post.items[0].modifiedAt).calendar() }}
        </v-subheader>
        </v-card-text>
    </v-card>
</template>

<script>

    import moment from '../utils/moment';
    export default {
        props: ['post'],
        methods: {
            moment: function (date) {
                return moment(date);
            },
        }
    }
</script>

<style scoped>
    .blog-date {
        position: absolute;
        bottom: 0;
    }

    .subtitle-1 {
        color: black !important;
    }

</style>