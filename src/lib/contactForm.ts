import * as yup from 'yup';

/** Sanitización segura para el navegador (sin dependencias de Node). */
export function sanitizeInput(text: string): string {
  const stripped = text.replace(/[\x00-\x1F\x7F-\x9F]/g, '').replace(/<[^>]*>/g, '');
  if (typeof document === 'undefined') return stripped.trim();

  const div = document.createElement('div');
  div.textContent = stripped;
  return (div.textContent ?? '').trim();
}

export const contactFormSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  negocio: yup
    .string()
    .trim()
    .max(100, 'El nombre del negocio es demasiado largo')
    .optional()
    .default(''),
  email: yup
    .string()
    .trim()
    .required('El email es obligatorio')
    .email('Por favor ingresa un email válido')
    .max(254, 'El email es demasiado largo'),
  telefono: yup
    .string()
    .trim()
    .max(20, 'El teléfono es demasiado largo')
    .matches(/^[\d\s+\-().]*$/, 'Formato de teléfono no válido')
    .optional()
    .default(''),
  servicio: yup
    .string()
    .required('Selecciona un servicio de interés'),
  presupuesto: yup
    .string()
    .required('Selecciona un rango de presupuesto'),
  mensaje: yup
    .string()
    .trim()
    .max(500, 'El mensaje no puede superar 500 caracteres')
    .optional()
    .default(''),
  _gotcha: yup
    .string()
    .max(0, 'Spam detectado')
    .optional()
    .default(''),
});

export type ContactFormData = yup.InferType<typeof contactFormSchema>;

export function sanitizeContactData(data: ContactFormData): ContactFormData {
  return {
    nombre: sanitizeInput(data.nombre),
    negocio: sanitizeInput(data.negocio ?? ''),
    email: sanitizeInput(data.email),
    telefono: sanitizeInput(data.telefono ?? ''),
    servicio: sanitizeInput(data.servicio),
    presupuesto: sanitizeInput(data.presupuesto),
    mensaje: sanitizeInput(data.mensaje ?? ''),
    _gotcha: '',
  };
}

export function getFormValues(form: HTMLFormElement): Record<string, string> {
  const formData = new FormData(form);
  return Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [key, String(value)])
  );
}
