<template>
  <header>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </header>

  <div><h1>Actualizar datos del cliente</h1></div>
  <div class="d-flex container" id="form-target">
    <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
      <div class="form-row ">
        <div class="d-flex flex-row">
          <div>
            <label for="validationDefault01">Nombre</label>
            <input type="text" class="form-control" v-model="cliente.nombre" placeholder="Nombre cliente" required>
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label for="validationDefault01">Apellidos</label>
            <input type="text" class="form-control" v-model="cliente.apellidos" placeholder="Apellidos" required>
          </div>
        </div>

        <div class="d-flex flex-row">
          <div>
            <label for="validationDefault02">Dirección</label>
            <input type="text" class="form-control" v-model="cliente.direccion" placeholder="Dirección" required>
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label class="ref-prov">Email</label>
            <input type="text" class="form-control" v-model="cliente.email" placeholder="Email" required>
          </div>
  </div>
  <div class="separador">
  </div>
  <div class="d-flex flex-row">
      <div>
          <label for="validationDefault02">Teléfono</label>
          <input type="number" class="form-control"  aria-describedby="inputGroupPrepend2" v-model="cliente.telefono" required>
      </div>
  </div>
  <div class="d-flex flex-row">
   
      <div class="botones">
        <router-link to="/verclientes" style="text-decoration:none; color:white;"> <button class="btn" id="cancelar"><i class="fa-solid fa-xmark"></i>Cancelar</button></router-link>
      <button class="btn" id="enviar" type="submit"><i class="fa-solid fa-check"></i>Confirmar</button>
       </div>
  </div>
</div>
    </form>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'vistaEditarCliente',
  data() {
    return {
      cliente: {
        idCliente: '',
        nombre: '',
        apellidos: '',
        direccion: '',
        email: '',
        telefono: ''
      },
    };
  },
  created() {
    this.cliente.idCliente = this.$route.params.idCliente;
    this.obtenerCliente();
  },
  methods: {
    async obtenerCliente() {
      try {
        const response = await fetch(`http://localhost:8088/cliente/uno/${this.cliente.idCliente}`);
        if (response.ok) {
          const data = await response.json();
          this.cliente = data;
        } else {
          console.error('Error al obtener el cliente');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async enviarFormulario() {
          const formData = {
          idCliente: this.cliente.idCliente,
          nombre: this.cliente.nombre,
          direccion: this.cliente.direccion,
          email: this.cliente.email,
          telefono: this.cliente.telefono
        };

        const response = await fetch('http://localhost:8088/cliente/modificar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          console.log('Cliente editado exitosamente');
          router.push({ path: '/verclientes', query: { mensaje: 'Cliente editado',  tipo: 'satisfactorio' } });
        } else {
          console.error('Error al editar el cliente');
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