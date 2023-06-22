import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({
  thumbnail: String,
  description: String,
  price: Number,
  location: String,
  status: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  toJSON: {
    virtuals: true,
  },
});

// Atributo virtual, não aparece no banco mas sim no JSON
HouseSchema.virtual('thumbnail_url').get(function () {
  return `http:localhost:3333/files/${this.thumbnail}`;
});

export default model('House', HouseSchema);
