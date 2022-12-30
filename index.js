require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const booksRouter = require('./routes/books_router')
const categoryRouter = require('./routes/category_router')
const userRouter = require('./routes/user_router')
const profileRouter = require('./routes/profile_router')

const auth = require('./middleware/auth') 
const app = express()

// connect to mongoDB
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/webAPIdb')
    .then(() => {
        console.log('conn ected to MOngoDB Database')
    }).catch((err) => console.log(err))

//1. application level middleware
app.use((req, res, next) => {
    console.log(`${req.path} ${req.path}`)
    next()
})

//2. in-buit middleware
app.use(express.json())

//3. router level middleware
app.use('/users', userRouter)
app.use(auth.verifyUser)
app.use('/profile', profileRouter)
app.use('/books', booksRouter)
app.use('/categories', categoryRouter)

//4. error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    if ( res.statusCode == 200 ) res.status(500)
    res.json({'err' : err.message})
})

app.listen(3000, () => {
    console.log(`App is running on port 3000.`)
})

// app.get('/', (req, res) => {
//     res.send('loki good boy')
// })

// app.post('/books', (req, res) => {
//     res.send('book created!')
// })

