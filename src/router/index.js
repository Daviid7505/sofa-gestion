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
import empleados from '../views/empleados/empleados.vue'
import sofas from '../views/sofas/sofas.vue'
import altaSofa from '../views/sofas/altaSofa.vue'
import pedidos from '../views/pedidos/pedidos.vue'

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
        path: '/verpedidos',
        name: 'verpedidos',
        component: pedidos
      },
  
    
]
})

export default router
