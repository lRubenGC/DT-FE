import { USER_PROPERTY } from '@shared/models/filters.models';

export class BasicCarResponse {
  cars: BasicCarsGrouped = {};
  filters: BasicCarPayload | null = null;
  carsShowed: number = 0;
  carsOwned: number = 0;
}

export type BasicCarsGrouped = { [key: string]: BasicCarDTO[] };

export interface BasicCarPayload {
  year: number;
  mainSerie?: string | null;
  exclusiveSerie?: string | null;
  userProperty?: USER_PROPERTY | null;
}

export interface BasicCarDTO {
  id: number;
  car_id: string;
  col: number;
  model_name: string;
  version: string;
  series: string[];
  exclusive_serie: string | null;
  col_serie: string;
  year: number;
  brand: string;
  img: string;
  hasCar: number | null;
  wantsCar: number | null;
}
