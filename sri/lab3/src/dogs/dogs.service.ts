import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { DogHateoas, DogsListHateoas } from './entities/dog.hateoas';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [];

  constructor() {
    this.initialize();
  }

  create(dto: CreateDogDto): DogHateoas {
    const dog = new Dog();
    dog.name = dto.name;
    dog.age = dto.age;
    dog.breed = dto.breed;

    this.dogs.push(dog);

    return { element: dog, links: { self: `/dogs/${dog.id}` } };
  }

  findAll(): DogsListHateoas {
    console.log(this.dogs);
    return { list: this.dogs.map(this.hateoasDog), links: { self: '/dogs' } };
  }

  findOne(id: string): DogHateoas {
    return this.hateoasDog(this.dogs.find((dog) => dog.id === id));
  }

  hateoasDog(dog: Dog): DogHateoas {
    const { owner, ...dogProps } = dog;

    return {
      element: {
        ...dogProps,
        ...(owner
          ? {
              owner: {
                element: { email: owner.email },
                links: {
                  self: `/owners/${owner.id}`,
                },
              },
            }
          : {}),
        links: { self: `/dogs/${dog.id}` },
      } as any,
      links: { self: `/dogs/${dog.id}` },
    };
  }

  update(id: string, dto: UpdateDogDto): DogHateoas {
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

    return this.hateoasDog(dog);
  }

  remove(id: string): DogHateoas {
    const dog = this.dogs.find((dog) => dog.id === id);
    const index = this.dogs.indexOf(dog);
    this.dogs.splice(index, 1);

    return this.hateoasDog(dog);
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
