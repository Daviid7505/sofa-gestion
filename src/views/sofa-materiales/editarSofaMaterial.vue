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
              <input type="number" class="form-control" v-model="sofaMaterial.idMaterial" placeholder="Número de referencia" required>
            </div>
            <div class="separador-lateral"></div>
            <div>
              <label class="form-input">Cantidad</label>
              <input type="number" class="form-control"  v-model="sofaMaterial.cantidad" placeholder="Cantidad a utilizar" required>
            </div>
          </div>
          <div class="d-flex flex-row mt-3 botones">
        <router-link :to="'/materiales-sofa/'+ sofaMaterial.idSofa" style="text-decoration: none;"> <cancelbutton/></router-link>
        <confirmbutton @click="enviarFormulario"></confirmbutton>
       </div>
        </div>
      </form>
    </div>
  
</div>



 
</template>

  <script>
  import confirmbutton from '@/components/confirmbutton.vue'
  import cancelbutton from '@/components/cancelbutton.vue'
  export default {
    components: { confirmbutton, cancelbutton },
    name: 'vistaEditarSofaMaterial',
    data() {
      return {
        sofaMaterial: {
          idSofaMaterial:'',
          idSofa: '',
          idMaterial: '',
          cantidad: ''
        },
      };
    },
    created() {
      this.sofaMaterial.idSofaMaterial = this.$route.params.idSofaMaterial;
      this.getSofaMaterial();
    },
    methods: {
      async getSofaMaterial() {
        try {
          const response = await fetch(`http://localhost:8088/sofaMaterial/uno/${this.sofaMaterial.idSofaMaterial}`);
          if (response.ok){
            const data = await response.json();
              this.sofaMaterial = {
              idSofaMaterial: data.idSofaMateriales,
              idSofa: data.sofa.idSofa,
              idMaterial: data.material.idMaterial,
              cantidad: data.cantidadUtilizada
            };
          } else {
            console.error('Error al obtener el material');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      
    
    async enviarFormulario() {
      try {
        const formData = {
          idSofaMateriales: this.sofaMaterial.idSofaMaterial,
          idSofa: this.sofaMaterial.idSofa,
          idMaterial: this.sofaMaterial.idMaterial, 
          cantidadUtilizada:this.sofaMaterial.cantidad
        };
          const response = await fetch('http://localhost:8088/sofaMaterial/modificar', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            this.$router.push({path:`/materiales-sofa/${this.sofaMaterial.idSofa}`, query: { mensaje: 'Material asignado exitosamente', tipo:'satisfactorio'}})
          } else {
            this.$router.push({path:`/materiales-sofa/${this.sofaMaterial.idSofa}`, query: { mensaje: 'Error al editar el material', tipo:'error'}})
          }
        } catch (error) {
          console.error('Error:', error);
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