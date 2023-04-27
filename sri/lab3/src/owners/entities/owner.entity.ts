import { Dog } from 'src/dogs/entities/dog.entity';
import { v4 } from 'uuid';

export class Owner {
  id: string;
  email: string;
  dogs: Dog[];

  constructor() {
    this.id = v4();
    this.dogs = [];
  }
}
