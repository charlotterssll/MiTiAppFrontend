import { Employee } from '../employee/Employee';
import { Place } from '../place/Place';

export interface MiTi {
  place: Place;
  employee: Employee;
  time: string;
}
