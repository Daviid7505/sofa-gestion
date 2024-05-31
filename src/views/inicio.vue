<template>

    <div class="body">
        <div class="first-cotainer-row">
            <div class="target-left">
                <div class="title-section-pedidos">
                    <h6>Pedidos</h6>
                </div>
                <div class="envolver-targets-days">
                    <div class="target-day hoy">
                        <div class="title-target-day pedidos-day">
                            <h4>Hoy</h4>
                        </div>
                        
                        <div class="content-target-day pedidos-dia">
                            <h3>{{ pedidosDia }}</h3>
                        </div>
                    </div>
                    <div class="target-day mes">
                        <div class="title-target-day month">
                            <h4>Este mes</h4>
                        </div>
                        <div class="content-target-day pedidos-mes">
                            <h3>{{ pedidosMes }}</h3>
                        </div>
                    </div>
                    <div class="target-day trimestrep">
                        <div class="title-target-day trimestre">
                            <h4>Trimestral</h4>
                        </div>
                        <div class="content-target-day pedidos-trimestre">
                            <h3>{{ pedidosTrimestre }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="second-container-row">
            <div class="target-right">
                <div class="pedido-estado-title">
                    <h3>Estado pedidos</h3>
                </div>
                <div class="barras-container">
                    <div v-for="(cantidad, estado) in resumenEstados" :key="estado" class="barra-estado">
                        <div class="barra" :style="{ width: calcularAnchoBarra(cantidad) + '%', backgroundColor: colorEstado(estado) }"></div>
                    </div>
                    <div class="texto-barras">
                        <div class="contenedor-estado">
                            <div class="circle" style="background-color:rgb(0, 151, 197); width:15px; height:15px; border-radius:48px;"></div>
                            <h6>Procesando</h6>
                        </div>
                        <div class="contenedor-estado">
                            <div class="circle" style="background-color:#707070; width:15px; height:15px; border-radius:48px;"></div>
                            <h6>Sin estado</h6>
                        </div>
                        <div class="contenedor-estado"> 
                            <div class="circle" style="background-color:#e8bf18; width:15px; height:15px; border-radius:48px;"></div>
                            <h6>Pendiente</h6>
                        </div>
                        <div class="contenedor-estado"> 
                            <div class="circle" style="background-color:#ff6363; width:15px; height:15px; border-radius:48px;"></div>
                            <h6>Sin asignar</h6>
                        </div>
                        <div class="contenedor-estado"> 
                            <div class="circle" style="background-color:rgb(15, 164, 1); width:15px; height:15px; border-radius:48px;"></div>
                            <h6>Terminado</h6>
                        </div>
                    </div>
                    <div class="envolver-descripcion-estado">
                        <div v-for="(cantidad, estado) in resumenEstados" :key="estado" class="descripcion-estado">
                            
                            <span  class="estado-pedidos"> {{ cantidad }}</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    
  
</template>
    

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pedidosDia: 0,
      pedidosMes: 0,
      pedidosTrimestre: 0,
      pedidosConEstado: [],
      resumenEstados: {},
      pedidos:[],
      maxPedidos: 0,
    };
  },
  created(){
     // Mantenemos la carga de los pedidos por día, mes y trimestre
     this.fetchPedidos();
     this.fetchPedidosDia();
     this.fetchPedidosMes();
     this.fetchPedidosTrimestre();
  },

  methods: {
    async fetchPedidosDia() {
      try {
        const response = await axios.get('http://localhost:8088/pedido/porDia'); // Reemplaza con la URL correcta
        this.pedidosDia = response.data;
      } catch (error) {
        console.error('Error fetching pedidosDia:', error);
      }
    },
    async fetchPedidosMes() {
      try {
        const response = await axios.get('http://localhost:8088/pedido/porMes'); // Reemplaza con la URL correcta
        this.pedidosMes = response.data;
      } catch (error) {
        console.error('Error fetching pedidosMes:', error);
      }
    },
    async fetchPedidosTrimestre() {
      try {
        const response = await axios.get('http://localhost:8088/pedido/porTrimestre'); // Reemplaza con la URL correcta
        this.pedidosTrimestre = response.data;
      } catch (error) {
        console.error('Error fetching pedidosTrimestre:', error);
      }
    },
    async fetchPedidos() {
      try {
        const response = await fetch('http://localhost:8088/pedido/lista');
        const data = await response.json();

        if (Array.isArray(data)) {
          this.pedidos = data;
          await this.fetchEstados();
        } else {
          console.error('No se encontraron pedidos');
        }
      } catch (error) {
        console.error('Error al obtener la lista de pedidos:', error);
      }
    },
    async fetchEstados() {
      try {
        const estadoPromises = this.pedidos.map(pedido => this.fetchEstadoPedido(pedido.idPedido));

        const estados = await Promise.all(estadoPromises);

        this.pedidosConEstado = this.pedidos.map((pedido, index) => ({
          ...pedido,
          estado: estados[index]
        }));

        this.resumenEstados = this.pedidosConEstado.reduce((acc, pedido) => {
          acc[pedido.estado] = (acc[pedido.estado] || 0) + 1;
          return acc;
        }, {});

        this.maxPedidos = Math.max(...Object.values(this.resumenEstados));
      } catch (error) {
        console.error('Error al obtener los estados de los pedidos:', error);
      }
    },
    async fetchEstadoPedido(idPedido) {
      try {
        const response = await fetch(`http://localhost:8088/tarea/estadoPorPedido/${idPedido}`);
        const estado = await response.text();
        return estado || 'Desconocido';
      } catch (error) {
        console.error(`Error al obtener el estado del pedido ${idPedido}:`, error);
        return 'Error';
      }
    },
    calcularAnchoBarra(cantidad) {
      return (cantidad / this.maxPedidos) * 100;
    },
    colorEstado(estado) {
      const colores = {
        Procesando: 'rgb(0, 151, 197)',
        'Sin estado': '#707070',
        Pendiente: '#e8bf18',
        'Sin asignar': '#ff6363',
        Finalizado: 'rgb(15, 164, 1)',
        Desconocido: '#707070'
      };
      return colores[estado] || '#000';
    }
  }
};
</script>


