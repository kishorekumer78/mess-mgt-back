import { model, models, Schema } from 'mongoose';

const billSchema = new Schema({
    offr: {
        type: Schema.Types.ObjectId,
        ref: 'Offr'
    },
    bd: { type: Number },
    bf: { type: Number, default: 0 }, // less paid in last month
    cf: { type: Number, default: 0 }, // extra paid in last month
    duration: {
        start: { type: Date },
        end: { type: Date }
    },
    messing: { type: Number, default: 0 },
    extraMessing: { type: Number, default: 0 },
    batmanCharge: { type: Number, default: 0 },
    contributions: { type: Number, default: 0 },
    accommodation: { type: Number, default: 0 },
    miscBills: [{ type: String, amount: Number }],
    total: { type: Number },
    payment: { type: Number, default: false },
    emailSent: { type: Boolean, default: false },
    status: { type: String }
});

const Bill = models.Bill || model('Bill', billSchema);

export default Bill;
