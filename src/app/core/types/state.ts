import { PeriodicElement } from './periodic-element';

export type State = {
  elementsData: PeriodicElement[];
  loading: boolean;
  filter: string;
};
