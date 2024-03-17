import { BoatDescription } from "./boatDescription";
import { BoatPosition } from "./boatPosition";
import { BoatState } from "./boatState";

export default interface Boat {
  boatDescription: BoatDescription;
  boatPosition?: BoatPosition;
  boatState?: BoatState;
}
