pipeline {
  agent any // Run on any available Jenkins agent

  environment {
    // Define Docker Hub credentials
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    // Define AWS credentials
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    // Docker image name
    DOCKER_IMAGE = "neebahassan/02_jenkins_cicd:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        // Checkout code from GitHub
        git branch: 'main', url: 'https://github.com/reehassan/02_Jenkins_CICD.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        // Install Node.js dependencies
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        // Run ESLint for code quality
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        // Run Jest tests
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        // Build Docker image
        sh "docker build -t ${DOCKER_IMAGE} ."
      }
    }

    stage('Push Docker Image') {
      steps {
        // Log in to Docker Hub and push image
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        sh "docker push ${DOCKER_IMAGE}"
      }
    }

    stage('Deploy to Elastic Beanstalk') {
      steps {
        // Deploy to AWS Elastic Beanstalk using EB CLI
        sh 'eb init -p docker simple-cicd-node-app --region us-east-1'
        sh 'eb use SimpleCicdNodeApp-env'
        sh 'eb deploy'
      }
    }
  }

  post {
    always {
      // Clean up Docker images
      sh "docker rmi ${DOCKER_IMAGE} || true"
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}