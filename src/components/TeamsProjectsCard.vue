<template>
    <v-card class="mb-2 d-flex flex-column"
            :height="$vuetify.breakpoint.smAndDown? auto: 488" flat>
        <v-card-title>
            <h4>Teams / Projects</h4>
        </v-card-title>
        <v-card-text style="overflow-y: auto; ">
            <div v-if="events.length == 0" style="margin: 60% 15%; width: 70%"> Currently there are no openings</div>
            <v-list v-else three-line>
                <template v-for="item in events">
                    <v-subheader
                            v-if="item.header"
                            :key="item.header"
                            v-text="item.header"
                    ></v-subheader>

                    <v-list-item
                            :key="item.title"
                            href="/"
                            target="_blank"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.summary"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
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