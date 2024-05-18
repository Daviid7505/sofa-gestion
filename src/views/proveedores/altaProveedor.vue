<template>
  <header>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     </header>

 <div><h1>Formulario de alta de proveedores</h1></div>
 <div class="d-flex container" id="form-target">
   <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
     <div class="form-row">
       <div class="d-flex flex-row">
         <div>
           <label for="nombre">Nombre del proveedor</label>
           <input type="text" class="form-control" id="nombre" v-model="nombre" required>
         </div>
         <div class="separador-lateral"></div>
         <div>
           <label for="telefono">Teléfono</label>
           <input type="text" class="form-control" id="telefono" v-model="telefono" required>
         </div>
       </div>
       <div class="d-flex flex-row mt-3">
         <div>
           <label for="descripcion">Descripción</label>
           <input type="text" class="form-control" id="descripcion" v-model="descripcion" required>
         </div>
       </div>
       <div class="d-flex flex-row mt-3 botones">
         <router-link to="/verproveedores" style="text-decoration:none;">
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
 name: 'vistaAltaProveedores',
 data() {
   return {
     nombre: '',
     telefono: '',
     descripcion: ''
   };
 },
 methods: {
   async enviarFormulario() {
     const formData = {
       nombre: this.nombre,
       telefono: this.telefono,
       descripcion: this.descripcion
     };

     try {
       const response = await fetch('http://localhost:8088/proveedor/alta', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       });

       if (response.ok) {
         alert('Proveedor agregado exitosamente');
         this.$router.push('/verproveedores');
       } else {
         alert('Error al agregar el proveedor');
       }
     } catch (error) {
       console.error('Error:', error);
       alert('Error de red al agregar el proveedor');
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

#enviar {
 margin-top: 10px;
 width: 150px;
 color: white;
 background-color: rgb(15, 153, 2);
}

#enviar:hover {
 background-color: rgb(12, 121, 2);
}

#cancelar {
 margin-top: 10px;
 width: 150px;
 color: white;
 background-color: rgb(144, 144, 144);
}

#cancelar:hover {
 background-color: rgb(111, 111, 111);
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
