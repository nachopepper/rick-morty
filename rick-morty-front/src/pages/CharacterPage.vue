<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col cols="2">
        <v-text-field label="Nombre" v-model="filter.name" />
      </v-col>
      <v-col cols="2">
        <v-autocomplete v-model="filter.status" :items="status" item-text="name" item-value="value" label="Estado" />
      </v-col>
      <v-col cols="2">
        <v-autocomplete v-model="filter.gender" :items="gender" item-text="name" item-value="value" label="Género" />
      </v-col>
      <v-col cols="2">
        <v-btn tile color="success" :disabled="diableSearch" @click="filterCharacters">
          <v-icon left>
            mdi-magnify
          </v-icon>
          Filtrar
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn tile color="success" @click="refreshFilters" :disabled="!filterMode">
          <v-icon left>
            mdi-broom
          </v-icon>
          Limpiar
        </v-btn>
      </v-col>
    </v-row>
    <v-progress-linear v-if="loading" value="15" indeterminate></v-progress-linear>
    <v-row class="text-center" v-if="characters.length > 0 && !loading">
      <v-col v-for="(character, i) in characters" :key="i" xl="3" lg="4" md="6" sm="6" xs="12">
        <card-component :character="character">
          <template #action v-if="userInfo">
            <v-btn color="primary" rounded x-small @click="addFavorite(character)">
              Añadir favorito
            </v-btn>
          </template>
        </card-component>
      </v-col>
    </v-row>
    <v-row class="text-center" v-else-if="characters.length === 0 && !loading">
      <v-col cols="12">
        No existen coincidencias para el filtro aplicado.
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :multi-line="multiLine" :color="response.status === 200 ? 'success' : 'red'">
      {{ response.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
    <v-pagination v-if="!filterMode" v-model="page" :length="info.pages" :total-visible="7"
      @input="$store.dispatch('characters/fetchCharacters', page)" />
    <v-pagination v-else v-model="filter.page" :length="info.pages" :total-visible="7"
      @input="$store.dispatch('characters/filterCharacters', filter)" />

  </v-container>
</template>

<script>
import CardComponent from '../components/CardComponent.vue';
export default {
  components: { CardComponent },
  name: 'HelloWorld',

  data: () => ({
    multiLine: true,
    snackbar: false,
    page: 1,
    filterMode: false,
    filter: {
      name: '',
      status: '',
      gender: '',
      page: 1
    },
    gender: [
      {
        name: 'Mujer',
        value: 'female'
      },
      {
        name: 'Hombre',
        value: 'male'
      },
      {
        name: 'Sin género',
        value: 'genderless'
      },
      {
        name: 'Desconocido',
        value: 'unknown'
      },
    ],
    status: [
      {
        name: 'Vivo',
        value: 'alive'
      },
      {
        name: 'Muerto',
        value: 'dead'
      },
      {
        name: 'Desconocido',
        value: 'unknown'
      },
    ],
  }),
  computed: {
    response() {
      return this.$store.getters["favorites/getResponse"]
    },
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    diableSearch() {
      return this.filter.name === '' && this.filter.status === '' &&
        this.filter.gender === '';
    },
    loading() {
      return this.$store.getters["characters/getLoading"];
    },
    info() {
      return this.$store.getters["characters/getInfo"];
    },
    characters() {
      return this.$store.getters["characters/getCharacters"];
    }
  },
  methods: {
    async addFavorite(character) {
      await this.$store.dispatch('favorites/addFavorite', character);
      this.snackbar = true;
    },
    async refreshFilters() {
      this.filterMode = false;
      this.filter.name = '';
      this.filter.status = '';
      this.filter.gender = '';
      this.filter.page = 1;
      await this.$store.dispatch('characters/fetchCharacters', this.page);
    },
    async filterCharacters() {
      this.filterMode = true;
      this.page = 1;
      this.filter.page = 1;
      await this.$store.dispatch('characters/filterCharacters', this.filter);
    },
  },
  async mounted() {
    await this.$store.dispatch('characters/fetchCharacters', this.page);
  }
}
</script>
