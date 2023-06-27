import { type MockResponse, type MockRequest } from '@flatjs/mock';

export default {
  // without `/` prefix
  getExportDefaultFn1(_req: MockRequest, res: MockResponse): void {
    res.json({
      code: '0000',
      message: 'export default {...}',
      data: ['export default { getExportDefaultFn1:()=>{} }'],
    });
  },
  // with `/` prefix
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '/getExportDefaultFn2': (_req: MockRequest, res: MockResponse) => {
    res.json({
      code: '0000',
      message: 'export default {...}',
      data: ['export default { getExportDefaultFn2:()=>{} }'],
    });
  },
};
