import { v4 } from 'uuid';

export class Dog {
  id: string;
  name: string;
  breed: string;
  age: number;

  constructor() {
    this.id = v4();
  }
}
