import { faker } from "@faker-js/faker";
import { Model, ModelList } from "./model.js";
import { titleCase } from "../utils.js";

class Post extends Model {
  constructor() {
    super();

    this.title = titleCase(faker.lorem.words({ min: 3, max: 6 }));
    this.body = faker.lorem.paragraphs(3);
    this.createdAt = faker.date.past();
    this.slug = this.title
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
  }

  serialize() {
    const { title, body, createdAt, slug } = this;
    const data = {
      title,
      body,
      createdAt,
      slug,
    };

    for (const field of this.additionalFields) {
      data[field] = this[field];
    }

    return data;
  }
}

export class PostList extends ModelList {
  constructor(count) {
    super(count);
    this.init();
  }

  get elements() {
    return this.posts;
  }

  init() {
    this.posts = this.ids.map((id) => {
      const post = new Post();
      post.addField("id", id);

      return post;
    });
  }
}
