const { writeFile } = require('fs');
const { argv } = require('yargs');

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
  export const environment = {
    production: false,
    config : {
      api_key: '${process.env.API_KEY}',
      delivery_token: '${process.env.DELIVERY_TOKEN}',
      environment: '${process.env.ENVIRONMENT}',
      region: '${process.env.REGION || 'us'}'
    }
  };
`;
console.log("---->", environmentFileContent);
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});