<template>
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid"> 
	<a class="navbar-brand" routerLink="/">  <router-link to="/"> <img src="../public/profile-photo.png" class="logo"></router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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

.navbar{
	background-color:rgb(30, 36, 80);
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



</style>

