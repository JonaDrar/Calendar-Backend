/*
    Rutas de usuarios / Events
    host + /api/events
*/

import { Router } from 'express'
import { check } from 'express-validator';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/events.js';
import { isDate } from '../helpers/isDate.js';
import { fieldsValidator } from '../middlewares/fieldsValidator.js';

//Todas las rutas deben pasar por la validación del JWT
import { jwtValidator } from '../middlewares/jwtValidator.js';

const router = Router();

router.use( jwtValidator )

//Obtener eventos
router.get('/', getEvents)

//Crear nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de término es obligatoria').custom( isDate ),
        fieldsValidator
    ],
    createEvent
)

//Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de término es obligatoria').custom( isDate ),
        fieldsValidator
    ],
    updateEvent
)

//Eliminar evento
router.delete('/:id', deleteEvent)

export default router;