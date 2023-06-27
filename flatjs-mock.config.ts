/* eslint-disable @typescript-eslint/naming-convention */
import { defineConfig } from '@flatjs/mock';

export default defineConfig({
  projectCwd: process.cwd(),
  hostname: 'dev.flatjs.com',
  mockBaseDir: `./mocks`,
  port: 40000,
  chunkSize: 50,
  staticMap: {
    '/static': 'static',
  },
  mockMap: {
    /**
     * export-class, named class, default class.
     * 1. `/api/export-class/export-default-class`
     * 2. `/api/export-class/export-named-class`
     * 3. `/api/export-class/new-instance-export-named-class`
     */
    '/export-class': { type: 'REST', defs: ['export-class'], middlewares: {} },
    /**
     * export function,
     * 1. `/api/export-function/exportAction`
     * 2. `/api/export-function/getExportDefaultFn1`
     * 3. `/api/export-function/getExportDefaultFn2`
     */
    '/export-function': {
      type: 'REST',
      defs: ['export-function'],
      middlewares: {},
    },
    /**
     * module-exports
     * 1. `/api/module-exports/moduleExports`
     * 2. `/api/module-exports/exportsFunction`
     */
    '/module-exports': {
      type: 'REST',
      defs: ['module-exports'],
      middlewares: {},
    },
    /**
     * others
     */
    '/*': { type: 'REST', defs: ['others'], middlewares: {} },
  },
});
