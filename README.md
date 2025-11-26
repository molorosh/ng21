# ng21
A small webapp to learn angular v21 and to see how angular's features work with development concepts like Clean Architecture and Domain-Driven Design.

## basic setup
### installation
To create an angular web-app with a specific version of angular installed locally I did the following:

- inside the ng21 folder I opened a terminal and typed:
```shell
npx -p @angular/cli@9.1 ng new ng-twenty-one
```
- confirmed the installation with 'y'
- then I answered the standard installation questions about CSS and Server-Side rendering
- and then the project was created
### git-hub self-hosting 
- in the ng-twenty-one folder run the command:
```shell
ng build
```
- this will create a build in ng21\docs
- and this can be pushed up to the repo

To make this work I had to make a few changes in the angular.json config file:
- inside this part of the config:
```json
"architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
```
- I added the following extra stuff:
```json
"outputPath": {
    "base": "../docs",
    "browser": ""
},
"baseHref": "/ng21/",
```
- an outputPath setting of "../docs" would result in the index.html page being in the folder .../docs/browser so we use the extended setup to ensure that there is no /browser/ folder.
- so the baseHref of /ng21/ is because the build assumes the angular website will be hosted at the root of the website, but GitHub pages are hosted at https://molorosh.github.io/ng21/ so this corrects the setup to account for being in a sub-folder of the website.


_TODO: replace this manual stuff with some GitHub actions at some point..._

## style and branding
### favicon
- generated at: https://favicon.io/favicon-generator/
- option: text
- text: "21"
- style: 
  - shape: rounded
  - font: Langar
  - size: 110
  - background: #8800Ff
  - foreground: #ffffff