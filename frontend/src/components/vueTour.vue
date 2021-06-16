<template>
  <v-tour name="vueTour" :steps="steps" class="caption" :options="myOptions">
  </v-tour>
</template>

<script>
export default {
  name: "vue-tour",
  data() {
    return {
      myOptions: {
        labels: {
          buttonSkip: "Salir",
          buttonPrevious: "Anterior",
          buttonNext: "Siguiente",
          buttonStop: "Terminar",
        },
        highlight: true,
      },
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          content: `Inicie <strong>Tour</strong> para conocer el panel de navegación del aplicativo o consulte la <a href="/about" rel="noopener">Guía de usuario</a> disponible en la sección de ayuda`,
        },
        {
          target: ".v-step-1",
          content:
            "Acceda para ver la lista de proyectos, agregar capas al mapa y consultar la información georreferenciada",
          params: {
            placement: "top",
          },
        },
        {
          target: "#v-step-2",
          content: `Cree proyectos y configure los campos para registrar la información que desea capturar`,
          params: {
            placement: "top",
          },
        },
        {
          target: "#v-step-3",
          content:
            "Active la opción para agregar un nuevo punto al proyecto seleccionado",
          params: {
            placement: "right",
            highlight: false,
          },
        },
        {
          target: "#v-step-4",
          content: "Descargue proyectos en formato geojson",
          params: {
            placement: "top",
          },
        },
        {
          target: "#v-step-5",
          content: "Agregue capas WMS al mapa",
          params: {
            placement: "top",
          },
        },
        {
          target: "#v-step-6",
          content: `Consulte la <a href="/about" rel="noopener">Guía de usuario</a> disponible en la sección de Ayuda`,
          params: {
            highlight: false,
          },
        },
      ],
      callbacks: {
        onPreviousStep: this.myCustomPreviousStepCallback,
        onNextStep: this.myCustomNextStepCallback,
      },
    };
  },
  mounted: function () {
    // A dynamically added onStop callback
    this.callbacks.onStop = () => {
      document
        .querySelector("#v-step-0")
        .scrollIntoView({ behavior: "smooth" });
    };
  },
  methods: {
    nextStep() {
      this.$tours["vue-tour"].nextStep();
    },
    showLastStep() {
      this.$tours["vue-tour"].currentStep = this.steps.length - 1;
    },
    /*myCustomPreviousStepCallback (currentStep) {
      console.log('[Vue Tour] A custom previousStep callback has been called on step ' + (currentStep + 1))
    },
    myCustomNextStepCallback (currentStep) {
      console.log('[Vue Tour] A custom nextStep callback has been called on step ' + (currentStep + 1))
      if (currentStep === 1) {
      console.log('[Vue Tour] A custom nextStep callback has been called from step 2 to step 3')
      }
    }*/
  },
};
</script>

<style lang="scss">
.v-tour__target--highlighted {
  box-shadow: 0 0 0 22222px rgba(221, 221, 221, 0.9);
  z-index: 9999;
}
.v-step {
  background: #50596c;
  opacity: 0.9;
}

.v-application {
  color: #ffff;
  background: #3e4e59;
}

.v-application a {
  color: #3e4e59;
  background: #ffff;
}
</style>