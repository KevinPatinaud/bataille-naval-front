
import { Croiseur, PorteAvion, SousMarin_1, SousMarin_2, Torpilleur } from "../../../locales/boats";
import Boat from "../../../models/boat";
import { BoatDto } from "../dto/boat.dto";


export default class BoatMapper {
  static gridBoatstoDtos(boats: Boat[]): BoatDto[] {
    return boats.map((b) => this.toDto(b));
  }

  static toDto(boat: Boat): BoatDto {
    return {
      xHead: boat.boatPosition?.xHead,
      yHead: boat.boatPosition?.yHead,
      isHorizontal: boat.boatPosition?.isHorizontal,
      type: boat.boatDescription.type,
    } as BoatDto;
  }

  static fromDtos(boats: BoatDto[]): Boat[] {
    return boats
      .sort((a, b) => a.type.localeCompare(b.type))
      .map((b) => this.fromDto(b));
  }

  static fromDto(boat: BoatDto): Boat {
    let boatDescription;

    if (boat.type === "PORTE_AVIONS") boatDescription = PorteAvion;
    if (boat.type === "TORPILLEUR") boatDescription = Torpilleur;
    if (boat.type === "CROISEUR") boatDescription = Croiseur;
    if (boat.type === "SOUS_MARIN_1") boatDescription = SousMarin_1;
    if (boat.type === "SOUS_MARIN_2") boatDescription = SousMarin_2;

    return {
      boatDescription: boatDescription,
      boatState: { isDestroyed: boat.isDestroyed },
    } as Boat;
  }
}
