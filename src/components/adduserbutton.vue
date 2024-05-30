<template>
    <header>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </header>
  <button class="endbutton" type="submit">
    <i class='bx bx-check' ></i>
    <span>Terminado</span>
  </button>  
</template>
<style>
.endbutton{
  
    border:none;
    color:white;
    background-color:rgb(15, 164, 1);
    border-radius:6px;
    width:120px;
    display:flex;
    align-items:center;
    transition: all 0.3s ease-out;
        &:hover{
            background-color:rgb(10, 107, 1);
        }
   }
   .endbutton span{
     padding-left:2px;
   }
   
   .endbutton i{
     font-size:22px !important;
     
   }
   
   
   
   </style>
   
   <script>
   src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
   
   </script>