#!/bin/bash

export NODE_ENV=dev
export REACT_APP_SERVER_DEV='http://localhost:8080'



npm install
npm run build
serve -l 3000 -s build
