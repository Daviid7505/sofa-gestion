<template>
    <header>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </header>
  <button class="procesingbutton" type="submit">
    <i class='bx bxs-time' ></i>
    <span>Procesando</span>
  </button>  
</template>
<style>
.procesingbutton{
  
    border:none;
    color:rgb(255, 255, 255);
    background-color:rgb(0, 151, 197);
    border-radius:6px;
    width:120px;
    display:flex;
    align-items:center;
    transition: all 0.3s ease-out;
        &:hover{
            background-color:rgb(9, 92, 124);
        }
   }
   .procesingbutton span{
     padding-left:2px;
   }
   
   i{
     margin-left:-4px;
     font-size:17px;
   }
   
   
   
   </style>
   
   <script>
   src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
   
   </script>