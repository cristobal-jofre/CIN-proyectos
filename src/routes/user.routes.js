import { Router } from 'express';
import userFunctions from '../controllers/user.controller';
import FormValidator from '../middleware/FormValidator';
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// GET
router.get('/users', userFunctions.getUsers);

// PUT
router.put('/editUser', requestFormValidation(FormValidator.validateFormUser, userFunctions.editUser));

// POST
router.post('/newUser', requestFormValidation(FormValidator.validateFormUser, userFunctions.insertUser));
router.post('/changeState', userFunctions.changeState);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;