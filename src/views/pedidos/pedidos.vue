<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  </header>

  <div class="container">
    <div v-if="mensajeVisible">
      <!-- Mensaje de error -->
      <div v-if="mensajeError" class="notification">
        <div class="intermedio">
          <div class="icononotificacionerror">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" style="width:42%; fill: rgba(255, 255, 255, 1);"><path d="M16.707 2.293A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <div class="alerta error">{{ mensaje }}</div>
        </div>
      </div>

      <!-- Mensaje satisfactorio -->
      <div v-if="mensajeSatisfactorio" class="notification">
        <div class="intermedio">
          <div class="icononotificacion">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 25 25" style="width:42%;fill: rgba(255, 255, 255, 1);"><path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"/></svg>
          </div>
          <div class="alerta">{{ mensaje }}</div>
        </div>
      </div>
    </div>

    <div class="container-title">
      <div class="title">
        <h1 class="text-left">Lista de pedidos</h1>
      </div>
      <div class="container-alta">
        <router-link to="/crear-pedido" style="text-decoration:none;">
          <button class="agregar" type="button">
            <i class='bx bxs-plus-circle'></i>
            <span>Nuevo pedido</span>
          </button>
        </router-link>
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
                  <button class="btn btn-danger" @click="eliminarPedido(pedido.idPedido)">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path></g></g>
                    </svg>Eliminar
                  </button>
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
import editbutton from '../../components/editbutton.vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery } from '@/js/notificacion.js';

export default {
  components: { editbutton },
  name: 'verpedidos',
  setup() {
    const pedidos = ref([]);

    const getPedidos = () => {
      fetch('http://localhost:8088/pedido/lista')
        .then(res => res.json())
        .then(data => {
          pedidos.value = data;
        });
    };

    const eliminarPedido = (idPedido) => {
      if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        fetch(`http://localhost:8088/pedido/eliminar/${idPedido}`, {
          method: 'DELETE',
        })
        .then(() => {
          getPedidos();
          console.log('Pedido eliminado exitosamente');
        })
        .catch(error => {
          mensaje.value = 'Error al eliminar el pedido.';
          mostrarMensaje();
          console.error('Error:', error);
        });
      }
    };

    const formatFecha = (fecha) => {
      return format(new Date(fecha), 'dd-MM-yyyy');
    };

    onMounted(() => {
      getPedidos();
      verificarMensajeQuery();
    });

    return { pedidos, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, formatFecha, eliminarPedido };
  }
};
</script>
  
  <style scoped>
  .botones {
    width: 200px;
  }
  
  .container-title {
    display: flex;
    margin-top: 20px;
    background-color: rgb(22, 62, 108);
    border-radius: 8px;
    justify-content: space-between;
    height: 60px;
  }
  
  .container-alta {
    display: flex;
    justify-content: center;
    width: 25%;
    height: 100%;
    align-items: center;
  }
  
  .title {
    color: white;
    padding-left: 40px;
  }
  
  .separador {
    width: 22px;
  }
  
  table th, table td {
    text-align: center;
  }
  
  .notification {
    display: flex;
    padding-top: 10px;
    width: 80vw;
    height: 5.5vh;
    justify-content: right;
  }
  
  .intermedio {
    display: flex;
    background-color: rgba(240, 240, 240, 0.899);
    box-shadow: 1.5px 1.5px 5px 1.5px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    width: 22%;
    justify-content: space-between;
  }
  
  .alerta {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  
  .icononotificacion {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(38, 182, 38, 0.887);
    border-radius: 8px;
    width: 25%;
  }
  
  .icononotificacionerror {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(210, 21, 21, 0.984);
    border-radius: 8px;
    width: 25%;
  }
  
  .agregar {
    border: none;
    color: white;
    background-color: rgb(15, 153, 2);
    border-radius: 6px;
    width: 150px;
    display: flex;
    align-items: center;
  }
  
  .btn{
    border:none;
    background-color:rgb(224, 10, 10);
    border:none;
    border:none;
    color:white;
    border-radius:6px;
    width:100px;
    display:flex;
    align-items:center;
    height:30px;
  }

  .agregar span {
    padding-left: 10px;
  }
  
  i {
    padding-left: 6px;
  }
  </style>
  