<template>
     <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </header>

    <div><h1>Actualizar datos del empleado</h1></div>
    <div class="d-flex container" id="form-target">
      <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
        <div class="form-row ">
          <div class="d-flex flex-row col-md-12">
            <div>
              <label for="validationDefault01">Nombre</label>
              <input type="text" class="form-control" v-model="empleado.nombre" required>
            </div>
            <div class="separador-lateral"></div>
            <div>
              <label for="validationDefault01">Apellidos</label>
              <input type="text" class="form-control" v-model="empleado.apellidos" required>
            </div>
          </div>
  
          <div class="d-flex flex-row col-md-12">
            <div>
              <label for="validationDefault02">Password</label>
              <input type="text" class="form-control" v-model="empleado.password" required>
            </div>
            <div class="separador-lateral"></div>
            <div>
              <label class="ref-prov">Departamento</label>
           <!-- Reemplazar el input con un select -->
           <select class="form-select" v-model="nombreDepartamento" required>
                <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.nombre" :selected="departamento.nombre === empleado.departamento.nombre">{{ departamento.nombre }}</option>
              </select>
             </div>
        
    </div>
    <div class="separador">
      
    </div>
    <div class="d-flex flex-row col-md-12">
        <div>
            <label for="validationDefaul01">Fecha de Ingreso</label>
            <input type="date" class="form-control" v-model="empleado.fechaIngreso" placeholder="yyyy-MM-dd" required>
        </div>
        <div class="separador-lateral"></div>
        <div>
            <label for="validationDefault02">Rol</label>
            <select class="form-select" v-model="nombrePerfil" required>
                <option v-for="perfil in perfiles" :key="perfil.id" :value="perfil.rol" :selected="perfil.rol === empleado.perfil.rol">{{ perfil.rol }}</option>
              </select>
        </div>
       
    </div>   
    
    <div class="separador">
      
    </div>
    <div class=" d-flex flex-row col-md-12">
        <div>
            <label for="validationDefault02">Fecha de cese</label>
            <input type="date" class="form-control" v-model="empleado.fechaBaja" placeholder="yyyy-MM-dd" required>
        </div>
        <div class="separador-lateral"></div>
        <div>
              <label for="validationDefault01">Estado</label>
              <select class="form-select" v-model="empleado.estado" required>
            <option v-for="estado in estados" :key="estados" :value="estado" :selected="estado === estado">{{ estado }}</option>
             
            </select>
            </div>
    </div>    
    <div class="separador">
      
    </div>
    <div class="d-flex flex-row col-md-12">
            <div>
              <label for="validationDefault01">Salario</label>
              <input type="number" class="form-control" v-model="empleado.salario" placeholder="Salario" required>
            </div>
          </div>
  
    <div class="d-flex flex-row">
     
        <div class="botones">
          <router-link to="/verempleados" style="text-decoration:none; color:white;"> <button class="btn" id="cancelar"><i class="fa-solid fa-xmark"></i>Cancelar</button></router-link>
        <button class="btn" id="enviar" type="submit"><i class="fa-solid fa-check"></i>Confirmar</button>
         </div>
    </div>
  </div>
      </form>
    </div>
  </template>

  <script>
  import router from '@/router';
  export default {
    name: 'vistaEditarEmpleado',
    data() {
      return {
        empleado: {
          idEmpleado: '',
          nombre: '',
          apellidos: '',
          password: '',
          departamento: { 
            idDepto: '',
            nombre: ''
          },
          fechaIngreso: '',
          perfil: { 
            idPerfil: '',
            rol: ''
          },
          fechaBaja:'',
          estado: '',
          salario: ''
        },
        departamentos: [],
        departamentoIdInput: null,
        nombreDepartamento:null,
        perfiles:[],
        perfilIdInput: null,
        nombrePerfil:null,
        esatdoInicial: null,
        estados:['1', '0']
      };
    },
    created() {
      this.empleado.idEmpleado = this.$route.params.idEmpleado;
      this.obtenerEmpleado();
    },
    methods: {
      async obtenerEmpleado() {
        try {
          const response = await fetch(`http://localhost:8088/empleado/uno/${this.empleado.idEmpleado}`);
          if (response.ok) {
            const data = await response.json();
            this.material = data;
            this.obtenerDepartamentos(); // Llama a obtenerDepartamentos después de obtenerEmpleado
            this.nombreDepartamento = this.empleado.departamento ? this.empleado.departamento.nombre : null; // Asigna el nombre del departamento asociado al empleado
            this.obtenerPerfiles(); // Llama a obtenerPerfiles después de obtenerEmpleado
            this.nombrePerfil = this.empleado.perfil ? this.empleado.perfil.rol : null; // Asigna el nombre del perfil asociado al empleado
          } else {
            console.error('Error al obtener el empleado');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async obtenerDepartamentos() {
        try {
          const response = await fetch('http://localhost:8088/departamento/todos');
          if (response.ok) {
            const data = await response.json();
            this.departamentos = data;
            // Asigna departamentoIdInput después de obtener la lista de departamentos
            this.departamentoIdInput = this.empleado.departamento ? this.empleado.departamento.idDepto : null;
          } else {
            console.error('Error al obtener los departamentos');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async obtenerPerfiles() {
        try {
          const response = await fetch('http://localhost:8088/perfiles/todos');
          if (response.ok) {
            const data = await response.json();
            this.perfiles = data;
            // Asigna perfilIdInput después de obtener la lista de perfiles
            this.perfilIdInput = this.empleado.perfil ? this.empleado.perfil.idPerfil : null;
          } else {
            console.error('Error al obtener los perfiles');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      async enviarFormulario() {
        try {
          if (this.empleado.departamento && this.empleado.perfil) {
            this.empleado.departamento.idDepto = this.departamentoIdInput;
            this.empleado.perfil.idPerfil = this.perfilIdInput;
          }
  
          const formData = {
            idEmpleado: this.empleado.idEmpleado,
            nombre: this.empleado.nombre,
            apellidos: this.empleado.apellidos,
            password: this.empleado.password,
            idDepto: this.departamentoIdInput,
            fechaIngreso: this.empleado.fechaIngreso,
            idPerfil: this.perfilIdInput,            
            fechaBaja: this.empleado.fechaBaja,
            estado: this.empleado.estado,
            salario: this.empleado.salario
          };
  
          const response = await fetch('http://localhost:8088/empleado/modificar', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            this.$router.push({ path: '/verempleados', query: { mensaje: 'Empleado editado',  tipo: 'satisfactorio' } });
          } else {
            this.$router.push({path:'/verempleados', query: { mensaje: 'Error al actualizar empleado', tipo:'error'}})
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>
    <style scoped>
    .container{
      
      justify-content:center;
      align-items:center;
     
    }
    
    form{
      width:100%;    
      justify-content:center;
      align-items:center;
    
    }
    
    .d-flex{
    padding-top:10px;
    
    }
    .separador{
    height:10px;
    
    }
    
    .separador-lateral{
    padding:20px;
    
    }
    
    #form-target{
      background-color:rgb(255, 255, 255);
      border-radius:3vh;
      width:60vh;
      padding-bottom:25px;
      margin-top:2%;
      box-shadow: 3px 3px 14px 1px rgba(0, 0, 0, 0.1);
    }
    
    #enviar{
      margin-top:10px;
      width:150px;
      color:white;
      background-color:rgb(15, 153, 2);
    }
    
    #enviar:hover{
      background-color:rgb(12, 121, 2);
    }
    
    #cancelar{
      margin-top:10px;
      width:150px;
      color:white;
      background-color:rgb(144, 144, 144);
      
    }
    
    #cancelar:hover{
      background-color:rgb(111, 111, 111);
    }
    .botones{
      
      display:inline-flex;
      width:100%;
      justify-content:space-between;
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