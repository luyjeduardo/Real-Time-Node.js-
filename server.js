const express = require('express');
const app = express(); 
const serverHttp = require('http').Server(app);
const io = require('socket.io')(serverHttp);

class RealTime {

    constructor(){ }

    LevantarElPuertoDeEscucha(puerto) {
        serverHttp.listen(puerto);
    }

    LevantarLaEscuchaEnRealTime() {
        io.on('connection', (socket) => {
            /*Captando emiciones de las notificaciones del Administrador y enviando mensaje a sus 
              correspondientes oyentes.*/
            socket.on('notificacion-request', (res) => {
                socket.broadcast.emit('notificacion-response', res);
            });

            /*Captando emiciones de los procesos de los Usuarios y enviando mensaje al Administrador*/
            socket.on('procesos-request', (res) => {
                socket.broadcast.emit('procesos-response', res);
            });

            /*Captando emiciones de las respuestas del Administrador a los procesos de los Usuarios y 
              enviando mensaje a sus correspondientes oyentes*/
            socket.on('respuesta-procesos-request', (res) => {
                socket.broadcast.emit('respuesta-procesos-response', res);
            });
        });
    }

}

var EjecutarRealTime = new RealTime();

EjecutarRealTime.LevantarElPuertoDeEscucha(5200);
EjecutarRealTime.LevantarLaEscuchaEnRealTime();
 