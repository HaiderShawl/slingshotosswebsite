const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
var cookieParser = require('cookie-parser');



//getting routers
const bountyRouter = require('./routers/challenge')
const userRouter = require('./routers/user')



//starting database
require('./db/mongoose')




//starting app
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

//using routers
app.use(bountyRouter)
app.use(userRouter)


// serve static assests if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
