import { Router } from 'express';
import documentsFunctions from '../controllers/documents.controller';

const router = Router();

// POST
router.post('/upload', documentsFunctions.uploadDocument);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;