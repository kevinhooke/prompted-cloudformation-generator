# prompted-cloudformation-generator

Generates AWS CloudFormation templates by prompting the user for required values for specified resource type

## Use provided or create your own template
Each AWS resource type requires a pair of template files:

- [resource-name].template : this is a handlebars style template for the CloudFormation file to be generated
- [resource-name].template.prompts.json : this is a JSON file containing an array of parameters that the user will be prompted to enter

## DyanmoDB example

dynamodb.template

    AWSTemplateFormatVersion: "2010-09-09"
    Resources: 
      {{tableResourceName}}: 
        Type: AWS::DynamoDB::Table
        Properties: 
          AttributeDefinitions: 
            - 
              AttributeName: "{{hashKeyName}}"
              AttributeType: "{{hashKeyType}}"
            - 
              AttributeName: "{{rangeKeyName}}"
              AttributeType: "{{rangeKeyType}}"
          KeySchema: 
            - 
              AttributeName: "{{hashKeyName}}"
              KeyType: "HASH"
            - 
              AttributeName: "{{rangeKeyName}}"
              KeyType: "RANGE"
          ProvisionedThroughput: 
            ReadCapacityUnits: "{{readCapacity}}"
            WriteCapacityUnits: "{{writeCapacity}}"
          TableName: "{{tableName}}"


dynamodb.template.prompts.json

    [
        {
            "variableName": "tableName",
            "variableType": "string"
        },
        {
            "variableName": "tableResourceName",
            "variableType": "string"
        },
        {
            "variableName": "hashKeyName",
            "variableType": "string"
        },
        {
            "variableName": "hashKeyType",
            "variableType": "string"
        },
        {
            "variableName": "rangeKeyName",
            "variableType": "string"
        },
        {
            "variableName": "rangeKeyType",
            "variableType": "string"
        },
        {
            "variableName": "readCapacity",
            "variableType": "number"
        },
        {
            "variableName": "writeCapacity",
            "variableType": "number"
        }   
    ]

# Current Limitations / Future Enhancements

- doesn't currently support prompting/generation of repeating attributes, e.g. each parameter in the [name].template.prompts.json is used to prompt
the user one time only (no repetition).
