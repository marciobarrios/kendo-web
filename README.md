kendo-web
=========

You need node to take advantage of the frontend tools.

Run this command to install gulp and its packages: `npm install gulp gulp-rimraf gulp-autoprefixer gulp-svg-sprites`

After that you only need to run `gulp` command and it will execute these tasks:

- Clean the **dist/** directory
- Autoprefix the styles in css/s.scss
- Generate the SVG sprites from the svg inside assets/svg/
- Copy all the necessary files inside **dist/**

And finally you'll have the result in **dist/** folder.
