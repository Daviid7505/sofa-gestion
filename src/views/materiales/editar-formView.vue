<template>
  <div class="d-flex container">
    <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
      <div class="form-row ">
        <div class="d-flex flex-row">
          <div>
            <label for="validationDefault01">Nombre material</label>
            <input type="text" class="form-control" v-model="material.nombre" placeholder="Nombre material" required>
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label for="validationDefault01">Descripción</label>
            <input type="text" class="form-control" v-model="material.descripcion" placeholder="Descripción" required>
          </div>
        </div>

        <div class="d-flex flex-row">
          <div>
            <label for="validationDefault02">Cantidad</label>
            <input type="number" class="form-control" v-model="material.cantidad" placeholder="Cantidad" required>
          </div>
          <div class="separador-lateral"></div>
          <div>
            <label class="ref-prov">Proveedor</label>
         <!-- Reemplazar el input con un select -->
         <select class="form-select" v-model="nombreproveedor" required>
              <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.nombre" :selected="proveedor.nombre === material.proveedor.nombre">{{ proveedor.nombre }}</option>
            </select>
           </div>
      
  </div>
  <div class="separador">
    
  </div>
  <div class="d-flex flex-row">
      <div>
          <label for="validationDefault02">Ref proveedor</label>
          <input type="text" class="form-control"  aria-describedby="inputGroupPrepend2" v-model="material.refMaterialProveedor" required>
      </div>
      <div class="separador-lateral"></div>
      <div>
          <label for="validationDefaultUsername">Categoría</label>
          <select class="form-select" v-model="material.categoria" required>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria" :selected="categoria === categoria">{{ categoria }}</option>
             
            </select>
      </div>
  </div>    
  <div class="d-flex flex-row">
      <div>
          <label for="validationDefault02">Unidad medida</label>
          <select class="form-select" v-model="material.unidadMedida" required>
            <option v-for="unidadMedida in unidadesMedida" :key="unidadMedida" :value="unidadMedida" :selected="unidadMedida === unidadMedida">{{ unidadMedida }}</option>
            
            </select>
      </div>
      <div class="separador-lateral"></div>
      <div>
      </div>
  </div>    

  <div class="d-flex flex-row">
   
    <div class="d-flex flex-row mt-3 botones">
          <router-link to="/vermateriales" style="text-decoration: none;"> <cancelbutton/></router-link>
          <confirmbutton @click="enviarFormulario"></confirmbutton>
         </div>
  </div>
</div>
    </form>
  </div>
</template>

<script>
import confirmbutton from '@/components/confirmbutton.vue'
import cancelbutton from '@/components/cancelbutton.vue'
export default {
  components: { confirmbutton, cancelbutton },
  name: 'vistaEditarMaterial',
  data() {
    return {
      material: {
        idMaterial: '',
        nombre: '',
        descripcion: '',
        refMaterialProveedor: '',
        cantidad: '',
        categoria: '',
        proveedor: { 
          idProveedor: '',
          nombre: ''
        },
        unidadMedida: ''
      },
      proveedores: [],
      proveedorIdInput: null,
      nombreproveedor:null,
      categoriaInicial:null,
      unidadesMedida: ['Metros', 'Rollos', 'Cajas', 'Unidades', 'M3'], // Opciones de unidad de medida
      categorias:['Ferreteria', 'Tela', 'Carpintería', 'Costura', 'Genérico']
    };
  },
  created() {
    this.material.idMaterial = this.$route.params.idMaterial;
    this.obtenerMaterial();
  },
  methods: {
    async obtenerMaterial() {
      try {
        const response = await fetch(`http://localhost:8088/materiales/uno/${this.material.idMaterial}`);
        if (response.ok) {
          const data = await response.json();
          this.material = data;
          this.obtenerProveedores(); // Llama a obtenerProveedores después de obtenerMaterial
          this.nombreproveedor = this.material.proveedor ? this.material.proveedor.nombre : null; // Asigna el nombre del proveedor asociado al material
    
        } else {
          console.error('Error al obtener el material');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async obtenerProveedores() {
      try {
        const response = await fetch('http://localhost:8088/proveedor/todos');
        if (response.ok) {
          const data = await response.json();
          this.proveedores = data;
          // Asigna proveedorIdInput después de obtener la lista de proveedores
          this.proveedorIdInput = this.material.proveedor ? this.material.proveedor.idProveedor : null;
        } else {
          console.error('Error al obtener los proveedores');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async enviarFormulario() {
      try {
        // Actualizamos el idProveedor del material.proveedor con el valor del proveedorIdInput
        if (this.material.proveedor) {
          this.material.proveedor.idProveedor = this.proveedorIdInput;
        }

        const formData = {
          idMaterial: this.material.idMaterial,
          nombre: this.material.nombre,
          descripcion: this.material.descripcion,
          refMaterialProveedor: this.material.refMaterialProveedor,
          cantidad: this.material.cantidad,
          categoria: this.material.categoria,
          idProveedor: this.proveedorIdInput,
          unidadMedida: this.material.unidadMedida,
        };

        const response = await fetch('http://localhost:8088/materiales/modificar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          this.$router.push({ path: '/verMateriales', query: { mensaje: 'Material editado',  tipo: 'satisfactorio' } });
        } else {
          this.$router.push({ path: '/verMateriales', query: { mensaje: 'Error al editar material',  tipo: 'error' } });
        }
      } catch (error) {
        this.$router.push({ path: '/verMateriales', query: { mensaje: 'Error al editar material',  tipo: 'error' } });
        console.error('Error:', error);
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