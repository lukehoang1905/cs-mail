const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema(
  {
    from: { type: Schema.ObjectId, required: true, ref: "User" },
    to: { type: Schema.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["seen", "unseen"] },
    bookmark: { type: Boolean, required: true, default: false },
    box: { type: Boolean, required: true, default: false },
    star: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
