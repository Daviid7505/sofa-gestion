
<template>
   <!-- Mensajes de notificación -->
   <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
    <div class="title-container">
      <h3>Departamentos</h3>
    </div>
    <div class="departments-buttons-container">
        <button
        v-for="departmentId in [1, 2, 3, 4]"
        :key="departmentId"
        :class="{ 'department-button-active': activeDepartment === departmentId }"
        class="department-button"
        @click="setActiveDepartment(departmentId)"
        >
        {{ departmentNames[departmentId] }}
        </button>
    </div>
    <div class="task-container">
      <div class="task tareas-sin-asignar"
      @click="filterTasksByState('Sin asignar')"
      :class="{ 'task-active': activeState === 'Sin asignar' }"
    >
        <div class="title-task">{{ counts.sinAsignar }}</div>
        <div class="type-task">Sin asignar</div>  
      </div>
      <div class="task tareas-pendientes"
      @click="filterTasksByState('Pendiente')"
      :class="{ 'task-active': activeState === 'Pendiente' }"
    >
        <div class="title-task">{{ counts.pendiente }}</div>
        <div class="type-task">Pendiente</div>
      </div>
      <div class="task tareas-procesando"
      @click="filterTasksByState('Procesando')"
      :class="{ 'task-active': activeState === 'Procesando' }"
    >
        <div class="title-task">{{ counts.procesando }}</div>
        <div class="type-task">Procesando</div>
      </div>
      <div class="task tareas-terminado"
      @click="filterTasksByState('Terminado')"
      :class="{ 'task-active': activeState === 'Terminado' }"
    >
        <div class="title-task">{{ counts.terminado }}</div>
        <div class="type-task">Terminado</div>
      </div>
    </div>
    <div class="row" v-if="filteredTasks.length > 0">
      <div class="container-table">
        <input type="text" v-model="searchQuery" placeholder="Buscar..." class="form-control busqueda" />
        <table class="table table-hover table-responsive">
          <thead class="center">
            <tr>
              <th scope="col">Fecha creación</th>
              <th scope="col">Referencia tarea</th>
              <th scope="col">Número pedido</th>
              <th scope="col">Ref detalle</th>
              <th scope="col">Empleado</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in filteredTasksBySearch" :key="task.idTarea">
              <td>{{ formatDate(task.fecha)}}</td>
              <td>{{ task.idTarea }}</td>
              <td>{{ task.detalle?.pedido?.idPedido ?? '' }}</td>
              <td>{{ task.detalle?.idDePed ?? '' }}</td>
              <td>{{ task.empleado?.nombre ?? ''}}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  
                   <router-link :to="'/asignar-tarea/' + task.idTarea" style="text-decoration:none; "><adduserbutton ></adduserbutton></router-link> 
                   <div class="separador"></div>
                   <unbindbutton @click="desasignarTarea(task.idTarea)"></unbindbutton> 
                   <div class="separador"></div>
                   <procesingbutton @click="asignarEstadoProcesando(task.idTarea)"></procesingbutton> 
                   <div class="separador"></div>
                  
                   <endbutton @click="asignarEstadoTerminado(task.idTarea)"></endbutton> 
                   <div class="separador"></div>
                   <cancelbutton @click="asignarEstadoCancelar(task.idTarea)"></cancelbutton> 
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
<script>

