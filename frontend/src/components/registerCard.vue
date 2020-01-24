<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Registro</h1>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="formRegister" v-model="valid"  lazy-validation>
        <v-text-field 
          label="Username"
          prepend-icon="mdi-account-circle"
          v-model="email"
          :rules="emailRules"
          required
        />
        <p class="overline">Ingresa tu correo electŕonico. Este será tratado como tu nombre de usuario</p>
        <v-text-field 
          :type="showPassword ? 'text': 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          :rules="nameRules"
          required
        />
      </v-form>
      <p class="overline">Asigna una contraseña a tu cuenta. debe tener mínimo 6 caractéres sin espacios ni símbolos especiales</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn 
        class="white--text" 
        color="blue-grey darken-3" 
        to="/login"
      >Volver</v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        class="white--text" 
        color="grey darken-3" 
        @click.prevent="validate"
        @click="register" 
      >Registrarse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
    name: "register-card",
    data() {
    return {
      valid: true,
      showPassword: false,
      showConfirm: false,
      email: "",
      password: "",
      confirmPassword: "",
      nameRules: [
        v => !!v || 'Password requerido',
        v => (v && v.length >= 6) || 'Mínimo 6 caracteres',
      ],
      emailRules: [
        v => !!v || 'Ingresa tu Email',
        v => /.+@.+\..+/.test(v) || 'Ingresa un correo electrónico',
      ],
    };
  },
  methods: {
    register () {
      let email = this.email
      let password = this.password
      this.$store
        .dispatch("register", {email, password})
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    },
  validate () {
      if (this.$refs.formRegister.validate()) {
          this.snackbar = true
      }
    }
  },
}
</script>