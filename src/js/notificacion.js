import { ref } from 'vue';


// Declara las variables mensaje y mensajeVisible en el archivo externo
export const mensaje = ref('');
export const mensajeVisible = ref(false);
export const mensajeError = ref(false); 
export const mensajeSatisfactorio = ref(false); 
let timeoutId = null; // Variable para almacenar el ID del temporizador
// Define la función para mostrar el mensaje
export function mostrarMensaje(msg, tipo) {
  mensaje.value = msg;
  mensajeVisible.value = true;
  mensajeError.value = tipo === 'error';
  mensajeSatisfactorio.value = tipo === 'satisfactorio';

  ocultarMensajeConRetraso(); //siempre que mostremos un mensaje vamos a ejecutar el temporizador
}
export function ocultarMensajeConRetraso(){
    // Si hay un temporizador activo, cáncelalo antes de configurar uno nuevo
    if (timeoutId) {
      clearTimeout(timeoutId);
  }

    // Configura un nuevo temporizador para ocultar el mensaje después de 3 segundos
     timeoutId = setTimeout(() => {
      mensajeVisible.value = false;
    }, 3000);
}


// Define la función para verificar la presencia de mensajes en la URL
export function verificarMensajeQuery() {
  // Obtiene la query "mensaje" y "tipo" de la URL
  const mensajeQuery = new URLSearchParams(window.location.search).get('mensaje');
  const tipoMensaje = new URLSearchParams(window.location.search).get('tipo');

  // Si la query "mensaje" está presente, muestra el mensaje
  if (mensajeQuery && tipoMensaje) {
    mostrarMensaje(mensajeQuery, tipoMensaje);
  }

}

//este método lo llamaremos antes del verificarMensaje para que se limpie y cuando cambiemos a otra vista
//y volvamos a la que nos había mostrado el mensaje no se vuelva a mostrar porque no se hayan limpiado
//las variables que lo contienen
export function limpiarMensaje(){
  mensaje.value = '';
  mensajeVisible.value = false;
  mensajeError.value = false;
  mensajeSatisfactorio.value = false;
}