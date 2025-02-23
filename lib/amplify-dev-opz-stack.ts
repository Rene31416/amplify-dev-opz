import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from "@aws-cdk/aws-amplify-alpha"
import * as sm from "aws-cdk-lib/aws-secretsmanager"
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path'
import { Code, Handler, Runtime } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AmplifyDevOpzStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const secret = sm.Secret.fromSecretAttributes(this, "ImportedSecret", {
      secretCompleteArn:
        "arn:aws:secretsmanager:us-east-1:179086988825:secret:prod/amplify/token-gyw4Jn"
      // If the secret is encrypted using a KMS-hosted CMK, either import or reference that key:
      // encryptionKey: ...
    });

    console.log(secret.secretValue)

    const testingLAmbda = new NodejsFunction(this, 'testingLambda', {
      runtime: Runtime.NODEJS_18_X,
      functionName:'testingLambda',
      handler: 'handler.handler',
      code: Code.fromAsset(path.join(__dirname, "../dist/")),
      environment:{
        SECRET_VALUE: secret.secretValue.toString()
      }
    })
    /*
    const amplifyApp = new amplify.App(this, 'MyApp', {
      sourceCodeProvider: new amplify.GitLabSourceCodeProvider({
        owner: '<user>',
        repository: '<repo>',
        oauthToken: secret.secretValue,
      }),
    });
    */
  }
}
