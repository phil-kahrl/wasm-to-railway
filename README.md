# wasm-to-railway

## Purpose

This repo contains a script which will deploy any runnable .wasm as a hosted application on [Railway](https://railway.app/).  The .wasm runnable will be deployed to Railway as a service.

## Requirements

1. Node.js installed locally.
2. Docker installed locally.
3. A user-provided API key for the Railway API.
4. A user-provided id for Docker hub.
5. An existing project id on Railway.

## Setup

`npm install`

## Running the deployment.

1.  Build your .wasm application using tools of choice.
2.  Deploy the wasm from the command line.

## Environment Variables

RAILWAY_API_KEY

RAILWAY_PROJECT_ID

DOCKER_ID

## Command line example:

The following example shows how to deploy from a git repo that builds an http server in wasm.

`cd ..`

`git clone git@github.com:phil-kahrl/wasm-server.git`

`cd wasm-server`

`cargo build --target wasm32-wasi --release`

`cd ..`

`./run.sh ../wasm-server/target/wasm32-wasi/release/server.wasm `






