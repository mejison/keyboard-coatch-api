import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import https from 'https';
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
  timer : {
    type: Number,
    required: 'Timer is required',
    default: 60
  },
  hidden : {
    type: Boolean,
    default: false
  },
  text : {
    type: String,
    default: "some text"
  },
  players : [{ type: Schema.Types.ObjectId, ref: 'player' }]
}, {
  timestamps: true,
});

GameSchema.pre('save', function(next) {
  if ( ! this.hash) {
    this.hash = uuid();
  }

  let self = this;

  https.get('https://baconipsum.com/api/?type=meat-and-filler', (res) => {
      let data = "";

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        self.text = JSON.parse(data).join(' ');
        next();
      });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

GameSchema.statics.createFields = ['hash', 'name', 'players', 'text'];

export default mongoose.model('game', GameSchema);
