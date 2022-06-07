import mongoose from 'mongoose';

/* SCHEMAS */
// TODO: Validation

const projectSchema = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    date: Date,
    image: String,
    imageName: String,
    dateCompleted: Date,
    gallery: String,
});

const gallerySchema = new mongoose.Schema({
    title: String,
    date: Date,
    images: [String],
});

export const Gallery =
    mongoose.models?.Gallery || mongoose.model('Gallery', gallerySchema);

export const Project =
    mongoose.models?.Project || mongoose.model('Project', projectSchema);

/* EXPORTS */

export const connectDB = async () => {
    const connection_string = process.env.DB_CONNECTION;

    await mongoose.connect(connection_string);
};
