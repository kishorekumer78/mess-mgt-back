import { Schema, models, model } from "mongoose";

const dailyMessingSchema = new Schema({
  date: { type: Date, required: true },
  breakfast: { type: Number, default: 0 },
  lunch: { type: Number, default: 0 },
  dinner: { type: Number, default: 0 },
  offr: { type: Schema.Types.ObjectId, ref: "Offr" },
});
const DailyMessing =
  models.Messing || model("DailyMessing", dailyMessingSchema);
export default DailyMessing;
