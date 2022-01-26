import express from 'express';
import path from 'path';
import BodyParser from 'body-parser';
import MethodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import authRoutes from './routes/auth.routes';
import viewsRoutes from './routes/views.routes';
import userRoutes from './routes/user.routes';
import projectsRoutes from './routes/projects.routes';
import workersRoutes from './routes/workers.routes';
import interestRoutes from './routes/interest.routes';
import statusRoutes from './routes/status.routes';
import paymentRoutes from './routes/payment.routes';
import clientRoutes from './routes/client.routes';
import documentsRoutes from './routes/documents.routes';
import cashFlowRoutes from './routes/cashFlow.routes';
import { isAutenticated } from './helpers/helpersFunctions';
import { basename } from './config.json';

const app = express();

// Port configuration
app.set('PORT', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares configuration
app.use(express.static(path.join(__dirname, 'static')));
app.use(MethodOverride());
app.use(cookieParser());
app.use(BodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000
}));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 * 1024 },
}));


// View Routes
app.use(`${basename}`, viewsRoutes);

// API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/user', isAutenticated, userRoutes);
app.use('/api/projects', isAutenticated, projectsRoutes);
app.use('/api/workers', isAutenticated, workersRoutes);
app.use('/api/interests', isAutenticated, interestRoutes);
app.use('/api/status', isAutenticated, statusRoutes);
app.use('/api/payments', isAutenticated, paymentRoutes);
app.use('/api/client', isAutenticated, clientRoutes);
app.use('/api/documents', isAutenticated, documentsRoutes);
app.use('/api/cashFlow', isAutenticated, cashFlowRoutes);

// APP execute
app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`);
});