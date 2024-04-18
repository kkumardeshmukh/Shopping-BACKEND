import express from 'express'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/authRouter.js'

const PORT = 8080

connectDB()


// rest object
const app = express()

app.use(express.json());
app.use(cors())


//routing for user 
app.use('/api/v1/user', authRouter)

// demo path 
app.get('/', (req, res) => {
    res.send('<h1>krantikuamr</h1>')
})


app.listen(PORT, () => {
    console.log(`server is ruuning on port ${PORT}...`.bgBlue.black)
})