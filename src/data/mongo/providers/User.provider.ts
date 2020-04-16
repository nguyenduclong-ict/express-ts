import User from '@/data/mongo/models/User';
import { Mongoose } from 'fests';

class UserProvider extends Mongoose.Provider {
  createUser(doc) {
    return User.create(doc);
  }

  getAllUser() {
    return User.find().lean().exec();
  }
}

export default new UserProvider(User);
