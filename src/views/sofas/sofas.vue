
<template>
  <div class="container">
      <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
    <div class="container-title">
      <div class="title"> 
        <h1 class="text-left">Lista de sofás</h1>
      </div>
      <div class="container-alta"> 
        <router-link to="/crear-sofa" style="text-decoration: none;"><addbutton/></router-link>
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
              <th scope="col">Descripción</th>
              <th scope="col">Patas</th>
              <th scope="col">Medida de cojín</th>
              <th scope="col">Precio</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sofa in filteredSofas" :key="sofa.idSofa">
              <td>{{ sofa.nombre }}</td>
              <td>{{ sofa.descripcion }}</td>
              <td>{{ sofa.patas }}</td>
              <td>{{ sofa.medidaCojin }}</td>
              <td>{{ sofa.precio }}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-sofa/' + sofa.idSofa"><editbutton /></router-link>
                  <div class="separador"></div>
                  <router-link :to="'/materiales-sofa/' + sofa.idSofa" style="text-decoration:none"><materialbutton /></router-link>
                  <div class="separador"></div>
                  <trashbutton @click="eliminarSofa(sofa.idSofa)"></trashbutton>
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
import { ref, computed, onMounted } from 'vue';
import materialbutton from '@/components/materialbutton.vue';
import addbutton from '@/components/addbutton.vue';
import editbutton from '@/components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, trashbutton, notification, materialbutton },
  name: 'versofas',
  setup() {
    const sofas = ref([]);
    const searchQuery = ref('');

    const eliminarSofa = (idSofa) => {
      if (confirm('¿Estás seguro de que deseas eliminar este modelo de sofá?')) {
        fetch(`http://localhost:8088/sofa/borrar/${idSofa}`, {
          method: 'DELETE',
        })
        .then(() => {
          getSofas();
          mostrarMensaje('Sofá eliminado exitosamente', 'error');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar sofá', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };

    const getSofas = () => {
      fetch('http://localhost:8088/sofa/todos')
        .then(res => res.json())
        .then(data => {
          sofas.value = data;
        })
        .catch(error => {
          mostrarMensaje('Error al obtener la lista de sofás', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
    };

    const filteredSofas = computed(() => {
      return sofas.value.filter(sofa => {
        const searchTerm = searchQuery.value.toLowerCase();
        const nombre = sofa.nombre.toLowerCase();
        const descripcion = sofa.descripcion.toLowerCase();
        const patas = sofa.patas.toString();
        const medidaCojin = sofa.medidaCojin.toString();
        const precio = sofa.precio.toString();

        return (
          nombre.includes(searchTerm) ||
          descripcion.includes(searchTerm) ||
          patas.includes(searchTerm) ||
          medidaCojin.includes(searchTerm) ||
          precio.includes(searchTerm)
        );
      });
    });

    onMounted(() => {
      limpiarMensaje();
      getSofas();
      verificarMensajeQuery();
    });

    return { 
      sofas, 
      searchQuery, 
      filteredSofas, 
      mensajeVisible, 
      mensaje, 
      mensajeSatisfactorio, 
      mensajeError, 
      mostrarMensaje, 
      eliminarSofa, 
      notification 
    };
  }
};
</script>

