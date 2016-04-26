# gulp-express-jade-handlebars

This is an empty *express.js* app to be used as a mold project.

Server side it includes: express.js, jade

Client side it includes: jQuery, Bootstrap, Handlebars, Font Awesome

## STEPS

1. git clone https://github.com/pste/gulp-express-jade-handlebars
2. cd gulp-express-jade-handlebars
3. npm install
4. bower install
5. gulp watch
6. (open another shell, then) npm start
7. (test the app) http://localhost:7000
8. start coding! =)

## TREE STRUCTURE

There are two working folder: *src/* and *server/*. The former is where to code, the latter is handled by **Gulp** and is where the server is running.
Remember: a gulp clean will **empty** the server/ folder!

This is the src tree:
- src/
  - public/ <- 1:1 with the client
    - css/ <- custom css files
    - js/ <- custom js files
  - views/ <- all jade views
  - router/ <- here are your express.js routes
  - app.js <- the express.js engine
  
The previous tree structure will be 'built' by **gulp** into the following:
- server/
  - public/ <- client stuff
    - css/
    - js/
    - libs/ <- contains every needed lib (jQuery, Bootstrap, FontAwesome, ...)
  - views/ <- server stuff
  - router/ <- server stuff
  - app.js <- server stuff
  
## NOTES

The Express server *doesn't auto restart* after a change.
