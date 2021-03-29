<template>
  <div>
    <b-form-textarea v-model="mensaje"></b-form-textarea>
    <b-button
      class="mt-2"
      variant="outline-success"
      @click="enviarComentario()"
    >
      Comentar
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      mensaje: "",
      mensajeId: "",
    };
  },
  created() {
    this.mensajeId = this.id;
    console.log(this.id);
  },
  methods: {
    enviarComentario() {
      this.$emit("comentario", this.mensaje, this.mensajeId);
      this.mensaje = "";
    },
  },
};
</script>

<style></style>
