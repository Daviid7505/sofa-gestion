<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  </header>
  <div class="container">
    <!-- Mensajes de notificación -->
    <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
    <div class="container-title">
      <div class="title">
        <h1 class="text-left">Lista de pedidos</h1>
      </div>
      <div class="container-alta">
        <router-link to="/crear-pedido" style="text-decoration:none;"> <addbutton/></router-link>
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
              <th scope="col">Num pedido</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Vendedor</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in filteredPedidos" :key="pedido.idPedido">
              <td>{{ pedido.idPedido ? pedido.idPedido :'' }}</td>
              <td>{{ formatFecha(pedido.fecha) }}</td>
              <td>{{ pedido.cliente ? pedido.cliente.nombre + ' ' + pedido.cliente.apellidos : 'Sin cliente' }}</td>
              <td>{{ pedido.vendedor ? pedido.vendedor.nombre + ' ' + pedido.vendedor.apellidos : 'Sin vendedor' }}</td>
              <td class="estado"><div :class="estadoClass(pedido.estado)">{{pedido.estado}}</div></td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-pedido/' + pedido.idPedido"><editbutton/></router-link>
                  <div class="separador"></div>
                  <router-link :to="'/ver-detallepedido/' + pedido.idPedido" style="outline:none; text-decoration:none;"><detailbutton/></router-link>
                  <div class="separador"></div>
                  <trashbutton @click="eliminarPedido(pedido.idPedido)"></trashbutton>
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
import { ref, onMounted, computed } from 'vue';
import { format } from 'date-fns';
import addbutton from '@/components/addbutton.vue';
import editbutton from '@/components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import detailbutton from '@/components/detailbutton.vue';
import notification from '@/components/notification.vue';
import {estadoClass} from '@/js/asignar-estado.js';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, detailbutton, trashbutton, notification },
  name: 'verpedidos',
  setup() {
    const pedidos = ref([]);
    const searchQuery = ref('');
    const estadoFiltro = ref('');
    const getEstadoPedido = async (idPedido) => {
  try {
    const response = await fetch(`http://localhost:8088/tarea/estadoPorPedido/${idPedido}`);
    if (!response.ok) {
      throw new Error('Error al obtener el estado del pedido');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

    const getPedidos = async () => {
    try {
      const response = await fetch('http://localhost:8088/pedido/lista');
      if (!response.ok) {
        throw new Error('Error al obtener la lista de pedidos');
      }
      const data = await response.json();
      // Obtener el estado de cada pedido
      const pedidosConEstado = await Promise.all(
        data.map(async (pedido) => {
          const estado = await getEstadoPedido(pedido.idPedido);
          return { //Dentro del pedido creamos el campo estado, ya que el objeto en java no lo tiene
            ...pedido,
            estado: estado || 'Sin productos' //Si el estado está vacío nos devuelve Sin productos
          };
        })
      );
      pedidos.value = pedidosConEstado;
    } catch (error) {
      mostrarMensaje('Error al obtener la lista de pedidos', 'error');
      ocultarMensajeConRetraso();
      console.error('Error:', error);
    }
  };

    const eliminarPedido = (idPedido) => {
      if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        fetch(`http://localhost:8088/pedido/eliminar/${idPedido}`, {
          method: 'DELETE',
        })
          .then(() => {
            getPedidos();
            mostrarMensaje('Pedido eliminado exitosamente', 'satisfactorio');
            ocultarMensajeConRetraso();
          })
          .catch(error => {
            mostrarMensaje('Error al eliminar pedido', 'error');
            ocultarMensajeConRetraso();
            console.error('Error:', error);
          });
      }
    };

    const formatFecha = (fecha) => {
      return format(new Date(fecha), 'dd-MM-yyyy');
    };

    const filteredPedidos = computed(() => {
      return pedidos.value.filter(pedido => {
        const searchTerm = searchQuery.value.toLowerCase();
        const cliente = pedido.cliente ? (pedido.cliente.nombre + ' ' + pedido.cliente.apellidos).toLowerCase() : '';
        const estado = pedido.estado ? pedido.estado.toLowerCase() : '';
        const fecha = formatFecha(pedido.fecha).toLowerCase();
        const vendedor = pedido.vendedor ? (pedido.vendedor.nombre + ' ' + pedido.vendedor.apellidos).toLowerCase() : '';
        const numPedido = pedido.idPedido ? pedido.idPedido.toString() : '';
     // Filtrar por estado y búsqueda
     const matchEstado = !estadoFiltro.value || estado === estadoFiltro.value.toLowerCase();
        const matchSearch =
          cliente.includes(searchTerm) ||
          vendedor.includes(searchTerm) ||
          numPedido.includes(searchTerm) ||
          estado.includes(searchTerm) ||
          fecha.includes(searchTerm);

        return matchEstado && matchSearch;
      });
    });

    onMounted(() => {
      limpiarMensaje();
      getPedidos();
      verificarMensajeQuery();
    });

    return { estadoFiltro, notification, pedidos, searchQuery, filteredPedidos, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, formatFecha, eliminarPedido, estadoClass};
  }
};
</script>

<style scope>
@import url('/src/assets/colores-estados.css');

</style>
