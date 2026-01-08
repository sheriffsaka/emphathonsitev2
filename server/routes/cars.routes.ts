import { Router } from 'express';
import { 
  getCars, 
  getCarById, 
  createCar, 
  updateCar, 
  deleteCar 
} from '../controllers/cars.controller';

const router = Router();

// GET /api/cars?brand=Rolls-Royce&min_price=100000
router.get('/', getCars);

// GET /api/cars/:id
router.get('/:id', getCarById);

// POST /api/cars (Protected in real app)
router.post('/', createCar);

// PUT /api/cars/:id (Protected in real app)
router.put('/:id', updateCar);

// DELETE /api/cars/:id (Protected in real app)
router.delete('/:id', deleteCar);

export default router;
