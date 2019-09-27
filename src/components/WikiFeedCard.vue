<template>
  <v-card class="mb-2 d-flex flex-column" height="488" flat>
    <v-card-title>
      <h4>Wiki feed</h4>
    </v-card-title>
    <v-card-text class="pa-0" style="overflow: auto;">
      <v-progress-circular v-if="events.length === 0" indeterminate class="progressSpinner"></v-progress-circular>
      <v-list>
        <v-list-item v-for="event in events">
          <v-list-item-avatar class="align-self-start">
            <v-img :src="event.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <b>{{ event.user }}</b>
            <span v-for="item in event.items" v-html="getAction(item)" :key="item.modifiedAt">
            </span>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              {{ moment(event.items[0].modifiedAt).calendar() }} {{ moment(event.items[0].modifiedAt).format('HH:MM') }}
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-btn v-if="events.length > 0" text width="100%" @click="() => loadMore()" :loading="loadMoreProgress">Load more</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from '../utils/moment';
import axios from 'axios';

export default {
  data: () => ({
    events: [],
    nextPageUrl: '',
    loadMoreProgress: false,
  }),
  mounted () {
    axios.get('/api/wiki?blogSpace=dashboard&type=WIKI&count=20').then(({ data }) => {
      this.events = data.groups;
      this.nextPageUrl = data.nextPageUrl;
    });
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
    getAction: function(item) {
      let verb = 'updated';

      if (item.contentVersion === 1) {
        verb = 'created';
      }
      if (item.type === 'attachment') {
        verb = 'attached';
      }
      if (item.type === 'comment') {
        verb = 'commented on';
      }

      return `${verb} <a href="${item.url}" target="_blank">${item.title}</a>`;
    },
    loadMore: function() {
      this.loadMoreProgress = true;
      axios.get(this.nextPageUrl).then(({ data }) => {
        this.events = [...this.events, ...data.groups];
        this.nextPageUrl = data.nextPageUrl;
        this.loadMoreProgress = false;
      });
    },
  },
};
</script>