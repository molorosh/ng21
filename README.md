# ng21
A small webapp to learn angular v21 and to see how angular's features work with development concepts like Clean Architecture and Domain-Driven Design.

## phases
### phase 1
using folder-based separation I will create a very simple application (a todo list of sorts) that adheres to design patterns like:
- Clean Architecture
- Domain Driven Design

This phase will use a folder structure of
```
src
  \app
    \ddd         - base DDD entities
    \domain      - entities, aggregates, value-types, events, & validations
    \persistence - saving the data locally (IndexedDB)
    \ux          - the presentation layer 
```
to impose separation on the various parts.

_I may further separate out shared / base aspects of the persistence and ux layers too._

### phase 2
once a reasonable design is established in phase 1 I will turn each part into its own npm package and simple install and combine them

### phase 3
add additional features to the app - but this time in the npm packages.

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

  ## (Agile) Work List

  ### To Do

  - create the basic validations for TaskGroup:
    - error: the name must not be null/empty/whitespace only
    - error: the name cannot be the same as another TaskGroup (so must be able to check the persisted storage)
    - error: the name (when whitespace trimmed) must be longer than 3 characters and less than 100 characters
    - warning: the name SHOULD contain at least one space within the name (as single words are not as useful as phrases)

  - implement the creation/validation/persistence/retrieval of TasKGroup in the UX
    - when you press the Save button and there are no validation messages it will just save
    - when there are only warnings then you also get the save with warnings button that allows you to persist it
    - when there are errors then either save or save-with-warnings are not permitted
  
  note: this does rather suggest a SaveTaskGroupWithWarningsCommand  / SaveTaskGroupCommand
  or a SaveTaskGroup(model: TaskGroupModel, withWarnings: bool = false) that will return a CommandResult that could contain either
  - A ValidationResult model
  - A ApplicationError model
  - A CommandSuccess model (that contains the updated entity)

  so maybe a disciminated union type of thing?

  - tidy up the very dreadful and basic UX

  - 

  ## Done