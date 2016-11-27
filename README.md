# Proyecto SENA - Johan Rodríguez

## Estrutura de carpetas

  **api:** Carpeta con los archivos pertenecientes al backend (gestión de datos).

  **app:** Carpeta con los archivos pertenecientes al frontend. Aquí se manejan los controladores, las vistas, y la interacción con el backend.

  **assets:** Carpeta con archivos estáticos, tales como: imágenes, css y javascript.
  
  **vendor (generada por bower):** Carpeta con estilos y javascripts de terceros.

## Instalación (desde la línea de comandos)

### Dependencias de AngularJS y herramientas para empaquetar la aplicación
  
```bash
$ npm install
```

### Dependencias de estilos y javascripts

  Instalación de bower globalmente:

```bash
$ npm install -g bower
```

  Instalación de dependencias:
  
```bash
$ bower install
```
## Configuración del servidor local

  Ingresar al archivo php.ini que se encuentre en la herramienta y añadir la siguiente información:

```ini
; Mostrar los errores
display_errors = on
; Ajustar la hora local a Bogotá
date.timezone = America/Bogota
```
