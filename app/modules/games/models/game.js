import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import uniqueValidator from 'mongoose-unique-validator';
// import Player from '../../player/models';

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
  timer : {
    type: Number,
    required: 'Timer is required',
    default: 60
  },
  hidden : {
    type: Boolean,
    default: false
  },
  players : [{ type: Schema.Types.ObjectId, ref: 'player' }]
}, {
  timestamps: true,
});

GameSchema.pre('save', function(next) {
  if ( ! this.hash) {
    this.hash = uuid();
  }
  next();
});

GameSchema.statics.createFields = ['hash', 'name', 'players'];

export default mongoose.model('game', GameSchema);
