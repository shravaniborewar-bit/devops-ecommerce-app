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
                echo 'Running application health check test...'
                sh 'ls -la server.js'
            }
        }

        stage('Build & Package') {
            steps {
                echo 'Packaging application build artifacts...'
                sh 'echo "Build complete for devops-ecommerce-app"'
            }
        }

        stage('Simulate Container Deployment') {
            steps {
                echo 'Deploying application service...'
                sh 'echo "Application deployed successfully to staging environment!"'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Continuous Integration & Deployment pipeline completed!'
        }
        failure {
            echo 'FAILURE: Pipeline run failed. Check build logs.'
        }
    }
}