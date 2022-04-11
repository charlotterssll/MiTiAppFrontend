import {FirstName} from "../valuobjects/FirstName";
import {LastName} from "../valuobjects/LastName";

export interface Employee {
  employeeid: number,
  firstName: FirstName,
  lastName: LastName,
}
