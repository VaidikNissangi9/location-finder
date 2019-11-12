import ls from 'local-storage';

/**
 * on login moves to respective page
 * @param {*} urlPush 
 */
export function login(urlPush) {
  ls.set('isAuthenticated', true)
  if (typeof urlPush === 'function')
    urlPush()
}

/**
 * on logout moves to landing page
 * @param {*} urlPush 
 */
export function logout(urlPush) {
  ls.set('isAuthenticated', false)
  if (typeof urlPush === 'function')
    urlPush();
}

