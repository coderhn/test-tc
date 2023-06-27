export const getGlobalData = async (hostUrl) => {
  return {
    user: {
      id: '1',
      firstName: 'Tian',
      lastName: 'Yingchun',
      emailAddress: 'test@domain.com',
      user: {
        id: '1',
        identifier: 'admin',
        permissions: [],
      },
    },
    menus: [],
    appName: 'semic-admin',
    elemAclLimits: [],
    defaultPage: `${hostUrl}/pages/main/setting/users?env=me`,
    routeBaseName: '/pages',
  };
};
