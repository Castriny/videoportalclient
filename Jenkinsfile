node {

    def stage_server = 'ec2-18-194-97-230.eu-central-1.compute.amazonaws.com'
    def stage_user = 'ubuntu'
    def stage_www_path = '/var/www/html'
    def key_path = '/home/castriny/Downloads/myvisitplacede.pem '


    stage('Preparation') {
    deleteDir()
      git credentialsId: 'e597e8db-e0b1-4f73-8cca-db9e26c8149b', url: 'https://github.com/Castriny/videoportalclient.git'
    }
    stage('NPM Install') {
      sh 'npm set progress=false'
       sh 'npm install'
       sh 'npm rebuild node-sass'
       sh 'npm prune'
    }
    stage('Build App') {
     sh 'ng build --target=production --environment=prod --progress=false --extract-css'
    }
    stage('Build Artifact') {
       sh "tar -zcvf '/projects/Builds/myvisitplace.client.${env.BUILD_NUMBER}.tar.gz' './dist'"
    }
    stage('Tests') {
    }
    stage('Deploy Production') {

    sshagent(['b900e0c1-f969-4f7f-af26-6eee1084e7f7']) {


    //sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' rm -rf client-'${env.BUILD_NUMBER}'"
    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' mkdir client-'${env.BUILD_NUMBER}'"
    sh "scp /projects/Builds/myvisitplace.client.'${env.BUILD_NUMBER}'.tar.gz '${stage_user}'@'${stage_server}':~/buildartifacts"
    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' tar -xvzf ./buildartifacts/myvisitplace.client.'${env.BUILD_NUMBER}'.tar.gz -C ./client-'${env.BUILD_NUMBER}' --strip-components=2"
    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' rm ./buildartifacts/myvisitplace.client.'${env.BUILD_NUMBER}'.tar.gz"

    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' sudo rm -rf /var/www/html/client"
    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' sudo mv ./client-'${env.BUILD_NUMBER}' /var/www/html/client"

    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' sudo cp ./.htaccess /var/www/html/client/"
    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' sudo chown www-data:www-data /var/www/html/client/ -R"
    sh "ssh -vvv -o StrictHostKeyChecking=no '${stage_user}'@'${stage_server}' sudo chmod 655 /var/www/html/client/.htaccess"

    }

       sh "echo '${env.BUILD_NUMBER}'"
    }
}