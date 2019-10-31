import ls from 'local-storage';

class Auth {
  constructor() {
    if (ls.get('isAuthenticated') === null)
      ls.set('isAuthenticated', false);
  }

  login(urlPush) {
    ls.set('isAuthenticated', true)
    urlPush();
  }

  logout(urlPush) {
    ls.set('isAuthenticated', false)
    urlPush();
  }
}

export default new Auth();
