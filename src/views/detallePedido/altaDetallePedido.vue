<template>
  <div>
    <header>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </header>

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
            <router-link to="/verpedidos" style="text-decoration:none;">
              <button class="btn btn-secondary" id="cancelar" type="button"><i class="fa-solid fa-times"></i>Cancelar</button>
            </router-link>
              <button class="btn btn-success" id="enviar" type="submit"><i class="fa-solid fa-check"></i>Confirmar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
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
      idSofa: null
    };
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
          alert('Detalle de pedido agregado exitosamente');
          this.$router.push('/verpedidos');
        } else {
          alert('Error al agregar el detalle de pedido');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de red al agregar el detalle de pedido');
      }
    }
  }
};
</script>
  
  <style scoped>
  .container {
    justify-content: center;
    align-items: center;
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
  