<style scoped>
.body{
    width:100%;
    display:flex;
    flex-direction:column;
    
    justify-content:center;
    align-items:center;
    height:auto;
}
.first-cotainer-row{
   margin-top:20px;
    display:flex;
    justify-content:center;
    width:90%;
    height:auto;
}
/* Contenedor izquierdo de las tarjetas de los pedidos*/
    .target-left{
        display:flex;
        width:60%;
        border-radius:21px;
        height:230px;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        background-color:white;
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.15);
    }
        /*Contenedor del titulo donde pone Pedidos*/
        .title-section-pedidos{
            margin-bottom:-10px;
            margin-left:40px;
            width:100%;
        }
            .title-section-pedidos h6{
                font-size:28px;
                color:#171D53;
            }
         /*Contenedor para envolver todas las tarjetas*/   
        .envolver-targets-days{
            margin-top:-10px;
            display:flex;
            width:100%;
           
            justify-content:center;
            align-items:center;
            }
            /*Modificación de todas las tarjetas*/
            .target-day{
                margin:50px;
                width:17%;
                height:72%;
                border-radius:20px;
                color:white;
                display:flex;
                flex-direction:column;
                box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.20);
                transition: all 0.3s ease-out;
                cursor:pointer;
            }
            .hoy{
                background-color:#4456F1;
                &:hover{
                    background-color:#26318f;;
                }
            }
            .mes{
                background-color:#FE7A5D;
                &:hover{
                    background-color:#a44b37;
                }
            }
            .trimestrep{
                background-color:#915DFE;
                &:hover{
                    background-color:#55339d;
                }
            }
            /*Titulos de todas las tarjetas*/
                .title-target-day{
                    height:40%;
                    width:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                 
                }
                /*Contenido de todas las tarjetas*/
                .content-target-day{
                    height:60%;
                    width:100%;
                    display:flex;
                    text-align:center;
                    justify-content:center;
                    align-items:center;
                }
                    .content-target-day h3{
                        font-weight:700;
                        font-size:36px;
                    }
.second-container-row{
   margin-top:40px;
   width:100%;
   display:flex;
   justify-content:center;
   height:320px;
}    /*Tarjeta de los estados de pedidos general*/                
    .target-right{
        display:flex;
        width:55%;
        border-radius:21px;
        background-color:white;
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.15);
        flex-direction:column;
    }
        .pedido-estado-title{
            margin-top:10px;
            margin-left:20px;
            width:100%;
        }
        .pedido-estado-title h3{
            font-size:28px;
            color:#171D53;
        }
        .barras-container{
            height:100%;
            display:flex;
            flex-direction:column;
            justify-content:center;
        }
            .barra-estado {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            width:90%;
            margin-left:30px;
            }
                .barra {
                height: 24px;
                background-color: #d2b006;
                margin-right: 10px;
                transition: width 0.3s ease-out;
                border-radius:34px;
                }

                .texto-barras{
                    
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                    .texto-barras div{
                        padding-top:10px;
                        display:flex;
                        margin:15px;
                    }

                        .contenedor-estado h6{
                            margin-right:10px;
                            font-size:18px;
                        }
                    .circle{
                        margin-top:2px !important;
                        
                    }
                .envolver-descripcion-estado{
                margin-top:-20px;
                width:100%;
                display:flex;
                font-size:26px;
                font-weight:bold;
                color:rgb(47, 47, 47);
                 }
                .descripcion-estado{
                    display:flex;
                    width:50%;
                    flex-direction:row;
                    margin:0px;
                    text-align:center;
                    justify-content:center;
                }
                .estado-pedidos{
                        display:flex;
                        width:auto;
                        height:auto;
                    }

</style>
