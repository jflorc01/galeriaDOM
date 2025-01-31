### Manual para la API

En el directorio datos, está el script SQL con la base de datos utilizada por la api. En el phpMyAdmin se importará dicho script.

Una vez se tenga en marcha el servidor y se tenga la base de datos incluida, copiamos la carpeta "concursoTapas" en la carpeta "www" que utiliza XAMPP.

Como de momento en el cliente no funciona la parte de los usuarios, no se requiere la instalación de firebase. 

Se puede probar que la API funciona correctamente si al acceder a [http://localhost/www/concursoTapas/api/tapas/](http://localhost/www/concursoTapas/api/tapas/) se muestra un JSON con las tapas de la base de datos.

Si no se ha podido copiar la API en esa ruta exacta, se deberá de ajustar el archivo `galeria.js` con la URL correcta.
