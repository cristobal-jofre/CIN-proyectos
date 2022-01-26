import { Router } from 'express';
import interestFunctions from '../controllers/interest.controllers';
import FormValidator from '../middleware/FormValidator';
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// GET
router.get('/', interestFunctions.getInterests);
router.get('/:id', interestFunctions.getInterestById);

//PUT
router.put('/editInterest', requestFormValidation(FormValidator.validateFormEditInterest, interestFunctions.editInterest));

//POST
router.post('/newInterest', requestFormValidation(FormValidator.validateFormNewInterest, interestFunctions.insertInterest));

//DELETE
router.delete('/deleteInterest', interestFunctions.deleteInterest);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;