import { USER_PROPERTY } from '@shared/models/filters.models';

export class BasicCarResponse {
  cars: BasicCarsGrouped = {};
  filters: BasicCarPayload = {};
  carsShowed: number = 0;
  carsOwned: number = 0;
}

export type BasicCarsGrouped = Record<string, BasicCarDTO[]>;

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

export interface BasicCarPayload {
  year?: number | null;
  mainSerie?: string | null;
  exclusiveSerie?: string | null;
  userProperty?: USER_PROPERTY | null;
}
