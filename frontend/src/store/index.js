import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    snackbar: {
      visible: false,
      color: "success",
      text: null,
      timeout: 5000,
      multiline: true
    },
    signup: {},
    fieldTypes: [],
    dialog: false,
    wmsDialog: false,
    deleteDialog: false,
    toDelete: {},
    downloadDialod: false,
    projects: [],
    selectedLayers: [],
    formFeatures: [],
    formObject: [],
    body: {},
    fieldBody: {},
    fields: [],
    wmsVisible: false,
    wmsUrl: "",
    wmsLayer: "",
    wmsName: "",
    wmsAttributions: ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    alert(state, payload) {
      state.snackbar.text = payload.text;
      state.snackbar.multiline = payload.text.length;
      if (payload.multiline) {
        state.snackbar.multiline = payload.multiline;
      }
      if (payload.color) {
        state.snackbar.color = payload.color;
      }
      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout;
      }
      state.snackbar.visible = true;
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    uSignup(state, { signup }) {
      state.signup = signup;
    },
    listFieldTypes(state, dataTypesAction) {
      state.fieldTypes = dataTypesAction;
    },
    listProjects(state, projectsAction) {
      state.projects = projectsAction;
    },
    addLayer(state, nLayer) {
      if (
        !state.selectedLayers.find(
          current => current.tableName == nLayer.tableName
        )
      ) {
        state.selectedLayers = [...state.selectedLayers, nLayer];
      } else {
        state.selectedLayers = state.selectedLayers.filter(
          current => current.tableName !== nLayer.tableName
        );
        state.selectedLayers = [...state.selectedLayers, nLayer];
      }
    },
    removeLayer(state, tableName) {
      state.selectedLayers = state.selectedLayers.filter(
        current => current.tableName !== tableName
      );
    },
    uProject(state, { body }) {
      state.body = body;
    },
    listFields(state, pFields) {
      state.fields = pFields;
    },
    clearFieldList(state) {
      state.fields = [];
    },
    switchDialogOn(state, selectedFeatures) {
      state.dialog = true;
      state.formObject = selectedFeatures.map(geometry => {
        return geometry.geometry;
      });
    },
    switchDialogOff(state) {
      state.dialog = false;
    },
    switchWmsDialogOn(state) {
      state.wmsDialog = true;
    },
    switchWmsDialogOff(state) {
      state.wmsDialog = false;
    },
    switchDownloadDialogOn(state) {
      state.downloadDialod = true;
    },
    switchDownloadDialogOff(state) {
      state.downloadDialod = false;
    },
    switchDeleteDialogOn(state, projectId) {
      state.deleteDialog = true;
      state.toDelete = { ...projectId };
    },
    switchDeleteDialogOff(state) {
      state.deleteDialog = false;
    },
    layerFields(state, editableProject) {
      state.formFeatures = state.selectedLayers.find(
        selected => selected.id === editableProject
      );
    },
    WMS(state, wmsParams) {
      state.wmsUrl = wmsParams.url.toString();
      state.wmsLayer = wmsParams.layer;
      state.wmsName = wmsParams.name;
      state.wmsAttributions = wmsParams.attr;
    },
    wmsSwhitchOn(state) {
      state.wmsVisible = true;
    },
    wmsSwhitchOff(state) {
      state.wmsVisible = false;
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/auth`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data;
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            commit("alert", {
              color: "#455A64",
              text:
                "Usuario o contraseña incorrectos. Verifique sus credenciales o contacte al administrador"
            });
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    register({ commit }, signup) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/auth/signup`,
          data: signup,
          method: "POST"
        })
          .then(resp => {
            const signup = resp.data;
            commit("uSignup", { signup });
            commit("alert", {
              color: "#006064",
              text:
                "Usuario creado con éxito. Ingresa tus credenciales para acceder a la aplicación"
            });
            resolve(resp);
          })
          .catch(err => {
            commit("alert", {
              color: "#455A64",
              text:
                "Este usuario ya existe. Registra un nuevo usuario o contacta al administrador para recordar tu contraseña "
            });
            reject(err);
          });
      });
    },
    getFieldTypes({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/datatypes`,
          method: "GET"
        })
          .then(resp => {
            let dataTypes = resp.data;
            commit("listFieldTypes", dataTypes);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getProjects({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/forms/user/${state.user.id}`,
          method: "GET"
        })
          .then(resp => {
            let projects = resp.data;
            //axios.defaults.headers.common["Authorization"] = token;
            commit("listProjects", projects);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    loadLayer({ commit, state }, { tableName }) {
      // obtener features
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/savedata/${tableName}`,
          method: "GET"
        })
          .then(resp => {
            let features = resp.data;
            features = features.map(feature => {
              let nFeature = {
                ...feature
              };
              nFeature.geometry = {
                type: "Point",
                coordinates: [feature.longitude, feature.latitude]
              };
              nFeature.type = "Feature";
              (nFeature.properties = feature), {};
              delete nFeature.latitude;
              delete nFeature.longitude;
              delete feature.geometry;
              return nFeature;
            });
            // sacar objeto proyecto
            const project = state.projects.find(
              project => project.tableName === tableName
            );
            if (project) {
              const nLayer = {
                ...project,
                features: features
              };
              commit("addLayer", nLayer);
            }
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    createProject({ commit }, body) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/forms`,
          data: body,
          method: "POST"
        })
          .then(resp => {
            const body = resp.data;
            commit("uProject", { body });
            commit("alert", {
              color: "#006064",
              text: "Agrega campos al proyecto",
              timeout: 2000
            });
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteProject({ commit }, idProject) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/forms/${idProject}`,
          method: "DELETE"
        })
          .then(resp => {
            commit("alert", {
              color: "#006064",
              text: "El proyecto ha sido eliminado"
            });
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addField({ commit }, fieldBody) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/fields/${fieldBody.formId}/${fieldBody.datatypeId}`,
          data: fieldBody,
          method: "POST"
        })
          .then(resp => {
            commit("alert", {
              color: "#006064",
              text: "Se ha agregado un nuevo campo a tu proyecto"
            });
            resolve(resp);
          })
          .catch(err => {
            commit("alert", {
              color: "#455A64",
              text: "Nombre de campo requerido o ya existe "
            });
            reject(err);
          });
      });
    },
    deleteField({ commit }, item) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/fields/${item}`,
          method: "DELETE"
        })
          .then(resp => {
            commit("alert", {
              color: "#006064",
              text: "El campo ha sido eliminado"
            });
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getFields({ commit }, bodyId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/fields/forms/${bodyId}`,
          method: "GET"
        })
          .then(resp => {
            let fields = resp.data;
            commit("listFields", fields);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    insertFeature({ commit }, bodyFeature) {
      commit("insert_exit");
      return new Promise((resolve, reject) => {
        axios({
          url: `https://us-central1-bid-datacollector-v1apirest.cloudfunctions.net/api/savedata/`,
          data: bodyFeature,
          method: "POST"
        })
          .then(resp => {
            commit("alert", {
              color: "#006064",
              text: "La información capturada ha sido registrada exitósamente"
            });
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addWMS({ commit }, wmsParams) {
      commit("WMS", wmsParams);
      commit("alert", {
        color: "#006064",
        text:
          "El WMS ha sido cargado. Active el boton de visualización en el menú capa wms"
      });
    }
  },
  modules: {}
});
