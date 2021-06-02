import { State, Store } from "./types/store";

declare module "vue/types/vue" {
  interface Vue {
    $typedStore: Store;
  }
}