<template>
  <v-app>
<!--    <v-app-bar app>-->
<!--      <v-toolbar-title class="headline text-uppercase">-->
<!--        <span>Vuetify</span>-->
<!--        <span class="font-weight-light">MATERIAL DESIGN</span>-->
<!--      </v-toolbar-title>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn-->
<!--        text-->
<!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--        target="_blank"-->
<!--      >-->
<!--        <span class="mr-2">Latest Release</span>-->
<!--      </v-btn>-->
<!--    </v-app-bar>-->

    <v-content>
      <v-container fluid>
        <v-row dense>
          <v-col>
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
                        today's bdays & work anniversaries
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
            <v-card>
              <v-card-title>Blog</v-card-title>
            </v-card>
          </v-col>

          <v-col>
            <v-card class="mb-2">
              <v-card-title>Teams/Projects</v-card-title>
              <v-card-text></v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Wiki feed</v-card-title>
            </v-card>
          </v-col>

          <v-col>
            <v-card>
              <v-card-title>Quacks</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    //
  },
  data: () => ({
    //
  }),
};
</script>
