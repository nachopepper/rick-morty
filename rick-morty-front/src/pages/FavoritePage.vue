<template>
    <v-container class="mt-10">
        <v-spacer></v-spacer>
        <v-row align="center" justify="space-around">
            <!-- <v-col cols="2">
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
      </v-col> -->
        </v-row>
        <v-progress-linear v-if="loading" value="15" indeterminate></v-progress-linear>

        <v-row class="text-center" v-if="favorites.length > 0 && !loading">
            <v-col v-for="(character, i) in favorites" :key="i" xl="4" lg="4" md="6" sm="6" xs="12">
                <card-component :character="character">
                    <template #action>
                        <v-btn color="error" rounded x-small @click="deleteFavorite(character)">
                            Borrar favorito
                        </v-btn>
                    </template>
                </card-component>
            </v-col>
        </v-row>
        <v-row class="text-center" v-else-if="favorites.length === 0 && !loading">
            <v-col cols="12">
                Actualmente no posee favoritos, regrese al inicio para añadir alguno.
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

    </v-container>
</template>

<script>
import CardComponent from '../components/CardComponent.vue';
export default {
    components: { CardComponent },
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
            return this.$store.getters["favorites/getResponse"];
        },
        loading() {
            return this.$store.getters["favorites/getLoading"];
        },
        favorites() {
            return this.$store.getters["favorites/getFavorites"];
        }
    },
    methods: {
        async deleteFavorite(character) {
            await this.$store.dispatch('favorites/deleteFavorite', character);
            this.snackbar = true;
        }
    },
    async mounted() {
        await this.$store.dispatch('favorites/getFavorites');
    }
}
</script>
