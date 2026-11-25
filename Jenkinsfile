pipeline {
  agent any
  environment {
    HUB = 'palaksh16'
    TAG = "${env.BUILD_NUMBER}"
  }
  stages {
    stage('Build Images') {
      steps {
        sh 'docker build -t $HUB/blushe-frontend:$TAG Frontend'
        sh 'docker build -t $HUB/blushe-backend:$TAG Backend'
      }
    }
    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
            usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh '''
            echo $DH_PASS | docker login -u $DH_USER --password-stdin
            docker push $HUB/blushe-frontend:$TAG
            docker push $HUB/blushe-backend:$TAG
          '''
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
          sh '''
            kubectl set image deployment/blushe-frontend blushe-frontend=$HUB/blushe-frontend:$TAG
            kubectl set image deployment/blushe-backend blushe-backend=$HUB/blushe-backend:$TAG
            kubectl rollout status deployment/blushe-frontend --timeout=180s
            kubectl rollout status deployment/blushe-backend --timeout=180s
          '''
        }
      }
    }
  }
  post {
    failure {
      withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
        sh 'kubectl rollout undo deployment/blushe-frontend || true'
        sh 'kubectl rollout undo deployment/blushe-backend || true'
      }
    }
  }
}
