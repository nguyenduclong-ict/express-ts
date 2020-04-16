import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  facebook: {
    type: String,
    default: null,
  },
  info: {
    type: {
      name: String,
      age: Number,
      image: String,
      gender: {
        type: String,
        enum: ['male', 'female'],
      },
    },
    default: {
      name: '',
      age: 0,
      image: '',
      gender: '',
    },
  },
  roles: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  tokens: {
    type: [String],
    default: [],
  },
});

const User = model('User', schema);

export default User;
