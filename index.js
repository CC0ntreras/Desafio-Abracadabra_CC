const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('assets'));

app.listen(PORT, () => {
});

const usuarios = ["Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"];

app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

const usuarioExiste = (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.status(404).sendFile(__dirname + '/assets/who.jpeg');
    }
};

app.get('/abracadabra/juego/:usuario', usuarioExiste, (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/abracadabra/conejo/:numero', (req, res) => {
    const numeroUsuario = parseInt(req.params.numero);
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    if (numeroUsuario === numeroAleatorio) {
        res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

app.use('*', (req, res) => {
    res.send('Esta página no existe...');
});