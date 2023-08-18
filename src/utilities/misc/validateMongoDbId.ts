import mongoose from 'mongoose';

export default function validateMongoDbId(id: any) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('This id is not valid or found');
}
