import { Owner } from './owner.entity';

export class OwnerHateoas {
  element: Owner;
  links: {
    self: string;
  };
}

export class OwnersListHateoas {
  list: OwnerHateoas[];
  links: {
    self: string;
  };
}
