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
