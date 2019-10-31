import ls from 'local-storage';
import { Component } from 'react';


class Auth extends Component {
  constructor(props) {
    super(props)
    if (ls.get('isAuthenticated') === null)
      ls.set('isAuthenticated', false);
    this.authenticated = false;
  }

  login(someFunction) {
    this.authenticated = true;
    ls.set('isAuthenticated', true)
    console.log(ls.get('isAuthenticated'))
    someFunction();
  }

  logout(someFunction) {
    this.authenticated = false;
    ls.set('isAuthenticated', false)

    console.log(ls.get('isAuthenticated'))

    someFunction();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
