//Get env variables
import dotenv from 'dotenv';
dotenv.config()

//Import Express
import express from 'express';
const app = express()


//Importing Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

//SwaggerOptions
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Web Dev Assignment'
        },
        servers: ["http://localhost:3000"],
        swagger: "2.0",
    },
    apis: ['./routes/photo/photo.js', './routes/user/user.js', './routes/venue/venue.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//Importing Mongoose
import mongoose from 'mongoose' //IMPORTING MONGOOSE MODULE

//Connecting to Mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true}) //CONNECTING TO MONGOOSE
const db = mongoose.connection 
db.on('error', (error)=> console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.get('/', (req,res) => res.send('hello world'))



//Configing JSON with Express
app.use(express.json())

//Importing Routers
import {userRouter} from './routes/user/user.js';
import {photoRouter} from './routes/photo/photo.js';
import {venueRouter} from './routes/venue/venue.js';
import {loginRouter} from'./routes/login/login.js';

//Routes
app.use('/users', userRouter);
app.use('/photos', photoRouter);
app.use('/venue', venueRouter);
app.use('/login', loginRouter);
app.use('/api-docs', swaggerUI.serve , swaggerUI.setup(swaggerDocs));

app.listen(3000, () => {
    console.log('My REST API is running on port 3000')
})
