<template>
  <v-card min-height="488" class="mb-2">
    <v-card-title>
      <h4>People</h4>
    </v-card-title>
    <v-card-text>
      <v-tabs>
        <v-tab>Feed</v-tab>
        <v-tab>Vacations</v-tab>

        <v-tab-item>
          <people-feed @searchSubmitted="(search) => submitSearch(search)"></people-feed>
        </v-tab-item>
        <v-tab-item>
          <vacations></vacations>
        </v-tab-item>
      </v-tabs>

      <!-- Search result -->
      <div v-if="searchResults.length > 0" style="max-height: 360px; overflow: auto;">
        <template v-for="(person, i) in searchResults">
          <div :key="person.name" class="text-center">
            <v-avatar width="100" height="100" class="mb-2">
              <img :src="'https://intra.proekspert.ee' + person.avatar" style="object-fit: cover;" />
            </v-avatar>
            <h2 class="text-center">{{ person.name }}</h2>
            <span class="d-block text-center">{{ person.position }} @ {{ person.team }}</span>
            <p class="mt-2 body-1 text-left" style="line-height: 2;">
             <v-icon left>mdi-domain</v-icon>{{ person.office }}<br />
              <span v-if="!!person.phone">
                <v-icon left>mdi-phone-outline</v-icon>{{ person.phone }}<br />
              </span>
              <span v-if="!!person.skype">
                <v-icon left>mdi-skype</v-icon>{{ person.skype }}<br />
              </span>
              <v-icon left>mdi-cupcake</v-icon>{{ new Date(person.dateOfBirth).toLocaleDateString() }}<br />
              <v-icon left>mdi-star</v-icon>{{ person.workBirthday }}
            </p>
            <v-divider v-if="(searchResults.length-1) !== i" class="my-2"></v-divider>
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import PeopleFeed from './PeopleFeed';
import Vacations from './Vacations';

moment.locale('en-gb');
moment.locale('en-gb', {
  calendar : {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'LL'
  }
});

export default {
  data: () => ({
    searchResults: [],
  }),
  components: {
    PeopleFeed,
    Vacations,
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
    submitSearch: function(search) {
      axios.get(`/api/employees?q=${search}`).then(({ data }) => {
        this.searchResults = data;
      });
    },
  },
};
</script>
