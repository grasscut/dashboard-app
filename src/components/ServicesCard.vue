<template>
  <v-card class="mb-2">
    <v-card-title>
      <h4>Services</h4>
    </v-card-title>
    <v-card-text>
      <v-row>
        <template v-for="item in services">
          <v-col cols="4" sm="3" lg="2" :class="$vuetify.breakpoint.xs ? 'px-0' : ''">
            <v-card flat :to="item.url" :class="[$vuetify.breakpoint.xs ? 'px-0' : '', 'service fill-height']">
              <v-img v-bind:src="require(`./../assets/images/${item.img}`)" :height="$vuetify.breakpoint.smAndDown ? 50 : 100" :width="$vuetify.breakpoint.smAndDown ? 50 : 100" style="margin: auto;"></v-img>
              <v-card-title class="subtitle-2 d-block text-center px-0" :style="[$vuetify.breakpoint.smAndDown ? { wordBreak: 'break-word' } : { whiteSpace: 'nowrap' }]">
                {{ item.title }}
              </v-card-title>
              <v-card-text v-if="$vuetify.breakpoint.mdAndUp">{{ item.description }}</v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    services: [
      {
        title: 'Advicing tinder',
        description: 'Advice about work, personal life or feedback from colleagues',
        img: 'advising.svg',
        url: 'https://intra.proekspert.ee/wiki/display/VPAH/Advising+Service',
      },
      {
        title: 'Team event',
        description: 'Get help in organizing an awesome event for your team',
        img: 'team_event.svg',
        url: 'https://intra.proekspert.ee/wiki/display/VPAH/Team+Events',
      },
      {
        title: 'Fairy call',
        description: 'Everything related to work environment',
        img: 'fairy.svg',
        url: 'https://intra.proekspert.ee/jira/secure/CreateIssueDetails!init.jspa?pid=16160&issuetype=10401&summary=Thank+you+for+creating+this+task!+Virge',
      },
      {
        title: 'IT support',
        description: 'All your tech challenges will come to an end',
        img: 'tech_support.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Kudos',
        description: 'All your tech challenges will come to an end',
        img: 'kudos.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Business trip',
        description: 'All your tech challenges will come to an end',
        img: 'business_trip.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Business cards',
        description: 'All your tech challenges will come to an end',
        img: 'business_card.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Recommend an employee',
        description: 'All your tech challenges will come to an end',
        img: 'recommend.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Task to Marketing',
        description: 'All your tech challenges will come to an end',
        img: 'marketing.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Help from Analytics',
        description: 'All your tech challenges will come to an end',
        img: 'analyst.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
      {
        title: 'Feedback',
        description: 'All your tech challenges will come to an end',
        img: 'feedback.svg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
    ],
  })
};
</script>

<style lang="scss" scoped>
  .service:hover {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
  }
</style>
