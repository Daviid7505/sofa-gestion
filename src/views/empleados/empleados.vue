<template>
  <div class="container">
    <!-- Mensajes de notificación -->
    <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>

    <div class="container-title">
      <div class="title">
        <h1 class="text-left">Lista de empleados</h1>
      </div>
      <div class="container-alta"> 
          <router-link to="/crear-empleado" style="text-decoration:none;"> <addbutton/></router-link>
        </div>
      </div>
      <!-- Barra de búsqueda -->
      <div class="row mb-3 container-barra-busqueda">
      <div class="col-md-12 container-barra-busqueda-interno" >
        <input type="text" v-model="searchQuery" class="form-control" placeholder="Buscar...">
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
            <tr v-for="empleado in filteredEmpleados" :key="empleado.idEmpleado">
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
                <div class="separador"></div>
                <trashbutton @click="eliminarEmpleado(empleado.idEmpleado)"></trashbutton>
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
import { ref, onMounted, computed } from 'vue';
import { format } from 'date-fns';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, trashbutton, notification },
  name: 'verempleados',
  setup() {
    const empleados = ref([]);
    const searchQuery = ref('');

    const formatFecha = (fecha) => {
      return format(new Date(fecha), 'dd-MM-yyyy');
    };

    const getEmpleados = async () => {
      try {
        const response = await fetch('http://localhost:8088/empleado/todos');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de empleados');
        }
        const data = await response.json();
        empleados.value = data;
      } catch (error) {
        mostrarMensaje('Error al obtener la lista de empleados', 'error');
        ocultarMensajeConRetraso();
        console.error('Error:', error);
      }
    };

    const eliminarEmpleado = (idEmpleado) => {
      if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
        fetch(`http://localhost:8088/empleado/eliminar/${idEmpleado}`, {
          method: 'DELETE',
        })
        .then(() => {
          getEmpleados();
          mostrarMensaje('Empleado eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar empleado', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };
    const filteredEmpleados = computed(() => {
      return empleados.value.filter(empleado => {
        const searchTerm = searchQuery.value.toLowerCase();
        const nombre = empleado.nombre.toLowerCase();
        const apellidos = empleado.apellidos.toLowerCase();
        const departamento = empleado.departamento ? empleado.departamento.nombre.toLowerCase() : '';
        const rol = empleado.perfil ? empleado.perfil.rol.toLowerCase() : '';
        const estado = empleado.estado.toLowerCase();
        const salario = empleado.salario.toString();
        const fechaIngreso = formatFecha(empleado.fechaIngreso).toLowerCase();
        const fechaBaja = empleado.fechaBaja ? formatFecha(empleado.fechaBaja).toLowerCase() : '-';

        return (
          nombre.includes(searchTerm) ||
          apellidos.includes(searchTerm) ||
          departamento.includes(searchTerm) ||
          rol.includes(searchTerm) ||
          estado.includes(searchTerm) ||
          salario.includes(searchTerm) ||
          fechaIngreso.includes(searchTerm) ||
          fechaBaja.includes(searchTerm)
        );
      });
    });

    onMounted(() => {
      limpiarMensaje();
      getEmpleados();
      verificarMensajeQuery();
    });

    return {
      searchQuery,
      filteredEmpleados,
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

