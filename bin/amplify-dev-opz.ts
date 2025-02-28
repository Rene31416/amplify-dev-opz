#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AmplifyFrontendDeploymentStack } from "../lib/amplify-dev-opz-stack";

const app = new cdk.App();
new AmplifyFrontendDeploymentStack(app, "AmplifyFrontendDeploymentStack", {});
