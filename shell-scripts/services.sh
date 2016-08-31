#!/usr/bin/env bash
# Handling services

echo "Handling services"

stopservices() {
    echo -n "Today's date is: "
    date +"%A, %B %-d, %Y"
	echo "Stopping services..."
    sudo service mongod stop
    sudo service redis-server stop
}

startservices() {
    echo -n "Today's date is: "
    date +"%A, %B %-d, %Y"
	echo "Starting services..."
    sudo service mongod start
    sudo service redis-server start
}

option="${1}" 
case ${option} in 
   -s) startservices
      echo "Started!"
      ;; 
   -t) stopservices 
      echo "Stopped!"
      ;; 
esac 