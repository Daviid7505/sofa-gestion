<template>
  <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </header>

    <button class="editbutton" type="submit">
      <i class="fa-regular fa-pen-to-square"></i>
      <span>Editar</span>
</button>


</template>
<style scoped>

.editbutton{
  border:none;
  border:none;
  color:white;
  background-color:rgb(19, 114, 202);
  border-radius:6px;
  width:100px;
  display:flex;
  align-items:center;
  height:30px;
  transition: all 0.3s ease-out;
  &:hover{
    background-color:rgb(14, 75, 132);
  }
}

 .editbutton span{
   padding-left:10px;

 }
.editbutton i{
  margin-left:3px;
  font-size:15px;
}


</style>

<script>
src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"

</script>