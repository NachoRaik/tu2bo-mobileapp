## TuTubo - Mobile App

## About
Aplicación movil de Tutubo que se puede compilar tanto para iOS como para Android.

## Credenciales
Para poder levantar la aplicación se requieren dos archivos JSON con credenciales, "app.json" y "google-services.json".

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

- Levantar el container grande de todos los servers

- Levantar la app desde un emulador

- En una terminal correr `adb reverse tcp:5000 tcp:5000` donde 5000 es el puerto donde esta corriendo el appserver y lo forwardeamos a la app.

- Ahora las pegadas a localhost:5000 desde la app deberian pegarle al appserver levantado localmente