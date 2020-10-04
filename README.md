This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Pueden entrar a esta pagina donde está alojado para que puedan ver su funcionamiento, ya le pega a la API de GANYMEDES hosteada en HEROKU

Login en THEMISTO / MEPHISTO

email: zea3471@gmail.com 
password: Alejandro112771.. (tiene dos puntos ..)

## THEMISTO

https://vigorous-brattain-e03c97.netlify.app/ (THEMISTO)

## GANYMEDES

https://vigorous-brattain-e03c97.netlify.app/ (GANYMEDES)

## SERVICIOS DOCUMENTADOS

https://documenter.getpostman.com/view/1017472/TVRg6p72

## Available Scripts

In the project directory, you can run:

npm run start (para correr en local, ya con netfly arriba no hace falta clonarlo.)


Descripción del proyecto.

Hola evaluadores de sirena, primero que nada quiero comentarles que para mi fue un placer realizar dicho examen, esta semana estuve demasiado ocupado con unas salidas en productivo en mi otro trabajo y no pude cumplir todos los requerimientos que pedian, sin embargo hice los aplicativos con un funcionamiento de inicio a fin.

En primer lugar quiero comentarles como abordé dicho test.

Primero diseñé el aplicativo de THEMISTO, esta es una aplicación front-end que se encarga de generar ORDENES DE BUSQUEDA y al presionar un boton de BUSCAR PRODUCTOS esta se le pega a un servicio en GANYMEDES que se encarga de hacer scrapping en la pagina de easy ( se que me pidieron que pudiera ser amazon ebay o ml pero no tuve tiempo la verdad), este servicio se encarga de generar un chromium con puppeter y obtener los productos de la pagina dado una busqueda (el query de la search order).

Ganymedes al realizar todo este proceso guarda en MONGOOSE los resultados con el codigo de la search order para hacer la asociacion 1 search orden ... n productos y los DEVUELVE al front para que el usuario lo pueda ver.

tambien realicé algunos otros servicios de busqueda y un login.

Las search orders estan asociadas a un usuario.

un usuario puede tener muchas so
una search order puede tener muchos productos.


Todos los demas procesos que me faltaron pude haberlos realizado con el debido tiempo, pero bueno... espero que les guste.


PD: estuvo muy bueno lo del scrapping, me gustó <3



