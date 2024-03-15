import { loadConfig } from "./config.js";
import { PostList } from "./models/posts.js";
import { UserList } from "./models/users.js";

async function main() {
  const {
    config: { data },
  } = await loadConfig();

  const posts = new PostList(data.posts.count);
  const users = new UserList(data.users.count);
  users.addOneToOneReference(posts, "userId");

  console.log(posts.serialize());
}

main();
