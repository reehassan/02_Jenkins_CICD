Simple CI/CD Pipeline with Jenkins
This project demonstrates automating a CI/CD pipeline using Jenkins to lint, test, build, and deploy a Node.js REST API to AWS Elastic Beanstalk.
Prerequisites

Node.js: Version 20 (LTS).
Docker: Installed on the Jenkins server.
Docker Hub Account: For storing Docker images.
AWS Account: With Elastic Beanstalk access.
GitHub Account: For hosting the repository.
Jenkins: Installed and configured with Docker and AWS CLI plugins.
EB CLI: Installed on the Jenkins server for Elastic Beanstalk deployment.

Setup Instructions
1. Create GitHub Repository

Go to GitHub and create a new repository named simple-cicd-node-app.
Clone the repository locally:git clone https://github.com/YOUR_USERNAME/simple-cicd-node-app.git
cd simple-cicd-node-app


Copy the project files into the repository, commit, and push:git add .
git commit -m "Initial commit with CI/CD pipeline"
git push origin main



2. Set Up Docker Hub

Create a Docker Hub account at Docker Hub.
Generate an access token in Docker Hub under Account Settings > Security.
In Jenkins, go to Manage Jenkins > Manage Plugins and install the Docker plugin.
Add Docker Hub credentials in Jenkins:
Go to Manage Jenkins > Manage Credentials.
Add a new credential with ID dockerhub-credentials, username (Docker Hub username), and password (access token).



3. Set Up AWS Elastic Beanstalk

Log in to the AWS Management Console.
Navigate to Elastic Beanstalk and create a new application:
Application name: simple-cicd-node-app.
Environment name: SimpleCicdNodeApp-env.
Platform: Docker.
Use default settings for simplicity.


Create an IAM user with Elastic Beanstalk permissions:
Go to IAM > Users > Create User.
Attach the AWSElasticBeanstalkFullAccess policy.
Generate access keys for the user.


In Jenkins, add AWS credentials:
Go to Manage Jenkins > Manage Credentials.
Add credentials with ID aws-access-key-id (access key) and aws-secret-access-key (secret key).



4. Set Up Jenkins

Install Jenkins on a server (e.g., Ubuntu):sudo apt update
sudo apt install openjdk-11-jdk -y
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins


Access Jenkins at http://YOUR_SERVER_IP:8080 and complete the setup.
Install required plugins: Docker, Docker Pipeline, AWS CLI.
Install EB CLI on the Jenkins server:pip install awsebcli


Configure a Jenkins pipeline:
Create a new pipeline job in Jenkins.
Set the pipeline to use the Jenkinsfile from the GitHub repository.
Configure the GitHub webhook to trigger builds on push:
In GitHub, go to Settings > Webhooks > Add webhook.
Set Payload URL to http://YOUR_JENKINS_URL/github-webhook/.
Select application/json and enable Push events.





5. Project Structure

.gitignore: Ignores node_modules and other unnecessary files.
Dockerfile: Builds the Docker image for the app.
Dockerrun.aws.json: Configures Elastic Beanstalk for Docker deployment.
Jenkinsfile: Defines the Jenkins CI/CD pipeline.
README.md: Documents the project and setup.
package.json: Node.js dependencies and scripts.
index.js: Node.js Express REST API with /hello endpoint.
.eslintrc.json: ESLint configuration.
tests/index.test.js: Jest tests for the /hello endpoint.

6. Run Locally

Install dependencies:npm install


Run linting:npm run lint


Run tests:npm test


Start the app:npm start


Access http://localhost:3000/hello to see {"message": "Hello, World!"}.

CI/CD Pipeline
The Jenkins pipeline (Jenkinsfile) runs on push to the main branch and:

Checks out the code from GitHub.
Installs Node.js dependencies.
Runs ESLint for code quality.
Runs Jest tests.
Builds and pushes the Docker image to Docker Hub.
Deploys to AWS Elastic Beanstalk using EB CLI.

Pipeline Execution Time: Approximately 2-3 minutes (depending on network and AWS).

Troubleshooting

Linting Errors: Fix ESLint issues with npm run lint -- --fix.
Test Failures: Ensure tests pass locally with npm test.
Docker Push Fails: Verify Docker Hub credentials in Jenkins.
AWS Deployment Fails: Check AWS credentials and Elastic Beanstalk environment status.
Jenkins Build Fails: Ensure Docker and EB CLI are installed on the Jenkins server.

Achievements

Automated CI/CD pipeline with under 3-minute execution.
Deployed a Node.js app to AWS Elastic Beanstalk with zero manual intervention.
Integrated linting (ESLint) and testing (Jest) into the pipeline.

Why This Helps
This project introduces CI/CD concepts with Jenkins, preparing you for advanced pipelines like ArgoCD or Tekton, and simplifies AWS deployment with Elastic Beanstalk.