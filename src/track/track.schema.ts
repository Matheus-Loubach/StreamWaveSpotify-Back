import { Schema } from "mongoose";
import { DefaultSchemaOptions } from "../repositories/mongoose/default.schema";

const mongoose = require('mongoose');


const MusicSchema = new Schema<any>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    require: true
  },
  link: {
    type: String,
    required: true
  },
  id: {
    type: String,
    require: true
  },
  artist: {
    type: String,
    require: true
  },
  albumCover: {
    type: String,
    require: true
  },
  album: {
    type: String,
    require: true
  },
}, DefaultSchemaOptions);

const favoriteMusic = mongoose.model("favoriteMusic", MusicSchema);
const recentMusic = mongoose.model("recentMusic", MusicSchema);

export default {
  favoriteMusic,
  recentMusic
}
