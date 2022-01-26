import { Router } from 'express';
import cashFlowFunctions from '../controllers/cashFlow.controllers';
import { requestFormValidation } from '../helpers/helpersFunctions';
import FormValidator from '../middleware/FormValidator';

const router = Router();

// GET
router.get('/:id/billings', cashFlowFunctions.getBillingByProject);
router.get('/:id', cashFlowFunctions.getBilling);


router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;