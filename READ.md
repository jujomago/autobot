# autobox-api
This is an important set of recomendations

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [SQLite](https://www.sqlite.org/quickstart.html)
- [Tsd](https://github.com/DefinitelyTyped/tsd)

### First use

- npm install
- bower install or grunt binstall
- tsd install
- grunt jshint
- grunt test


### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

### How to use grunt-dock

In order to use this task please do the following:

1. Insert this line into /etc/default/docker file
DOCKER_OPTS='-H tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock'

2. Restart docker using:
sudo service docker restart

3. The most important commands are:
grunt dock:build
grunt dock:run && sudo docker logs _imageid_
grunt dock:clean

4. For more information, [please read](https://github.com/JoTrdl/grunt-dock)

### Before every each commit

- Run `git pull` from master branch

- Run `grunt jshint` with no errors

- Run `grunt test` with no errors

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

