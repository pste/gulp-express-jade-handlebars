# gulp-express-jade-handlebars

This is an empty *express.js* app to be used as a startup.

## STEPS

1. git clone ...
2. npm install
3. gulp 
4. npm start
5. (test the app) http://localhost:7000
6. start coding! =)

## TREE STRUCTURE

There are two working folder: *src/* and *server/*. The first is where to code, the second is handled by **Gulp** and is where the server is running.
Remember: a gulp clean will **empty** the server/ folder!

So this is the src tree:
- src/
  - public/ <- 1:1 with the client
    - css/ <- custom css files
    - js/ <- custom js files
  - views/ <- all jade views
  - router/ <- here are your express.js routes
  - app.js <- this is the express.js engine
  
The previous tree structure will be 'built' by **gulp** into the following:
- server/
  - public/ <- client stuff
    - css/
    - js/
    - libs/ <- this contains every needed lib (jQuery, Bootstrap, FontAwesome, ...)
  - views/ <- server stuff
  - router/ <- server stuff
  - app.js <- server stuff
  