# coders-devstack

## ERROR
1. ošetřit error s tím, že v /design/build/ chybí složka s /img/symbol/icons.svg:

   Error: File not found with singular glob: /Users/ondrejkacmar/Dev/coders-devstack/design/build/img/symbol/icons.svg (if this was purposeful, use `allowEmpty` option)
    at Glob.<anonymous> (/Users/ondrejkacmar/Dev/coders-devstack/node_modules/glob-stream/readable.js:84:17)

2. po dokončení úprav promazat a případně doplnit README


## How to run this procjet?

Make sure you are using PHP 7.4.x.

Install symfony CLI https://symfony.com/download - this depending on your system

make sure your symfony cli using php 7.4 by running this command: `symfony local:php:list`

Run: `composer install`

Make sure your .env.local file is OK.

Run: `npm install`

Run: `symfony serve`

Run: `gulp code`
