import { Locality } from "../valuobjects/Locality";
import { Location } from "../valuobjects/Location";

export interface Place {
  locality: Locality,
  location: Location,
}
