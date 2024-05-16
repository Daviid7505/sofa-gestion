<template>
    
  <div class="d-flex container"  id="form-target">

  <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
<div class="form-row ">
  <div class="d-flex flex-row">

      <div>
          <label for="validationDefault01">Nombre material</label>
          <input type="text" class="form-control" value="Mark" v-model="nombre" required>
      </div>
      <div class="separador-lateral"></div>
      <div>
      <label for="validationDefault01">Descripción</label>
        <input type="text" class="form-control" value="Mark" v-model="descripcion" required>
      </div>
    
  </div>

  <div class="d-flex flex-row">
          <div>
          <label for="validationDefault02">Cantidad</label>
          <input type="number" class="form-control"  value="Otto" v-model="cantidad" required>
        </div>
        <div class="separador-lateral"></div>
        <div>
          <label class="ref-prov">Proveedor</label>
         <!-- Reemplazar el input con un select -->
         <select class="form-select" v-model="idProveedor" required>
              <option v-for="proveedor in proveedores" :key="proveedor.idProveedor" :value="proveedor.idProveedor">{{ proveedor.nombre }}</option>
            </select>
           
           </div>
      
  </div>
  <div class="separador">
    
  </div>
  <div class="d-flex flex-row">
      <div>
          <label for="validationDefault02">Ref proveedor</label>
          <input type="text" class="form-control"  aria-describedby="inputGroupPrepend2" v-model="refMaterialProveedor" required>
      </div>
      <div class="separador-lateral"></div>
      <div>
          <label for="validationDefaultUsername">Categoría</label>
          <select class="form-select" v-model="categoria" required>
            <option value="Ferreteria">Ferreteria</option>
            <option value="Tela">Tela</option>
            <option value="Carpintería">Carpintería</option>
            <option value="Costura">Costura</option>
            <option value="Genérico">Genérico</option>
          </select>
      </div>
  </div>    
  <div class="d-flex flex-row">
      <div>
          <label for="validationDefault02">Unidad medida</label>
          <select class="form-select" v-model="unidadMedida" required>
            <option value="Metros">Metros</option>
            <option value="Rollos">Rollos</option>
            <option value="Cajas">Cajas</option>
            <option value="Unidades">Unidades</option>
            <option value="M3">M3</option>
          </select>
      </div>
      <div class="separador-lateral"></div>
      <div>
      </div>
  </div>    

  <div class="d-flex flex-row">
   
      <div class="botones">
        <router-link to="/vermateriales" style="text-decoration:none; color:white;"> <button class="btn" id="cancelar">Cancelar</button></router-link>
        <button class="btn" id="enviar" type="submit">Crear</button>
       </div>
  </div>
</div>


</form>

</div>
</template >
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
  margin-top:5%;
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

</style>
<script>
export default {
name:'vistaAltaMateriales',
  data() {
    return {
      nombre: '',
      descripcion: '',
      cantidad: '',
      idProveedor: '',
      refMaterialProveedor:'',
      categoria: '',
      unidadMedida:'',
      proveedores:[]
    };
  },
  async created() {
    // Llamar a la función para obtener los proveedores cuando se carga el componente
    await this.obtenerProveedores();
  },
  methods: {
    async obtenerProveedores() {
      try {
        // Realizar la llamada GET para obtener los proveedores disponibles
        const response = await fetch('http://localhost:8088/proveedor/todos');

        if (response.ok) {
          // Convertir la respuesta a JSON
          const data = await response.json();
          // Asignar los proveedores al array
          this.proveedores = data;
        } else {
          console.error('Error al obtener los proveedores');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async enviarFormulario() {
      // Crear un objeto con los datos del formulario
      const formData = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        idProveedor: this.idProveedor,
        refMaterialProveedor: this.refMaterialProveedor,
        unidadMedida:this.unidadMedida,
        categoria:this.categoria,
      
      };

      try {
        // Realizar la llamada POST a tu API
        const response = await fetch('http://localhost:8088/materiales/alta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        // Verificar si la llamada fue exitosa
        if (response.ok) {
          // Aquí puedes manejar la respuesta si es necesario
          console.log('Material creado exitosamente');
        } else {
          // Si la llamada no fue exitosa, mostrar el mensaje de error
          console.error('Error al crear el material');
        }
      } catch (error) {
        // Si hubo un error con la llamada, mostrarlo en la consola
        console.error('Error:', error);
      }
    }
  }
};
</script>