const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'staff', 'donor', 'supporter'],
      default: 'donor',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'cmaof_jwt_secret_dev_mode',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = require('crypto').randomBytes(20).toString('hex');
  this.resetPasswordToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const memoryUsers = [];

// Seed default foundation admin for development
bcrypt.hash('admin123', 10).then(hashed => {
  memoryUsers.push({
    _id: 'admin_cmaof_root',
    name: 'CMAOF Administrator',
    email: 'admin@cmaof.org',
    password: hashed,
    role: 'admin',
    createdAt: new Date(),
    matchPassword: async (entered) => await bcrypt.compare(entered, hashed),
    getSignedJwtToken: () => jwt.sign(
      { id: 'admin_cmaof_root', role: 'admin' },
      process.env.JWT_SECRET || 'cmaof_jwt_secret_dev_mode',
      { expiresIn: '30d' }
    ),
  });
});

const UserModel = mongoose.model('User', userSchema);

UserModel.inMemory = {
  create: async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const record = {
      _id: 'user_' + Date.now(),
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role || 'donor',
      createdAt: new Date(),
    };
    record.matchPassword = async (enteredPassword) => {
      return await bcrypt.compare(enteredPassword, record.password);
    };
    record.getSignedJwtToken = () => {
      return jwt.sign(
        { id: record._id, role: record.role },
        process.env.JWT_SECRET || 'cmaof_jwt_secret_dev_mode',
        { expiresIn: '30d' }
      );
    };
    memoryUsers.push(record);
    return record;
  },
  findOne: async (query) => {
    return memoryUsers.find(u => u.email === query.email?.toLowerCase()) || null;
  },
  findById: async (id) => {
    return memoryUsers.find(u => u._id === id) || null;
  },
};

module.exports = UserModel;
