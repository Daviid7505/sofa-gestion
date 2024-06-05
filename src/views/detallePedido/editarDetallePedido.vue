<template>
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </header>

  <div>
    <h1>Modificar detalle</h1>
  </div>
  <div class="d-flex container" id="form-target">
    <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
      <div class="form-row">
        <div class="d-flex flex-row">
          <div>
           
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label class="ref-sofa">Sofá</label>
            <select class="form-select" v-model="detalle.idSofa" required>
              <option v-for="sofa in sofas" :key="sofa.idSofa" :value="sofa.idSofa">{{ sofa.nombre }}</option>
            </select>
          </div>
        </div>
        <div class="d-flex flex-row mt-3">
          <div>
            <label for="cantidad">Cantidad</label>
            <input type="number" class="form-control" id="cantidad" v-model="detalle.cantidad" required>
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label for="plazas">Plazas</label>
            <input type="number" class="form-control" id="plazas" v-model="detalle.plazas" required>
          </div>
        </div>
        <div class="d-flex flex-row mt-3">
          <div>
            <label for="densCojin">Densidad cojín</label>
            <input type="number" class="form-control" id="densCojin" v-model="detalle.densCojin" required>
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label for="fecha">Fecha</label>
            <input type="date" class="form-control" id="fecha" v-model="detalle.fecha" required>
          </div>
        </div>
        <div class="d-flex flex-row mt-3">
          <div>
            <label for="precio">Precio</label>
            <input type="number" class="form-control" id="precio" v-model="detalle.precio" required>
          </div>
        </div>
        <div class="d-flex flex-row mt-3 botones">
          <router-link to="/verpedidos" style="text-decoration: none;"> <cancelbutton/></router-link>
          <confirmbutton @click="enviarFormulario"></confirmbutton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import router from '@/router';
import confirmbutton from '@/components/confirmbutton.vue';
import cancelbutton from '@/components/cancelbutton.vue';

export default {
  components: { confirmbutton, cancelbutton },
  name: 'vistaEditarDetallePedido',
  data() {
    return {
      detalle: {
        idDePed: '',
        idPedido: '',
        idSofa: '',
        cantidad: '',
        plazas: '',
        densCojin: '',
        fecha: '',
        precio: '',
        estado:'',
      },
      sofas: []
    };
  },
  created() {
      this.detalle.idDePed  = this.$route.params.idDePed;
      this.obtenerDetallePedido();
    
  },
  methods: {
    async obtenerDetallePedido() {
      try {
        const response = await fetch(`http://localhost:8088/detallepedido/uno/${this.detalle.idDePed}`);
        if (response.ok) {
          const data = await response.json();
          this.detalle = {
            idDePed: data.idDePed,
            idPedido: data.idPedido,
            idSofa: data.idSofa,
            cantidad: data.cantidad,
            plazas: data.plazas,
            densCojin: data.densCojin,
            fecha: data.fecha.split('T')[0],
            precio: data.precio,
            estado: data.idEstado
          };
          this.obtenerSofas();
        } else {
          console.error('Error al obtener los detalles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async obtenerSofas() {
      try {
        const response = await fetch(`http://localhost:8088/sofa/todos`);
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
    async enviarFormulario() {
      try {
        const formData = {
          idDePed: this.detalle.idDePed,
          idPedido: this.detalle.idPedido,
          idSofa: this.detalle.idSofa,
          cantidad: this.detalle.cantidad,
          plazas: this.detalle.plazas,
          densCojin: this.detalle.densCojin,
          fecha: this.detalle.fecha,
          precio: this.detalle.precio,
          idEstado: this.detalle.estado
        };
        console.log(formData);
        const response = await fetch('http://localhost:8088/detallepedido/modificar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          this.$router.push({ path: `/ver-detallepedido/${this.detalle.idPedido}`, query: { mensaje: 'Detalle de Pedido editado', tipo: 'satisfactorio' } });
        } else {
          this.$router.push({ path: `/ver-detallepedido/${this.detalle.idPedido}`, query: { mensaje: 'Error al actualizar el detalle de pedido', tipo: 'error' } });
        }
      } catch (error) {
        console.error('Error:', error);
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

i {
  padding-right: 6px;
}

h1 {
  text-align: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-top: 30px;
}
</style>