<template>
  <div>
    <div v-html="vacations" style="height: 336px; overflow-y: auto;" class="py-3">
    </div>
    <v-progress-circular v-if="vacations === ''" class="progressSpinner" indeterminate></v-progress-circular>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data: () => ({
      vacations: '',
    }),
    mounted() {
      axios.get('/jkeskus/wiki/vacations/current').then(({ data }) => {
        const parser = new DOMParser();
        const vacationsHtml = parser.parseFromString(data, 'text/html').getElementsByTagName('body')[0];

        vacationsHtml.getElementsByTagName('span')[0].className = 'subtitle-1 font-weight-bold';

        this.vacations = vacationsHtml.innerHTML;
      });
    },
  };
</script>
