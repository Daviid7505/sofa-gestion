<template>
    <div>
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </header>
      <div class="d-flex container" id="form-target">
        <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
          <div class="form-row">
            <div class="d-flex flex-row">
              <div>
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="nombre" required>
              </div>
              <div class="separador-lateral"></div>
              <div>
                <label for="apellidos">Apellidos</label>
                <input type="text" class="form-control" id="apellidos" v-model="apellidos" required>
              </div>
            </div>
            <div class="d-flex flex-row mt-3">
              <div>
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <div class="separador-lateral"></div>
              <div>
                <label for="departamento">Departamento</label>
                <select class="form-select" id="departamento" v-model="idDepto" required>
                  <option v-for="departamento in departamentos" :key="departamento.idDepto" :value="departamento.idDepto">{{ departamento.nombre }}</option>
                </select>
              </div>
            </div>
            <div class="d-flex flex-row mt-3">
              <div>
                <label for="perfil">Perfil</label>
                <select class="form-select" id="perfil" v-model="idPerfil">
                  <option v-for="perfil in perfiles" :key="perfil.idPerfil" :value="perfil.idPerfil">{{ perfil.rol }}</option>
                </select>
              </div>
            </div>
            <div class="d-flex flex-row mt-3">
              <div>
                <label for="fechaIngreso">Fecha de ingreso</label>
                <input type="date" class="form-control" id="fechaIngreso" v-model="fechaIngreso" required>
              </div>
              <div class="separador-lateral"></div>
              <div>
                <label for="salario">Salario</label>
                <input type="text" class="form-control" id="salario" v-model="salario" required>
              </div>
            </div>
            <div class="d-flex flex-row mt-3 botones">
              <router-link to="/verempleados" style="text-decoration:none;">
                <button class="btn btn-secondary" id="cancelar" type="button"><i class="fa-solid fa-xmark"></i>Cancelar</button>
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
  name: 'vistaAltaEmpleado',
  data() {
    return {
      nombre: '',
      apellidos: '',
      password: '',
      idDepto: '',
      idPerfil: '',
      fechaIngreso: '',
      salario: '',
      departamentos: [],
      perfiles: []
    };
  },
  async created() {
    // Llamar a la función para obtener los departamentos y perfiles cuando se carga el componente
    await this.obtenerDepartamentos();
    await this.obtenerPerfiles();
  },
  methods: {
    async obtenerDepartamentos() {
      try {
        // Realizar la llamada GET para obtener los departamentos disponibles
        const response = await fetch('http://localhost:8088/departamento/todos');

        if (response.ok) {
          // Convertir la respuesta a JSON
          const data = await response.json();
          // Asignar los departamentos al array
          this.departamentos = data;
        } else {
          console.error('Error al obtener los departamentos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async obtenerPerfiles() {
      try {
        // Realizar la llamada GET para obtener los perfiles disponibles
        const response = await fetch('http://localhost:8088/perfiles/todos');

        if (response.ok) {
          // Convertir la respuesta a JSON
          const data = await response.json();
          // Asignar los perfiles al array
          this.perfiles = data;
        } else {
          console.error('Error al obtener los perfiles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async enviarFormulario() {
      const formData = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        password: this.password,
        idDepto: this.idDepto,
        idPerfil: this.idPerfil,
        fechaIngreso: this.fechaIngreso,
        salario: this.salario
      };

      try {
        const response = await fetch('http://localhost:8088/empleado/alta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert('Empleado agregado exitosamente');
          this.$router.push('/verempleados');
        } else {
          alert('Error al agregar el empleado');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de red al agregar el empleado');
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
    margin-top: 5%;
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
  </style>
  