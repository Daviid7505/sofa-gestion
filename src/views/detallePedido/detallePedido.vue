<template>
  <div class="container">
    <!-- Mensajes de notificación -->
    <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>

    <div class="container-title">
      <div class="title"> 
        <h1 class="text-left">Detalles pedido {{ idPedido }}</h1>
      </div>
      <div class="container-alta"> 
        <router-link to="/crear-detallePedido" style="text-decoration:none;"> <addbutton/></router-link>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
              <th scope="col">Fecha</th>
              <th scoped="col">Ref detalle</th>
              <th scope="col">Modelo</th>
              <th scope="col">Descripción</th>
              <th scope="col">Plazas</th>
              <th scope="col">Densidad</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Estado</th> 
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in detallePedido" :key="detalle.idDePed">
              <td>{{ formatFecha(detalle.fecha)}}</td>
              <td>{{ detalle.idDePed }}</td>
              <td>{{ detalle.sofa.nombre }}</td>
              <td>{{ detalle.sofa.descripcion }}</td>
              <td>{{ detalle.plazas}}</td>
              <td>{{ detalle.densCojin }}</td>
              <td>{{ detalle.cantidad}}</td>
              <td>{{ detalle.precio }} €</td>
              <td class="estado"><div :class="estadoClass(detalle.estado)">{{ detalle.estado }} </div></td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-material/'"> <editbutton/></router-link>
                  <div class="separador"></div>
                  <trashbutton @click="eliminarDetalle(detalle.idDePed)"> </trashbutton>
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
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import addbutton from '@/components/addbutton.vue';
import editbutton from '@/components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import { estadoClass } from '@/js/asignar-estado.js';
import { ref, onMounted } from 'vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js'; 

export default {
  components: { addbutton, editbutton, trashbutton, notification },
  setup() {
    let detallePedido = ref([]);
    const route = useRoute();
    const idPedido = ref(route.params.idPedido);
    
    const getEstadoDetallePedido = async (idDePed) => {
      try {
        const response = await fetch(`http://localhost:8088/tarea/estadoPorDetalle/${idDePed}`);
        if (!response.ok) {
          throw new Error('Error al obtener el estado del detalle');
        }
        const data = await response.text();
        return data;
      } catch (error) {
        console.error('Error:', error);
        return 'Error';
      }
    };

    const getDetallePedido = async () => {
      const idPedido = route.params.idPedido;
      try {
        const res = await fetch(`http://localhost:8088/detallepedido/porPedido/${idPedido}`);
        const data = await res.json();
        // Obtener el estado de cada pedido
        const detallePedidosConEstado = await Promise.all(
          data.map(async (detallePedido) => {
            const estado = await getEstadoDetallePedido(detallePedido.idDePed);
            return {
              ...detallePedido,
              estado: estado || 'Sin productos'
            };
          })
        );
        detallePedido.value = detallePedidosConEstado;
      } catch (error) {
        mostrarMensaje('Error al obtener la lista de pedidos', 'error');
        ocultarMensajeConRetraso();
        console.error('Error:', error);
      }
    };

    const formatFecha = (fecha) => {
      return format(new Date(fecha), 'dd-MM-yyyy');
    };

    onMounted(() => {
      limpiarMensaje();
      getDetallePedido();
      verificarMensajeQuery();
    });

    const eliminarDetalle = (idDePed) => {
      if (confirm('¿Estás seguro de que deseas eliminar este detalle?')) {
        fetch(`http://localhost:8088/detallepedido/eliminar/${idDePed}`, {
          method: 'DELETE',
        })
        .then(() => {
          getDetallePedido();
          mostrarMensaje('Detalle eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar detalle', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };

    return { estadoClass, idPedido, eliminarDetalle, formatFecha, detallePedido, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, notification };
  }
};
</script>

<style scoped>
@import url('/src/assets/colores-estados.css');
</style>
