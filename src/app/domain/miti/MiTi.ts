import { Employee } from '../employee/Employee';
import { Place } from '../place/Place';

export interface MiTi {
  miTiId: number;
  place: Place;
  employee: Employee;
  time: string;
}
