/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as api_key from "../api_key.js";
import type * as changelog from "../changelog.js";
import type * as feedback from "../feedback.js";
import type * as http from "../http.js";
import type * as message from "../message.js";
import type * as project from "../project.js";
import type * as resources_file from "../resources/file.js";
import type * as resources_link from "../resources/link.js";
import type * as resources_storage from "../resources/storage.js";
import type * as team from "../team.js";
import type * as team_membership from "../team_membership.js";
import type * as types from "../types.js";
import type * as user from "../user.js";
import type * as work_item from "../work_item.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  api_key: typeof api_key;
  changelog: typeof changelog;
  feedback: typeof feedback;
  http: typeof http;
  message: typeof message;
  project: typeof project;
  "resources/file": typeof resources_file;
  "resources/link": typeof resources_link;
  "resources/storage": typeof resources_storage;
  team: typeof team;
  team_membership: typeof team_membership;
  types: typeof types;
  user: typeof user;
  work_item: typeof work_item;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
