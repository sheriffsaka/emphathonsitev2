import { supabase } from '../config/supabaseClient';
import { BaseService } from './base.service';

interface CarFilterParams {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  buyerType?: string;
  status?: string;
  isPreOrderEligible?: boolean;
  condition?: string;
}

export class CarService extends BaseService {
  constructor() {
    super('cars');
  }

  /**
   * Overrides getAll to support advanced filtering
   */
  async getFilteredCars(filters: CarFilterParams) {
    let query = supabase
      .from(this.tableName)
      .select('*');

    // 1. Brand Filter
    if (filters.brand) {
      query = query.eq('brand', filters.brand);
    }

    // 2. Price Range
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    // 3. Buyer Type (Array containment)
    if (filters.buyerType) {
      // syntax: buyer_type contains ['Corporate']
      query = query.contains('buyer_type', [filters.buyerType]);
    }

    // 4. Availability Status
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    // 5. Pre-Order Eligibility
    if (filters.isPreOrderEligible) {
      // Assuming eligibility means status is Pre-Order OR user specifically wants to see them
      query = query.eq('status', 'Pre-Order');
    }

    // 6. Condition
    if (filters.condition) {
      query = query.eq('condition', filters.condition);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
