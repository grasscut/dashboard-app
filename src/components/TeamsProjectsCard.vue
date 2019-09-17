<template>
    <v-card class="mb-2 d-flex flex-column" height="488">
        <v-card-title>
            <h4>Teams / Projects</h4>
        </v-card-title>
        <v-card-text style="overflow-y: auto; ">
            <template v-for="event in events">
                <p><b>{{ event.title }}</b></p>
                <div>{{ event.summary }}</div>
                <br>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {
        data: () => ({
            events: [],
            nextPageUrl: '',
            loadMoreProgress: false,
        }),
        mounted () {
            axios.get('/api/challenges').then(({ data }) => {
                this.events = data;
                this.nextPageUrl = data.nextPageUrl;
            });
        },
    }
</script>

<style scoped>

</style>