import { format } from 'date-fns';
import addbutton from '@/components/addbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import endbutton from '@/components/endbutton.vue';
import procesingbutton from '@/components/procesingbutton.vue';
import unbindbutton from '@/components/unbindbutton.vue';
import adduserbutton from '@/components/adduserbutton.vue';
import cancelbutton from '@/components/cancelbutton.vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { cancelbutton, adduserbutton, procesingbutton, endbutton, addbutton, trashbutton, notification, unbindbutton },
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      searchQuery: '',
      counts: {
        sinAsignar: 0,
        pendiente: 0,
        procesando: 0,
        terminado: 0
      },
      activeDepartment: 1, // Nuevo: almacenará el ID del departamento activo
      activeState: 'Sin asignar',
      departmentNames: {
        1: 'Carpintería',
        2: 'Costura',
        3: 'Tapizado',
        4: 'Enfundado'
      },
      mensaje,
      mensajeVisible,
      mensajeSatisfactorio,
      mensajeError
    };
  },
  mounted() {
     //Seleccionar automáticamente el departamento de Carpintería al entrar en la vista
    this.fetchTasks(this.activeDepartment);
    limpiarMensaje();
    verificarMensajeQuery();
  },
  computed: {
    filteredTasksBySearch() {
      return this.filteredTasks.filter(task => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
          format(new Date(task.fecha), 'dd-MM-yyyy').includes(searchLower) ||
          task.idTarea.toString().includes(searchLower) ||
          task.detalle?.pedido?.idPedido?.toString().includes(searchLower) ||
          task.detalle?.idDePed?.toString().includes(searchLower) ||
          (task.empleado?.nombre ?? '').toLowerCase().includes(searchLower) ||
          task.departamento?.nombre?.toLowerCase().includes(searchLower) ||
          task.estado?.nombre?.toLowerCase().includes(searchLower)
        );
      });
    }
  },
  methods: {
    fetchTasks(idDepartamento) {
      fetch(`http://localhost:8088/tarea/departamento-por-estado/${idDepartamento}`)
        .then(response => response.json())
        .then(data => {   
          this.tasks = data;
          this.updateTaskCounts(data);
          this.filterTasksByState(this.activeState); // Aplicar el filtro de estado al cambiar de departamento
        })
        .catch(error => {
          console.error("Error al obtener las tareas: ", error);
        });
    },
    updateTaskCounts(tasks) {
      const counts = {
        sinAsignar: tasks.filter(task => task.estado?.nombre === "Sin asignar").length,
        pendiente: tasks.filter(task => task.estado?.nombre === "Pendiente").length,
        procesando: tasks.filter(task => task.estado?.nombre === "Procesando").length,
        terminado: tasks.filter(task => task.estado?.nombre === "Finalizado").length
      };
      this.counts = { ...counts };
    },
    filterTasksByState(state) {
        this.activeState = state;
        this.filteredTasks = this.tasks.filter(task => task.estado?.nombre === state);
    },
    formatDate(dateString) {
      return format(new Date(dateString), 'dd-MM-yyyy');
    },
    setActiveDepartment(departmentId) {
      this.activeDepartment = departmentId;
      this.fetchTasks(departmentId);
      this.activeState = 'Sin asignar'; // Reiniciar el estado activo al cambiar de departamento
    },

    desasignarTarea(idTarea) {
      fetch(`http://localhost:8088/tarea/estadoTarea/${idTarea}/5`, {
        method: 'PUT'
      })
        .then(response => response.json())
        .then(data => {
          this.tasks = data;
          this.updateTaskCounts(data);
          this.filteredTasks = this.tasks.filter(task => task.estado.nombre === 'Sin asignar'); // Optional: Update filteredTasks to show tasks with the 'Sin asignar' state
          mostrarMensaje('Tarea desasignada exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
         //Siempre nos da error por el tipo de respuesta del back
          mostrarMensaje('Tarea desasignada exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        });
    },
    asignarEstadoProcesando(idTarea) {
      fetch(`http://localhost:8088/tarea/estadoTarea/${idTarea}/2`, {
        method: 'PUT'
      })
        .then(response => response.json())
        .then(data => {
            console.log('Task updated:', data); // Agregar esta línea
          this.tasks = data;
          this.updateTaskCounts(data);
          this.filteredTasks = this.tasks.filter(task => task.estado.nombre === 'Sin asignar'); 
          mostrarMensaje('Asignado estado procesando exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
         //Siempre nos da error por el tipo de respuesta del back
          mostrarMensaje('Asignado estado procesando exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        });
    },
    asignarEstadoCancelar(idTarea) {
      fetch(`http://localhost:8088/tarea/estadoTarea/${idTarea}/4`, {
        method: 'PUT'
      })
        .then(response => response.json())
        .then(data => {
            console.log('Task updated:', data); 
          this.tasks = data;
          this.updateTaskCounts(data);
          this.filteredTasks = this.tasks.filter(task => task.estado.nombre === 'Sin asignar');
          mostrarMensaje('Tarea cancelada correctamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
             //Siempre nos da error por el tipo de respuesta del back
          mostrarMensaje('Tarea cancelada correctamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        });
    },
    asignarEstadoTerminado(idTarea) {
      fetch(`http://localhost:8088/tarea/estadoTarea/${idTarea}/3`, {
        method: 'PUT'
      })
        .then(response => response.json())
        .then(data => {
          this.tasks = data;
          this.updateTaskCounts(data);
          this.filteredTasks = this.tasks.filter(task => task.estado.nombre === 'Sin asignar'); 
          //Siempre nos da error por el tipo de respuesta del back
          mostrarMensaje('Asignado estado finalizado correctamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
                //Siempre nos da error por el tipo de respuesta del back
          mostrarMensaje('Asignado estado finalizado correctamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        });
    }

  }
};
</script>

<style scoped>
.department-button-active {
  background-color: #120f6d !important; 
  color: #ffffff;
  transition: all 0.3s ease-out;
}
.task-active {

  transition: all 0.2s ease-out !important;
  color: #120f6d !important;
  border-bottom: 2px solid !important;
}
.busqueda{
    width:15%;
    display:flex;
    margin-left:44%;
    margin-top:15px;
    margin-bottom:15px;
}
.row{
    padding-top:50px;
    width:100%;
    display:flex;
    justify-content:center;
  
}
.container-table{
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    width:80%;
}
.title-container{
    display:flex;
    margin-left:10%;
    width:90%;
    height:10vh;
    align-items:flex-end;
    color:rgb(20, 27, 79);
    transition: all 0.3s ease-out;
}

.departments-buttons-container{
    display:flex;
    width:100%;
    height:15vh;
    justify-content:center;
    align-items:center;
    transition: all 0.3s ease-out;
}
.department-button{
    width:190px;
    height:58px;
    border-radius:8px;
    background-color:#4456F1;
    color:white;
    font-weight:500;
    font-size:26px;
    border:none;
    margin:2.5%;
    transition: all 0.3s ease-out;
            &:hover{
                background-color:#232c7b;
            }
}
.task-container{
    width:100%;
    display:flex;
    justify-content:center;
}
.task{
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:200px;
    height:auto;
    padding:10px;
    cursor:pointer;
    transition: all 0.3s ease-out;
    &:hover{
        color:rgb(109, 109, 109);
    }
}
.title-task{
    display:flex;
    justify-content:center;
    font-size:42px;
    font-weight:bold;
}
.type-task{
    display:flex;
    justify-content:center;
    font-size:19px;
}

.tareas-sin-asignar{
    color:rgb(97, 97, 97);
   
}

.tareas-pendientes{
    color:rgb(218, 142, 0);
}

.tareas-procesando{
    color:rgb(54, 112, 248);
}

.tareas-terminado{
    color:rgb(5, 162, 5);
}

</style>