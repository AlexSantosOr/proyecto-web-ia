 Uso de Inteligencia Artificial

 Tres prompts importantes utilizados durante el desarrollo
1. "Hazme un HTML y un CSS responsive para una app de Rick and Morty con buscador, filtro de estado, una cuadrícula para personajes y una barra lateral de favoritos."
2. "Dame el código en JavaScript para pedir los personajes a la API de Rick and Morty usando fetch y mostrarlos en el HTML."
3. "Cómo le hago en JavaScript para que la lista de favoritos se guarde en localStorage y no se borre al recargar la página?"

 Una respuesta de la IA que haya requerido correcciones
La IA me había puesto un botón de "Buscar" para que hasta que le diera clic filtrara los personajes. Le pedí que lo cambiara para que filtrara al instante mientras voy escribiendo en el input con el evento `input`.

 Un error encontrado y cómo lo resolvieron
Al presionar varias veces el botón de favoritos se duplicaba el personaje en la lista. Lo resolví usando `findIndex()` para revisar si el ID del personaje ya existía en el arreglo de favoritos antes de meterlo.

 Una modificación realizada al código que puedan explicar
Agregué una función para mostrar un mensaje en pantalla si la API falla o si no encuentra ningún personaje con el nombre buscado, asegurándome de limpiar el contenedor para que no se quede información vieja.

 Una reflexión sobre qué aprendieron utilizando IA
Aprendí a usar la IA como un apoyo para resolver dudas puntuales de lógica (como `fetch` y `localStorage`), pero entendiendo qué hace cada parte del código para poder modificarlo y corregir los errores que la IA llega a cometer.
