import express from 'express'
import colors from 'colors'



const PORT = 8080


// rest object
const app = express()


// demo path 
app.get('/', (req, res) => {
    res.send('<h1>krantikuamr</h1>')
})


app.listen(PORT, () => {
    console.log(`server is ruuning on port ${PORT}...`.bgWhite.black)
})