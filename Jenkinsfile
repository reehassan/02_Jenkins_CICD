pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    DOCKER_IMAGE = "neebahassan/02_jenkins_cicd:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/reehassan/02_Jenkins_CICD.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${env.DOCKER_IMAGE} ."
      }
    }

    stage('Push Docker Image') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        sh "docker push ${env.DOCKER_IMAGE}"
      }
    }

    stage('Deploy to Elastic Beanstalk') {
      steps {
        sh 'eb init -p docker simple-cicd-node-app --region us-east-1'
        sh 'eb use SimpleCicdNodeApp-env'
        sh 'eb deploy'
      }
    }
  }

  post {
    always {
      node {
        script {
          sh "docker rmi ${env.DOCKER_IMAGE} || true"
        }
      }
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}