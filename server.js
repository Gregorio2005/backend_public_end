const app = require('./app');
const { PORT } = require('./src/config/envs');

/**
 * Punto de entrada oficial del servidor
 */
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en: http://localhost:${PORT}`);
});