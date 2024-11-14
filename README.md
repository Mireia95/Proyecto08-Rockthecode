# RTC - PROYECTO 08

## _API REST FILES_

El proyecto levanta un servidor usando la libreria Express. Me conecto a la base de datos de Mongo Atlas mediante mongoose.

Creo tres colecciones relacionadas a la saga de Harry Potter:

- personajes
- casas: el parametro "alumnos" está relacionado con la coleccion personajes
- users

Subimos los archivos del campo "img" mediante cloudinary en las colecciones personaejs y casas.

### Endpoints para la colección personajes:

| PETICIÓN | NOMBRE          | MIDDLEWARE                             | DESCRIPCIÓN                                                                                                                                                                    |
| -------- | --------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET      | getPersonajes   | -                                      | devuelve todos los personajes de mi coleccion.                                                                                                                                 |
| POST     | postPersonaje   | VerifyCollection, upload.single("img") | para subir un nuevo personaje                                                                                                                                                  |
| PUT      | updatePersonaje | upload.single("img")                   | actualiza los datos de un personaje. Le paso el id para saber que personaje tengo que actualizar. Si el campo "img" se actualiza, se elimina el archivo anterior en cloudinary |
| DELETE   | deletePersonaje | -                                      | elimina un personaje de mi colección. Le paso el id para saber que personaje tengo que eliminar. Eliminación del archivo en cloudinary cuando se borra el dato en la BBDD      |

### Endpoints para la colección casas:

| PETICIÓN | NOMBRE     | MIDDLEWARE                             | DESCRIPCIÓN                                                                                                                                                           |
| -------- | ---------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET      | getCasas   | -                                      | devuelve todos las casas de Harry Potter de mi coleccion.                                                                                                             |
| POST     | postCasa   | VerifyCollection, upload.single("img") | para subir una nueva casa                                                                                                                                             |
| PUT      | updateCasa | upload.single("img")                   | actualiza los datos de una casa. Le paso el id para saber que casa tengo que actualizar. Si el campo "img" se actualiza, se elimina el archivo anterior en cloudinary |
| DELETE   | deleteCasa | -                                      | elimina una casa de mi colección. Le paso el id para saber que casa tengo que eliminar. Eliminación del archivo en cloudinary cuando se borra el dato en la BBDD      |

### Middlewares utilizados

- VerifyCollection: me permite saber en que coleccion estamos, y le paso el parametro req.collection a las funciones siguientes. Esto sirve para que se suban las imagenen en cloudinary en la carpeta correspondiente según la coleccion.
- Upload.single("img"): me permite subir archivos en el campo img, a traves de multer, y guardarlos en cloudinary

El servidor está levandado en el puerto 3000.
Las rutas para las colecciones son:

- /api/v1/personajes
- /api/v1/casas

### SEED

Creada una semilla para la colección personajes.
Subida a GitHub para corrección del proyecto.

**Mireia**
