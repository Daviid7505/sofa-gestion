
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
            <tr v-for="sofa in sofas" :key="sofa.idSofa">
              <td>{{ sofa.nombre }}</td>
              <td>{{ sofa.descripcion }}</td>
              <td>{{ sofa.patas }}</td>
              <td>{{ sofa.medidaCojin }}</td>
              <td>{{ sofa.precio }}</td>
              <td class="botones">
                <div class="d-flex flex-row">
                  <router-link :to="'/editar-sofa/' + sofa.idSofa"><editbutton/></router-link>
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
import addbutton from '@/components/addbutton.vue';
import editbutton from '../../components/editbutton.vue';
import trashbutton from '@/components/trashbutton.vue';
import notification from '@/components/notification.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js';

export default {
  components: { addbutton, editbutton, trashbutton, notification },
  name:'versofas',
  setup() {
    let sofas = ref([]);

    const eliminarSofa = (idSofa) => {
      if (confirm('¿Estás seguro de que deseas eliminar este modelo de sofa?')) {
        fetch(`http://localhost:8088/sofa/borrar/${idSofa}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de sofas
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

    const getSofas= () => {
      fetch('http://localhost:8088/sofa/todos')
        .then(res => res.json())
        .then(data => {
          sofas.value = data;
          console.log(data);
        })
        .catch(error => {
          mostrarMensaje('Error al obtener la lista de sofás', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error)
        });
    };

    onMounted(() => {
      limpiarMensaje();
      getSofas();
      verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
    });

    return { sofas, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, eliminarSofa, notification};
  }
};

</script>

