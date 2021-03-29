<template>
  <div>
    <b-navbar class="color-fondo">
      <b-navbar-brand>Kori-Blog</b-navbar-brand>
    </b-navbar>
    <b-row class="mt-5">
      <b-col cols="3" class="ml-2 mr-2">
        <b-form>
          <h2>Añadir Publicación</h2>
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Titulo"
            label-for="input-sm"
          >
            <b-form-input
              id="input-sm"
              size="sm"
              v-model="publicacion.titulo"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="autor"
            label-for="input-sm"
          >
            <b-form-input
              id="input-sm"
              size="sm"
              v-model="publicacion.autor"
            ></b-form-input>
          </b-form-group>
          <b-form-group label-size="sm" label="mensaje" label-for="input-sm">
            <b-form-textarea
              id="input-sm"
              size="sm"
              v-model="publicacion.mensaje"
            ></b-form-textarea>
          </b-form-group>
          <b-button variant="outline-secondary" @click="createPublicacion()">
            Publicar
          </b-button>
        </b-form>
      </b-col>
      <b-col cols="6">
        <div v-for="(publicacion, index) in listaPublicaciones" :key="index">
          <b-card
            :title="publicacion.titulo"
            :sub-title="publicacion.fecha"
            class="text-left"
          >
            <b-card-sub-title> {{ publicacion.autor }} </b-card-sub-title>
            <b-card-body>
              <b-card-text>
                {{ publicacion.mensaje }}
              </b-card-text>
              <div>
                <b-button
                  v-b-toggle="`collapse-${publicacion.id}`"
                  :id="`button-${publicacion.id}`"
                  @click="getRespuesta(publicacion.id)"
                >
                  Comentarios
                </b-button>
                <b-collapse :id="`collapse-${publicacion.id}`">
                  <b-card-body>
                    <Comentarios
                      :listaRespuestas="listaRespuestas"
                      :id1="publicacion.id"
                    />
                    <b-form-group class="inline-block">
                      <ComentarioEnviar
                        :id="publicacion.id"
                        @comentario="crearComentario"
                      />
                    </b-form-group>
                  </b-card-body>
                </b-collapse>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
let f = new Date();
import Comentarios from "./comentario.vue";
import ComentarioEnviar from "./comentarioEnviar.vue";

export default {
  data() {
    return {
      visible: false,
      listaPublicaciones: [],
      publicacion: {
        titulo: "",
        autor: "",
        fecha: `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`,
        mensaje: "",
      },
      index1: "",
      respuesta: {
        identificador: "",
        fecha: "",
        respuesta: "",
        con_respuesta: "",
      },
      listaRespuestas: [],
      comentarios: [],
      msg: "",
      url: "http://localhost:3000/",
    };
  },
  components: {
    Comentarios,
    ComentarioEnviar,
  },
  methods: {
    getPublicaion() {
      fetch(this.url + "publicacion", {
        method: "GET",
      })
        .then((response) => response.json())
        .catch((err) => console.error("Error", err))
        .then((data) => {
          this.listaPublicaciones = data;
        });
    },
    createPublicacion() {
      if (
        this.publicacion.titulo == "" ||
        this.publicacion.autor == "" ||
        this.publicacion.mensaje == ""
      ) {
        alert("Los datos son obligatorios");
      } else {
        fetch(this.url + "publicacion", {
          method: "POST",
          body: JSON.stringify(this.publicacion),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error:", error))
          .then((response) => {
            console.log("Success:", response);
            this.publicacion = {
              titulo: "",
              autor: "",
              fecha: `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`,
              mensaje: "",
            };
            this.getPublicaion();
          });
      }
    },

    crearComentario(value, value1) {
      this.respuesta.identificador = value1;
      this.respuesta.respuesta = value;
      this.respuesta.fecha = `${f.getFullYear()}-${
        f.getMonth() + 1
      }-${f.getDate()}`;
      this.respuesta.con_respuesta = value1;
      console.log(this.respuesta);
      fetch(this.url + "mensaje", {
        method: "POST",
        body: JSON.stringify(this.respuesta),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.getRespuesta(value1);
        })
        .catch((err) => console.error(err));
    },
    getRespuesta(id) {
      console.log(id);
      fetch(this.url + "mensaje/" + id + "/", {
        method: "GET",
      })
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .then((data) => {
          this.listaRespuestas = data;
          console.log("datos", data);
        });
    },
  },
  created() {
    this.getPublicaion();
  },
};
</script>

<style scoped>
.color-fondo {
  background-color: rgb(123, 123, 123);
}
</style>
