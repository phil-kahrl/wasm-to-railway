const axios = require('axios');
const { buildSchema } = require('graphql');

const API_TOKEN_ENV_KEY = "RAILWAY_API_TOKEN";
const RAILWAY_PROJECT_ID_KEY = "RAILWAY_PROJECT_ID";
const RAILWAY_DOCKER_IMAGE_URL_KEY = "RAILWAY_DOCKER_IMAGE_URL";

const schema = buildSchema(`
  type Query {
    me: User
  }

  type User {
    name: String
    email: String
  }

  type Source {
    image: String
  }

  type ServiceCreateInput {
    projectId: String
    source: Source
  }


`);

const apiToken = process.env[API_TOKEN_ENV_KEY];

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiToken}`,
};

// The GraphQL API endpoint
const apiUrl = 'https://backboard.railway.app/graphql/v2';

const whoami = () => {
    const query = `query { me { name email } }`;
    axios.post(apiUrl, { query }, { headers }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error('Error making GraphQL request:', error.message);
    });
}

const projectId = process.env[RAILWAY_PROJECT_ID_KEY];
const image = process.env[RAILWAY_DOCKER_IMAGE_URL_KEY];

console.log(`Deploying docker image: ${image} to a new service in project ${projectId}`);

const createService = () => {
    const query = `mutation serviceCreate {
        serviceCreate(
            input: {
                projectId: "${projectId}"
                source: { image: "${image}" }
            }
        ) {
            id
        }
    }`;
    
    axios.post(apiUrl, { query, operationName: "serviceCreate" }, { headers }).then(response => {
        console.log("Service create request complete:");
        console.log(response.data);
    }).catch(error => {
        console.error('Error making GraphQL request:', error.message);
    });
}

createService();


