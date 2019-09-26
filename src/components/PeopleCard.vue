<template>
  <v-card
          min-height="488"
          class="mb-2"
          flat
  >
    <v-card-title>
      <h4>People</h4>
    </v-card-title>
    <v-card-text>
      <v-tabs>
        <v-tab>Feed</v-tab>
        <v-tab @click="searchResults = []">Vacations</v-tab>

        <v-tab-item>
          <people-feed
                  @searchSubmitted="(search) => submitSearch(search)"
                  @dynamicSearch="(search) => filterSearch(search)"
          ></people-feed>
        </v-tab-item>
        <v-tab-item>
          <vacations></vacations>
        </v-tab-item>
      </v-tabs>

      <!-- Search result -->
      <div v-if="searchResults.length > 0 || searchInProgress" class="text-center" style="max-height: 360px; overflow: auto;">
        <v-progress-circular v-if="searchInProgress" indeterminate></v-progress-circular>
        <v-list class="text-left">
          <v-list-item v-for="(person, i) in searchResults" class="pa-0">
            <v-list-item-avatar size="100">
              <img :src="'https://intra.proekspert.ee' + person.avatar" style="object-fit: cover;" />
            </v-list-item-avatar>
            <v-list-item-content>
              <h3>{{ person.name }}</h3>
              <span>{{ person.position }} @ {{ person.team }}</span>
              <v-row style="white-space: nowrap; line-height: 1.5;">
                <v-col :class="$vuetify.breakpoint.xs ? 'pb-0' : ''">
                  <v-icon small left>mdi-domain</v-icon>
                  <a :href="`https://intra.proekspert.ee/jkeskus/locations?id=${person.id}`" target="_blank" style="text-decoration: none">{{ person.office }}</a><br />
                  <br />
                  <span v-if="!!person.phone">
                    <v-icon small left>mdi-phone-outline</v-icon>
                    <a :href="`tel:${person.phone}`">{{ person.phone }}</a><br />
                  </span>
                  <span v-if="!!person.skype">
                    <v-icon small left>mdi-skype</v-icon>
                    <a :href="`skype:${person.skype}`">{{ person.skype }}</a><br />
                  </span>
                </v-col>
                <v-col :class="$vuetify.breakpoint.xs ? 'pt-1' : ''">
                  <span v-if="!!person.car">
                    <v-icon small left>mdi-car</v-icon>{{ person.car }}<br />
                  </span>
                  <v-icon small left>mdi-cupcake</v-icon>{{ new Date(person.dateOfBirth).toLocaleDateString() }}<br />
                  <v-icon small left>mdi-star</v-icon>{{ person.workBirthday }}
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
    searchInProgress: false,
  }),
  components: {
    PeopleFeed,
    Vacations,
  },
  methods: {
    moment: function (date) {
      return moment(date);
    },
    filterSearch: function(search) {
      search.length !== 0 ? this.submitSearch(search) : this.searchResults = [];
    },
    submitSearch: function(search) {
      this.searchResults = [];
      this.searchInProgress = true;
      axios.get(`/api/employees?q=${search}`).then(({ data }) => {
        this.searchResults = data;
        this.searchInProgress = false;
      });
    },
  },
};
</script>
