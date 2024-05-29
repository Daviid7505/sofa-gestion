<template>
    <div>
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </header>

      <div>
        <h1>Asignar material</h1>
      </div>
      <div class="d-flex container" id="form-target">
        <form class="d-flex flex-column" @submit.prevent="enviarFormulario">
          <div class="form-row">
            <div class="d-flex flex-row">
              <div>
                <label class="ref-material">Referencia material</label>
                <input type="number" class="form-control" v-model="idMaterial" required>
              </div>
              <div class="separador-lateral"></div>
              <div>
                <label class="form-input">Cantidad</label>
                <input type="number" class="form-control"  v-model="cantidad" required>
              </div>
            </div>
            <div class="d-flex flex-row mt-3 botones">
          <router-link to="/verpedidos" style="text-decoration: none;"> <cancelbutton/></router-link>
          <confirmbutton @click="enviarFormulario"></confirmbutton>
         </div>
          </div>
        </form>
      </div>
    <!-- Cuadro de búsqueda para materiales -->
    <div class="container-busqueda">
      <div class="contenedor">
      <input v-model="searchQuery" placeholder="Buscar material..." class="form-control busqueda">
      <div v-if="searchQuery && filteredMaterials.length">
        
          <table class="table table-hover table-responsive">
            <thead class="center">
              <tr >
                <th scope="col">Referencia</th>
                <th scope="col">RefMaterialProveedor</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in filteredMaterials" :key="material.idMaterial">
                <td class="center">{{ material.idMaterial }}</td>
                <td class="center">{{ material.refMaterialProveedor }}</td>
                <td class="center">{{ material.nombre }}</td>
                <td class="center">{{ material.descripcion }}</td>
              </tr> 
            </tbody>
          </table>
          </div>
      </div>
    </div>
    </div>
   
  </template>
  
  <script>
  import confirmbutton from '@/components/confirmbutton.vue'
  import cancelbutton from '@/components/cancelbutton.vue'

  export default {
    components: { confirmbutton, cancelbutton},
    data() {
      return {
      idSofa:'',
      idMaterial: '',
      cantidad: '',
      searchQuery: '',  // Nuevo campo de búsqueda
      materiales: []   // Lista de materiales
    };
    },
    async created() {
      this.idSofa = this.$route.params.idSofa;
      await this.getMateriales();
      
    },
    methods: {
      async getMateriales () {
        try {
        const response = await fetch('http://localhost:8088/materiales/todos');  // Endpoint para obtener todos los materiales
        if (response.ok) {
          const data = await response.json();
          this.materiales = data;
        } else {
          console.error('Error al obtener los materiales');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },

      async enviarFormulario() {
        const formData = {
          idMaterial: this.idMaterial,
          cantidadUtilizada: this.cantidad,
          idSofa: this.idSofa
      };
      try {
        const response = await fetch('http://localhost:8088/sofaMaterial/alta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log(formData);
        if (response.ok) {
          
          this.$router.push({path:`/materiales-sofa/${this.idSofa}`, query: { mensaje: 'Material asignado exitosamente', tipo:'satisfactorio'}})
        } else {
          this.$router.push({path:`/materiales-sofa/${this.idSofa}`, query: { mensaje: 'Error al asignar material', tipo:'error'}})
        }
      } catch (error) {
        this.$router.push({path:`/materiales-sofa/${this.idSofa}`, query: { mensaje: 'Error al asignar material', tipo:'error'}})
        console.error('Error:', error);
      }
    },
    }, computed: {
    filteredMaterials() {
      if (this.searchQuery) {
        return this.materiales.filter(material =>
          material.idMaterial.toString().includes(this.searchQuery)||
          material.refMaterialProveedor.toString().includes(this.searchQuery) ||
          material.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          material.categoria.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return [];
      }
    }
  },
  async mounted() {
    await this.getMateriales();
  }
};
</script>
  

  
  <style scoped>
table thead tr th{
  background-color:rgb(24, 44, 171);
  color:white;
}

table{
 margin-top:20px ;
}

.container-busqueda{

  display:flex;
  width:100%;
  justify-content:center;
  height:auto;

}
.busqueda{
  width:auto;
  display:flex;
 
}
.contenedor{
  padding-top:20px;
  display:flex;
  flex-direction:column;
  width:80%;
  height:auto;
  justify-content:center;
  text-align:center;
  align-items:center;
 
}
  .container-materiales{
    width:70%;
    justify-content:center;
    display:flex;
  
  }
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
  