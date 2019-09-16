<template>
    <div style="display: inline-flex; width: 100%">
        <v-list-item-avatar class="align-self-start">
            <v-img :src="post.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <b>{{ post.user }}</b>
            <a :href="post.items[0].url" target="_blank">{{ post.items[0].title }}</a>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text>
                {{ moment(post.items[0].modifiedAt).calendar() }}
            </v-list-item-action-text>
        </v-list-item-action>
    </div>
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