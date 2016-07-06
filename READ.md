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

### How to configure access to private docker registry:

## Prerequisites
1. Docker and Docker Compose installed

## Instructions to enable the client machine to connect with the docker registry server (Only for the first time)
1. Create the certificate directory:
    ~$ sudo mkdir /usr/local/share/ca-certificates/docker-dev-cert 
2. Open the certificate file for editing:
    ~$ sudo nano /usr/local/share/ca-certificates/docker-dev-cert/devdockerCA.crt
3. Paste the following certificate content:
-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAMOxporcdafCMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTYwNjIxMTMzMDMyWhcNNDMxMTA3MTMzMDMyWjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAxd6OFK7RjbibM4OcHI98TJEjITXN8KLUseHH4SxXUm+83J4/lXXjwUmJ
AiOgQJTZAgGuR29slBw/nFUShprKgQC39tuvDB06ALrbRcq+83FUOYMR1uKmJxwO
aySOnC62ym63yrffaNymnmC6o6p5tNHpz0KmgKC5FFim0ZuhRsyKDcP98Rbizfg+
MbPqwPApv87utWOuM/h6fb3c6FDKSO8z8pQZbzxGL7a1TRShvgMtUJWzc0ajh1Gt
dgsgnXEjBZeaTm2BqvUPS7F/RcfCv32h60ud1+KEz8lQv1vOUtoHG6O1irbUU8Iq
rzUlrvH8JkmHMcLOoMZOL9HJAMCcdwIDAQABo1AwTjAdBgNVHQ4EFgQUHxAq8Iq4
/QU+6wzSNiYSLArz4HAwHwYDVR0jBBgwFoAUHxAq8Iq4/QU+6wzSNiYSLArz4HAw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAUBM3RFZxAj8yEKvAEVLH
dWraXEEiAFVOuCOw8niIo6dzZcJigOoojYiileW6qWIWavxcCOzuQbXDaXIAkp4B
PctdjctyEv9vZua3pPi7AEVFxoc6UjxNL12iWP70PN7btV39JG8xf8XsHkbR3Cl6
eDIPYNClgYp3pVgNL4iHZgKKumlJBVfR3frppxuBynTKqL0f/PDHoxFspBNdAws7
QF1iuL41dnMwWNiLZxXCMeHzhK4VM3yXZWu2sbEOFiEWwra9BO4fqQ5MXVj5VOmd
mue2RHaLfYB3lvZZ7FMEZMPRK8WOdZt0MBWG5HZ1khk1FazhgscJvtjrOmC3Wd+Z
7w==
-----END CERTIFICATE-----
4. Verify that the file was saved correctly by viewing the file (If everything worked properly you'll see the same text from earlier):
    ~$ cat /usr/local/share/ca-certificates/docker-dev-cert/devdockerCA.crt
5. Update the certificates:
    ~$ sudo update-ca-certificates
6. Restart Docker to make sure it reloads the system's CA certificates:
    ~$ sudo service docker restart

### Intructions to pull and run the project images:
1. Login into the docker registry (Ask for the credentials to the registry administrator):
    ~$ docker login https://192.168.13.142
2. Put the docker-compose.yml into a directory of your preference.   
2. Enter to the directory where you put the docker-compose.yml file and run the following command to pull the images:
    ~$ docker-compose pull
3. Starts the container services in the background:
    ~$ docker-compose up -d 
4. Stop containers: 
    ~$ docker-compose down

## Testing
1. List the running containers:
    ~$ docker ps
2. You should see an output similar to the following:

CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS                      NAMES
728650beab2a        192.168.13.142/autobox-api    "npm start"              11 seconds ago      Up 10 seconds       0.0.0.0:9999->8080/tcp     projects_autobox-api_1
0a92ea60a5f0        192.168.13.142/autobox-auth   "npm start"              11 seconds ago      Up 10 seconds       0.0.0.0:32769->3380/tcp    projects_autobox-auth_1
b38abd8a1428        redis                         "docker-entrypoint.sh"   12 seconds ago      Up 10 seconds       0.0.0.0:6379->6379/tcp     projects_redis_1
3f537f2e4cbb        mongo                         "/entrypoint.sh mongo"   12 seconds ago      Up 10 seconds       0.0.0.0:27017->27017/tcp   projects_mongo_1

3. Get the ip of the API container, you will need to use the API CONTAINER ID (728650beab2a):
    ~$ docker inspect --format '{{ .NetworkSettings.Networks.projects_default.IPAddress }}' 728650beab2a
4. With the API IP you can try to get the authentication token from the API:
    ~$ curl -d '{"username" : "admin@autoboxcorp.com", "password" : "Password1"}' -X POST -H "Content-Type: application/json" 172.18.0.5:8080/api/auth/login    
