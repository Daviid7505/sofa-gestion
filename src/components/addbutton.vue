<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  </header>
  
    <button class="addbutton" type="submit">
    <i class='bx bxs-plus-circle ' ></i>
    <span>Nuevo</span>
  </button>
 
 

</template>
<style>
.addbutton{
  
 border:none;
 color:white;
 background-color:rgb(15, 153, 2);
 border-radius:6px;
 width:100px;
 display:flex;
 align-items:center;
 transition: all 0.3s ease-out;
        &:hover{
            background-color:rgb(19, 128, 9);
        }
}
.addbutton span{
  padding-left:10px;
}

i{
  padding-left:6px;
}



</style>

<script>
src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"

</script>