import express from 'express';
const app = express();
import connection from './db/db.js';
import userRoute from './routes/user.route.js';
import noteRoute from './routes/note.route.js';
import dotenv from 'dotenv';  
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/users', userRoute);
app.use('/notes', noteRoute);

// app.use('/', (req, res) => {
//     res.send('Note App');
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

