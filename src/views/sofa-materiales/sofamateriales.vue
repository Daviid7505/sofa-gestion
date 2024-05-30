<template>

    <div class="container">
       <!-- Mensajes de notificación -->
       <notification :mensaje="mensaje" :mensajeVisible="mensajeVisible" :mensajeError="mensajeError" :mensajeSatisfactorio="mensajeSatisfactorio"/>
   
      <div class="container-title">
        <div class="title"> 
          <h1 class="text-left">Materiales ref-sofa {{ idSofa }}</h1> <h1>Modelo Luna</h1>
        </div>
        <div class="container-alta"> 
          <router-link :to="'/sofa-asignar-material/' + idSofa" style="text-decoration:none;"> <addbutton/></router-link>
        </div>
    </div>
  
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover table-responsive">
            <thead class="center">
              <tr>
               
                <th scope="col">Referencia material</th>
                <th scope="col">Referencia proveedor</th>
                <th scope="col">Nombre proveedor</th>
                <th scope="col">Nombre material</th>
                <th scope="col">Descripción</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Unidad medida</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sofaMaterial in sofaMateriales" :key="sofaMaterial.idSofaMateriales">
               
                <td>{{ sofaMaterial.material.idMaterial}}</td>
                <td>{{ sofaMaterial.material.refMaterialProveedor }}</td>
                <td>{{ sofaMaterial.material.proveedor.nombre }}</td>
                <td>{{ sofaMaterial.material.nombre }}</td>
                <td>{{ sofaMaterial.material.descripcion }}</td>
                <td>{{ sofaMaterial.cantidadUtilizada}}</td>
                <td>{{ sofaMaterial.material.unidadMedida }}</td>

                <td class="botones">
                  <div class="d-flex flex-row">
                    <router-link :to="'/sofa-editar-material/'+ sofaMaterial.idSofaMateriales"> <editbutton/></router-link>
                    <div class="separador"></div>
                   <trashbutton @click="eliminarSofaMaterial(sofaMaterial.idSofaMateriales)"> </trashbutton>
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
  import { useRoute } from 'vue-router';
  import {format} from 'date-fns';
  import addbutton from '@/components/addbutton.vue';
  import editbutton from '@/components/editbutton.vue';
  import trashbutton from '@/components/trashbutton.vue';
  import notification from '@/components/notification.vue';
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery, limpiarMensaje, ocultarMensajeConRetraso } from '@/js/notificacion.js'; 
  
  export default {
    components: { addbutton, editbutton, trashbutton, notification},
    setup() {
      let sofaMateriales =  ref([]);
      const route = useRoute();
      const idSofa = ref(route.params.idSofa);

      const getSofaMateriales = async () => {
      const idSofa = route.params.idSofa;
      try {
        const res = await fetch(`http://localhost:8088/sofaMaterial/porSofa/${idSofa}`);
        const data = await res.json();
        sofaMateriales.value = data;
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    };

    onMounted(() => {
        limpiarMensaje();
        getSofaMateriales();
        verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
      });

    const eliminarSofaMaterial = (idSofaMateriales) => {
      if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
        fetch(`http://localhost:8088/sofaMaterial/eliminar/${idSofaMateriales}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de empleados
          getSofaMateriales();
          mostrarMensaje('Material eliminado exitosamente', 'satisfactorio');
          ocultarMensajeConRetraso();
        })
        .catch(error => {
          mostrarMensaje('Error al eliminar material', 'error');
          ocultarMensajeConRetraso();
          console.error('Error:', error);
        });
      }
    };

        const formatFecha = (fecha) => {
        return format(new Date(fecha), 'dd-MM-yyyy');
    };

     

      return { eliminarSofaMaterial, idSofa, formatFecha, sofaMateriales, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, notification};
    }
  };
  
  </script>
  
  