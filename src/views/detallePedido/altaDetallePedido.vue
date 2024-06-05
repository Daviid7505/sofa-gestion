<template>
    <header>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </header>

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

    <div>
      <h1>Detalle de pedido</h1>
    </div>
    <div class="d-flex container" id="form-target">
      <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
        <div class="form-row">
          <div class="d-flex flex-row">
            <div>
              <label for="pedido">Pedido</label>
              <select class="form-select" id="pedido" v-model="idPedido" required>
                <option v-for="pedido in pedidos" :key="pedido.idPedido" :value="pedido.idPedido">{{ pedido.idPedido }}</option>
              </select>
            </div>
            <div class="separador-lateral"></div>
            <div>
              <label for="sofa">Sofá</label>
              <select class="form-select" id="sofa" v-model="idSofa" required>
                <option v-for="sofa in sofas" :key="sofa.idSofa" :value="sofa.idSofa">{{ sofa.nombre }}</option>
              </select>
            </div>
          </div>
          <div class="d-flex flex-row mt-3">
            <div>
              <label for="cantidad">Cantidad</label>
              <input type="number" class="form-control" id="cantidad" v-model="cantidad" required>
            </div>
            <div class="separador-lateral"></div>
            <div>
              <label for="plazas">Plazas</label>
              <input type="number" class="form-control" id="plazas" v-model="plazas" required>
            </div>
          </div>
          <div class="d-flex flex-row mt-3">
            <div>
              <label for="densCojin">Densidad de cojín</label>
              <input type="number" class="form-control" id="densCojin" v-model="densCojin" required>
            </div>
            <div class="separador-lateral"></div>
            <div>
              <label for="fecha">Fecha</label>
              <input type="date" class="form-control" id="fecha" v-model="fecha" required>
            </div>
          </div>
          <div class="d-flex flex-row mt-3">
            <div>
              <label for="precio">Precio</label>
              <input type="text" class="form-control" id="precio" v-model="precio" readonly>
            </div>
            <div class="separador-lateral"></div>
          </div>
           <div class="d-flex flex-row mt-3 botones">
          <router-link to="/verpedidos" style="text-decoration: none;"> <cancelbutton/></router-link>
          <confirmbutton @click="enviarFormulario"></confirmbutton>
         </div>
        </div>
      </form>
    </div>
    <div class="container">
      <!-- Div para mostrar el mensaje de error en la parte inferior del formulario -->
      <div v-if="mensajeErrorFormulario.length" class="alert alert-danger error-detalle">
        <div class="centrador-error" v-for="(error, index) in mensajeErrorFormulario" :key="index">
          <i class='bx bx-error bx-tada bx-flip-horizontal'></i>{{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import confirmbutton from '@/components/confirmbutton.vue'
import cancelbutton from '@/components/cancelbutton.vue'
// Importa la función verificarMensajeQuery desde el archivo vistaHelper.js
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery } from '@/js/notificacion.js'; 


export default {
  components: { confirmbutton, cancelbutton },
  name: 'vistaAltaDetallePedido',
  data() {
    return {
      pedidos: [],
      sofas: [],
      cantidad: 1,  // Inicializado a 1 para evitar multiplicaciones por 0
      plazas: '',
      densCojin: '',
      fecha: '',
      precio: '',
      idPedido: null,
      idSofa: null,
      mensajeErrorFormulario: []
    };
  },
  setup(){
    onMounted(() => {
      verificarMensajeQuery();
    }); 
    return {mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError}
  },
  async created() {
    await this.obtenerPedidos();
    await this.obtenerSofas();
    if (this.pedidos.length > 0) {
      this.idPedido = this.pedidos[this.pedidos.length - 1].idPedido;
    }
  },
  watch: {
    idSofa: 'actualizarPrecio',
    cantidad: 'actualizarPrecio'
  },
  methods: {
    async obtenerPedidos() {
      try {
        const response = await fetch('http://localhost:8088/pedido/lista');
        if (response.ok) {
          const data = await response.json();
          this.pedidos = data;
        } else {
          console.error('Error al obtener los pedidos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async obtenerSofas() {
      try {
        const response = await fetch('http://localhost:8088/sofa/todos');
        if (response.ok) {
          const data = await response.json();
          this.sofas = data;
        } else {
          console.error('Error al obtener los sofás');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    actualizarPrecio() {
      const sofaSeleccionado = this.sofas.find(sofa => sofa.idSofa === this.idSofa);
      if (sofaSeleccionado) {
        this.precio = sofaSeleccionado.precio * this.cantidad;
      }
    },
    async enviarFormulario() {
      const formData = {
        idPedido: this.idPedido,
        idSofa: this.idSofa,
        cantidad: this.cantidad,
        plazas: this.plazas,
        densCojin: this.densCojin,
        fecha: this.fecha,
        precio: this.precio
      };

      try {
        const response = await fetch('http://localhost:8088/detallepedido/alta', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
        const data = await response.json();
          if (!data.error) {
            this.$router.push({ path: '/verpedidos', query: { mensaje: 'Detalle agregado exitosamente', tipo: 'satisfactorio' } });
          } else {
            this.mensajeErrorFormulario =[data.error];
          }
        } else {
            const errorData = await response.json();
            if (errorData.errors) {
                this.mensajeErrorFormulario = errorData.errors;
              } else {
                this.mensajeErrorFormulario = [errorData.error];
              }
           }
    }catch (error) {
      console.error('Error:', error);
      this.mensajeErrorFormulario = ['Error al procesar la solicitud'];
    }
  }
}
};

</script>
  
  <style scoped>
  @import url('/src/assets/error-detalle.css');
  .container {
    justify-content: center;
    align-items: center;
    display:flex;
    flex-direction: column;
   
  }
  
  form {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  
  .d-flex {
    padding-top: 10px;
  }
  
  .separador-lateral {
    width: 20px;
  }
  
  #form-target {
    background-color: rgb(255, 255, 255);
    border-radius: 3vh;
    width: 60vh;
    padding-bottom: 25px;
    margin-top: 2%;
    box-shadow: 3px 3px 14px 1px rgba(0, 0, 0, 0.1);
  }
  
  #enviar,
  #cancelar {
    margin-top: 10px;
    width: auto;
    color: white;
    cursor: pointer;
  }
  
  #enviar {
    background-color: #0f9902;
  }
  
  #cancelar {
    background-color: #909090;
  }
  
  #enviar:hover {
    background-color: #0c7902;
  }
  
  #cancelar:hover {
    background-color: #6f6f6f;
  }
  
  .botones {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  i{
    padding-right: 6px;
  }

  h1{
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-top: 30px;
}
  </style>
  