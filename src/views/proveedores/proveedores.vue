
<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  </header>
    <div class="container">
      <div v-if="mensajeVisible">
        <!-- Mensaje de error -->
        <div v-if="mensajeError" class="notification">
            <div class="intermedio">
              <div class="icononotificacionerror"><svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" style=" width:42%; fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M16.707 2.293A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></div>
              <div class="alerta error">{{ mensaje }}</div>
            </div>
          </div>
          <!-- Mensaje satisfactorio -->
          <div v-if="mensajeSatisfactorio" class="notification">
            <div class="intermedio">
              <div class="icononotificacion"><svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 25 25" style=" width:42%;fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"></path></svg></div>
              <div class="alerta">{{ mensaje }}</div>
            </div>
          </div>
      </div>

      <div class="container-title">
        <div class="title"> 
          <h1 class="text-left">Lista de proveedores</h1>
        </div>
        <div class="container-alta">
        <router-link to="/crear-proveedor" style="text-decoration:none;">
            <button class="agregar" type="button">
            <i class='bx bxs-plus-circle'></i>
            <span>Nuevo proveedor</span>
            </button>
        </router-link>
        </div>
    </div>
    <div class="container-busqueda">
      <input v-model="terminoBusqueda" v-on:keyup.enter="buscar" placeholder="Ingresar id del proveedor...">
      <button @click="buscar" class="buscar">Buscar</button>
    </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover table-responsive">
            <thead class="center">
              <tr>
                <th  scope="col">Nombre</th>
                <th  scope="col">Teléfono</th>
                <th scope="col">Descripción</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="proveedor in proveedores" :key="proveedor.idProveedor">
                <td>{{ proveedor.nombre }}</td>
                <td>{{ proveedor.telefono }}</td>
                <td>{{ proveedor.descripcion }}</td>
                <td class="botones">
                  <div class="d-flex flex-row">
                    <router-link :to="'/editar-proveedor/' + proveedor.idProveedor"> <editbutton/></router-link>
                    <!-- Botón para borrar material -->
                    <div class="separador" ></div>
                    <button class="btn btn-danger" @click="eliminarProveedor(proveedor.idProveedor)" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
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

  // Importa la función verificarMensajeQuery desde el archivo vistaHelper.js
  import { mostrarMensaje, mensaje, mensajeVisible, mensajeSatisfactorio, mensajeError, verificarMensajeQuery } from '@/js/notificacion.js'; 
  
  export default {
    components: { editbutton},
    name:'verproveedores',
    setup() {
      let proveedores = ref([]);
      const terminoBusqueda = ref('');

const buscar = () => {
  const url = `http://localhost:8088/proveedor/uno/${terminoBusqueda.value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      proveedores.value = [data];
    })
    .catch(error => {
      mensaje.value = 'Error al buscar el proveedor.';
      mostrarMensaje();
      console.error('Error:', error);
    });
};
  const eliminarProveedor = (idProveedor) => {
      if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        fetch(`http://localhost:8088/proveedor/eliminar/${idProveedor}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Si la eliminación fue exitosa, actualizamos la lista de clientes
          getProveedores();
          console.log('Proveedor eliminado exitosamente');
        })
        .catch(error => {
          mensaje.value = 'Error al eliminar el proveedor.';
          mostrarMensaje();
          console.error('Error:', error);
        });
      }
    };
      const getProveedores = () => {
        fetch('http://localhost:8088/proveedor/todos')
          .then(res => res.json())
          .then(data => {
            proveedores.value = data;
            console.log(data);
          });
      };
  
      onMounted(() => {
        getProveedores();
        verificarMensajeQuery(); // Verifica si se ha enviado la query "mensaje" al cargar la página
      });
  
      return { proveedores, terminoBusqueda, buscar, mostrarMensaje, mensajeVisible, mensaje, mensajeSatisfactorio, mensajeError, eliminarProveedor };
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
  width: 200px;
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
