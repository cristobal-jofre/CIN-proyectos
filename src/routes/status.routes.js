import { Router } from 'express';
import statusFunctions from '../controllers/status.controllers';
import FormValidator from '../middleware/FormValidator';
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// GET
router.get('/', statusFunctions.getStatusProjects);

// POST
router.post('/changeStatus', requestFormValidation(FormValidator.validateChangeStateProject, statusFunctions.changeStatus));

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;