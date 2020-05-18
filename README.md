## TuTubo - Mobile App

## Expo
- Para poder correr la aplicación en nuestros celulares es necesario primero bajarse la aplicación de Expo (android / iOS) y crearse una cuenta.

- Descargar node y npm

- Instalar expo: `npm install expo-cli --global`

- Posicionarse en la carpeta `mobileapp`

- Lanzar el comando `expo start`

- Apretar `s` para loggearse en la cuenta creada previamente

- Escanear el código QR en la aplicación Expo si es android o desde la camára si es iOS

- Listo!

## Conectar con el appserver localmente

- Levantar el appserver

- Levantar la app desde un emulador

- En una terminal correr `adb reverse tcp:5000 tcp:5000` donde 5000 es el puerto donde esta corriendo el appserver y lo forwardeamos a la app.

- Ahora las pegadas a localhost:5000 desde la app deberian pegarle al appserver levantado localmente

- Para loguearse por ahora se puede usar:

```
username: 'user1'
password: '123'
```