const app = require('./app');
const port = process.env.PORT || 5000;
const db = require('./db/db');
const config = require('./config/keys');

db.connect(config.mongoURI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server has been started on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

