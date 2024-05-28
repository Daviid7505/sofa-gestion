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

    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Vendedor</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.idPedido">
              <td>{{ pedido.cliente ? pedido.cliente.nombre + ' ' + pedido.cliente.apellidos: 'Sin cliente'}}</td>
              <td>{{ pedido.estado ? pedido.estado.nombre: 'Sin estado'}}</td>
              <td>{{ formatFecha(pedido.fecha) }}</td>
              <td>{{ pedido.vendedor ? pedido.vendedor.nombre +' '+pedido.vendedor.apellidos: 'Sin vendedor' }}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-sofa/' + pedido.idPedido"><editbutton/></router-link>
                  <div class="separador"></div>
                  <router-link :to="'/detalle-pedido/' + pedido.idPedido"><detailbutton/></router-link>
                  <div class="separador"></div>
                  <trashbutton @click="eliminarPedido(pedido.idPedido)">  </trashbutton>
                   
                  
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
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import addbutton from '@/components/addbutton.vue'
import editbutton from '@/components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import detailbutton from '@/components/detailbutton.vue';
import notification from '@/components/notification.vue'
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, detailbutton, trashbutton, notification },
  name: 'verpedidos',
  setup() {
    const pedidos = ref([]);

    const getPedidos = () => {
      fetch('http://localhost:8088/pedido/lista')
        .then(res => res.json())
        .then(data => {
          pedidos.value = data;
        })
        .catch(error => {
          mostrarMensaje('Error al obtener la lista de pedidos', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        })
    };

    const getDetallePedido = () => {
      fetch('localhost:8088/detallepedido/porPedido/${idPedido}')
        .then(res => res.json())
        .then(data => {
          pedidos.value = data;
        })
        .catch(error => {
          mostrarMensaje('Error al obtener la lista de pedidos', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        })
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

    onMounted(() => {
      limpiarMensaje();
      getPedidos();
      verificarMensajeQuery();
    });

    return { notification, pedidos, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, formatFecha, eliminarPedido };
  }
};
</script>
  