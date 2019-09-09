<template>
  <v-card class="mb-2">
    <v-card-title>
      <h2>People</h2>
    </v-card-title>
    <v-card-text>
      <!-- Type filters -->
      <v-divider class="mt-2"></v-divider>
      <v-chip-group multiple>
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
            <v-card flat class="pt-0" style="overflow-x: auto;">
              <v-card-text class="d-flex">
                <template v-for="item in items">
                  <span v-if="item.type === 'noEventsToday'" :key="item.date + '.' + 'noEvents'" v-show="items.length === 1">Today is just a normal day.</span>
                  <div v-else :key="item.type + item.person.username + item.date" class="mr-6">
                    <v-badge v-if="selectedTypes.includes(item.type)" :color="getEventColor(item.type)" right bottom overlap>
                      <template v-slot:badge>
                        <v-icon dark>
                          {{ getEventIcon(item.type) }}
                        </v-icon>
                      </template>
                      <v-avatar>
                        <img
                          :src="item.person.avatar"
                          :alt="item.person.name"
                        >
                      </v-avatar>
                    </v-badge>
                    <div class="mt-1 text-center">{{ item.person.name.split(' ')[0] }}</div>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default {
  data: () => ({
    types: ['birthday', 'workbirthday', 'kudos', 'startdate'],
    selectedTypes: ['birthday', 'workbirthday', 'kudos', 'startdate'],
    events: [],
    initialScrollToTodayDone: false,
    nextPageUrl: '',
    prevPageUrl: '',
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
    getEventIcon: function (type) {
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
    scrollToToday: function() {
      if (document.getElementById('today')) {
        this.$vuetify.goTo('#today', { container: '#eventsContainer', offset: 250 });
        this.initialScrollToTodayDone = true;
      }
    },
    loadMore: function(e) {
      if (e.target.scrollTop === 0) {
        axios.get(this.nextPageUrl).then(({ data }) => {
          const events = data.groups.map((item) => {
            const { type, items, user: name, avatar, username } = item;
            const date = items[0].modifiedAt.split('T')[0];

            return {
              date,
              type,
              person: {
                name,
                avatar,
                username,
              },
            };
          });

          this.events = [ ...this.events, ...events ];
          this.nextPageUrl = data.nextPageUrl;
          
          e.target.scrollTop = 400;
        });
      }

      if (e.target.scrollTop === (e.target.scrollHeight - e.target.clientHeight)) {
        axios.get(this.prevPageUrl).then(({ data }) => {
          const events = data.groups.map((item) => {
            const { type, items, user: name, avatar, username } = item;
            const date = items[0].modifiedAt.split('T')[0];

            return {
              date,
              type,
              person: {
                name,
                avatar,
                username,
              },
            };
          });

          this.events = [ ...this.events, ...events ];
          this.prevPageUrl = data.nextPageUrl;
        });
      }
    },
  },
  mounted() {
    axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=70&future=true').then(({ data }) => {
      this.events = data.groups.map((item) => {
        const { type, items, user: name, avatar, username } = item;
        const date = items[0].modifiedAt.split('T')[0];

        return {
          date,
          type,
          person: {
            name,
            avatar,
            username,
          },
        };
      });
      this.nextPageUrl = data.nextPageUrl;

      axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=70').then(({ data }) => {
        const events = data.groups.map((item) => {
          const { type, items, user: name, avatar, username } = item;
          const date = items[0].modifiedAt.split('T')[0];

          return {
            date,
            type,
            person: {
              name,
              avatar,
              username,
            },
          };
        });
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

  .v-slide-group__prev {
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
