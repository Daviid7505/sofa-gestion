
<template>
    <div class="container">
   <!-- Mensajes de notificación -->
   <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
      <div class="container-title">
        <div class="title">
          <h1 class="text-left">Lista de clientes</h1>
        </div>
        <div class="container-alta"> 
          <router-link to="/crear-cliente" style="text-decoration:none;"> <addbutton/></router-link>
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
                <th  scope="col">Nombre</th>
                <th  scope="col">Apellidos</th>
                <th scope="col">Dirección</th>
                <th  scope="col">Email</th>
                <th scope="col">Teléfono</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in filteredClientes" :key="cliente.idCliente">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellidos }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td class="botones">
                  <div class="d-flex flex-row">
                    <router-link :to="'/editar-cliente/' + cliente.idCliente"> <editbutton/></router-link>
                    <div class="separador" ></div>
                    <trashbutton @click="eliminarCliente(cliente.idCliente)">  </trashbutton>
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
import editbutton from '../../components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import { ref, onMounted, computed } from 'vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, trashbutton, notification },
  name: 'verclientes',
  setup() {
    const clientes = ref([]);
    const searchQuery = ref('');

    const eliminarCliente = (idCliente) => {
      if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        fetch(`http://localhost:8088/cliente/eliminar/${idCliente}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de clientes
          getClientes();
          mostrarMensaje('Cliente eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar cliente', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };

    const getClientes = () => {
      fetch('http://localhost:8088/cliente/todos')
        .then(res => res.json())
        .then(data => {
          clientes.value = data;
        })
        .catch(error => {
          mostrarMensaje('Error al obtener la lista de clientes', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
    };

    const filteredClientes = computed(() => {
      return clientes.value.filter(cliente => {
        const searchTerm = searchQuery.value.toLowerCase();
        const nombre = cliente.nombre.toLowerCase();
        const direccion = cliente.direccion.toLowerCase();
        const email = cliente.email.toLowerCase();
        const telefono = cliente.telefono.toString();

        return(
          nombre.includes(searchTerm) ||
          direccion.includes(searchTerm) ||
          email.includes(searchTerm) ||
          telefono.includes(searchTerm) 
        );
      });
    });

    onMounted(() => {
      limpiarMensaje();
      getClientes();
      verificarMensajeQuery();
    });

    return { notification, clientes, searchQuery, filteredClientes, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, eliminarCliente };
  }
};
</script>