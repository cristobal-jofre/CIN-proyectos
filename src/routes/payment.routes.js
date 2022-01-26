import { Router } from 'express';
import paymentFunctions from '../controllers/payment.controllers';
import { requestFormValidation } from '../helpers/helpersFunctions';
import FormValidator from '../middleware/FormValidator';

const router = Router();

// GET
router.get('/', paymentFunctions.getPayments);
router.get('/:id/payments', paymentFunctions.getPaymentsByWorker);

// POST
router.post('/newPayment', requestFormValidation( FormValidator.validateFormPayment, paymentFunctions.insertPayment ));

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;