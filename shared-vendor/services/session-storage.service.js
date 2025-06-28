import { Storage } from "@packages/shared-vendor/helpers";
import { sessionStorage as sessionStorageRepository } from "@packages/shared-vendor/repositories";

export default new Storage(sessionStorageRepository);
