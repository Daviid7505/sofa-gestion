
<template>

  <div class="container">
     <!-- Mensajes de notificación -->
     <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
 
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
                  <div class="separador"></div>
                  <trashbutton @click="eliminarMaterial(material.idMaterial)">  </trashbutton>
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
import addbutton from '@/components/addbutton.vue';
import editbutton from '@/components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js'; 

export default {
  components: { addbutton, editbutton, trashbutton, notification},
  setup() {
    let materiales = ref([]);

    const getMateriales = () => {
      fetch('http://localhost:8088/materiales/todos')
        .then(res => res.json())
        .then(data => {
          materiales.value = data;
          
        });
    };

    onMounted(() => {
      limpiarMensaje();
      getMateriales();
      verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
    });

    const eliminarMaterial = (idMaterial) => {
      if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
        fetch(`http://localhost:8088/materiales/eliminar/${idMaterial}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de empleados
          getMaterial();
          mostrarMensaje('Material eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar material', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };
    const getMaterial = () => {
      fetch('http://localhost:8088/materiales/todos')
        .then(res => res.json())
        .then(data => {
          materiales.value = data;
        })
        .catch(error => {
          mostrarMensaje('Error al obtener la lista de materiales', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
    };


    return {getMaterial, eliminarMaterial, materiales, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, notification};
  }
};

</script>

