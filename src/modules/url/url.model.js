const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const urlSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    originalUrl: {
      type: String,
      trim: true,
      required: true,
    },
    shortCode: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

urlSchema.index({ user: 1 });
urlSchema.index({ shortCode: 1 }, { unique: true }); // TODO: Check Index support

module.exports = mongoose.model('URL', urlSchema);
