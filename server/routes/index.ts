import { Router } from 'express';
import carRoutes from './cars.routes';
import { GenericController } from '../controllers/generic.controller';

const router = Router();

// 1. Cars (Custom Controller)
router.use('/cars', carRoutes);

// 2. Preorders (Generic CRUD)
const preorderController = new GenericController('preorders');
const preorderRouter = Router();
preorderRouter.post('/', preorderController.create);
preorderRouter.get('/', preorderController.getAll); // Admin only usually
preorderRouter.get('/:id', preorderController.getById);
router.use('/preorders', preorderRouter);

// 3. Appointments (Generic CRUD)
const appointmentController = new GenericController('appointments');
const appointmentRouter = Router();
appointmentRouter.post('/', appointmentController.create);
appointmentRouter.get('/', appointmentController.getAll);
router.use('/appointments', appointmentRouter);

// 4. Hero Media (Generic CRUD)
const heroController = new GenericController('hero_media');
const heroRouter = Router();
heroRouter.get('/', heroController.getAll);
heroRouter.post('/', heroController.create);
heroRouter.put('/:id', heroController.update);
heroRouter.delete('/:id', heroController.delete);
router.use('/hero-media', heroRouter);

// 5. Testimonials (Generic CRUD)
const testimonialController = new GenericController('testimonials');
const testimonialRouter = Router();
testimonialRouter.get('/', testimonialController.getAll);
testimonialRouter.post('/', testimonialController.create);
router.use('/testimonials', testimonialRouter);

// 6. Inquiries (Generic CRUD)
const inquiryController = new GenericController('inquiries');
const inquiryRouter = Router();
inquiryRouter.post('/', inquiryController.create);
router.use('/inquiries', inquiryRouter);

// 7. Corporate Requests (Generic CRUD)
const corporateController = new GenericController('corporate_requests');
const corporateRouter = Router();
corporateRouter.post('/', corporateController.create);
router.use('/corporate-requests', corporateRouter);

export default router;
