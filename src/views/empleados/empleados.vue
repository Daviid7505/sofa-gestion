<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  </header>
  <div class="container">
    <!-- Mensajes de notificación -->
    <div v-if="mensajeVisible">
      <div v-if="mensajeError" class="notification">
        <div class="intermedio">
          <div class="icononotificacionerror">
            <!-- Icono de error -->
          </div>
          <div class="alerta error">{{ mensaje }}</div>
        </div>
      </div>
      <div v-if="mensajeSatisfactorio" class="notification">
        <div class="intermedio">
          <div class="icononotificacion">
            <!-- Icono de éxito -->
          </div>
          <div class="alerta">{{ mensaje }}</div>
        </div>
      </div>
    </div>

    <!-- Título y botón de nuevo empleado -->
    <div class="container-title">
      <div class="title">
        <h1 class="text-left">Lista de empleados</h1>
      </div>
      <div class="container-alta">
        <router-link to="/crear-empleado" style="text-decoration:none;">
          <button class="agregar" type="button">
            <i class='bx bxs-plus-circle'></i>
            <span>Nuevo empleado</span>
          </button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Departamento</th>
              <th scope="col">Perfil</th>
              <th scope="col">Alta</th>
              <th scope="col">Cese</th>
              <th scope="col">Estado</th>
              <th scope="col">Salario</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleados" :key="empleado.idEmpleado">
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.apellidos }}</td>
              <td>{{ empleado.departamento ? empleado.departamento.nombre : 'Sin departamento' }}</td>
              <td>{{ empleado.perfil ? empleado.perfil.rol : 'Sin rol' }}</td>
              <td>{{ formatFecha(empleado.fechaIngreso) }}</td>
              <td>{{ empleado.fechaBaja ? formatFecha(empleado.fechaBaja) : '-' }}</td>
              <td>{{ empleado.estado }}</td>
              <td>{{ empleado.salario }}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-empleado/' + empleado.idEmpleado">
                    <editbutton/>
                  </router-link>
                  <div class="separador" ></div>
                    <button class="btn btn-danger" @click="eliminarEmpleado(empleado.idEmpleado)" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path></g></g>
                      </svg>Eliminar</button>
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
import editbutton from '../../components/editbutton.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { format } from 'date-fns';

export default {
  components: { editbutton },
  name: 'verempleados',
  setup() {
    let empleados = ref([]);
    const mensajeVisible = ref(false);
    const mensajeSatisfactorio = ref(false);
    const mensajeError = ref(false);
    const mensaje = ref('');

    const formatFecha = (fecha) => {
      return format(new Date(fecha), 'dd-MM-yyyy');
    };

    const mostrarMensaje = () => {
      mensajeVisible.value = true;
      setTimeout(() => {
        mensajeVisible.value = false;
      }, 5000);
    };
    const eliminarEmpleado = (idEmpleado) => {
      if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        fetch(`http://localhost:8088/empleado/eliminar/${idEmpleado}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de clientes
          getEmpleados();
          console.log('Empleado eliminado exitosamente');
        })
        .catch(error => {
          mensaje.value = 'Error al eliminar el empleado.';
          mostrarMensaje();
          console.error('Error:', error);
        });
      }
    };
    const getEmpleados = () => {
      fetch('http://localhost:8088/empleado/todos')
        .then(res => res.json())
        .then(data => {
          empleados.value = data;
        })
        .catch(error => {
          mensaje.value = 'Error al obtener la lista de empleados.';
          mostrarMensaje();
          console.error('Error:', error);
        });
    };

    onMounted(() => {
      getEmpleados();
    });

    return {
      empleados,
      mensajeVisible,
      mensaje,
      mensajeSatisfactorio,
      mensajeError,
      formatFecha,
      mostrarMensaje,
      eliminarEmpleado
    };
  }
};
</script>

<style scoped>
  
.botones {
  width: 200px;
}

.container-title{
  display:flex;
  margin-top:20px;
  background-color:rgb(22, 62, 108);
  border-radius:8px;
  justify-content:space-between;
  height:60px;    
}
.container-alta{
  display:flex;
  justify-content:center;
  width:35%;
  height:100%;
  align-items:center;
  
}
.container-busqueda{
  display:flex;
  justify-content:left;
  width:50%;
  height:48px;
  align-items:center;
}
.title{
 
  color:white;
  padding-left:40px;
}

.separador{
  width:22px;
}

table th{
text-align:center;
}

table td{
  text-align:center;
}


.notification{
  display:flex;
  padding-top:10px;
  width: 80vw;
  height:5.5vh;
  justify-content:right;
}


.intermedio{
  display:flex;
  background-color:rgba(240, 240, 240, 0.899);
  box-shadow: 1.5px 1.5px 5px 1.5px rgba(0, 0, 0, 0.15);
  border-radius:8px;
  width:22%;
  justify-content:space-between;
}

.alerta{
  display:flex;
  height:100%;
  width:100%;
  align-items:center;
  justify-content:center;

}

.icononotificacion{
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(38, 182, 38, 0.887);
  
  border-radius:8px;
  width:25%;
}

.icononotificacionerror{
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(210, 21, 21, 0.984);
  border-radius:8px;
  width:25%;
}

.agregar{

border:none;
color:white;
background-color:rgb(15, 153, 2);
border-radius:6px;
width:180px;
display:flex;
align-items:center;

}
.agregar span{
 padding-left:10px;
}

i{
 padding-left:6px;
}

input{
  border-radius: 6px;
  border-color: rgb(22, 62, 108);
}

select{
  border-radius: 6px;
  height: 30px;
  border-color: rgb(22, 62, 108);
  margin-left: 5px;
  }

.buscar{
  border-radius: 6px;
  background-color:rgb(22, 62, 108);
  margin-left: 5px;
  color: rgb(255,255,255)
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
</style>
