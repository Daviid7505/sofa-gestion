<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
  </header>
  
    <button class="detailbutton" type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" style="fill: rgba(255, 255, 255, 1);transform: rotate(180deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
    <span>Detalle</span>
  </button>
 
 

</template>
<style>
.detailbutton{
  
 border:none;
 color:white;
 background-color:rgb(214, 139, 27);
 border-radius:6px;
 width:100px;
 height:30px;
 display:flex;
 align-items:center;
 transition: all 0.3s ease-out;
        &:hover{
            background-color:rgb(158, 103, 20);
        }
}
.detailbutton span{
  padding-left:3px;
}

.detailbutton svg{
  margin-left:2px;
}



</style>

<script>
src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"

</script>