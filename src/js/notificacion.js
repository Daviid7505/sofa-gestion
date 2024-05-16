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
