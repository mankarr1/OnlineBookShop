let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');


mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection success !')
},
    error => {
        console.log('Db error :' + error)
    })

const bookRoute = require('./node-backend/routes/book.routes')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/Bookstore')))
app.use('/api', bookRoute);
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log('Listening Port on:' + port);
})

// //404 handling
// app.use((req,res, next)=> {
//     next(createError(404));

// });

//base route
app.get('/',(req,res)=>{
    res.send('invalid endpoint..');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'invalid endpoint'));
});

app.use(function(err, req,res, next){
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);

});

