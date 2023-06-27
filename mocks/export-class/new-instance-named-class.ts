import { alias, MockRequest, MockResponse, MockBase } from '@flatjs/mock';
import { getStr } from '@/utils';

// without @mockable()
class MockExportClassService extends MockBase {
  @alias('/new-instance-export-named-class')
  getCatalogs(_req: MockRequest, res: MockResponse): void {
    res.json(
      this.$mock({
        code: '0000',
        message: getStr(
          'export default new MockExportClassService(); without @mockable()'
        ),
        data: ['https://www.flatjs.com/blog/img/flatjs_avatar.png'],
      })
    );
  }
}

export default new MockExportClassService();
