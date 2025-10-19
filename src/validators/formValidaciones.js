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

export const validatePayment = ({ nombre, direccion, tarjeta, exp, cvv }) => {
    const errors = {};
    
    if (!nombre) errors.nombre = "El nombre es obligatorio.";
    if (!direccion) errors.direccion = "La dirección es obligatoria.";
    if (!tarjeta.match(/^\d{16}$/)) errors.tarjeta = "El número de tarjeta debe tener 16 dígitos.";
    if (!exp.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) errors.exp = "El formato debe ser MM/AA.";
    if (!cvv.match(/^\d{3}$/)) errors.cvv = "El CVV debe tener 3 dígitos.";

    return errors;
};