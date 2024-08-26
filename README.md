para crear proyactos con vite:

npm create vite@latest Phonebook -- --template react

Instalacion de nodemon para backend y escuchar los cambios y poder reflejarlos en el momento

npm install --save-dev nodemon
y agregamos en package.json en sripts= "dev": "nodemon index.js",

para llevar los cambios a fly.io a produccion ejecutar
fly deploy

para intalar mongoDB atlas
npm install mongoose

para copiar una carpeta a otra
Carpeta origon a lugar de destino
cp -r dist ../../Part3/BackNotas

paquete bcrypt para generar los hashes de contraseña:
npm install bcrypt

para intalar redux usamos:
npm install redux

librería deep-freeze, que se puede usar para garantizar que el reducer se haya definido correctamente como una función inmutable.
npm install --save-dev deep-freeze

Redux Toolkit es una librería que resuelve estos problemas comunes relacionados con Redux. La librería, por ejemplo, simplifica enormemente la configuración del store de Redux y ofrece una gran variedad de herramientas para facilitar la gestión del estado.
npm install @reduxjs/toolkit

instalo un servidor local
npm install json-server --save-dev

elimina repositorios git
rm -rf .git
