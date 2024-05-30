<template>
    <header>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </header>
   
       <button class="cancelbutton" type="submit" @click="handleClick">
        <span class="material-symbols-outlined">cancel</span>
        <span class="text">Cancelar</span>
   </button>
   
   
   </template>
   <script>
  
export default{
  name:'Cancelbutton',
  emits: ['click'],
  methods:{
    handleClick(){
      this.$emit('click');
    }
  }
}
</script>
<style scoped>
   
   .cancelbutton{
     width:120px;
     border:none;
     border:none;
     background-color:rgb(215, 36, 36);
     color:white;
    
     border-radius:6px;
     display:flex;
     align-items:center;
     height:34px;
     transition: all 0.3s ease-out;
        &:hover{
            background-color:rgb(173, 30, 30);
        }
   }
   
    .cancelbutton span, .material-symbols-outlined{
      font-size:19px;
    }
    .cancelbutton .text{
      margin-top:-5px;
      padding-left:5px;
    }
   
   </style>
   