pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling code from GitHub...'
                checkout scm
            }
        }

        stage('Test Application') {
            steps {
                echo 'Testing Node.js app response...'
                sh 'node -v'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building local Docker container image...'
                sh 'docker build -t devops-ecommerce-app:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Stopping existing container if running...'
                sh 'docker stop ecommerce-prod || true'
                sh 'docker rm ecommerce-prod || true'
                
                echo 'Deploying fresh Docker container...'
                sh 'docker run -d -p 3000:3000 --name ecommerce-prod devops-ecommerce-app:latest'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Continuous Integration & Deployment completed!'
        }
        failure {
            echo 'FAILURE: Pipeline run failed. Check build logs.'
        }
    }
}