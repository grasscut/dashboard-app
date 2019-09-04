<template>
  <v-card class="mb-2">
    <v-card-title>People</v-card-title>
    <v-card-text>
      <v-tabs>
        <v-tab>Today</v-tab>
        <v-tab>Past</v-tab>
        <v-tab>Future</v-tab>
        <v-tab>Vacations</v-tab>
        <v-tab>Upcoming vacations</v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <template v-for="item in todayEvents">
                <v-avatar :key="item.type + '.' + item.person.name">
                  <img
                      :src="'https://intra.proekspert.ee/' + item.person.avatar"
                      alt="item.person.name"
                  >
                </v-avatar>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              past
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              future
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              vacations
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              upcoming vacations
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      todayEvents: {
        type: Array,
        default: [],
      },
    },
  };
</script>