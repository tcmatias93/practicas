const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

//Escucho por consola y selecciono el puerto
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
