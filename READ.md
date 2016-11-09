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

- Run `grunt jscs` with no errors

- Run `grunt test` with no errors

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## How to configure access to private docker registry:

### Prerequisites
1. Docker and Docker Compose installed

### Instructions to enable the client machine to connect with the docker registry server (Only for the first time)
1. Create the certificate directory:
>~$ sudo mkdir /usr/local/share/ca-certificates/docker-dev-cert 
2. Open the certificate file for editing; If already exists, please remove it (sudo rm -rf /usr/local/share/ca-certificates/docker-dev-cert/devdockerCA.crt):
>~$ sudo nano /usr/local/share/ca-certificates/docker-dev-cert/devdockerCA.crt
3. Paste the following certificate content (including the BEGIN and END lines):

-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAOpjeasqpKPxMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTYwNzA2MTk0NDU0WhcNNDMxMTIyMTk0NDU0WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAtGSWiv5e5aSlu/2TTb5z33RjIX4AElXfCWiw9q1zfjvisKZyPxwip4MM
slIzXaRE1+/oU8GMhC1bGsmBPPde26XmNzyTer5hp90uvkvpalKgbn9FGOWYCACW
vuht5HcIgLPQbX2Nwg118tUJTlCYNs5Y5OsN+ULVwj0fhDUc4sls5C+8dwUXs8Y5
5C4wT8kBcq1zDkOUy3Q/oJIkrg+AVS7M0SJKOQaAmxMwb2LZ36LckNFICSKxlTBR
TsCc+2v0sqqD7U/J9tY0mNQWfaNp+3+u2zEgtF93DXR9aNEamRFOwypogiwQFA+u
Z1es66KwO7tjgFBOoC0RRl4BDbc1FQIDAQABo1AwTjAdBgNVHQ4EFgQUL7InlD+3
XKJ0rJz78JMnJ0c9lGgwHwYDVR0jBBgwFoAUL7InlD+3XKJ0rJz78JMnJ0c9lGgw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEADqa5jej6zdrFnCYAwH+e
ppl481BqUC8zYlZJVCBXgtmVHwskd86UAnj34SI5S3LlFbDviRme6Xk8IqslRvlf
YJuixEig7na16srmgZNbdy8AI688roQmI5yLI2ILfV5mLxj4l4gioma3Ki6d9w6g
OcxN8auREiqi7fy5LNs0rcaIBh5Ih7Xg7deiEmih01nr94PDZZtlqzqwnU1kbyft
Ywko1h6RFIEELL4Wic6AK+ZvQC9bP4ArlQDHQF1LxYjzqVSIPthcgbmGvVx7i1r6
vH+STjDaEQcSGgM4E9+CeGC10gVDVNLlOHiAgN3lf9JLdOTjm2pueiDMej/Ch/bg
Ew==
-----END CERTIFICATE-----

4. Verify that the file was saved correctly by viewing the file (If everything worked properly you'll see the same text from earlier):
>~$ cat /usr/local/share/ca-certificates/docker-dev-cert/devdockerCA.crt
5. Update the certificates:
>~$ sudo update-ca-certificates
6. Restart Docker to make sure it reloads the system's CA certificates:
>~$ sudo service docker restart

## Intructions to pull and run the project images:
1. Login into the docker registry (Ask for credentials to the registry administrator):
>~$ docker login https://74.208.171.144
2. Put the docker-compose.local.yml into a directory of your preference (It is a good idea to save it into the root directory of your project; in this way, you can track the file in GIT)   
3. Enter to the directory where you put the `docker-compose.local.yml` and run the following command to pull the images:

In order to get development images you need run the next command:
>~$ docker-compose -f docker-compose.local.yml pull

4. Starts the container services in the background for development:
>~$ docker-compose -f docker-compose.local.yml up -d
5. If you want to run development docker images, run the following command:
>docker-compose -f docker-compose.local.yml up 
6. Stop containers: 
>~$ docker-compose -f docker-compose.local.yml down

## Testing with docker
1. List the running containers:
>~$ docker ps
2. You should see an output similar to the following:

CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS                      NAMES
728650beab2a        74.208.171.144/autobox-api    "npm start"              11 seconds ago      Up 10 seconds       0.0.0.0:9999->8080/tcp     projects_autobox-api_1
0a92ea60a5f0        74.208.171.144/autobox-auth   "npm start"              11 seconds ago      Up 10 seconds       0.0.0.0:32769->3380/tcp    projects_autobox-auth_1
b38abd8a1428        redis                         "docker-entrypoint.sh"   12 seconds ago      Up 10 seconds       0.0.0.0:6379->6379/tcp     projects_redis_1
3f537f2e4cbb        mongo                         "/entrypoint.sh mongo"   12 seconds ago      Up 10 seconds       0.0.0.0:27017->27017/tcp   projects_mongo_1

3. You can get the ip of the API container, you will need to use the API CONTAINER ID (728650beab2a):
>~$ docker inspect --format '{{ .NetworkSettings.Networks.projects_default.IPAddress }}' 728650beab2a
4. Try to get the authentication token from the API:
>~$ curl -d '{"username" : "admin@autoboxcorp.com", "password" : "Password1"}' -X POST -H "Content-Type: application/json" localhost:9999/api/auth/login
# `Note`
If you have a problem to get data from fiv9 endpoints you need set up the file: /etc/default/docker with DNS of the local machine.

Example:
 The local machine has the next DNS:
    192.168.13.200 and 192.168.13.201
 Then you set up the /etc/default/docker with:
 DOCKER_OPTS="--dns 8.8.8.8 --dns 192.168.13.200 --dns 192.168.13.201"
 
## Access to swagger endpoint

1. The endpoint have an authentication by token, at the first, we need to generate the token with the endpoint /api/auth/login
2. Access the endpoint, the endpoint can be accessed by the endpoint /api/swaggers and using the method GET (the best way to access the endpoint is by postman application)