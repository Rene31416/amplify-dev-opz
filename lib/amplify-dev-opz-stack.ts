import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export class  AmplifyFrontendDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Create an Amplify App
    const amplifyApp = new amplify.App(this, "FrontendApp", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "Rene31416",
        repository: "dev-opz-frontend",
        oauthToken: cdk.SecretValue.secretsManager('prod/amplify/token'),
      }),
    });

    console.log(cdk.SecretValue.secretsManager('prod/amplify/token'))

    // Add a branch to deploy
    const mainBranch = amplifyApp.addBranch("main");

    // Output the Amplify URL after deployment
    new cdk.CfnOutput(this, "AmplifyAppUrl", {
      value: `https://${mainBranch.branchName}.${amplifyApp.appId}.amplifyapp.com`,
      description: "Amplify Hosted Frontend URL",
    });
  }
}