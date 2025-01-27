import { BasicCarDTO } from '@modules/basic-cars/models/basic-cars.models';
import { PremiumCarDTO } from '@modules/premium-cars/models/premium-cars.models';
import { SpecialCarDTO } from '@modules/special-cars/models/special-cars.models';
import {
  CAR_TYPE,
  ORDER_TYPE,
  USER_PROPERTY,
} from '@shared/models/filters.models';

export interface SearchCarsPayload {
  query?: string;
  carType?: CAR_TYPE | null;
  userProperty?: USER_PROPERTY | null;
  order?: ORDER_TYPE | null;
}

export class SearchCarsResponse {
  basicCars?: BasicCarDTO[] = [];
  premiumCars?: PremiumCarDTO[] = [];
  specialCars?: SpecialCarDTO[] = [];
  filters: SearchCarsPayload = {};
  basicCarsShowed: number = 0;
  basicCarsOwned: number = 0;
  premiumCarsShowed: number = 0;
  premiumCarsOwned: number = 0;
  specialCarsShowed: number = 0;
  specialCarsOwned: number = 0;
}

export type SEARCH_TYPE = 'cars' | 'users';
