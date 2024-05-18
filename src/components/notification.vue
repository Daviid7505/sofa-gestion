<template>
    <div v-if="mensajeVisible">
      <!-- Mensaje de error -->
      <div v-if="mensajeError" class="notification">
        <div class="intermedio">
          <div class="icononotificacionerror">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" style="width:42%; fill: rgba(255, 255, 255, 1);">
              <path d="M16.707 2.293A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div class="alerta error">{{ mensaje }}</div>
        </div>
      </div>
  
      <!-- Mensaje satisfactorio -->
      <div v-if="mensajeSatisfactorio" class="notification">
        <div class="intermedio">
          <div class="icononotificacion">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 25 25" style="width:42%; fill: rgba(255, 255, 255, 1);">
              <path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"/>
            </svg>
          </div>
          <div class="alerta">{{ mensaje }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      mensaje: {
        type: String,
        required: false
      },
      mensajeVisible: {
        type: Boolean,
        required: false
      },
      mensajeError: {
        type: Boolean,
        required: false
      },
      mensajeSatisfactorio: {
        type: Boolean,
        required: false
      }
    }
  };
  </script>
<style scoped>
.notification{
  display:flex;
  padding-top:10px;
  width: 80vw;
  height:5.5vh;
  justify-content:right;
}


.intermedio{
  display:flex;
  background-color:rgba(240, 240, 240, 0.899);
  box-shadow: 1.5px 1.5px 5px 1.5px rgba(0, 0, 0, 0.15);
  border-radius:8px;
  width:22%;
  justify-content:space-between;
}

.alerta{
  display:flex;
  height:100%;
  width:100%;
  padding-left:10px;
  align-items:center;
  justify-content:center;

}

.icononotificacion{
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(38, 182, 38, 0.887);
  border-radius:8px;
  width:25%;
}

.icononotificacionerror{
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(210, 21, 21, 0.984);
  border-radius:8px;
  width:25%;
}



</style>