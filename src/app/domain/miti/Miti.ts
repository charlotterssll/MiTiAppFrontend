import { Employee } from '../employee/Employee';
import { Place } from '../place/Place';
import { Value } from '../abstractsimplevalueobject/Value';

export interface Miti {
  mitiId: string;
  place: Place;
  employee: Employee;
  time: Value;
  date: Value;
}
