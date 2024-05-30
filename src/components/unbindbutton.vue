<template>
    <header>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </header>
  <button class="unbindbutton" type="submit" @click="handleClick">
    <i class='bx bxs-user-x' ></i>
    <span>Desvincular</span>
  </button>  
</template>
<script>
   src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
export default{
  name:'Unbindbutton',
  emits: ['click'],
  methods:{
    handleClick(){
      this.$emit('click');
    }
  }
}
</script>
<style>
.unbindbutton{
  
    border:none;
    color:white;
    background-color:rgb(217, 154, 19);
    border-radius:6px;
    width:120px;
    display:flex;
    align-items:center;
    transition: all 0.3s ease-out;
        &:hover{
            background-color:rgb(156, 111, 13);
        }
   }
   .unbindbutton span{
     padding-left:2px;
   }
   
   .unbindbutton i{
     font-size:22px !important;
     
   }
  
   </style>
   
   