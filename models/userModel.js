const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password needs to be confirmed'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (input) {
        return input === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// PASSWORD ENCRYPTION
userSchema.pre('save', async function (next) {
  //ONLY RUN IF PASSWORD WAS MODIFIED
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); //12=cost parameter (How cpu-intensive is the encryption)

  this.passwordConfirm = undefined; //Don't need to store the confim after the validation

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //this - points to current document
  //password not selected => this.password is not available
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // ENCRYPT TOKEN AND SAVE TO DB
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //console.log({ resetToken }, this.passwordResetToken);

  // SET EXPIRATION TIME FOR TOKEN
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema);

module.exports = User;
