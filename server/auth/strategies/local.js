import { Strategy as LocalPassport } from 'passport-local';
import User from '../../models/user.model';

const USER_NOT_EXIST = 'user_not_exist';
const INCORRECT_PASSWORD = 'incorrect_password';

export default new LocalPassport({
  usernameField: 'username',
  passwordField: 'password',
}, async(username, password, done) => {
  try {
    if (!password || password.length === 0) {
      done(null, false, { message: INCORRECT_PASSWORD });
    } else {
      const user = await User.findOne({ username }).select('username password salt type').exec();
      if (!user) {
        done(null, false, { message: USER_NOT_EXIST });
      } else {
        user.authenticate(password)
          .then(authenticated => {
            if (authenticated) {
              done(null, user.info);
            } else {
              done(null, false, { message: INCORRECT_PASSWORD });
            }
          }).catch(error => {
          done(error);
        });
      }
    }
  } catch (error) {
    done(error);
  }
});
