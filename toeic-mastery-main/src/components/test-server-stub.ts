/**
 * Test-only: lets server components be rendered under `tsx --test` (outside
 * Next.js) by neutralising the `server-only` guard and giving the Prisma
 * client a placeholder URL (nothing connects — the render tests pass data in).
 * Import it FIRST in a test file.
 */
import { createRequire } from "node:module";

const req = createRequire(process.cwd() + "/package.json");
req.cache[req.resolve("server-only")] = { exports: {} } as NodeJS.Module;
process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:1/test";
