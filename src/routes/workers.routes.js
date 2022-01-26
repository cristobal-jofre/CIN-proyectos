import { Router } from 'express';
import projectFunctions from '../controllers/workers.controller';
import FormValidator from '../middleware/FormValidator'
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// GET
router.get('/', projectFunctions.getWorkers);
router.get('/:id', projectFunctions.getWorkerById);

// PUT
router.put('/editWorker', requestFormValidation(FormValidator.validateFormWorker, projectFunctions.editWorker));

// POST
router.post('/newWorker', requestFormValidation(FormValidator.validateFormNewWorker, projectFunctions.insertWorker));

// DELETE
router.delete('/deleteWorker/:id', projectFunctions.deleteWorkerById);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;
