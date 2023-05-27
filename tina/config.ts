import { defineConfig } from "tinacms";
import { blog_with_no_imageFields } from "./templates";
import { blogFields } from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "a08be39a-210f-4c55-b8bb-3c0da522b57b", // Get this from tina.io
  token: "423c25368a45e2958c159705e42a3e9b69d374ec", // Get this from tina.io
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [],
  },
});
