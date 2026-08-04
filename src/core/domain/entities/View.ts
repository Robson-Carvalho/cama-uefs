import { model, Schema } from "mongoose";

const viewSchema = new Schema({
  views: { type: Number, required: true },
});

const ViewModel = model("view", viewSchema);

export { ViewModel };
