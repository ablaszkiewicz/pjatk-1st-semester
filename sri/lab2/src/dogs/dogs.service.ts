import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [];

  constructor() {
    this.initialize();
  }

  create(dto: CreateDogDto) {
    const dog = new Dog();
    dog.name = dto.name;
    dog.age = dto.age;
    dog.breed = dto.breed;

    this.dogs.push(dog);

    return dog;
  }

  findAll() {
    return this.dogs;
  }

  findOne(id: string) {
    return this.dogs.find((dog) => dog.id === id);
  }

  update(id: string, dto: UpdateDogDto) {
    console.log(dto);

    const dog = this.dogs.find((dog) => dog.id === id);

    if (dto.name) {
      dog.name = dto.name;
    }

    if (dto.age) {
      dog.age = dto.age;
    }

    if (dto.breed) {
      dog.breed = dto.breed;
    }

    console.log(dto);

    return dog;
  }

  remove(id: string) {
    const dog = this.dogs.find((dog) => dog.id === id);
    const index = this.dogs.indexOf(dog);
    this.dogs.splice(index, 1);

    return dog;
  }

  initialize() {
    const dog1 = new Dog();
    dog1.name = 'Rex';
    dog1.age = 5;
    dog1.breed = 'Labrador';

    const dog2 = new Dog();
    dog2.name = 'Max';
    dog2.age = 3;
    dog2.breed = 'Golden Retriever';

    const dog3 = new Dog();
    dog3.name = 'Buddy';
    dog3.age = 7;
    dog3.breed = 'German Shepherd';

    this.dogs.push(dog1, dog2, dog3);
  }
}
