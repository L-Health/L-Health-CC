const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const CORS = require('cors');
const crypto = require('crypto');
const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const app = express();

let model;

async function loadModel() {
  try {
      const modelUrl = process.env.MODEL_URL;
      if (!modelUrl) {
          throw new Error('MODEL_URL is not defined in the environment variables');
      }
      console.log('Loading model from', modelUrl);
      model = await tf.loadLayersModel(modelUrl);
      console.log('Model loaded successfully');
  } catch (error) {
      console.error('Error loading model:', error);
  }
}

loadModel();

const symptomMapping = {
  "Rasa terbakar di dada": 0,
  "Rasa mual/muntah": 1,
  "Rasa Kembung": 2,
  "Sakit Perut/kram": 3,
  "Kesulitan Menelan Makanan": 4,
};

const breakfastMapping = {
  "kuah": 0,
  "goreng": 1,
  "panggang": 2,
  "pedas": 3,
  "asin": 4,
  "gurih": 5,
};

const lunchMapping = {
  "kuah": 0,
  "goreng": 1,
  "panggang": 2,
  "pedas": 3,
  "asin": 4,
  "gurih": 5,
};

const dinnerMapping = {
  "kuah": 0,
  "goreng": 1,
  "panggang": 2,
  "pedas": 3,
  "asin": 4,
  "gurih": 5,
};

const obesityMapping = {
  "Ya": 0,
  "Tidak": 1,
};

app.use(CORS());
app.use(bodyParser.json());

app.post('/api/predict', async (req, res) => {
  const { symptoms, food, obesity, dinner, breakfast, lunch } = req.body;

  console.log("Received input:", req.body);

  if (
    symptoms === undefined ||
    food === undefined ||
    obesity === undefined ||
    dinner === undefined ||
    breakfast === undefined ||
    lunch === undefined
  ) {
    return res.status(400).send('Missing input data');
  }

  const symptomsIndex = symptomMapping[symptoms];
  const foodIndex = breakfastMapping[breakfast] + lunchMapping[lunch] + dinnerMapping[dinner];
  const obesityIndex = obesityMapping[obesity];

  if (
    symptomsIndex === undefined ||
    foodIndex === undefined ||
    obesityIndex === undefined
  ) {
    return res.status(400).send('Invalid input data');
  }

  console.log("Indices:", { 
    symptomsIndex, 
    foodIndex, 
    obesityIndex
  });

  const input = tf.tensor2d([[
    symptomsIndex,
    foodIndex,
    obesityIndex
  ]]);

  try {
    const prediction = model.predict(input);
    const result = prediction.dataSync()[0];

    const recommendations = generateRecommendations(result);

    const newDate = new Date();
    
    const db = new Firestore();
    const id = crypto.randomBytes(16).toString('hex');
    const docRef = db.collection('predictions').doc(id);
    await docRef.set({
      id,
      symptoms,
      food,
      obesity,
      dinner,
      breakfast,
      lunch,
      result,
      recommendations,
      createdAt: newDate,
    });

    console.log('Prediction saved to Firestore:', { id, result, recommendations });

    res.json({ result, recommendations });
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).send('Error during prediction');
  }
});

function generateRecommendations(result) {
  const recommendations = [];
  
  if (result > 0.8) {
    recommendations.push("Consult a doctor immediately.");
  } else if (result > 0.5) {
    recommendations.push("Consider changing your diet and monitor symptoms.");
  } else {
    recommendations.push("Maintain a balanced diet and healthy lifestyle.");
  }

  recommendations.push("Avoid spicy and oily foods.");
  recommendations.push("Include more vegetables and fruits in your diet.");
  recommendations.push("Stay hydrated and avoid stress.");

  return recommendations;
}

const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and host ${HOST}`);
});
