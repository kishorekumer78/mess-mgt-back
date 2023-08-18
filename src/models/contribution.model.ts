import { Schema, models, model } from 'mongoose';

const contributionSchema = new Schema({
	type: { type: String, required: true },
	amount: { type: Number, required: true }
});

const Contribution = models.Contribution || model('Contribution', contributionSchema);

export default Contribution;
