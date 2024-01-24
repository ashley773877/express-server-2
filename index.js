const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const myMiddlewares = require('./mymiddlewears/middlewear');
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');

const app = express();
const PORT = 3000;




// App Engine
app.engine('perscholas', (filePath, options, callback) => {
    // read the template file
    fs.readFile(filePath, (err, content) => {
        // if there is an error reading the file return!
        if (err) return callback(err);

        const rendered = content
            .toString()
            .replaceAll('#title#', `${options.title}`)
            .replaceAll('#content#', `${options.content}`)

        return callback(null, rendered);
    })
});

// Config
app.set('views', './views'); // sets the views for the app
app.set('view engine', 'perscholas'); // sets the template engine for the app


// middleware 
app.use(myMiddlewares);
app.use((req, res, next) => {
    console.log('Im a middleware!');
    next();
});

app.use(morgan('dev'));
app.use(express.static('./styles')); // setting this file so app has access to it
app.use(express.static('./assets'));




// Routes
app.use('/user', userRouter);
app.use('/product', productRouter);



app.get('/', (req, res) => {
    res.render('index', {title: "Hello Engine!", content: "I am an engine!"});
});

app.get('/current-user', (req, res) => {
    // fetch data from db
    // verify that the user exist
    // verify password
    // send json dat back to client
    res.json({username: 'Abe', role: 'dev', id: 123})
});


app.get('/login', (req, res) => {
    res.send('<h1>Login Page</h1>')
});

app.get('/download', (req, res) => {
    res.download('./assets/photo-15.png');
});

/** 
 * Catch all route for redirect
 */
app.all('*', (req, res) => {
    res.redirect('/login');
});



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}); 