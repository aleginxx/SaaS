# solveMyProblem

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Docker](https://img.shields.io/badge/Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)
![Apache JMeter](https://img.shields.io/badge/Apache%20JMeter-D22128?style=for-the-badge&logo=apache-jmeter&logoColor=white)

GitHub repository for solveMyProblem, a SaaS application for solving computational problems using google's OR tools.

## Team Members

- Georgia Alexopoulou | el20164
- David Prasinos      | el20899
- Christos Kavallaris | el20044

### Installation

#### Requirements

Ensure you have the following installed:

- MongoDB (and MongoDB Compass)
- Apache Kafka
- Node.js and npm (for JavaScript dependencies)
- Python (for OR tools and other functionalities)
- Docker

### Setup

1. **Clone the repository:**

```bash
git clone https://github.com/ntua/saas2024-36.git
cd solveMyProblem
```

2. **Install dependencies**:
First, install Python dependencies specified in requirements.txt.

```bash
pip install -r requirements.txt
```

3. **Run MongoDB:**
Start MongoDB server.

```bash
mongod
```

4. **Start microservices:**

```bash
npm install
npm start
```

   You can now access the web app through the link: localhost:3000/solvemyproblem

#### Docker

solveMyProblem is Dockerized for easy deployment.

1. **Build and run Docker containers:**
   
```bash
docker-compose up --build
```
   This commmand builds the Docker images and starts the containers defined in `docker-compose.yml`. The containers refer to the microservices (one for each), the mongoDB server, as well as the frontend.

2. **Verify container status:**
Run the following command in order to verify that all the necessary containers are running:

```bash
docker ps
```

Ensure containers for MongoDB, frontend and microservices are active.
  - mongodb
  - frontend-service-1
  - credit-card-service-1
  - tools-service-1
  - transactions-service-1
  - user-service-1
  - problem-service-1
  - solutions-service-1

You now should be able to properly access the web app on your computer. Below is the array assigning each `localhost` port to the service in the HOST machine:

  | SERVICE | PORT |
  | ------- | ---- |
  | MongoDB | 27017 |
  | Frontend | 3000 |
  | Microservices | 3001-3006 |

### License

This project is licensed under the MIT License. See the LICENSE file for more details.