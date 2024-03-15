import { faker } from "@faker-js/faker";
import { Model, ModelList } from "./model.js";

class User extends Model {
  constructor() {
    super();

    this.name = `${faker.person.firstName()} ${faker.person.lastName()}`;
    this.bio = faker.person.bio;
  }

  serialize() {
    const { name, bio } = this;
    const data = {
      name,
      bio,
    };

    for (const field of this.additionalFields) {
      data[field] = this[field];
    }

    return data;
  }
}

export class UserList extends ModelList {
  constructor(count) {
    super(count);
    this.init();
  }

  get elements() {
    return this.users;
  }

  init() {
    this.users = this.ids.map((id) => {
      const user = new User();
      user.addField("id", id);

      return user;
    });
  }
}
