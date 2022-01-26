import { Router } from 'express';
import authFunctions from '../controllers/auth.controllers';
import FormValidator from '../middleware/FormValidator';
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// POST
router.post('/login', requestFormValidation(FormValidator.validateFormLogin, authFunctions.login));

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;