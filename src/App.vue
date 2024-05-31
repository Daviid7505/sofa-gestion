<template>
  <head>
    <title>Proges</title>
  </head>
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid nav-general"> 
	<a class="navbar-brand" routerLink="/">  <router-link to="/inicio"> <img src="../public/profile-photo.png" class="logotipo"></router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon icono-nav">a</span>
    </button>
    <div class="collapse navbar-collapse menu" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/inicio">Inicio</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/vermateriales">Materiales</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/verpedidos">Pedidos</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/verproveedores">Proveedores</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/verclientes">Clientes</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/versofas">Sofás</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/verempleados">Empleados</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><router-link to="/departamentos">Departamentos</router-link></a>
        </li>
      </ul>
    </div>
   
  </div>
</nav>
<div>
  <router-view></router-view>
</div>

  </template>
<script>
   
</script>

<style scoped>

@import url('assets/notificacion.css');
@import url('assets/tablas.css');
@import url('assets/input-busqueda-tablas.css');


.logotipo{
  width:40%;

}

.menu{
  width:110%;
  
}
.nav-general{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.navbar{
	background-color:rgb(30, 36, 80);
  height:60px;
}

.container-fluid a{
	color:white !important;
}

.dropdown-menu li a{
	color:black !important;
}

.logo{
	width:42px;
	height:42px;
}

.nav-item a:link{
	text-decoration:none !important;
}

.nav-item {
  position: relative;
  margin:10px;
}

.nav-item::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease-in-out;
}

.nav-item:hover::before {
  width: 100%;
}

</style>

