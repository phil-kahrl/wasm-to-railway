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
2.  Deploy the wasm from the commamd line.

## Environment Variables

RAILWAY_API_KEY
RAILWAY_PROJECT_ID
DOCKER_ID

## Command line example:

`./run.sh myfile.wasm`





