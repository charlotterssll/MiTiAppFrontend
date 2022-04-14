import { FirstName } from '../valuobjects/FirstName';
import { LastName } from '../valuobjects/LastName';
import { Locality } from '../valuobjects/Locality';
import { Location } from '../valuobjects/Location';

export interface MiTiNotNested {
  locality: Locality;
  location: Location;
  firstName: FirstName;
  lastName: LastName;
  time: string;
}
