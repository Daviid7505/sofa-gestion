<template>
  <header>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     </header>
     <div><h1>Actualizar datos del proveedor</h1></div>
   <div class="d-flex container" id="form-target">
     <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
       <div class="form-row ">
         <div class="d-flex flex-row">
           <div>
             <label for="validationDefault01">Nombre material</label>
             <input type="text" class="form-control" v-model="proveedor.nombre" placeholder="Nombre material" required>
           </div>
           <div class="separador-lateral"></div>
           <div>
             <label for="validationDefault02">Teléfono</label>
             <input type="number" class="form-control" v-model="proveedor.telefono" placeholder="Teléfono" required>
           </div>
         </div>
 
         <div class="d-flex flex-row">
           <div>
             <label for="validationDefault01">Descripción</label>
             <input type="number" class="form-control" v-model="proveedor.descripcion" placeholder="Descripción" required>
           </div>  
         </div>
        <div class="d-flex flex-row mt-3 botones">
          <router-link to="/verproveedores" style="text-decoration: none;"> <cancelbutton/></router-link>
          <confirmbutton @click="enviarFormulario"></confirmbutton>
         </div>
      </div>
     </form>
   </div>
 </template>
 
 <script>
 import router from '@/router';
 import confirmbutton from '@/components/confirmbutton.vue'
import cancelbutton from '@/components/cancelbutton.vue'
 export default {
  components: { confirmbutton, cancelbutton },
   name: 'vistaEditarProveedor',
   data() {
     return {
       proveedor: {
         idProveedor: '',
         nombre: '',
         telefono: '',
         descripcion: ''
       },
     };
   },
   created() {
     this.proveedor.idProveedor = this.$route.params.idProveedor;
     this.obtenerProveedor();
   },
   methods: {
     async obtenerProveedor() {
       try {
         const response = await fetch(`http://localhost:8088/proveedor/uno/${this.proveedor.idProveedor}`);
         if (response.ok) {
           const data = await response.json();
           this.proveedor = data;
         } else {
           console.error('Error al obtener el material');
         }
       } catch (error) {
         console.error('Error:', error);
       }
     },
     async enviarFormulario() {
         const formData = {
           idProveedor: this.proveedor.idProveedor,
           nombre: this.proveedor.nombre,
           telefono: this.proveedor.telefono,
           descripcion: this.material.descripcion
         };
         const response = await fetch('http://localhost:8088/proveedor/modificar', {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(formData)
         });
         if (response.ok) {
           console.log('Material editado exitosamente');
           this.$router.push({ path: '/verproveedores', query: { mensaje: 'Proveedor editado',  tipo: 'satisfactorio' } });
         } else {
           console.error('Error al editar los datos del proveedor');
           this.$router.push({path:'/verproveedores', query: { mensaje: 'Error al editar proveedor', tipo:'error'}})
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
padding:10px;

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
 