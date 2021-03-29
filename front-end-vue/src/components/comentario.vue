<template>
  <div class="mb-3">
    <div :id="id1">
      <b-card-text v-for="(comentario, index) in listaRespuestas" :key="index">
        Comentario {{ index }}: {{ comentario.respuesta }}
      </b-card-text>
    </div>
  </div>
</template>

<script>
export default {
  props: { id1: Number, listaRespuestas: Array },
};
</script>

<style></style>
