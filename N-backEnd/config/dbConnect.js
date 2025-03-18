import mongoose from 'mongoose';

async function mongoConnect() {
   try {
      await mongoose.connect(process.env.MONGO_URL)
      console.log('Connected to MongoDB');
   } catch (error) {
      console.error('Failed to connect to MongoDB', error);
   }
}

export default mongoConnect;