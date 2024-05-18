<template>
  <div class="container">
    <!-- Mensajes de notificación -->
    <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>

    <!-- Título y botón de nuevo empleado -->
    <div class="container-title">
      <div class="title">
        <h1 class="text-left">Lista de empleados</h1>
      </div>
      <div class="container-alta"> 
          <router-link to="/crear-empleado" style="text-decoration:none;"> <addbutton/></router-link>
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
                  <trashbutton @click="eliminarEmpleado(empleado.idEmpleado)">  </trashbutton>
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
import addbutton from '@/components/addbutton.vue';
import editbutton from '../../components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { format } from 'date-fns';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, trashbutton, notification},
  name: 'verempleados',
  setup() {
    let empleados = ref([]);
    const formatFecha = (fecha) => {
      return format(new Date(fecha), 'dd-MM-yyyy');
    };

    onMounted(() => {
       // Restablecemos los valores de las variables de mensaje
      limpiarMensaje();
      getEmpleados();
      verificarMensajeQuery();
    });
    
    
    const eliminarEmpleado = (idEmpleado) => {
      if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
        fetch(`http://localhost:8088/empleado/eliminar/${idEmpleado}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de empleados
          getEmpleados();
          mostrarMensaje('Empleado eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar empleado', 'error');
          ocultarMensajeConRetraso();
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
          
          mostrarMensaje('Error al obtener la lista de empleados', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
    };

    return {
      empleados,
      mensajeVisible,
      mensaje,
      mensajeSatisfactorio,
      mensajeError,
      formatFecha,
      mostrarMensaje,
      eliminarEmpleado,
      notification
    };
  }
};
</script>

