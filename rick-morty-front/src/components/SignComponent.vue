<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text color="black" dark v-bind="attrs" v-on="on">
                    Crear cuenta
                </v-btn>
            </template>

            <v-card>
                <v-card-text>
                    <v-form @submit.prevent="submit" ref="form" lazy-validation v-model="valid">
                        <v-card-text>
                            <v-text-field v-model="form.name" :rules="nameRules" prepend-icon="mdi-account"
                                label="Nombre" required />
                            <v-text-field v-model="form.email" :rules="emailRules" prepend-icon="mdi-at" label="Email"
                                required />
                            <v-text-field type="password" v-model="form.password" :rules="passwordRules"
                                prepend-icon="mdi-lock" label="Contraseña" required />
                            <p v-if="info.status !== 200" style="color: red">{{ info.message }}</p>

                        </v-card-text>

                        <v-card-actions>
                            <v-btn text color="error" @click="dialog = false">
                                Cancelar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text type="submit" :disabled="!valid">
                                Crear cuenta
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameRules: [
                v => !!v || 'Nombre es requerido',
            ],
            emailRules: [
                v => !!v || 'Email es requerido',
                v => /.+@.+\..+/.test(v) || 'Email debe ser válido',
            ],
            passwordRules: [
                v => !!v || 'Contraseña es requerida',
            ],
            valid: true,
            dialog: null,
            form: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    computed: {
        info() {
            return this.$store.getters.getInfoResponse;
        }
    },
    methods: {
        async submit() {
            if (this.form.email === '' || this.form.password === '' || this.form.password === '') return;
            await this.$store.dispatch('signIn', this.form);
        }
    }
}
</script>