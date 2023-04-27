import { Owner } from 'src/owners/entities/owner.entity';
import { v4 } from 'uuid';

export class Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  owner: Owner;

  constructor() {
    this.id = v4();
  }
}
