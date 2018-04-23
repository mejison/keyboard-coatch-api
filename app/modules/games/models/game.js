import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const GameSchema = new Schema({
  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },
  name: {
    type: String,
    required: 'Name is required',
  },
}, {
  timestamps: true,
});

GameSchema.pre('save', function(next) {
  if ( ! this.hash) {
    this.hash = uuid();
  }

  next();
});

GameSchema.statics.createFields = ['hash', 'name'];

export default mongoose.model('game', GameSchema);
