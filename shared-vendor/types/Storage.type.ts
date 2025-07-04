import * as z from "zod/v4";

import type { storageOptionsSchema } from "@shared-vendor/schemas";

export type StorageOptions = z.infer<typeof storageOptionsSchema>;
