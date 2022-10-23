node {
  stage('========== Clone repository ==========') {
    checkout scm
    sh 'cd frontend'
  }
  stage('========== Build image ==========') {
    sh 'docker build -t frontend:frontend .'
  }
  stage('========== Deploy image ==========') {
    sh 'docker run -p 3000:3000 frontend:frontend'
  }
}
