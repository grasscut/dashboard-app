<template>
  <div>
    <!-- Type filters -->
    <v-divider class="mt-2"></v-divider>
    <v-chip-group multiple show-arrows active-class="primary--text">
      <v-chip v-for="type in types" :key="type" @click="changeFilter(type)" color="white">
        <v-icon left>{{ getEventIcon(type) }}</v-icon>
        {{ type }}
      </v-chip>
    </v-chip-group>
    <v-divider></v-divider>

    <!-- Events -->
    <v-chip v-if="events.length > 0" id="scrollToToday" @click="scrollToToday" class="mt-2">Scroll to today</v-chip>
    <div id="eventsContainer" style="height: 220px; overflow-y: auto; overflow-x: hidden; padding-top: 40px;">
      <v-progress-circular v-if="events.length === 0" class="progressSpinner" indeterminate></v-progress-circular>
      <v-btn v-if="events.length > 0" text width="100%" @click="() => loadMore(true)" :loading="futureLoadProgress">Load more</v-btn>
      <template v-for="(items, date) in filteredEvents">
        <div :key="date">
          <span v-if="moment().isSame(date, 'day')" id="today" class="d-block text-center subtitle-2 red--text font-weight-bold my-2">Today</span>
          <span v-else class="d-block text-center my-2" :id="topScrollPosition === date ? 'topScrollPosition' : ''">{{ moment(date).calendar() }}</span>
          <v-card flat class="pa-0" style="overflow-x: auto;">
            <v-card-text class="d-flex pa-0">
              <template v-for="item in items">
                <span v-if="item.type === 'noEventsToday'" :key="item.date + '.' + 'noEvents'" v-show="items.length === 1" style="height: 98px;">Today is just a normal day.</span>
                <div v-else :key="item.type + item.person.username + item.date + item.title" class="mr-6">
                  <v-badge :color="getEventColor(item.type)" right bottom overlap>
                    <template v-slot:badge>
                      <v-icon dark>
                        {{ getEventIcon(item.type) }}
                      </v-icon>
                    </template>
                    <v-tooltip bottom max-width="400" open-delay="300">
                      <template v-slot:activator="{ on }">
                        <v-avatar v-on="on" height="72" width="72">
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
      <v-btn v-if="events.length > 0" text width="100%" @click="() => loadMore()" :loading="pastLoadProgress">Load more</v-btn>
    </div>

    <!-- Search -->
    <v-form ref="form" v-on:submit.prevent="() => $emit('searchSubmitted', search)">
      <v-text-field required placeholder="Employee's name or car plate" v-model="search" class="pt-0">
        <template v-slot:append>
          <v-btn text @click="() => $emit('searchSubmitted', search)">Search</v-btn>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import { groupBy, getOrdinalNumber } from '../utils/helpers';

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
      types: ['birthday', 'workbirthday', 'kudos', 'startdate'],
      selectedTypes: [],
      events: [],
      nextPageUrl: '',
      prevPageUrl: '',
      shouldScrollToToday: true,
      topScrollPosition: '',
      handleFutureLoad: false,
      futureLoadProgress: false,
      pastLoadProgress: false,
      search: '',
    }),
    computed: {
      filteredEvents: function() {
        const filteredEvents = this.events.filter((event) => (
          this.selectedTypes.length === 0 || this.selectedTypes.includes(event.type) || event.type === 'noEventsToday'
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
      moment: function (date) {
        return moment(date);
      },
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
        this.shouldScrollToToday = true;
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
          this.$vuetify.goTo('#today', { container: '#eventsContainer', offset: 276 });
          this.shouldScrollToToday = false;
        }
      },
      loadMore: function(future) {
        let api;
        if (future) {
          api = this.nextPageUrl;
          this.futureLoadProgress = true;
        } else {
          api = this.prevPageUrl;
          this.pastLoadProgress = true;
        }

        axios.get(api).then(({ data }) => {
          const events = this.getEvents(data.groups);

          if (future) {
            this.futureLoadProgress = false;
            this.topScrollPosition = Object.keys(this.filteredEvents)[0];
            this.handleFutureLoad = true;
            this.nextPageUrl = data.nextPageUrl;
          } else {
            this.pastLoadProgress = false;
            this.prevPageUrl = data.nextPageUrl;
          }

          this.events = [ ...this.events, ...events ];
        });
      },
    },
    mounted() {
      axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=10&future=true').then(({ data }) => {
        this.events = this.getEvents(data.groups);
        this.nextPageUrl = data.nextPageUrl;

        axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=10').then(({ data }) => {
          const events = this.getEvents(data.groups);
          const today = moment().format('YYYY-MM-DD');

          events.push({ date: today, type: 'noEventsToday' });

          this.events = [ ...this.events, ...events ];
          this.prevPageUrl = data.nextPageUrl;
        });
      });
    },
    updated() {
      if (this.shouldScrollToToday) {
        this.scrollToToday();
      }
      if (this.handleFutureLoad) {
        this.$vuetify.goTo('#topScrollPosition', { container: '#eventsContainer', offset: 322, duration: 0 });
        this.handleFutureLoad = false;
      }
    }
  };
</script>

<style lang="scss">
  .v-card {
    padding: 12px 20px;
  }

  .v-btn:focus::before {
    background-color: white !important;
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
    opacity: .8;
  }
</style>
