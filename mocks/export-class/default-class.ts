import {
  mockable,
  type MockRequest,
  type MockResponse,
  MockBase,
  alias,
} from '@flatjs/mock';
import { getStr } from '@/utils';

@mockable()
export default class MockExportClassService extends MockBase {
  @alias('/export-default-class')
  getCatalogs(_req: MockRequest, res: MockResponse): void {
    this.$cache.set('export-default-class', 'default-class');
    res.json(
      this.$mock({
        code: '0000',
        message: getStr('export default @mockable () class'),
        data: ['https://www.flatjs.com/blog/img/flatjs_avatar.png'],
      })
    );
  }
}
