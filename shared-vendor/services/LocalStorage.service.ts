import { Storage } from "@packages/shared-vendor/helpers";
import { localStorage as localStorageRepository } from "@shared-vendor/repositories";

export default new Storage(localStorageRepository);
