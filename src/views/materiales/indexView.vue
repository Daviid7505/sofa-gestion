
<template>

  <div class="container">
    <div v-if="mensajeVisible">
      <!-- Mensaje de error -->
      <div v-if="mensajeError" class="notification">
          <div class="intermedio">
            <div class="icononotificacionerror"><svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" style=" width:42%; fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M16.707 2.293A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></div>
            <div class="alerta error">{{ mensaje }}</div>
          </div>
        </div>
    
        <!-- Mensaje satisfactorio -->
        <div v-if="mensajeSatisfactorio" class="notification">
          <div class="intermedio">
            <div class="icononotificacion"><svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 25 25" style=" width:42%;fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"></path></svg></div>
            <div class="alerta">{{ mensaje }}</div>
          </div>
        </div>
    </div>
 
    <div class="container-title">
      <div class="title"> 
        <h1 class="text-left">Lista materiales</h1>
      </div>
      <div class="container-alta"> 
        <router-link to="/crear-material" style="text-decoration:none;"> <addbutton/></router-link>
      </div>
  </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
             
              <th  scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">RefMaterialProveedor</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Categoria</th>
              <th scope="col">Proveedor</th>
              <th scope="col">UnidadMedida</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="material in materiales" :key="material.idMaterial">
              <td>{{ material.nombre }}</td>
              <td>{{ material.descripcion }}</td>
              <td>{{ material.refMaterialProveedor }}</td>
              <td>{{ material.cantidad }}</td>
              <td>{{ material.categoria }}</td>
              <td>{{ material.proveedor ? material.proveedor.nombre : 'Sin proveedor' }}</td>
              <td>{{ material.unidadMedida }}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-material/' + material.idMaterial"> <editbutton/></router-link>
                  <!-- Botón para borrar material -->
                  <div class="separador"></div>
                   <trashbutton/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      
      </div>
    </div>
  </div>
  
</template>

<script>
import addbutton from '../../components/addbutton.vue';
import editbutton from '../../components/editbutton.vue';
import trashbutton from '../../components/trashbutton.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

// Importa la función verificarMensajeQuery desde el archivo vistaHelper.js
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery } from '@/js/notificacion.js'; 

export default {
  components: { addbutton, editbutton, trashbutton},
  setup() {
    let materiales = ref([]);

    const getMateriales = () => {
      fetch('http://localhost:8088/materiales/todos')
        .then(res => res.json())
        .then(data => {
          materiales.value = data;
          console.log(data);
        });
    };

    onMounted(() => {
      getMateriales();
      verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
    });

    return { materiales, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError };
  }
};

</script>

<style scoped>
@import url('../../assets/notificacion.css');
.botones {
  width: 200px;
}

.container-title{
  display:flex;
  margin-top:20px;
  background-color:rgb(22, 62, 108);
  border-radius:8px;
  justify-content:space-between;
  height:50px;
  
}
.container-alta{
  display:flex;
  justify-content:center;
  width:25%;
  height:100%;
  align-items:center;
  
}

.title{
 
  color:white;
  padding-left:40px;
}

.separador{
  width:22px;
}

table th{
text-align:center;
}

table td{
  text-align:center;
}


</style>
