import mongoose, { Schema } from 'mongoose-fill';
import validate from 'mongoose-validator';
import validator from 'validator';
import findOneOrCreate from './plugins/find-one-or-create';
import * as utils from '../components/utils';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: validate({
      validator: 'isLength',
      arguments: [2, 15],
    }),
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        if (this.isModified('password')) {
          return validator.isLength(v, { min: 2, max: 15 });
        }
        return true;
      },
      message: 'should between 2 and 15',
    },
  },
  sex: {
    type: String,
    enum: ['M', 'F'],
  },
  address: {
    type: String,
    validate: validate({ validator: 'isLength', arguments: [0, 128] }),
  },
  email: {
    type: String,
    validate: validate({ validator: 'isEmail', passIfEmpty: true }),
  },
  salt: String,
}, {
  timestamps: true,
  versionKey: false,
});

/**
 * Plugins
 */
UserSchema.plugin(findOneOrCreate);

/**
 * Virtuals
 */
UserSchema
  .virtual('profile')
  .get(function () {
    return {
      _id: this.id,
      username: this.username,
      sex: this.sex,
      email: this.email,
      address: this.address,
    };
  });

UserSchema
  .virtual('info')
  .get(function () {
    return {
      _id: this.id,
      username: this.username,
    };
  });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    const user = this;

    // handle new/update passwords
    if (!user.isModified('password')) {
      return next();
    }

    return utils.makeSalt()
      .then(salt => {
        user.salt = salt;
        return utils.encryptPassword(user.password, user.salt);
      })
      .then(hashedPassword => {
        user.password = hashedPassword;
        return next();
      })
      .catch(error => {
        next(error);
      });
  });

/**
 * Methods
 */
UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   * @param password
   * @param callback
   */
  authenticate(password) {
    const user = this;
    return utils.encryptPassword(password, user.salt)
      .then(encodedPassword => user.password === encodedPassword);
  },

};

export default mongoose.model('User', UserSchema);
