# LinkBoard

Este proyecto presenta una API que simula una plataforma integral para compartir, gestionar y discutir enlaces en un entorno tipo foro en línea. Ofrece una serie de funcionalidades diseñadas para facilitar la interacción entre usuarios y el manejo de contenido. 


## Requisitos
Es necesario tener Node.js, npm, PostMan para hacer las pruebas con la API y MySQL instalado en tu entorno de desarrollo. Si prefieres una interfaz gráfica para interactuar con la base de datos, también puedes instalar MySQL Workbench (opcional).



## Instalación

      1. Clona el repositorio

             *******************************************

      2. Instala las dependencias

            `npm install`

      3. Inicia el servidor:

            `npm run dev`


## Configuracón
Para configurar correctamente tu entorno de desarrollo, necesitarás crear un archivo `.env` en la raíz del proyecto. Este archivo contiene variables de entorno cruciales, como las credenciales de la base de datos y las claves secretas para JWT.

Puedes utilizar el archivo `template.env` como base. Aquí hay una descripción de algunas de las variables que necesitas configurar:

- `DATABASE_HOST`: La dirección del servidor MySQL.
- `DATABASE_USER`: El nombre de usuario de tu base de datos MySQL.
- `DATABASE_PASSWORD`: La contraseña para tu usuario de MySQL.
- `DATABASE_NAME`: El nombre de la base de datos que utilizará la aplicación.
- `JWT_SECRET`: Una cadena secreta utilizada para firmar los tokens JWT.
- `PORT`: El puerto en el que el servidor de la API estará escuchando.

Asegúrate de configurar estas variables de acuerdo a tu entorno local.



## Estructura del proyecto

La aplicación sigue una arquitectura de tres capas:

      - Capa de rutas (routers): Define las rutas y maneja las solicitudes HTTP
      - Capa de servicios:  Contiene la lógica y se comunica con la capa de acceso a datos
      - Capa de acceso a datos: Gestiona las interacciones con la base de datos MySQL 


## Endpoints

### Autenticación y Registro
La aplicación proporciona un sistema de autenticación robusto que permite a los usuarios registrarse y acceder a sus cuentas de manera segura. Los usuarios pueden:

      - Registrarse para crear una nueva cuenta.
      - Iniciar sesión  para acceder a su cuenta existente.


### Información de usuario
Información del Usuario
Los usuarios pueden obtener información detallada sobre ellos mismos y otros usuarios, incluyendo:

      - Información del usuario actualmente logueado
      - Información de otros usuarios mediante su ID 




### Gestión del Perfil
Los usuarios tienen la capacidad de gestionar su perfil personal, incluyendo:

      - Subir o actualizar su foto de perfil
      - Cambiar su contraseña
      - Actualizar información de su perfil, como nombre de usuario, correo   
         electrónico y descripción


### Gestión de Enlaces
La aplicación permite a los usuarios crear, visualizar y gestionar enlaces de manera efectiva:

      -Crear nuevos enlaces 
      - Obtener una lista de todos los enlaces 
      - Ver detalles de un enlace específico por su ID
      - Consultar enlaces publicados por el usuario logueado
      - Consultar enlaces de otros usuarios mediante su ID
      - Actualizar o eliminar enlaces existentes.


### Gestión de Votos
Para fomentar la participación y la valoración del contenido, los usuarios pueden:

      - Votar por un enlace
      - Ver si ya han votado un enlace
      - Obtener el número total de votos y la media de votos de un enlace


### Gestión de Comentarios
La interacción sobre los enlaces se profundiza con la funcionalidad de comentarios:

      - Crear comentarios en enlaces
      - Obtener todos los comentarios de un enlace


## Autenticación
En este proyecto se utiliza JWT para gestionar la autenticación. JWT es un estándar que permite transmitir información de manera segura en forma de un objeto JSON.

### Funcionamiento básico
1. **Generación del Token**: Cuando un usuario inicia sesión con éxito, el servidor genera un JWT que contiene información sobre el usuario.
2. **Envío del Token**: El JWT se envía al cliente como respuesta y se almacena para futuras solicitudes.
3. **Verificación del Token**: En solicitudes posteriores, el cliente envía el token en la cabecera de autorización. El servidor verifica la validez del token antes de conceder acceso a recursos protegidos.

Esto asegura que solo los usuarios autenticados puedan acceder a ciertas partes de la API.




## Conclusión
LinkBoard es una herramienta para crear comunidades de intercambio de enlaces. Esta API proporciona una base sólida sobre la cual se pueden construir diversas funcionalidades adicionales para mejorar la interacción y la gestión de contenido. Agradecemos cualquier contribución que ayude a mejorar este proyecto






