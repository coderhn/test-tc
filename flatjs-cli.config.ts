import { defineConfig } from '@flatjs/cli';

export default defineConfig({
  projectCwd: process.cwd(),
  publish: {
    serviceMap: {
      leon: {
        uploadApi: 'http://leonidapi.17usoft.com/v1/leonid/static/object',
        userToken: '7af259864d027050380bc65a0ec4ea39',
        pId: '584654bffe8161000130132f',
        bucketName: 'jinfu',
        cdnBaseUrl: 'https://file.40017.cn/jinfu',
        overrideExistFile: false,
      },
      ftp: {
        host: '10.100.156.26',
        port: 21,
        user: 'webapps',
        password: 'webapps',
      },
    },
  },
});
