#!/bin/bash

# Check if the required environment variables are set
if [ -z "$RAILWAY_API_KEY" ] || [ -z "$RAILWAY_PROJECT_ID" ] || [ -z "$DOCKER_ID" ]; then
    echo "Please set RAILWAY_API_KEY and RAILWAY_PROJECT_ID and DOCKER_ID environment variables."
    exit 1
fi


if [ "$#" -lt 1 ]; then
    echo "Usage: Provide a filename to your .wasm file"
    exit 1
fi

filename="$1"

if [ ! -e "$filename" ]; then
    echo "Error: File '$filename' not found."
    exit 1
fi

cp $filename server.wasm

rm -rf build
mkdir build
cd build

cp ../server.wasm .

echo "FROM wasmedge/slim-runtime:0.10.1
ADD ./server.wasm /start.wasm
CMD ["\"wasmedge\"", \""--env\"", \""PORT=5000\"", \""--dir\"", \"".:/\"", \""/start.wasm\""]" >> Dockerfile

ls -l | echo

echo "Building container ..."

docker build -t $DOCKER_ID/wasm_app_server:v0 .

echo "Tagging container ..."
 
docker tag $DOCKER_ID/wasm_app_server:v0 $DOCKER_ID/wasm_app_server:latest

echo "Pushing container ..."

docker push $DOCKER_ID/wasm_app_server:v0-release

export RAILWAY_DOCKER_IMAGE_URL=hub.docker.com/r/$DOCKER_ID/wasm_app_server

echo $RAILWAY_DOCKER_IMAGE_URL

echo "Deploying to Railway project $RAILWAY_PROJECT_ID"

cd ..

rm server.wasm

node index.js









