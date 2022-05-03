import { Employee } from '../employee/Employee';
import { Place } from '../place/Place';
import { Value } from '../abstractsimplevalueobject/Value';

export interface MiTi {
  miTiId: number;
  place: Place;
  employee: Employee;
  time: Value;
}
