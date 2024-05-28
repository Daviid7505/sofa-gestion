
<template>

    <div class="container">
       <!-- Mensajes de notificación -->
       <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
   
      <div class="container-title">
        <div class="title"> 
          <h1 class="text-left">Detalles pedido</h1>
        </div>
        <div class="container-alta"> 
          <!--<router-link to="/alta-detalle" style="text-decoration:none;"> <addbutton/></router-link>
        --></div>
    </div>
  
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover table-responsive">
            <thead class="center">
              <tr>
               
                <th scope="col">Fecha</th>
                <th scope="col">Modelo</th>
                <th scope="col">Descripción</th>
                <th scope="col">Plazas</th>
                <th scope="col">Densidad</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="detalle in detallePedido" :key="detalle.idDePed">
               
                <td>{{ formatFecha(detalle.fecha)}}</td>
                <td>{{ detalle.sofa.nombre }}</td>
                <td>{{ detalle.sofa.descripcion }}</td>
                <td>{{ detalle.plazas}}</td>
                <td>{{ detalle.densCojin }}</td>
                <td>{{ detalle.cantidad}}</td>
                <td>{{ detalle.precio }} €</td>
                <td class="botones">
                  <div class="d-flex flex-row">
                    <router-link :to="'/editar-material/'"> <editbutton/></router-link>
                    <div class="separador"></div>
                    <!--<trashbutton @click="eliminarMaterial(material.idMaterial)">  </trashbutton>
                  --></div>
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
  import {format} from 'date-fns';
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
      let detallePedido =  ref([]);
      const route = useRoute();
  
      const getDetallePedido = async () => {
      const idPedido = route.params.idPedido;
      try {
        const res = await fetch(`http://localhost:8088/detallepedido/porPedido/${idPedido}`);
        const data = await res.json();
        detallePedido.value = data;
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    };

        const formatFecha = (fecha) => {
        return format(new Date(fecha), 'dd-MM-yyyy');
    };

      onMounted(() => {
        limpiarMensaje();
        getDetallePedido();
        verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
      });
  

      return {formatFecha, detallePedido, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, notification};
    }
  };
  
  </script>
  
  