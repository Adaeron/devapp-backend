export class EntityNotFoundError extends Error {
    constructor(message = 'No se encuentra la entidad.') {
        super(message);
        this.name = 'EntityNotFoundError';
    }
}

export class InvalidDataError extends Error {
    constructor(message = 'Datos inválidos.') {
        super(message);
        this.name = 'InvalidDataError';
    }
}
