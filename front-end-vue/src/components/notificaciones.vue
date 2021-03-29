<template>
  <div>
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
            <b-form-group class="inline-block"> </b-form-group>
          </b-card-body>
        </b-collapse>
      </div>
    </b-card-body>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
