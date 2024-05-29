export const estadoClass = (estado) => {
    switch (estado.toLowerCase()) {
      case 'sin asignar':
        return 'sin-asignar';
      case 'cancelado':
        return 'cancelado';
      case 'pendiente':
        return 'pendiente';
      case 'procesando':
        return 'procesando';
      case 'finalizado':
        return 'finalizado';
      default:
        return 'vacio';
    }
  };