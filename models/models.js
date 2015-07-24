var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
        {dialect:"sqlite", storage: "quiz.sqlite"}
      );

// Importar la definición de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz //exportar definición de la Tabla Quiz

// sequelize.sync() crea e inicializala tabala de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    if(count === 0) { // la tabla se inicializa solo si esta vacía
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                  })
                .then(function(){console.log('Base de datos inicializada')});
    };
  });
});
