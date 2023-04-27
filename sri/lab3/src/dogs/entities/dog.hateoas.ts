import { Dog } from './dog.entity';

export class DogHateoas {
  element: Dog;
  links: {
    self: string;
  };
}

export class DogsListHateoas {
  list: DogHateoas[];
  links: {
    self: string;
  };
}
