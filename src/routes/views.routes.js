import { Router } from 'express';

const router = Router();

// Get render of views

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/users', (req, res) => {
    res.render('adminUsers');
});

router.get('/projects', (req, res) => {
    res.render('projects');
});

router.get('/addProject', (req, res) => {
    res.render('addProject');
});

router.get('/workers', (req, res) => {
    res.render('workers');
});

router.get('/addDocu', (req, res) => {
    res.render('addDocu');
});

router.get('/interests', (req, res) => {
    res.render('interests');
});

router.get('/addNewInterest', (req, res) => {
    res.render('addNewInterest');
});

router.get('/detailsProject/:id', (req, res) => {
    res.render('detailsProject', { id: req.params.id });
});

router.get('/cashFlowProject/:id', (req, res) => {
    res.render('cashFlowProject', { id: req.params.id });
});

router.get('/detailsWorker/:id', (req, res) => {
    res.render('detailsWorker', { id: req.params.id });
});

export default router;