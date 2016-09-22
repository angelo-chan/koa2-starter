import mongoose, { Schema } from 'mongoose';

const MigrationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Migration', MigrationSchema);
