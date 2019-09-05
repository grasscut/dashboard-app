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
      <!-- Future events -->
      <template v-for="(events, date) in futureEvents">
        <div :key="date">
          <v-subheader>{{ date }}</v-subheader>
          <template v-for="event in events">
            <v-avatar :key="event.type + '.' + event.person.name" v-if="selectedTypes.includes(event.type)">
              <img
                :src="event.person.avatar"
                alt="event.person.name"
              >
            </v-avatar>
          </template>
        </div>
      </template>

      <!-- Today's events -->
      <v-subheader>Today</v-subheader>
      <template v-for="event in todayEvents">
        <v-avatar :key="event.type + '.' + event.person.name" v-if="selectedTypes.includes(event.type)">
          <img
            :src="'https://intra.proekspert.ee/' + event.person.avatar"
            alt="event.person.name"
          >
        </v-avatar>
      </template>

      <!-- Past events -->
      <template v-for="(events, date) in pastEvents">
        <div :key="date">
          <v-subheader>{{ date }}</v-subheader>
          <template v-for="event in events">
            <v-avatar :key="event.type + '.' + event.person.name" v-if="selectedTypes.includes(event.type)">
              <img
                :src="event.person.avatar"
                alt="event.person.name"
              >
            </v-avatar>
          </template>
        </div>
      </template>
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
  methods: {
    changeFilter: function(type) {
      if (this.selectedTypes.includes(type)) {
        this.selectedTypes = this.selectedTypes.filter((item) => item !== type);
      } else {
        this.selectedTypes.push(type);
      }
    }
  },
  mounted() {
    axios.get('/api/today').then(({ data }) => (
      this.todayEvents = data.map((item) => ({
        type: item.type,
        person: {
          name: item.user,
          avatar: item.person.avatar,
        },
      }))
    ));
    axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS').then(({ data }) => {
      const events = data.groups.map((item) => {
        const { type, items, user: name, avatar } = item;
        const date = new Date(items[0].modifiedAt).toLocaleDateString();

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
    axios.get('/api/people?type=BIRTHDAY&type=WORKBIRTHDAY&type=STARTDATE&type=KUDOS&future=true').then(({ data }) => {
      const events = data.groups.map((item) => {
        const { type, items, user: name, avatar } = item;
        const date = new Date(items[0].modifiedAt).toLocaleDateString();

        return {
          date,
          type,
          person: {
            name,
            avatar,
          },
        };
      });

      this.futureEvents = groupBy(events, 'date');
    });
  },
};
</script>
