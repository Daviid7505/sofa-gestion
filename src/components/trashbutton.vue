<template>
  <header>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  </header>

    <button class="trashbutton" @click="handleClick">
  
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path></g></g>
</svg>
<span>Eliminar</span>
</button>


</template>


<script>
src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"

export default{
  name:'TrashButton',
  emits: ['click'],
  methods:{
    handleClick(){
      this.$emit('click');
    }
  }
}

</script>

<style>

.trashbutton{
 border:none;
 background-color:rgb(224, 10, 10);
 border:none;
 border:none;
 color:white;
 border-radius:6px;
 width:100px;
 display:flex;
 align-items:center;
 height:30px;
 transition: all 0.3s ease-out;
 &:hover{
  background-color:rgb(163, 14, 14);
 }
}

.bx{
 background-color:transparent;
}

.trashbutton span{
   padding-left:7px;
 }


</style>