// Este archivo define las respuestas estándar del dominio.
// Código: Aquí se pueden agregar códigos de respuesta específicos.

export const RESPONSE_CODES = {
    200: 'SUCCESS',
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    500: 'INTERNAL_SERVER_ERROR'
};

const createResponse = (code= 200, data = null, errors = []) => {
    return {
        status: RESPONSE_CODES[code],
        code: code, 
        data: data,
        errors: errors
    };
};

export default createResponse;