<template>
  <header>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
   </header>

   <div><h1>Formulario de alta de modelos de sofá</h1></div>
   <div class="d-flex container" id="form-target">
     <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
       <div class="form-row">
         <div class="d-flex flex-row">
           <div>
             <label for="nombre">Nombre</label>
             <input type="text" class="form-control" id="nombre" v-model="nombre" required>
           </div>
           <div class="separador-lateral"></div>
           <div>
             <label for="apellidos">Descripción</label>
             <input type="text" class="form-control" id="descripcion" v-model="descripcion" required>
           </div>
         </div>
         <div class="d-flex flex-row mt-3">
           <div>
             <label for="direccion">Patas</label>
             <input type="text" class="form-control" id="patas" v-model="patas" required>
           </div>
           <div class="separador-lateral"></div>
           <div>
             <label for="email">Medida cojín</label>
             <input type="number" class="form-control" id="medidaCojin" v-model="medidaCojin" required>
           </div>
         </div>
         <div class="d-flex flex-row mt-3">
           <div>
             <label for="telefono">Precio</label>
             <input type="number" class="form-control" id="precio" v-model="precio" required>
           </div>
         </div>
         <div class="d-flex flex-row mt-3 botones">
           <router-link to="/versofas" style="text-decoration:none;">
             <button class="btn btn-secondary" id="cancelar"><i class="fa-solid fa-xmark"></i>Cancelar</button>
           </router-link>
           <button class="btn btn-success" id="enviar" type="submit"><i class="fa-solid fa-check"></i>Confirmar</button>
         </div>
       </div>
     </form>
   </div>
 </template>
 
 <script>
 export default {
   name: 'vistaAltaSofa',
   data() {
     return {
       nombre: '',
       descripcion: '',
       patas: '',
       medidaCojin: '',
       precio: ''
     };
   },
   methods: {
     async enviarFormulario() {
       const formData = {
         nombre: this.nombre,
         descripcion: this.descripcion,
         patas: this.patas,
         medidaCojin: this.medidaCojin,
         precio: this.precio,
       };
 
       try {
         const response = await fetch('http://localhost:8088/sofa/alta', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(formData)
         });
 
         if (response.ok) {
           alert('Sofá agregado exitosamente');
           this.$router.push('/versofas');
         } else {
           alert('Error al agregar el sofá');
         }
       } catch (error) {
         console.error('Error:', error);
         alert('Error de red al agregar el sofá');
       }
     }
   }
 };
 </script>
 
 <style scoped>
 .container {
   justify-content: center;
   align-items: center;
 }
 
 form {
   width: 100%;
   justify-content: center;
   align-items: center;
 }
 
 .d-flex {
   padding-top: 10px;
 }
 
 .separador-lateral {
   width: 20px;
 }
 
 #form-target {
   background-color: rgb(255, 255, 255);
   border-radius: 3vh;
   width: 60vh;
   padding-bottom: 25px;
   margin-top: 2%;
   box-shadow: 3px 3px 14px 1px rgba(0, 0, 0, 0.1);
 }
 
 #enviar,
 #cancelar {
   margin-top: 10px;
   width: auto;
   color: white;
   cursor: pointer;
 }
 
 #enviar {
   background-color: #0f9902;
 }
 
 #cancelar {
   background-color: #909090;
 }
 
 #enviar:hover {
   background-color: #0c7902;
 }
 
 #cancelar:hover {
   background-color: #6f6f6f;
 }
 
 .botones {
   display: flex;
   width: 100%;
   justify-content: space-between;
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
 