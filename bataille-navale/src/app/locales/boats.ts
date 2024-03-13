import { Boat } from "../models/boat";
export enum BoatType {
  PorteAvion,
  Croiseur,
  SousMarin_1,
  SousMarin_2,
  Torpilleur,
}

export const PorteAvion = { type: BoatType.PorteAvion, size: 5 } as Boat;

export const Croiseur = { type: BoatType.Croiseur, size: 4 } as Boat;

export const SousMarin_1 = { type: BoatType.SousMarin_1, size: 3 } as Boat;

export const SousMarin_2 = { type: BoatType.SousMarin_2, size: 3 } as Boat;

export const Torpilleur = { type: BoatType.Torpilleur, size: 2 } as Boat;
