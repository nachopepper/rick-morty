<template>
  <v-app>
    <bar-component />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BarComponent from './components/BarComponent.vue';

export default {
  name: 'App',

  components: {
    BarComponent
  },

  async mounted() {
    await this.$store.dispatch('checkUserInfo');
  }
};
</script>
