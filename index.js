const prompt = require('prompt-sync')({sigint: true});
const handlebars = require('handlebars');
const fs = require('fs');

let templateFilename = prompt('Enter template name for the ./templates/[name].template file you want to generate from, e.g. dynamodb: ');
let templateSource = fs.readFileSync(`./templates/${templateFilename}.template`, 'utf-8');
let templateParameters = require(`./templates/${templateFilename}.template.prompts.json`);

let parameterValues = {};

templateParameters.forEach(parameter => {
    if(parameter.required){
        let response = prompt(`Enter value for ${parameter.variableName}: `);
        parameterValues[parameter.variableName] = response;
    }
    else{
        let optionalAttribute = prompt(`Enter Y to include ${parameter.variableName}: `);
        if(optionalAttribute.toUpperCase() === 'Y'){
            parameter.parameters.forEach(optionalParameter => {
                let optionalResponse = prompt(`Enter value for ${optionalParameter.variableName}: `);
                parameterValues[optionalParameter.variableName] = optionalResponse;
            });
        }
    }
});

console.log(`${JSON.stringify(parameterValues)}`);


let template = handlebars.compile(templateSource);
let outputString = template(parameterValues);

console.log(`Result:\n${outputString}`);

let fileNameOutput = prompt('Save file as? ');
fs.writeFile(`./${fileNameOutput}`, outputString, (err) => {
    if(err){
        console.error(`Failed to write to file: ${fileNameOutput}`);
    }
});

console.log(`run template with: aws cloudformation create-stack --stack-name STACK-NAME --template-body file://${fileNameOutput}`);