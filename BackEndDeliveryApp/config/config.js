import { createConnection } from 'mysql';

export const db = createConnection({
	host: 'localhost',
	user: 'root',
	password: '!Soporte06',
	database: 'db_delivery'
});

db.connect((err) => {
	if (err) {
		console.error('Error al conectar a la base de datos:', err);
		// Tomar medidas adecuadas, como mostrar un mensaje de error al usuario o intentar reconectar
	} else {
		console.log('Conexión exitosa a la base de datos');
		// Continuar con el resto del código
	}
});

