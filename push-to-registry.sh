#!/bin/bash

set -ex

requireCommand() {
  command -v $1 >/dev/null 2>&1 || { echo "$1 must exist on the path.  Install it and try again.  Aborting." >&2; exit 1; }
}

usage() { echo "Usage: $0 [-m <dev|prod>] [-v <number.number>]" 1>&2; exit 1; }

requireCommand docker-compose
requireCommand docker

#DOCKER_REGISTRY=74.208.171.144
DOCKER_REGISTRY=quay.io/abxbo #"https://quay.io/abxbo"
APP_NAME="autobox"
number="latest"

WEB_NAME="autobox-web"

echo "Building the docker compose images"

option=prod
while getopts ":m:v:" opt; do
  case $opt in
    m)
      echo "-m was triggered, Parameter: $OPTARG" >&2
      option="$OPTARG"
      if [ "$OPTARG" == "dev" ]; then
        option=dev
      elif [ "$OPTARG" == "staging" ]; then
        option=staging
      else
        option=prod
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

#option="${1}"
case ${option} in
   dev) VERSION="$number.dev"
      echo "Development building..."
      docker-compose --project-name "$APP_NAME" -f docker-compose.dev.yml build
      ;;
   staging) VERSION="$number"
      echo "Production building for staging..."
      docker-compose --project-name "$APP_NAME" -f docker-compose.dev.yml build
      ;;
   prod) VERSION="$number"
      echo "Production building..."
      docker-compose --project-name "$APP_NAME" build
      ;;
   *) VERSION="$number"
      echo "Production building..."
      docker-compose --project-name "$APP_NAME" build
      ;;
esac

echo "Tagging as $VERSION"
docker tag "${APP_NAME}_${WEB_NAME}" "$DOCKER_REGISTRY/$WEB_NAME:$VERSION"

echo "Pushing images"
docker push "$DOCKER_REGISTRY/$WEB_NAME:$VERSION"

echo "Done! Images were deployed to docker registry ($DOCKER_REGISTRY)"

