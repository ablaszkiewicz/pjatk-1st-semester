import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';
import { DogsModule } from 'src/dogs/dogs.module';
import { DogsService } from 'src/dogs/dogs.service';
import { OwnerHateoas } from './entities/owner.hateoas';
import { OwnersListHateoas } from './entities/owner.hateoas';

@Injectable()
export class OwnersService {
  private owners: Owner[] = [];

  constructor(private readonly dogsService: DogsService) {
    this.initialize();
  }

  create(dto: CreateOwnerDto) {
    const owner = new Owner();
    owner.email = dto.email;

    this.owners.push(owner);

    return this.hateoasOwner(owner);
  }

  findAll(): OwnersListHateoas {
    return {
      list: this.owners.map((owner) => this.hateoasOwner(owner)),
      links: { self: '/owners' },
    };
  }

  findOne(id: string): OwnerHateoas {
    return this.hateoasOwner(this.owners.find((owner) => owner.id == id));
  }

  update(id: string, dto: UpdateOwnerDto): OwnerHateoas {
    const owner = this.owners.find((owner) => owner.id == id);

    if (dto.email) {
      owner.email = dto.email;
    }

    return this.hateoasOwner(owner);
  }

  remove(id: string): OwnerHateoas {
    const owner = this.owners.find((owner) => owner.id == id);
    const index = this.owners.indexOf(owner);
    this.owners.splice(index, 1);

    return this.hateoasOwner(owner);
  }

  hateoasOwner(owner: Owner): OwnerHateoas {
    const { dogs, ...ownerProps } = owner;
    console.log(this.dogsService);
    const dogsHateoased = dogs.map((dog) => this.dogsService.hateoasDog(dog));

    return {
      element: {
        ...ownerProps,
        dogs: {
          list: dogsHateoased,
          links: { self: `/owners/${owner.id}/dogs` },
        } as any,
      },
      links: { self: `/owners/${owner.id}` },
    };
  }

  async initialize() {
    const dog = this.dogsService.findAll().list[0].element;

    const owner = new Owner();
    owner.email = 'owner1@gmail.com';

    owner.dogs.push(dog);
    dog.owner = owner;
    console.log(dog);

    this.owners.push(owner);
  }

  bindDog(ownerId: string, dogId: string) {
    const owner = this.owners.find((owner) => owner.id == ownerId);
    const dog = this.dogsService.findOne(dogId).element;

    owner.dogs.push(dog);

    return this.hateoasOwner(owner);
  }

  unbindDog(ownerId: string, dogId: string) {
    const owner = this.owners.find((owner) => owner.id == ownerId);
    const dog = this.dogsService.findOne(dogId).element;

    const index = owner.dogs.indexOf(dog);
    owner.dogs.splice(index, 1);

    return this.hateoasOwner(owner);
  }

  getDogs(ownerId: string) {
    const owner = this.owners.find((owner) => owner.id == ownerId);
    const dogs = owner.dogs;

    return {
      list: dogs.map((dog) => this.dogsService.hateoasDog(dog)),
      links: { self: `/dogs/${ownerId}` },
    };
  }

  async waitForSeconds(seconds: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, seconds * 1000);
    });
  }
}
