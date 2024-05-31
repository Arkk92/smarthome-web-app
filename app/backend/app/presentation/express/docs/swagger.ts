// swagger.ts
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from 'yamljs';
import path from "path";
import { glob } from "glob";

// Load the OpenAPI document
const openapiDocument = YAML.load(path.join(__dirname, './openapi.yml'));

// Construct the absolute path to the paths directory
const pathsDir = path.resolve(__dirname, './paths');

// Construct the absolute path to the schemas directory
const schemasDir = path.resolve(__dirname, './schemas');

// Use glob to find all YAML files in the paths directory
const pathsFiles = glob.sync(`${pathsDir}/**/*.yaml`);

if (pathsFiles.length === 0) {
  console.error('No paths files found!');
}

// Use glob to find all YAML files in the schemas directory
const schemasFiles = glob.sync(`${schemasDir}/**/*.yaml`);

if (schemasFiles.length === 0) {
  console.error('No schemas files found!');
}

// Load and merge all paths files into the base OpenAPI document
pathsFiles.forEach(file => {
  const paths = YAML.load(file);
  openapiDocument.paths = { ...openapiDocument.paths, ...paths };
});

// Load and merge all schemas files into the base OpenAPI document
schemasFiles.forEach(file => {
  const schemas = YAML.load(file);
  openapiDocument.components.schemas = { ...openapiDocument.components.schemas, ...schemas };
});

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));
};
