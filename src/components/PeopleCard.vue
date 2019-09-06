<template>
  <v-card class="mb-2">
    <v-card-title>People</v-card-title>
    <v-card-text>
      <!-- Type filters -->
      <v-chip-group multiple>
        <v-chip selected="selectedTypes.includes(type)" v-for="type in types" :key="type" @click="changeFilter(type)">
          {{ type }}
        </v-chip>
      </v-chip-group>
      <v-divider class="mb-2"></v-divider>

      <div style="max-height: 400px; overflow-y: auto;" id="eventsContainer">
        <v-chip id="scrollToToday" @click="scrollToToday">Scroll to today</v-chip>
        <!-- Future events -->
        <template v-for="(events, date) in futureEvents">
          <div :key="date">
            <v-subheader class="d-block text-center">{{ new Date(date).toLocaleDateString() }}</v-subheader>
            <v-card flat>
              <v-card-text class="d-flex">
                <template v-for="event in events">
                  <div :key="event.type + '.' + event.person.name" class="mr-6">
                    <v-badge v-if="selectedTypes.includes(event.type)" :color="getEventColor(event.type)" right bottom overlap>
                      <template v-slot:badge>
                        <v-icon dark>
                          {{getEventIcon(event.type)}}
                        </v-icon>
                      </template>
                      <v-avatar>
                        <img
                                :src="event.person.avatar"
                                :alt="event.person.name"
                        >
                      </v-avatar>
                    </v-badge>
                    <div class="mt-1 text-center">{{ event.person.name.split(' ')[0] }}</div>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </div>
        </template>

        <!-- Today's events -->
        <v-subheader ref="today" class="d-block text-center subtitle-2 red--text">Today</v-subheader>
        <v-card flat>
          <v-card-text>
            <template v-for="event in todayEvents">
              <v-avatar :key="event.type + '.' + event.person.name" v-if="selectedTypes.includes(event.type)">
                <img
                  :src="event.person.avatar"
                  alt="event.person.name"
                >
              </v-avatar>
            </template>
            <template v-if="todayEvents.length === 0">
              <span>Today is just a normal day.</span>
            </template>
          </v-card-text>
        </v-card>

        <!-- Past events -->
        <template v-for="(events, date) in pastEvents">
          <div :key="date">
            <v-subheader class="d-block text-center">{{ new Date(date).toLocaleDateString() }}</v-subheader>
            <v-card flat>
              <v-card-text>
                <template v-for="event in events">
                  <v-badge v-if="selectedTypes.includes(event.type)" :key="event.type + '.' + event.person.name" class="mr-4" :color="getEventColor(event.type)" right bottom overlap>
                    <template v-slot:badge>
                      <v-icon dark>
                        {{getEventIcon(event.type)}}
                      </v-icon>
                    </template>
                    <v-avatar>
                      <img
                        :src="event.person.avatar"
                        :alt="event.person.name"
                      >
                    </v-avatar>
                  </v-badge>
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
    types: ['birthday', 'workbirthday', 'kudos'],
    selectedTypes: ['birthday', 'workbirthday', 'kudos'],
    todayEvents: [],
    pastEvents: [],
    futureEvents: [],
  }),
  computed: {
    filteredEvents: () => {
      return
    },
  },
  watch: {
    selectedTypes: function() {
      debugger
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
    },
    scrollToToday: function() {
      this.$vuetify.goTo(this.$refs.today, { container: '#eventsContainer', offset: 250});
    },
  },
  mounted() {
    axios.get('/api/today').then(({ data }) => (
      this.todayEvents = data.map((item) => ({
        type: item.type,
        person: {
          name: item.user,
          avatar: 'https://intra.proekspert.ee/' + item.person.avatar,
        },
      }))
    ));
    axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=70').then(({ data }) => {
      const events = data.groups.map((item) => {
        const { type, items, user: name, avatar } = item;
        const date = items[0].modifiedAt;

        return {
          date,
          type,
          person: {
            name,
            avatar,
          },
        };
      });

      this.pastEvents = groupBy(events, 'date');
    });
    axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&days=70&future=true').then(({ data }) => {
      const events = data.groups.map((item) => {
        const { type, items, user: name, avatar } = item;
        const date = items[0].modifiedAt;

        return {
          date,
          type,
          person: {
            name,
            avatar,
          },
        };
      });
      const groupedByDate = groupBy(events, 'date');
      let reversedEvents = {};

      Object.keys(groupedByDate).sort().reverse().forEach(function(key) {
        reversedEvents[key] = groupedByDate[key];
      });

      this.futureEvents = reversedEvents;
    });
  },
  updated() {
    this.scrollToToday();
  }
};
</script>

<style lang="scss">
  .v-badge__badge {
    .v-icon {
      font-size: 14px !important;
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
