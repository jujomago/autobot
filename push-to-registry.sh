#!/bin/bash

set -ex

requireCommand() {
  command -v $1 >/dev/null 2>&1 || { echo "$1 must exist on the path.  Install it and try again.  Aborting." >&2; exit 1; }
}

usage() { echo "Usage: $0 [-m <prod>] [-e <staging|prod>] [-v <number.number>]" 1>&2; exit 1; }

requireCommand docker-compose
requireCommand docker

#DOCKER_REGISTRY=74.208.171.144
DOCKER_REGISTRY=quay.io/abxbo #"https://quay.io/abxbo"
APP_NAME="autobox"
number="latest"

WEB_NAME="autobox-web"

echo "Building the docker compose images"

option=prod
environment=prod
while getopts ":m:e:v:" opt; do
  case $opt in
    m)
      echo "-m was triggered, Parameter: $OPTARG" >&2
      option="$OPTARG"
      if [ "$OPTARG" == "dev" ]; then
        option=dev
      else
        option=prod
      fi
      ;;
    e)
      echo "-e was triggered, Parameter: $OPTARG"
      environment="$OPTARG"
      if [ "$OPTARG" == "staging" ]; then
        environment=staging
        VERSION="$number.staging"
      else
        environment=prod
        VERSION="$number.prod"
      fi
      ;;
    v)
      echo "-v was triggered, Parameter: $OPTARG" >&2
      number="$OPTARG"
      ;;
    \?)
      echo "No mode detected, so production mode was selected: -$OPTARG" >&2
      #option=prod
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
    *) echo "Unimplemented option: -$OPTARG" >&2; 
       exit 1;;
  esac
done

case ${environment} in
   staging)
      case ${number} in
        latest)
            API_URL="http://www.dev-autoboxcorp.com:9999/api"
          ;;
        *)
            API_URL="http://www.dev-autoboxcorp.com:8888/api"
          ;;
      esac
      ;;
   prod)
      case ${number} in
        latest)
            API_URL="http://localhost:9999/api"
          ;;
        *)
            API_URL="http://www.autoboxcorp.com:8888/api"
          ;;
      esac
      ;;
   *)
      case ${number} in
        latest)
            API_URL="http://localhost:9999/api"
          ;;
        *)
            API_URL="http://www.autoboxcorp.com:8888/api"
          ;;  
      esac
      ;;
esac

echo "Replacing API_ACCESS_URL string"
sed -i -e "s@API.*api@API_ACCESS_URL: $API_URL@" docker-compose.yml

echo "Building image"
docker-compose --project-name "$APP_NAME" build

echo "Tagging as $VERSION"
docker tag "${APP_NAME}_${WEB_NAME}" "$DOCKER_REGISTRY/$WEB_NAME:$VERSION"

echo "Pushing images"
docker push "$DOCKER_REGISTRY/$WEB_NAME:$VERSION"

echo "Done! Images were deployed to docker registry ($DOCKER_REGISTRY)"

