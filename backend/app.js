const express = require('express');
const mongoose = require('mongoose');
const {MONGOURI} = require('./config/keys');

// Configure api
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// DB config
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("Connected to mongo", err);
});

// register user.js in app.js
require('./models/user.js');
// register post.js in app.js
require('./models/post.js');
// register auth.js in app.js
app.use(require('./routes/auth.js'));
// register post.js in app.js
app.use(require('./routes/post.js'));
// register user.js in app.js
app.use(require('./routes/user.js'));

// if(process.env.NODE_ENV=="production") {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*", (req,res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

if (process.env.NODE_ENV === "production") {
    const path = require('path')
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }


app.listen(PORT, () => {
    console.log("server is running on", PORT);
});