<template>
    <v-card class="pa-0 fill-height d-flex flex-column" :href="post.items[0].url" target="_blank" elevation="2">
        <v-chip v-if="post.items[0].isNew"
                class="new-badge ma-2"
                color="green"
                text-color="white"
        >
            New!
        </v-chip>
        <v-img contain
               height="180"
               class="pa-0"
                src="../../assets/images/placeholder.png"
        ></v-img>
        <v-card-text class="subtitle-1 black--text" >
            <span class="ellipsis-2 font-weight-bold"> {{ post.items[0].title }}</span>
            <span class="caption"> {{ post.user ? 'by ' + post.user  : ''}}</span>
        </v-card-text>
        <v-card-actions>
            <span class="caption">
                {{ moment(post.items[0].modifiedAt).calendar() }}
            </span>
        </v-card-actions>
    </v-card>
</template>

<script>

    import moment from '../../utils/moment';
    export default {
        props: ['post'],
        methods: {
            moment: function (date) {
                return moment(date);
            },
        }
    }
</script>