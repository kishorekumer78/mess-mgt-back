import { model, models, Schema } from "mongoose";
import { Rank } from "@/utilities/enums";
const rankKeys = Object.keys(Rank);
const offrSchema = new Schema({
	rank: {
		type: String,
		enum: rankKeys,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	bd: {
		type: Number,
		required: true,
		unique: true
	},
	unit: {
		type: String
	},
	email: { type: String, required: true, unique: true },
	mobile: { type: String },
	outStation: { type: Boolean, default: false },
	messIn: { type: Boolean, default: false }
	// foodOnChit:{type:Boolean},
	// dateIn: { type: Date },
	// dateOut: { type: Date }
});

const Offr = models.Offr || model("Offr", offrSchema);
export default Offr;
