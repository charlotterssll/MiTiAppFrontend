import { Location } from "../valuobjects/Location";
import { Locality } from "../valuobjects/Locality";
import { FirstName } from "../valuobjects/FirstName";
import { LastName } from "../valuobjects/LastName";

export interface MiTiNotNested {
  locality: Locality,
  location: Location,
  firstName: FirstName,
  lastName: LastName,
  time: string;
}
