<template>
  <v-card class="mb-2">
    <v-card-title>
      <h2>People</h2>
    </v-card-title>
    <v-card-text>
      <!-- Type filters -->
      <v-divider class="mt-2"></v-divider>
      <v-chip-group multiple mandatory>
        <v-chip v-for="type in types" :key="type" @click="changeFilter(type)" :color="getEventColor(type)" text-color="white">
          {{ type }}
          <v-icon right>{{ getEventIcon(type) }}</v-icon>
        </v-chip>
      </v-chip-group>
      <v-divider class="mb-2"></v-divider>

      <!-- Events -->
      <v-chip id="scrollToToday" @click="scrollToToday">Scroll to today</v-chip>
      <div style="max-height: 400px; overflow-y: auto; padding-top: 32px; overflow-x: hidden;" id="eventsContainer" v-scroll:#eventsContainer="loadMore">
        <template v-for="(items, date) in filteredEvents">
          <div :key="date">
            <v-subheader v-if="new Date().toDateString() === new Date(date).toDateString()" id="today" class="d-block text-center subtitle-2 red--text font-weight-bold">Today</v-subheader>
            <v-subheader v-else class="d-block text-center">{{ new Date(date).toLocaleDateString() }}</v-subheader>
            <v-card flat class="pa-0" style="overflow-x: auto;">
              <v-card-text class="d-flex">
                <template v-for="item in items">
                  <span v-if="item.type === 'noEventsToday'" :key="item.date + '.' + 'noEvents'" v-show="items.length === 1">Today is just a normal day.</span>
                  <div v-else :key="item.type + item.person.username + item.date + item.title" class="mr-6">
                    <v-badge v-if="selectedTypes.includes(item.type)" :color="getEventColor(item.type)" right bottom overlap>
                      <template v-slot:badge>
                        <v-icon dark>
                          {{ getEventIcon(item.type) }}
                        </v-icon>
                      </template>
                      <v-tooltip bottom max-width="400" open-delay="300">
                        <template v-slot:activator="{ on }">
                          <v-avatar v-on="on">
                            <img
                              :src="item.person.avatar"
                              :alt="item.person.name"
                            >
                          </v-avatar>
                        </template>
                        <span v-html="getTooltipText(item)"></span>
                      </v-tooltip>
                    </v-badge>
                    <div class="mt-1 text-center">{{ item.person.name.split(' ')[0] }}</div>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </div>
        </template>
      </div>

      <!-- Search -->
      <v-divider class="mt-2"></v-divider>
      <v-form ref="form">
        <v-text-field required placeholder="Employee's name or car plate" v-model="search">
          <template v-slot:append>
            <v-btn text @click="submitSearch">Search</v-btn>
          </template>
        </v-text-field>
      </v-form>

      <!-- Search result -->
      <div v-if="!!searchResults" class="mt-6" style="max-height: 400px; overflow: auto;">
        <template v-for="person in searchResults">
          <div :key="person.name">
            <h3>{{ person.name }}</h3>
            <p>
              <span>{{ person.position }} @ {{ person.team }}</span><br />
              <span><v-icon small left>mdi-domain</v-icon>{{ person.office }}</span><br />
              <span><v-icon small left>mdi-phone-outline</v-icon>{{ person.phone }}</span><br />
              <span><v-icon small left>mdi-video-outline</v-icon>{{ person.skype }}</span><br />
              <span><v-icon small left>mdi-cupcake</v-icon>{{ new Date(person.dateOfBirth).toLocaleDateString() }}</span><br />
              <span><v-icon small left>mdi-star</v-icon>{{ person.workBirthday }}</span><br />
            </p>
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import { groupBy, getOrdinalNumber } from '../utils/helpers';

