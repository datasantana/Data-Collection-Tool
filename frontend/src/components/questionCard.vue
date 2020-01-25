<template>
  <v-card width="70%" class="mx-auto mt-5">
    <v-img
      class="white--text align-end"
      height="300px"
      src="../assets/help.jpg">
    </v-img>
    <v-card-subtitle>
      <h1 class="display-1">Preguntas Frecuentes</h1>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          ¿Qué es el aplicativo Data Collection Tool?
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>El aplicativo Data Collection Tool consiste en una solución GIS basado en software libre, el cual permita la visualización y gestión de datos geográficos sin la necesidad de contar con un software GIS especializado. Desde un teléfono móvil, una tablet o un PC, se puede crear un formulario a la medida para la toma de información en campo.</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          ¿Cómo se puede instalar y poner en marcha el aplicativo?
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>El aplicativo está desarrollado bajo licencia del BID y cuenta con documentación y los respectivos manuales de despliegue y uso en entornos de desarrollo y producción. Esto significa que el usuario puede disponer de infraestructura propia para el despliegue y administración de los datos gestionados a través del aplicativo Data Collection Tool. Esto también permite acceder al código fuente para adaptar el aplicativo como parte de procesos administrativos y de gestión de información propios. La documentación mencionada puede encontrarse en este <a href="https://github.com/geo-studio/Data-Collection-Tool.git" target="_blank">vínculo</a></p>
        </v-expansion-panel-content>
      </v-expansion-panel><v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          ¿Dónde puedo encontrar más información sobre otros aplicativos similares?
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>El aplicativo Data Collection Tool fue realizado gracias a la financiación del Banco Interamericano de Desarrollo (BID) en el marco del programa “Soluciones digitales para la administración tributaria subnacional”. Para encontrar más soluciones de software abierto para gobiernos y ciudadanos, en el siguiente catálogo de herramientas: <a href="https://code.iadb.org/es" target="_blank">code.iadb.org</a></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="subtitle-2">
          ¿Es posible contar con más funcionalidades?
        </v-expansion-panel-header>
        <v-expansion-panel-content class="caption">
            <p>Esta solución de software libre podrá ser adaptada a nuevas funcionalidades de manera colaborativa en el <a href="https://github.com/geo-studio/Data-Collection-Tool.git" target="_blank">repositorio del BID. </a>  Si desea una solución a la medida, puede contactar a GEO Studio (empresa consultora que desarrolló el aplicativo). Para mayor información puede visitar <a href="https://www.geostudio.com.co" target="_blank">www.geostudio.com.co</a> o escribir al siguiente correo info@geostudio.com.co</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn to="/" class="white--text" color="grey darken-3">
        Volver
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "question-card",
  data() {
    return {
      e1: 0
    }
  },
}
</script>