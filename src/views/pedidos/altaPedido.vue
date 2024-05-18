<template>
    <div>
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </header>
  
      <div>
        <h1>Formulario de alta de pedido</h1>
      </div>
      <div class="d-flex container" id="form-target">
        <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
          <div class="form-row">
            <div class="d-flex flex-row">
              <div>
                <label for="nombre">Cliente</label>
                <select class="form-select" id="nombre" v-model="vendedor" required>
                  <option v-for="cliente in clientes" :key="cliente.idCliente" :value="cliente.idCliente">{{ cliente.nombre + ' ' + cliente.apellidos }}</option>
                </select>
              </div>
              <div class="separador-lateral"></div>
              <div>
                <label for="fecha">Fecha</label>
                <input type="date" class="form-control" id="fecha" v-model="fecha" required>
              </div>
            </div>
            <div class="d-flex flex-row mt-3">
              <div>
                <label for="vendedor">Vendedor</label>
                <select class="form-select" id="vendedor" v-model="idEmpleado" required>
                  <option v-for="empleado in empleados" :key="empleado.idEmpleado" :value="empleado.idEmpleado">{{ empleado.nombre + ' ' + empleado.apellidos }}</option>
                </select>
              </div>
              <div class="separador-lateral"></div>
            </div>
            <div class="d-flex flex-row mt-3 botones">
              <router-link to="/verempleados" style="text-decoration:none;">
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
    name: 'vistaAltaPedido',
    data() {
      return {
        idCliente: '',
        fecha: '',
        idVendedor: '',
        clientes: [],
        empleados: []
      };
    },
    async created() {
      await this.obtenerClientes();
      await this.obtenerVendedores();
    },
    methods: {
      async obtenerClientes() {
        try {
          const response = await fetch('http://localhost:8088/cliente/todos');
          if (response.ok) {
            const data = await response.json();
            this.clientes = data;
          } else {
            console.error('Error al obtener los clientes');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async obtenerVendedores() {
        try {
          const response = await fetch('http://localhost:8088/empleado/porPerfil/2');
          if (response.ok) {
            const data = await response.json();
            this.empleados = data;
          } else {
            console.error('Error al obtener los vendedores');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async enviarFormulario() {
        const formData = {
        idCliente: this.idCliente,
        fecha: this.fecha,
        vendedor: this.idEmpleado
      };
      try {
        const response = await fetch('http://localhost:8088/pedido/alta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          
          this.$router.push({path:'/crear-detallePedido', query: { mensaje: 'Pedido agregado exitosamente', tipo:'satisfactorio'}})
        } else {
          this.$router.push({path:'/crear-Pedido', query: { mensaje: 'Error al crear pedido', tipo:'error'}})
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de red al agregar el pedido');
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
  