import ls from 'local-storage';

/**
 * on login moves to respective page
 * @param {*} urlPush 
 */
export function login(urlPush) {
  ls.set('isAuthenticated', true)
  urlPush();
}

/**
 * on logout moves to landing page
 * @param {*} urlPush 
 */
export function logout(urlPush) {
  ls.set('isAuthenticated', false)
  urlPush();
}

