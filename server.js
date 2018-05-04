/**
 * Created by TOY-2 on 19.09.2017.
 */
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');


var app = new (require('express'))();
var port = 3000;


let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cors = require('cors');


var compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get("/", function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});

/**
 * PG strings=========================================================================================================
 */


let pool = pg.Pool({
    user: 'postgres',
    database: 'postgres',
    host: 'localhost',
    port: 5433,
    max: 10
});

// pool.connect((err, db, done) => {
//     if (err) {
//         return console.log(err);
//     } else {
//         db.query('SELECT "regNum" FROM public.vehicles', (err, table) => {
//             if (err) {
//                 return console.log(err);
//             } else {
//                 console.log(table.rows);
//             }
//         })
//     }
// });


app.get('/api/vehiclelist', function(request, response) {
    pool.connect((err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            //db.query('SELECT * FROM public.vehicles', (err, table) => {
            db.query('SELECT "id", "regNum", "cczIn", "notification", ' +
                '"cis", "inspection", "custClearance", "cczOut"  FROM public.vehicles',
                (err, table) => {
                done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    return response.status(201).send(table.rows);
                }
            })
        }
    });
});

app.post('/api/addvehicle', function(request, response) {

    var id = request.body.id;
    var regNum = request.body.regNum;
    var cczIn = request.body.cczIn;
    let values = [id, regNum, cczIn];

    pool.connect((err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('INSERT INTO public.vehicles ("id", "regNum", "cczIn") VALUES ($1, $2, $3)', [...values], (err, table) => {
                    //done();
                    if (err) {
                        return response.status(400).send(err);
                    } else {
                        console.log('Data inserted');
                        return response.status(201).send({ message: 'Data inserted!' });
                    }
                });
        }

        console.log('data for add: ', values);
    });
});

app.post('/api/editvehicle/:id', function(request, response) {

    let id = request.params.id;

    let data = request.body;
    let col = Object.keys(data)[0];
    let val = data[col];

    let values = [val, id];

    pool.connect((err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('UPDATE public.vehicles SET "' + col + '" = $1 WHERE id = $2', [...values], (err, table) => {
                //done();
                if (err) {
                    console.log('error: ', err);
                    return response.status(400).send(err);
                } else {
                    console.log('Data inserted');
                    return response.status(201).send({ message: 'Data updated!' });
                }
            });
            console.log('edit data: ', values);
        }
    });
});


app.delete('/api/deletevehicle/:id', function(request, response) {

    var id = request.params.id;

    pool.connect((err, db, done) => {
        if (err) {
            return response.status(400).send(err);
        } else {
            db.query('DELETE FROM public.vehicles WHERE id = $1', [id], (err, table) => {
                //done();
                if (err) {
                    return response.status(400).send(err);
                } else {
                    console.log('Data deleted');
                    return response.status(201).send({ message: 'Success in deleting record' });
                }
            });
        }
    });
});

/**
 * end of PG strings==================================================================================================
 */