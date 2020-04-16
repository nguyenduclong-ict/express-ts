import Role from '@/data/mongo/models/Role';
import { Mongoose } from 'fests';
class RoleProvider extends Mongoose.Provider {}

export default new RoleProvider(Role);
