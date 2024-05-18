
<template>
  <div class="container">
        <!-- Mensajes de notificación -->
        <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>

    <div class="container-title">
      <div class="title"> 
        <h1 class="text-left">Lista de proveedores</h1>
      </div>
      <div class="container-alta"> 
        <router-link to="/crear-proveedor" style="text-decoration: none;"><addbutton/></router-link>
      </div>
    </div>

    <div class="container-busqueda">
      <input v-model="terminoBusqueda" @keyup.enter="buscar" placeholder="Ingresar id del proveedor...">
      <button @click="buscar" class="buscar">Buscar</button>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="proveedor in proveedores" :key="proveedor.idProveedor">
              <td>{{ proveedor.nombre }}</td>
              <td>{{ proveedor.telefono }}</td>
              <td>{{ proveedor.descripcion }}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-proveedor/' + proveedor.idProveedor"><editbutton/></router-link>
                  <!-- Botón para borrar proveedor -->
                  <div class="separador"></div>
                  <trashbutton @click="eliminarProveedor(proveedor.idProveedor)"></trashbutton>
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
  import notification from '@/components/notification';
  import { ref } from 'vue';
  import { onMounted } from 'vue';

  // Importa la función verificarMensajeQuery desde el archivo vistaHelper.js
  import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso  } from '@/js/notificacion.js'; 
  
  export default {
    components: { addbutton, editbutton, trashbutton, notification},
    name:'verproveedores',
    setup() {
      let proveedores = ref([]);
      const terminoBusqueda = ref('');

const buscar = () => {
  const url = `http://localhost:8088/proveedor/uno/${terminoBusqueda.value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      proveedores.value = [data];
    })
    .catch(error => {
      mensaje.value = 'Error al buscar el proveedor.';
      mostrarMensaje();
      console.error('Error:', error);
    });
};
  const eliminarProveedor = (idProveedor) => {
      if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        fetch(`http://localhost:8088/proveedor/eliminar/${idProveedor}`, {
          method: 'DELETE',
        })
        .then(() => {
      
          getProveedores();
          mostrarMensaje('Proveedor eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar proveedor', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };
      const getProveedores = () => {
        fetch('http://localhost:8088/proveedor/todos')
          .then(res => res.json())
          .then(data => {
            proveedores.value = data;
          })
          .catch (error => {
            mostrarMensaje('Error al eliminar proveedor', 'error');
            ocultarMensajeConRetraso();
            console.error('Error:', error)
          })
      };
  
  
      onMounted(() => {
        limpiarMensaje();
        getProveedores();
        verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
      });

      
  
      return { notification, proveedores, terminoBusqueda, buscar, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, eliminarProveedor };
    }
  };
  
  </script>
  
 
