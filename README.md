

# 🚀 Simple CI/CD Pipeline with Jenkins

This project automates a CI/CD pipeline using **Jenkins** to lint, test, build, and deploy a Node.js REST API to **AWS Elastic Beanstalk** using Docker.

---

## 📦 Prerequisites

* **Node.js**: Version `20.x`
* **Docker**: Installed and configured on the Jenkins server
* **Docker Hub Account**: Username `neebahassan`
* **AWS Account**: With Elastic Beanstalk access
* **GitHub Repo**: [https://github.com/reehassan/02\_Jenkins\_CICD](https://github.com/reehassan/02_Jenkins_CICD)
* **Jenkins**: With required plugins installed
* **AWS EB CLI**: Installed on the Jenkins host

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/reehassan/02_Jenkins_CICD.git
cd 02_Jenkins_CICD
```

Ensure these files are present:
`.gitignore`, `Dockerfile`, `Dockerrun.aws.json`, `Jenkinsfile`, `README.md`, `package.json`, `package-lock.json`, `index.js`, `tests/index.test.js`

---

### 2️⃣ Set Up Docker Hub

1. Log in to Docker Hub as `neebahassan`
2. Generate an **access token**:
   *Account Settings → Security → Access Tokens*
3. Add credentials in Jenkins:
   `Manage Jenkins → Manage Credentials → (global) → Add Credentials`

   * Kind: `Username with password`
   * ID: `dockerhub-credentials`
   * Username: `neebahassan`
   * Password: your access token

---

### 3️⃣ Set Up AWS Elastic Beanstalk

1. **Create an Elastic Beanstalk Application**:

   * App Name: `simple-cicd-node-app`
   * Env Name: `SimpleCicdNodeApp-env`
   * Platform: `Docker`

2. **Create IAM User**:

   * Go to IAM → Users → Create user (e.g., `jenkins-eb-user`)
   * Attach policy: `AdministratorAccess-AWSElasticBeanstalk`
   * Generate **Access Key ID** and **Secret**

3. **Add AWS Credentials to Jenkins**:

   * Kind: `AWS Credentials`
   * ID: `aws-eb-credentials`
   * Access Key ID / Secret from step above

---

### 4️⃣ Install and Configure Jenkins

#### 🔹 Install Jenkins on Debian

```bash
sudo apt update
sudo apt install -y openjdk-11-jdk
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list
sudo apt update
sudo apt install -y jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

#### 🔹 Unlock Jenkins

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

#### 🔹 Install Required Plugins

* Docker
* Docker Pipeline
* Pipeline: AWS Steps

---

### 5️⃣ Install Node.js 20 with NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20
nvm alias default 20
```

#### Configure for Jenkins User:

```bash
sudo -u jenkins bash -c 'echo "export NVM_DIR=\"$HOME/.nvm\"" >> ~/.bashrc'
sudo -u jenkins bash -c 'echo "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"" >> ~/.bashrc'
sudo -u jenkins bash -c 'echo "nvm use default" >> ~/.bashrc'
```

---

### 6️⃣ Install AWS EB CLI & Docker

```bash
sudo apt install -y docker.io
sudo usermod -aG docker jenkins
python3 -m venv ~/.venvs/ebcli
source ~/.venvs/ebcli/bin/activate
pip install awsebcli
sudo systemctl restart jenkins
```

#### Verify Installations:

```bash
node --version      # v20.x.x
npm --version
docker --version
~/.venvs/ebcli/bin/eb --version
```

---

### 7️⃣ Configure Jenkins Pipeline

1. Go to: **Jenkins Dashboard → New Item**
2. Name: `simple-cicd-node-app`
3. Type: `Pipeline`
4. Pipeline config:

   * Definition: `Pipeline script from SCM`
   * SCM: `Git`
   * Repo URL: `https://github.com/reehassan/02_Jenkins_CICD.git`
   * Branch: `main`
   * Script Path: `Jenkinsfile`

---

### 8️⃣ Add GitHub Webhook (Optional)

1. GitHub → `Repo → Settings → Webhooks → Add Webhook`
2. Payload URL: `http://<your-jenkins-host>:8080/github-webhook/`
3. Content type: `application/json`
4. Trigger: Just the push event

---

### 9️⃣ Test Locally

```bash
cd 02_Jenkins_CICD
npm install
npm run lint
npm test
npm start
```

Visit: [http://localhost:3000/hello](http://localhost:3000/hello) → `{"message": "Hello, World!"}`

---

### 🔟 Run the CI/CD Pipeline

```bash
git add .
git commit -m "Trigger pipeline"
git push origin main
```

Check Jenkins job console output:

* ✅ Checkout
* ✅ Install Dependencies
* ✅ Lint
* ✅ Test
* ✅ Build Docker Image
* ✅ Push to Docker Hub
* ✅ Deploy to Elastic Beanstalk

Visit:
`http://<ElasticBeanstalk-URL>/hello`

---

## 📁 Project Structure

```
.
├── .gitignore
├── Dockerfile
├── Dockerrun.aws.json
├── Jenkinsfile
├── README.md
├── index.js
├── package.json
├── package-lock.json
└── tests/
    └── index.test.js
```

---

## 🔄 CI/CD Pipeline Flow

The Jenkins pipeline performs the following:

1. **Checkout** source code from GitHub
2. **Install** dependencies with npm
3. **Lint** code using ESLint
4. **Run** tests using Jest
5. **Build** Docker image
6. **Push** image to Docker Hub
7. **Deploy** to AWS Elastic Beanstalk via EB CLI

⏱️ **Total Execution Time:** \~2–3 minutes

---

## 🛠️ Troubleshooting

| Issue                     | Solution                                        |
| ------------------------- | ----------------------------------------------- |
| Node not found            | Use NVM for Jenkins + set it in `.bashrc`       |
| Linting fails             | Run `npm run lint -- --fix`                     |
| Tests fail                | Ensure server is closed in tests                |
| Docker push fails         | Check Docker credentials in Jenkins             |
| EB CLI not found          | Activate venv or install globally               |
| Jenkins permission errors | Check `jenkins` user has Docker and node access |

---

## 🏆 Achievements

* ✅ End-to-end CI/CD automation using Jenkins
* ✅ Zero-click deployment to AWS Elastic Beanstalk
* ✅ Built with ESLint, Jest, Docker, and GitHub integration
* ✅ Pipeline execution in under 3 minutes

---

## 💡 Why This Matters

This project gives you real-world exposure to:

* Jenkins pipelines
* AWS Beanstalk deployments
* CI/CD best practices
* Dockerized Node.js workflows

Perfect prep for advanced tools like GitHub Actions, ArgoCD, or Tekton.
