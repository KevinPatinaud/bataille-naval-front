import { BoatDescription } from "../models/boatDescription";
export enum BoatType {
  PorteAvion = "porte-avions",
  Croiseur = "croiseur",
  SousMarin_1 = "sous-marin-1",
  SousMarin_2 = "sous-marin-2",
  Torpilleur = "tropilleur",
}

export const PorteAvion = {
  type: BoatType.PorteAvion,
  size: 5,
  image: "assets/images/porte-avion.jpg",
} as BoatDescription;

export const Croiseur = {
  type: BoatType.Croiseur,
  size: 4,
  image: "assets/images/croiseur.jpg",
} as BoatDescription;

export const SousMarin_1 = {
  type: BoatType.SousMarin_1,
  size: 3,
  image: "assets/images/sous-marin.jpg",
} as BoatDescription;

export const SousMarin_2 = {
  type: BoatType.SousMarin_2,
  size: 3,
  image: "assets/images/sous-marin.jpg",
} as BoatDescription;

export const Torpilleur = {
  type: BoatType.Torpilleur,
  size: 2,
  image: "assets/images/torpilleur.jpg",
} as BoatDescription;
