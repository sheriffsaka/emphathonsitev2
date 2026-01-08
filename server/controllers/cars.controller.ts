import { Request, Response } from 'express';
import { CarService } from '../services/cars.service';

const carService = new CarService();

export const getCars = async (req: Request, res: Response) => {
  try {
    const { 
      brand, 
      min_price, 
      max_price, 
      buyer_type, 
      status, 
      preorder, 
      condition 
    } = req.query;

    const filters = {
      brand: brand as string,
      minPrice: min_price ? Number(min_price) : undefined,
      maxPrice: max_price ? Number(max_price) : undefined,
      buyerType: buyer_type as string,
      status: status as string,
      isPreOrderEligible: preorder === 'true',
      condition: condition as string
    };

    const data = await carService.getFilteredCars(filters);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await carService.getById(id);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const data = await carService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await carService.update(id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await carService.delete(id);
    res.status(200).json({ success: true, message: 'Car deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
