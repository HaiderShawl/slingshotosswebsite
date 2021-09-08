const mongoose = require('mongoose')

const uri = 'mongodb+srv://haider:4743@cluster0.2l1ik.mongodb.net/data?retryWrites=true&w=majority'


mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database.')
});
