node {

    def stage_server = 'ec2-18-194-97-230.eu-central-1.compute.amazonaws.com'
    def stage_user = 'ubuntu'
    def stage_www_path = '/var/www/html'
    def key_path = '/home/castriny/Downloads/myvisitplacede.pem '


    stage('Preparation') {
    //deleteDir()
       git credentialsId: 'e597e8db-e0b1-4f73-8cca-db9e26c8149b', url: 'https://github.com/Castriny/videoportalclient.git'
    }
    stage('NPM Install') {
       sh 'npm set progress=false'
       sh 'npm install --ignore-scripts'
        sh 'npm rebuild node-sass'
       sh 'npm prune'
    }
    stage('Build App') {
        sh 'ng build --target=production --environment=prod --progress=false'
    }
    stage('Build Artifact') {
       sh "tar -zcvf '/projects/Builds/myvisitplace.client.${env.BUILD_NUMBER}.tar.gz' './dist'"
    }
    stage('Tests') {
    }
    stage('Results') {
        
    sshagent(['b900e0c1-f969-4f7f-af26-6eee1084e7f7']) {


        // sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' rm -rf client;mkdir client"
        sh "scp /projects/Builds/myvisitplace.client.'${env.BUILD_NUMBER}'.tar.gz '${stage_user}'@'${stage_server}':~/buildartifacts"


    }

       sh "echo '${env.BUILD_NUMBER}'"
    }
}