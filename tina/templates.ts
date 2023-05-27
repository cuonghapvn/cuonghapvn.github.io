import type { TinaField } from "tinacms";
export function blog_with_no_imageFields() {
  return [
    {
      type: "string",
      name: "layout",
      label: "layout",
    },
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "string",
      name: "subtitle",
      label: "subtitle",
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
    },
    {
      type: "string",
      name: "comments",
      label: "comments",
    },
    {
      type: "string",
      name: "published",
      label: "published",
    },
  ] as TinaField[];
}
export function blogFields() {
  return [
    {
      type: "string",
      name: "layout",
      label: "layout",
    },
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "string",
      name: "subtitle",
      label: "subtitle",
    },
    {
      type: "image",
      name: "cover_img",
      nameOverride: "cover-img",
      label: "cover-img",
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
    },
    {
      type: "string",
      name: "comments",
      label: "comments",
    },
    {
      type: "string",
      name: "published",
      label: "published",
    },
  ] as TinaField[];
}
