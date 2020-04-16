import { Schema, model } from 'mongoose';

const schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default() {
      return this.id + ' role';
    },
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
});

const Role = model('Role', schema);

export default Role;
