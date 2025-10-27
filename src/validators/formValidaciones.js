export const validateLogin = (email, password) => {
  const errors = {};
  if (!email.includes('@')) {
    errors.email = 'Por favor, ingresa un correo electrónico válido.';
  }
  if (password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }
  return errors;
};

export const validateProfile = ({ nombre, fechaNacimiento, telefono }) => {
    const errors = {};
    if (nombre.trim().split(' ').length < 2) {
        errors.nombre = 'Por favor, ingresa tu nombre completo (nombre y apellido).';
    }
    if (!fechaNacimiento) {
        errors.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
    }
    if (telefono && !/^\d{9}$/.test(telefono)) {
        errors.telefono = 'El formato del teléfono no es válido. Debe contener 9 dígitos.';
    }
    return errors;
};

export const validateRegistration = ({ nombre, email, fechaNacimiento, password, codigoDescuento }) => {
    const errors = {};

    if (nombre.trim().split(' ').length < 2) {
        errors.nombre = 'Por favor, ingresa tu nombre completo.';
    }

    if (!email.includes('@')) {
        errors.email = 'Por favor, ingresa un correo electrónico válido.';
    }
    
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (isNaN(age)) {
        errors.fechaNacimiento = 'Por favor, ingresa una fecha de nacimiento válida.';
    }

    if (password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (codigoDescuento && codigoDescuento.toUpperCase() !== 'FELICES50') {
        errors.codigoDescuento = 'El código de descuento no es válido.';
    }
    
    return errors;
};
