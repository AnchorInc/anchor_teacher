// action types used in the app
export const actionTypes = {
  AUTH: {
    LOGIN: {
      GOOGLE: 'types.AUTH.LOGIN.GOOGLE',
      FB: 'types.AUTH.LOGIN.FB',
      SUCESS: 'types.AUTH.LOGIN.SUCCESS',
      FAIL: 'types.AUTH.LOGIN.FAIL',
      RESET: 'types.AUTH.LOGIN.RESET',
    },
    LOGOUT: {
      REQUEST: 'types.AUTH.LOGOUT',
      SUCCESS: 'types.AUTH.LOGOUT.SUCCESS',
      FAIL: 'types.AUTH.LOGOUT.FAIL',
    },
    SHOW_SPINNER: 'types.LOGIN.SHOW_SPINNER',
  },
  ERROR: {
    SHOW: 'types.ERROR.SHOW',
    CLOSE: 'types.ERROR.CLOSE',
  },
  BADGE: {
    SHOW: 'types.BADGE.SHOW',
    HIDE: 'types.BADGE.HIDE',
  },
  USER: {
    SYNC: 'types.USER.SYNC',
    LISTEN: 'types.USER.LISTEN',
    UPDATE: 'types.USER.UPDATE',
    GET: 'types.USER.GET',
  },
  CHAT: {
    SYNC: 'types.CHAT.SYNC',
    GET: 'types.CHAT.GET',
    UPDATE: 'types.CHAT.UPDATE',
    CREATE: 'types.CHAT.CREATE',
    DELETE: 'types.CHAT.DELETE',
  },
  MESSAGE: {
    GET: 'types.MESSAGE.GET',
    UPDATE: 'types.MESSAGE.UPDATE',
    SYNC: 'types.MESSAGE.SYNC',
  },
};

// algoliasearch config data
export const algoliaConfig = {
  adminID: 'HZZZN58AJ0',
  apiKey: 'fd2e8b88f354f7b81eced75ff5991de5',
};

// google signin configdata
export const gsigninConfig = {
  webClientId: '489771714033-ej9vlft4gfm6enq8fsosh135vac9vnu7.apps.googleusercontent.com',
  iosClientId: '489771714033-uskl634f838u27m0a01vsq7ea2uv6r9b.apps.googleusercontent.com',
};

// sign in methods
export const signinMethods = {
  GOOGLE: 'google',
  FB: 'fb',
};
