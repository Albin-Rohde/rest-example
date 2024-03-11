import {
  FactorizedAttrs,
  Factory,
} from '@jorgebodega/typeorm-factory';
import { db } from '../data-source';
import { faker } from '@faker-js/faker';
import { Author } from '../modules/author/entity/Author';

export class AuthorFactory extends Factory<Author> {
  protected entity = Author
  protected dataSource = db

  protected attrs(): FactorizedAttrs<Author> {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    }
  }
}
