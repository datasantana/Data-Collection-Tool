# CADI
Proyecto de implementación de una tecnología de código abierto para la captura de información inmobiliaria en el marco de la implementación de los Observatorios Municipales Inmobiliarios - OMI

- [Arquitectura de software](#arquitectura-de-software---modelo-físico)
- [Patrón de Arquitectura](#patrón-de-arquitectura)
    - [Componentes Backend](#componentes-backend)
    - [Componentes Frontend](#componentes-frontend)
- [Instalación](#instalación)
- [Licencia](#licencia)

## ARQUITECTURA DE SOFTWARE - MODELO FÍSICO

El presente capítulo describe, de forma gráfica y documental, las decisiones de diseño y arquitectura tomadas en el proceso de desarrollo del aplicativo descrito y especificado en los documentos MODELO CONCEPTUAL y MODELO LÓGICO, correspondientes a los productos 1 y 3 de la consultoría. A partir del modelamiento de la lógica de negocio (requerimientos funcionales) y la definición de los atributos de calidad (requerimientos no funcionales), se establece un proceso iterativo que busca la solución rápida de los problemas esenciales más prioritarios dentro del sistema o aplicativo:

1. La consolidación de una base de datos espaciales con valores de mercado inmobiliario 
2. La captura sistemática de valores de mercado inmobiliario

Entre estos se evidencia una relación clara que, al final, define la macroestructura de la arquitectura del sistema cliente-servidor: 
1. Una base de datos espaciales que establezca el modelo físico de los datos 

2. Un controlador de base de datos que estructure las operaciones y capacidades del sistema a través de un protocolo de comunicación definido 

3. Una interfaz de usuario que disponga de todas las funcionalidades pertinentes en función a las operaciones programadas desde el controlador 

## PATRÓN DE ARQUITECTURA

Lo anterior, describe un patrón de arquitectura n-tier o de capas. Una arquitectura de capas es un estilo de arquitectura cliente-servidor con claras delimitaciones entre la lógica de presentación, la lógica de dominio o aplicación y la lógica de los datos. En otras palabras, es un estilo de arquitectura distribuida donde cada capa funciona de manera independiente y donde la comunicación entre estas se da de forma vertical, a través de las capas intermedias. También existen ejemplos de sistemas de capas desplegados de forma monolítica, por lo que este patrón tiene altas prestaciones de modularidad y flexibilidad2. 

Las aplicaciones WEB-GIS también son grandes ejemplos de arquitecturas distribuidas por capas debido a que este estilo ha permitido el desarrollo independiente de soluciones a nivel de base de datos con tecnologías como PostgreSQL y PostGIS, a nivel de dominio con Programación Orientada a Objetos y el aprovechamiento de PostGIS como caja de herramientas de geoprocesos en la creación de microservicios web o APIs, y el aprovechamiento de estos servicios web a través de protocolos de mapas web como WMS, WFS y GeoJSON a través de librerías y frameworks interoperables. 

![Modelo de Arquitectura General de la Aplicación](https://github.com/geo-studio/OMI/blob/master/frontend/src/assets/app.jpg)

### COMPONENTES BACKEND
El backend está compuesto por las capas de dominio y datos, las cuales en conjunto configuran un modelo de arquitectura orientado a microservicios. A modo de Middleware, el dominio consiste en una APIREST, que permite exponer microservicios controlados por métodos que reciben peticiones HTTP, la cuales son traducidas a sentencias SQL que entran en comunicación de manera asíncrona con la capa de datos, para luego emitir respuestas o resultados de consultas transformados en objetos de tipo JSON para finalmente ser transmitidos por el mismo canal HTTP por el que se realizó la petición inicial. 

Dentro de las principales características de la APIREST se encuentra el control de autenticación, cuya respuesta es un objeto que contiene una API-KEY privada por cada usuario o sesión. Esta, es almacenada en el lado del cliente (caché). También cabe resaltar que los controladores gestionan, principalmente, el esquema de Metadatos dentro de la Base de datos, puesto que, a partir de este se reconstruyen los objetos que ofrece la API como respuesta o servicio en cada petición. 

Dentro de los controladores de métodos que gestionan la creación de proyectos y la actualización de información, resaltan aquellos que incorporan funcionalidades espaciales basadas en PostGIS. Estos controladores se encargan interoperar la semántica propia de los objetos geográficos del lado del cliente (GeoJSON) con la usada a nivel de base de datos (Binary). Inicialmente, los métodos cuentan con la capacidad de interpretar geometrías de tipo punto. Otro tipo de geometrías pueden ser programadas en el futuro (líneas y polígonos). 

* Esquema de base de datos de proyectos
* Esquema de base de datos de metadatos
* Controladores de métodos 
* Socket de servicios de controladores 

![Modelo de Microservicios usado para el backend](https://github.com/geo-studio/OMI/blob/master/frontend/src/assets/backend.jpg)

### COMPONENTES FRONTEND

El frontend corresponde a la aplicación WEB-GIS cliente o a la interfaz de usuario correspondiente a esta. El aplicativo está basado en el modelo FLUX, una variación del Modelo-Vista-Controlador que consiste en la centralización de la información y de las mutaciones que la modifiquen. A partir de dichos estados se renderizan distintos componentes de la interfaz de usuario, desde donde se despliegan las distintas funcionalidades o acciones, las cuales despacharán acciones sobre las mutaciones y transformarán de forma dinámica el estado dependiente de algún otro componente3. 

Este modelo de arquitectura para el lado del cliente permite el desarrollo de una lógica orientada a las funcionalidades y a la interacción con el usuario, por lo que es posible desarrollar distintas funcionalidades a manera de módulos o componentes, mantenerlas y/o mejorarlas de forma independiente. Adicionalmente, este modelo permite la reutilización de distintos componentes para su implementación en nuevas funcionalidades o en flujos de trabajo que impliquen varios componentes del sistema. 

Dentro de los componentes principales de este modelo se encuentran: 

* Controlador de acciones de usuario
* Modelo de mutaciones y estados del aplicativo
* Componentes de interfaz de usuario dinámicos en función a estados
* Registro y autenticación de usuarios
* Panel de usuario
* Mapa y Tabla de datos
* Creación de proyectos y Formularios
* Popup de exploración y edición de datos en mapa
* Formulario
* Conector de Servicios de Mapas Web 

![Modelo Flux usado para el frontend](https://github.com/geo-studio/OMI/blob/master/frontend/src/assets/frontend.jpg)


## INSTALACIÓN

Clonar repositorio

```bash
$ git clone https://github.com/geo-studio/OMI.git
```

## CONFIGURACIÓN DE SERVIDOR WEB

* Descarga e instalacion de Node.js


<p> Node.js desde su página oficial<a href="https://nodejs.org/es/"> Descarga Node.js </a>.</p>

Una vez descargado el archivo procedemos con la instalación, siguiendo el wizard y dar Next, conjuntamente con Node.js se va instalar el gestor de paquetes NPM.
Luego de la descarga e instalación de node.js por medio de la consola verficamos las instalación
 
 ```bash
 # Verificar instalación de Node.js
 $ node -v

# Verificar instalacion de NPM
$ npm -v
 ```

## LICENCIA

<a href="https://github.com/geo-studio/CADI/blob/master/LICENSE"> GNU General Public Licence v3.0 </a>


