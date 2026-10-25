# Práctica de MongoDB y Mongoose

API REST con Express y Mongoose. Tiene 3 colecciones: **User**, **Article** y **Tag**.

## 1. Colecciones y relaciones

User → Profile 1:1 **Embebido** (subdocumento `profile` dentro de `User`)
<br>
User → Article 1:N **Referenciado** (`Article.author` guarda el `_id` del usuario)
<br>
Article ↔ Tag N:M **Referenciado con array** (`Article.tags` guarda varios `_id` de Tag)

¿Por qué embebido o referenciado? <br>
**Si los datos se leen juntos y uno no tiene sentido sin el otro, es preferible aplicar embebido.** <br>
**Si el dato puede existir por sí solo o puede crecer mucho, es preferible referenciar.**

**User → Profile (embebido)**

- El perfil pertenece a un solo usuario.
- Siempre que traemos un usuario queremos también su perfil, así que con embebido se hace una sola consulta y no necesitamos `populate`.
- Si se borra un usuario, su perfil se borra con el.

**User → Article (referenciado)**

- Un usuario puede tener muchos artículos, es decir el documento del usuario puede crecer mucho.
- El artículo puede consultarse solo.
- Pero si necesitamos saber el autor, el artículo guarda el id del autor y usamos `populate("author")` si necesitamos mostrar los datos del usuario.

**Article ↔ Tag (referenciado, array de ids)**

- Un artículo puede tener varias etiquetas y una etiqueta puede estar en varios artículos.
- En lugar de embeber las etiquetas porque pueden repetirse en cada artículo, y si cambiamos el nombre de una habría que actualizarla en todos lados.
- En SQL se usamos una tabla intermedia. En MongoDB **no hace falta**: alcanza con un array de referencias. Es más simple y se lee con un `populate`.
- Es preferible poner el array en `Article` (y no en `Tag`) porque un artículo suele pocas etiquetas, mientras que una etiqueta puede estar en cientos de artículos.

## 2. Investigación

### Cómo se usa `populate` desde una colección que no tiene referencias?

Cuando el Schema A no guarda los IDs del Schema B, pero el Schema B sí guarda el ID de A, se utiliza Virtual Populate. Esto permite hacer un .populate() simulando una clave foránea sin modificar la estructura del documento.

### ¿Cómo se hacen las eliminaciones lógicas y en cascada?

**Eliminación lógica:** el documento **no se borra**, solo se marca como eliminado, mediante un campo booleano (activo: false o deletedAt). Se puede recuperar y se conserva el historial.

**Eliminación en cascada:** al borrar un documento, también se borran (o se limpian) los que dependen de él. Mongo no lo hace solo, se hace a mano en el controlador.

Con array de referencias, la cascada es **sacar el id** del array en lugar de borrar documentos:

### ¿Cómo crear un endpoint para agregar un vínculo en una relación N:M?

En relaciones N:M, ambos Schemas suelen almacenar un arreglo de ObjectIds referenciados. Para evitar duplicados en el arreglo, se utiliza el operador $addToSet de MongoDB.
