import { Router } from 'express';
import projectFunctions from '../controllers/projects.controllers';
import FormValidator from '../middleware/FormValidator';
import { requestFormValidation } from '../helpers/helpersFunctions';

const router = Router();

// GET
router.get('/projectsNameAndID', projectFunctions.getProjectsNameAndID);
router.get('/', projectFunctions.getProjects);
router.get('/:id/cashFlow', projectFunctions.getInterestByProjects);
router.get('/:id', projectFunctions.getProjectById);
router.get('/:id/workers', projectFunctions.getWorkersByProjects);
router.get('/:id/documents', projectFunctions.getDocumentsByProjects);
router.get('/:worker/projects', projectFunctions.getProjectsByWorker);
router.get('/:worker/projectsAndStatus', projectFunctions.getProjectAndStatussByWorker);

// POST
router.post('/newProject', requestFormValidation(FormValidator.validateFormNewProject, projectFunctions.insertProject));
router.post('/projectStatus', requestFormValidation(FormValidator.validateFormStatusToProject, projectFunctions.insertProjectWithStatus));
router.post('/addWorkerToProject', requestFormValidation(FormValidator.validateFormWorkerToProject, projectFunctions.insertWorkersToProject));
router.post('/addInterestToProject', requestFormValidation(FormValidator.validateFormInterestToProject, projectFunctions.insertInterestsToProject));
router.post('/saveBilling', requestFormValidation(FormValidator.validateFormBilling, projectFunctions.saveBilling));

// DELETE
router.delete('/deleteProject/:id', projectFunctions.deleteProjectById);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;