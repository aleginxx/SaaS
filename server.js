const { exec } = require('child_process');
const path = require('path');
const { spawn } = require('child_process');


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();



const runCommand = (command, servicePath) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { cwd: servicePath, shell: true });

    child.stdout.on('data', (data) => {
      console.log(`Output from ${servicePath}: ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`Error from ${servicePath}: ${data}`);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code} in ${servicePath}`));
      } else {
        resolve();
      }
    });
  });
};

// Paths to your microservice directories
const services = [
  path.join(__dirname, 'microservices/user-service'),
  path.join(__dirname, 'microservices/credit-card-service'),
  path.join(__dirname, 'microservices/transactions-service'),
  path.join(__dirname, 'microservices/tools-service'),
  path.join(__dirname, 'microservices/problem-service'), 
  path.join(__dirname, 'microservices/solutions-service')
];

const startServices = async () => {
  const startPromises = services.map(servicePath => runCommand('npm start', servicePath));
  await Promise.all(startPromises);
};



startServices().catch(err => console.error('Error starting services:', err));
