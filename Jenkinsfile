pipeline {
  agent  {
    label 'nodejs-18'
  }

  options {
    timeout(time: 120, unit: 'MINUTES')
  }

  environment {
    IMAGE = "registry.tools.orange-sonatel.com/dif/isc/dashboard-dg-front"
    VERSION = getVersionFromBranch(env.BRANCH_NAME)
    NAME = 'dashboard-dg-front'
    PORT = 3000
    APP_TYPE = 'react-app'
    APP_NAME = 'DASHBOARD_DG'
    AGENT = getAgentFromBranch(env.BRANCH_NAME)
    APP_ENV = getAppEnvFromBranch(env.BRANCH_NAME)
    DEST_ENV = getEnvFromBranch(env.BRANCH_NAME)
    ENV_DEV = 'dsidashboarddg-isoprod'
    ENV_REC = 'dsidashboarddg-prod'
    PROFILE = getProfileFromBranch(env.BRANCH_NAME)
    DOCKER_IMG_TYPE = 'sonatel-docker-image'
  }

  /*tools {
    nodejs 'nodejs-16.13.1'
    maven 'Maven_3.3.9'
  }*/

  stages {

    /*stage('Install dependencies') {
      steps {
        //sh 'set +ex ; export NVM_DIR="$HOME/.nvm"; . ~/.nvm/nvm.sh; . ~/.profile ;nvm install v16.14.0; nvm use v16.14.0'
        //sh 'npm install -g yarn'
      }
    }*/
    
    stage('Project Build') {
      steps { 
      	//sh 'yarn cache clean'
        //sh 'yarn install'
        //sh 'yarn run build'
        stash includes: '**/*', name: 'target'
      }
    }

    stage('Build Docker image') {
      agent  { label 'docker-builder' }
      options { skipDefaultCheckout() }
      steps {
        sh 'docker ps -qa -f name=${NAME} | xargs --no-run-if-empty docker rm -f'
        sh 'docker images -f reference=${IMAGE} -qa | xargs --no-run-if-empty docker rmi'
        sh 'rm -rf target/'

        unstash 'target'
        sh 'ls -l'
        sh 'docker build --build-arg="APP_ENV=${APP_ENV}" --no-cache=true -t ${IMAGE}:${VERSION} .'
        sh 'docker push ${IMAGE}:${VERSION}'
      }
    }

    // ... Rest of your Jenkinsfile ...

    stage('Maalaw - Deploy') {
      when {anyOf { branch 'master'; branch 'staging'; branch 'pprod'; branch 'develop' }}
      agent { label "${AGENT}" }
      steps {
        //Generate maven-resource-plugin param files"
          script {
            openshift.withCluster() {
              openshift.withProject("${DEST_ENV}") {
                //Process spring-boot-image-docker-mysqldb template for app deployment
                def created = openshift.raw("apply", "-f ./openshift/deployment/${PROFILE}-deployment.json")
                openshift.selector("dc", "${NAME}").rollout().status()
              }
            }
          }
      }
    }
  }
  // ... Rest of your Jenkinsfile ...

  post {
    changed {
      emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: 'salifabdoul.sow1@orange-sonatel.com'
    }
    /*always {
      sh 'mvn clean'
      cleanWs()
    }*/
    failure {
      emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: 'salifabdoul.sow1@orange-sonatel.com'
    }
  }
}


def static getAgentFromBranch(branch) {
    if ( branch == 'release' || branch == 'master') {
        return 'malaw4-prod-bm'
    } else {
        return 'malaw4-rec'
    }
}
def static getAppEnvFromBranch(branch) {
    if (branch == 'master' || branch == 'release') {
        return 'prod'
    } else {
        return 'dev'
    }
}
def static getAppDebugFromBranch(branch) {
    if (branch == 'master' || branch == 'release') {
        return false
    } else {
        return true
    }
}

def static getEnvFromBranch(branch) {
    String destination = "";
    switch(branch) {
        case 'master':
            destination = "dsidashboarddg-prod"
            break;
        case 'release':
            destination = "dsidashboarddg-isoprod"
            break;
        default:
            destination = "dstminiapp-rec"
            break;
     }

     return destination
}
def static getVersionFromBranch(branch) {
    String version = "";
    switch(branch) {
        case 'master':
            version = "1.0"
            break;
        case 'release':
            version = "0.3"
            break;
        default:
            version = "0.1"
            break;
    }

    return version
}

def static getProfileFromBranch(branch) {
    String profile = "";
    switch(branch) {
        case 'master':
            profile = "prod"
            break;
        case 'release':
            profile = "isoprod"
            break;
        default:
            profile = "develop"
            break;
     }

     return profile
}
