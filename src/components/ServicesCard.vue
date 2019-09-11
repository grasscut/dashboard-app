<template>
  <v-card class="mb-2">
    <v-card-title>
      <h2>Services</h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <template v-for="item in services">
          <v-col :key="item.title" sm="12" lg="6">
            <v-card class="service ma-2 fill-height" :href="item.url" target="_blank">
              <v-img :src="item.img" height="120px"></v-img>
              <v-card-title>
                <h6>{{ item.title }}</h6>
              </v-card-title>
              <v-subheader>{{ item.description }}</v-subheader>
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
        img: 'https://intra.proekspert.ee/wiki/download/attachments/142608190/advicing-tinder.jpg',
        url: 'https://intra.proekspert.ee/wiki/display/VPAH/Advising+Service',
      },
      {
        title: 'Team event',
        description: 'Get help in organizing an awesome event for your team',
        img: 'https://intra.proekspert.ee/wiki/download/attachments/142608190/team-event.jpg',
        url: 'https://intra.proekspert.ee/wiki/display/VPAH/Team+Events',
      },
      {
        title: 'Fairy call',
        description: 'Everything related to work environment',
        img: 'https://intra.proekspert.ee/wiki/download/attachments/142608190/fairy-call.jpg',
        url: 'https://intra.proekspert.ee/jira/secure/CreateIssueDetails!init.jspa?pid=16160&issuetype=10401&summary=Thank+you+for+creating+this+task!+Virge',
      },
      {
        title: 'IT support',
        description: 'All your tech challenges will come to an end',
        img: 'https://intra.proekspert.ee/wiki/download/attachments/142608190/it-support.jpg',
        url: 'https://intra.proekspert.ee/wiki/display/PITS/IT+Support',
      },
    ],
  }),
};
</script>

<style lang="scss">
  .service:hover {
    opacity: .8;
  }
</style>
