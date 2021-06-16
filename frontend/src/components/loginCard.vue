<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Ingresar</h1>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="Usuario"
          prepend-icon="mdi-account-circle"
          v-model="email"
          :rules="emailRules"
          required
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Contraseña"
          prepend-icon="mdi-lock"
          :rules="nameRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          required
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <!--v-btn 
        class="white--text" 
        color="blue-grey darken-3" 
        to="/register"
      >Registrarse</v-btn-->
      <p class="overline">
        Accede con tus credenciales o <br />
        <a href="/register">regístrate</a>
      </p>
      <v-spacer></v-spacer>
      <v-btn
        class="white--text"
        color="#3e4e59"
        @click.prevent="validateLogin"
        @click="login"
        >Ingresar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "login-card",
  data() {
    return {
      valid: true,
      nameRules: [
        (v) => !!v || "Password requerido",
        (v) => (v && v.length >= 6) || "Mínimo 6 caracteres",
      ],
      emailRules: [
        (v) => !!v || "Ingresa tu Email",
        (v) => /.+@.+\..+/.test(v) || "Ingresa un correo electrónico",
      ],
      showPassword: false,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch((err) => err);
    },
    validateLogin() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style lang="scss">
.theme--light.v-application {
  background-image: url(../assets/A.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>