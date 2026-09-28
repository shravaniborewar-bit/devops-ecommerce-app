pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling latest code from GitHub...'
            }
        }
        
        stage('Test Application') {
            steps {
                echo 'Running unit tests...'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker container image...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}