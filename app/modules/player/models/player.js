import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const PlayerSchema = new Schema({
  id: {
    type: String,
    unique: 'Hash mast be unique',
  },
  name: {
    type: String,
    required: 'Name is required',
  },
  car: {
    type: Number,
    required: 'Car is required',
    default : 1,
  }
}, {
  timestamps: true,
});

PlayerSchema.pre('save', function(next) {
  if ( ! this.hash) {
    this.id = uuid();
  }

  next();
});

PlayerSchema.statics.createFields = ['name'];

export default mongoose.model('player', PlayerSchema);