export default {
  data: () => ({
    types: ['birthday', 'workbirthday', 'kudos', 'startdate'],
    selectedTypes: ['birthday', 'workbirthday', 'kudos', 'startdate'],
    events: [],
    initialScrollToTodayDone: false,
    nextPageUrl: '',
    prevPageUrl: '',
    search: '',
    searchResults: [],
  }),
  computed: {
    filteredEvents: function () {
      const filteredEvents = this.events.filter((event) => (
        this.selectedTypes.includes(event.type) || event.type === 'noEventsToday'
      ));
      const groupedEvents = groupBy(filteredEvents, 'date');
      const orderedEvents = {};
      Object.keys(groupedEvents).sort().reverse().forEach(function(key) {
        orderedEvents[key] = groupedEvents[key];
      });

      return orderedEvents;
    },
  },
  methods: {
    getEvents: function(events) {
      return events.map((item) => {
        const { type, items, user: name, avatar, username } = item;
        const date = items[0].modifiedAt.split('T')[0];
        const { title, body } = items[0];

        return {
          date,
          type,
          title,
          body,
          person: {
            name,
            avatar,
            username,
          },
        };
      });
    },
    changeFilter: function(type) {
      if (this.selectedTypes.includes(type)) {
        this.selectedTypes = this.selectedTypes.filter((item) => item !== type);
      } else {
        this.selectedTypes.push(type);
      }
    },
    getEventColor: function(type) {
      if (type === 'birthday') {
        return 'red';
      }
      if (type === 'workbirthday') {
        return 'blue';
      }
      if (type === 'kudos') {
        return 'green';
      }
      if (type === 'startdate') {
        return 'orange';
      }
    },
    getEventIcon: function(type) {
      if (type === 'birthday') {
        return 'mdi-cupcake';
      }
      if (type === 'workbirthday') {
        return 'mdi-star';
      }
      if (type === 'kudos') {
        return 'mdi-thumb-up';
      }
      if (type === 'startdate') {
        return 'mdi-calendar';
      }
    },
    getTooltipText: function(event) {
      if (event.type === 'birthday') {
        return `It's <strong>${event.person.name}'s</strong> ${getOrdinalNumber(event.title)} birthday!`
      }
      if (event.type === 'workbirthday') {
        return `It's <strong>${event.person.name}'s</strong> ${getOrdinalNumber(event.title)} work anniversary!`
      }
      if (event.type === 'kudos') {
        return `<strong>${event.person.name}</strong> received a kudos from <strong>${event.title}</strong>:<br/><i>${event.body}</i>`;
      }
      if (event.type === 'startdate') {
        return `<strong>${event.person.name}</strong> joined Proekspert!`;
      }
    },
    scrollToToday: function() {
      if (document.getElementById('today')) {
        this.$vuetify.goTo('#today', { container: '#eventsContainer', offset: 250 });
        this.initialScrollToTodayDone = true;
      }
    },
    loadMore: function(e) {
      if (e.target.scrollTop === 0) {
        axios.get(this.nextPageUrl).then(({ data }) => {
          const events = this.getEvents(data.groups);

          this.events = [ ...this.events, ...events ];
          this.nextPageUrl = data.nextPageUrl;

          e.target.scrollTop = 400;
        });
      }

      if (e.target.scrollTop === (e.target.scrollHeight - e.target.clientHeight)) {
        axios.get(this.prevPageUrl).then(({ data }) => {
          const events = this.getEvents(data.groups);

          this.events = [ ...this.events, ...events ];
          this.prevPageUrl = data.nextPageUrl;
        });
      }
    },
    submitSearch: function() {
      if (this.$refs.form.validate()) {
        axios.get(`/api/employees?q=${this.search}`).then(({ data }) => {
          this.searchResults = data;
        });
      }
    },
  },
  mounted() {
    axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=70&future=true').then(({ data }) => {
      this.events = this.getEvents(data.groups);
      this.nextPageUrl = data.nextPageUrl;

      axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=70').then(({ data }) => {
        const events = this.getEvents(data.groups);
        const today = new Date();
        const todayDate =  `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;

        events.push({ date: todayDate, type: 'noEventsToday' });

        this.events = [ ...this.events, ...events ];
        this.prevPageUrl = data.nextPageUrl;
      });
    });
  },
  updated() {
    if (!this.initialScrollToTodayDone) {
      this.scrollToToday();
    }
  }
};
</script>

<style lang="scss">
  .v-card {
    padding: 12px 20px;
  }

  .v-slide-group__prev--disabled, .v-slide-group__next--disabled {
    display: none !important;
  }

  .v-badge__badge {
    .v-icon {
      font-size: 14px !important;
    }
  }

  .v-chip {
    &.white--text .v-chip__content {
      color: white !important;
    }

    &--active {
      opacity: .5;
    }
  }

  .v-avatar {
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }

  #scrollToToday {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 1;
  }
</style>
