import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import indexView from  '../views/materiales/indexView.vue'
import altaformView from '../views/materiales/alta-formView.vue'
import editarformView from '../views/materiales/editar-formView.vue'
import proveedores from '../views/proveedores/proveedores.vue'
import altaProveedor from '@/views/proveedores/altaProveedor.vue'
import editarProveedor from '@/views/proveedores/editarProveedor.vue'
import clientes from '../views/clientes/clientes.vue'
import altaCliente from '@/views/clientes/altaCliente.vue'
import editarCliente from '@/views/clientes/editarCliente.vue'
import sofas from '../views/sofas/sofas.vue'
import altaSofa from '../views/sofas/altaSofa.vue'
import editarSofa from '@/views/sofas/editarSofa.vue'
import pedidos from '../views/pedidos/pedidos.vue'
import altaPedido from '@/views/pedidos/altaPedido.vue'
import editarPedido from '@/views/pedidos/editarPedido.vue'
import empleados from '../views/empleados/empleados.vue'
import altaEmpleado from '@/views/empleados/altaEmpleado.vue'
import editarEmpleado from '@/views/empleados/editarEmpleado.vue'
import verDetallePedido from '@/views/detallePedido/detallePedido.vue'
import altaDetallePedido from '@/views/detallePedido/altaDetallePedido.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
  {
    path:'/',
    name:'inicio',
    
  },
      {
        path: '/vermateriales',
        name: 'vermateriales',
        component: indexView
      },
        {
          path:'/crear-material',
          name: 'vistaAltaMateriales',
          component: altaformView
        },
        {
          path:'/editar-material/:idMaterial',
          name: 'vistaEditarMateriales',
          component: editarformView,
        },
      {
        path: '/verproveedores',
        name: 'verproveedoress',
        component: proveedores
      },
        {
          path:'/crear-proveedor',
          name: 'vistaAltaProveedores',
          component: altaProveedor
        },
        {
          path:'/editar-proveedor/:idProveedor',
          name: 'vistaEditarProveedores',
          component: editarProveedor
        },
      {
        path: '/verclientes',
        name: 'verclientes',
        component: clientes
      },
        {
          path:'/crear-cliente',
          name: 'vistaAltaCliente',
          component: altaCliente
        },
        {
          path:'/editar-cliente/:idCliente',
          name: 'vistaEditarCliente',
          component: editarCliente
        },
      {
        path: '/verempleados',
        name: 'verempleados',
        component: empleados
      },
        {
          path:'/crear-empleado',
          name: 'vistaAltaEmpleado',
          component: altaEmpleado
        },
        {
          path:'/editar-empleado/:idEmpleado',
          name: 'vistaEditarEmpleado',
          component: editarEmpleado
        },
      {
        path: '/versofas',
        name: 'versofas',
        component: sofas
      },
        {
          path:'/crear-sofa',
          name: 'vistaAltaSofa',
          component: altaSofa
        },
        {
          path:'/editar-sofa/:idSofa',
          name: 'vistaEditarSofa',
          component: editarSofa
        },
      {
        path: '/verpedidos',
        name: 'verpedidos',
        component: pedidos
      },
      {
        path:'/crear-pedido',
        name: 'vistaAltaPedido',
        component: altaPedido
      },
        {
          path:'/editar-pedido/:idPedido',
          name: 'vistaEditarPedido',
          component: editarPedido
        },
        {
          path:'/ver-detallepedido/:idPedido',
          name: 'detalles',
          component: verDetallePedido
        },
        {
          path:'/crear-detallepedido',
          name: 'vistaAltaDetallePedido',
          component: altaDetallePedido
        },
      
]
})

export default router
