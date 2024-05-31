
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
    <!-- Barra de búsqueda -->
    <div class="row mb-3 container-barra-busqueda">
      <div class="col-md-12 container-barra-busqueda-interno" >
        <input type="text" v-model="searchQuery" class="form-control" placeholder="Buscar...">
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Descripción</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="proveedor in filteredProveedores" :key="proveedor.idProveedor">
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
import { ref, computed, onMounted } from 'vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, trashbutton, notification },
  name: 'verproveedores',
  setup() {
    const proveedores = ref([]);
    const searchQuery = ref('');

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
          console.error('Error:', error);
        });
    };

    const filteredProveedores = computed(() => {
      return proveedores.value.filter(proveedor => {
        const searchTerm = searchQuery.value.toLowerCase();
        const nombre = proveedor.nombre.toLowerCase();
        const telefono = proveedor.telefono.toString();
        const descripcion = proveedor.descripcion.toLowerCase();
        
        return (
          nombre.includes(searchTerm) ||
          telefono.includes(searchTerm) ||
          descripcion.includes(searchTerm)
        );
      });
    });

    onMounted(() => {
      limpiarMensaje();
      getProveedores();
      verificarMensajeQuery();
    });

    return { notification, proveedores, filteredProveedores, searchQuery, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, eliminarProveedor };
  }
};
</script>
  
 
