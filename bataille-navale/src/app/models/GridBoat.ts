import { Boat } from "./boat";

export default interface GridBoat {
  xHead: number;
  yHead: number;
  boatModel: Boat;
  isHorizontal: boolean;
}
