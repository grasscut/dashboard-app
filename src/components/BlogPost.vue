<template>
    <v-card height="300px">
        <v-img height="20%"
               width="100%"
               class="white--text pa-0"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        ></v-img>
        <v-avatar>
            <v-img :src="post.avatar"></v-img>
        </v-avatar>
        <v-card-text max-heigth="40%">
            <a :href="post.items[0].url" target="_blank" style="text-decoration: none">{{ post.items[0].title }}</a>
            <b>{{ post.user }}</b>
        </v-card-text>
        <v-subtitle-2>
            {{ moment(post.items[0].modifiedAt).calendar() }}
        </v-subtitle-2>

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