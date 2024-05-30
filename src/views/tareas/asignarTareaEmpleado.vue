<template>
    <div>
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </header>
  
      <div>
        <h1>Asigna la tarea a un empleado</h1>
      </div>
      <div class="d-flex container" id="form-target">
        <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
          <div class="form-row">
            <div class="d-flex flex-row">
              <div>
                <label class="ref-cliente">Empleado</label>
                <select class="form-select" id="nombre" v-model="idEmpleado" required>
                  <option v-for="empleado in empleados" :key="empleado.idEmpleado" :value="empleado.idEmpleado">{{ empleado.nombre + ' ' + empleado.apellidos }}</option>
                </select>
              </div>
              <div class="separador-lateral"></div>
              <div>
              </div>
            </div>
            <div class="d-flex flex-row mt-3">
              <div>
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
    </div>
  </template>
  
  <script>
  import confirmbutton from '@/components/confirmbutton.vue'
  import cancelbutton from '@/components/cancelbutton.vue'
  export default {
    components: { confirmbutton, cancelbutton },
    name: 'vistaAsignarTareaEmpleado',
    data() {
      return {
        idEmpleado: '',
        
        empleados: []
      };
    },
    async created() {
        this.idTarea = this.$route.params.idTarea;
        await this.obtenerEmpleados();
    },
    methods: {
       
      async obtenerEmpleados() {
        try {
          const response = await fetch('http://localhost:8088/empleado/porPerfil/3');
          if (response.ok) {
            const data = await response.json();
            this.empleados = data;
          } else {
            console.error('Error al obtener los empleados');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async enviarFormulario() {
      try {
        const response = await fetch(`http://localhost:8088/tarea/asignarEmpleado/${this.idTarea}?idEmpleado=${this.idEmpleado}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          
          this.$router.push({path:'/departamentos', query: { mensaje: 'Pedido agregado exitosamente', tipo:'satisfactorio'}})
        } else {
          this.$router.push({path:'/departamentos', query: { mensaje: 'Error al asignar el empleado', tipo:'error'}})
        }
      } catch (error) {
        this.$router.push({path:'/departamentos', query: { mensaje: 'Error al asignar el empleado', tipo:'error'}})
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

  i{
    padding-right: 6px;
  }

  h1{
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-top: 30px;
}
  </style>
  