import { BoatType } from "../locales/boats";

export interface BoatDescription {
  type: BoatType;
  size: number;
  image: string;
}
