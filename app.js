var express = require('express')
var stylus = require('stylus')
var nib = require('nib')

var app = express()

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
} // Função que compila o stylus usando o frame. nib

app.set('views', __dirname + '/views') // Define a pasta onde esta as view

app.set('view engine', 'jade') // Define a engine das views

app.use(express.logger('dev'))

app.use(stylus.middleware(
    {
        src: __dirname + '/public'
        , compile: compile
    }
)) // Middleware para compilar os stylus

app.use(express.static(__dirname + '/public')) // Define as pastas de arquivos estaticos

app.get('/', function (req, res) {
    res.render('index',
        { title: 'Home' }
    )
}) // Rota de navegação

app.get('/post', function (req, res) {
    res.render('post',
        { title: 'Nome do Post' }
    )
})

app.listen(3000) // Porta do host