import { Router } from 'express';
import clientFunctions from '../controllers/client.controllers';
import FormValidator from '../middleware/FormValidator';
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// GET
router.get('/clients', clientFunctions.getClients);
router.get('/:name/checkIfClientExists', clientFunctions.checkIfClientExists);

// POST
router.post('/newClient', requestFormValidation(FormValidator.validateFormNewClient, clientFunctions.insertClient));

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;