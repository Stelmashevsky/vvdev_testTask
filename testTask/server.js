const express = require('express');
const app = express();
const Pet = require('./myPet');
const port = Math.floor(Math.random() * 1000 + 1); //рандомный порт

app.use(express.json()); 

let pet = null; //Хранение в памяти

// GET /pet
app.get('/pet', (req, res) => {
  if (!Pet) {
    return res.status(404).json({ error: 'Питомец не создан' });
  }
  res.json(pet);
});

// POST /pet
app.post('/pet', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Имя питомца обязательно' });
  }

  pet = new Pet(name);
  res.status(201).json({ message: 'Питомец создан', pet: pet });
});


// POST /pet/feed
app.post('/pet/feed', (req, res) => {
  if (!pet) {
    return res.status(404).json({ error: 'Питомец не создан' });
  }

  if (pet.status === 'dead') {
    return res.status(400).json({ error: 'Питомец мертв. Вы не можете его покормить.' });
  }

  pet.hunger = Math.max(0, pet.hunger - 30); 
  pet.mood = Math.min(100, pet.mood + 10);   
  pet.updateMood();  
  pet.updateStatus(); 
  res.json({ message: 'Питомец покормлен', pet: pet });
});


// POST /pet/heal
app.post('/pet/heal', (req, res) => {
  if (!pet) {
    return res.status(404).json({ error: 'Питомец не создан' });
  }

   if (pet.status === 'dead') {
    return res.status(400).json({ error: 'Питомец мертв. Вы не можете его лечить.' });
  }

  pet.health = Math.min(100, pet.health + 20); 
  pet.hunger = Math.max(0, pet.hunger - 10);   
  pet.updateMood();
  pet.updateStatus();
  res.json({ message: 'Питомец вылечен', pet: pet });
});

// POST /pet/play
app.post('/pet/play', (req, res) => {
  if (!pet) {
    return res.status(404).json({ error: 'Питомец не создан' });
  }

   if (pet.status === 'dead') {
    return res.status(400).json({ error: 'Питомец мертв. Вы не можете с ним играть.' });
  }

  pet.mood = Math.min(100, pet.mood + 15);   
  pet.hunger = Math.min(100, pet.hunger + 5);  
  pet.updateMood();
  pet.updateStatus();
  res.json({ message: 'Питомец счастлив', pet: pet });
});


// Запуск сервера на рандомном порте
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

setInterval(() => {
  if (pet) {
    pet.gameMechanics();
    console.log('Состояние питомца (auto update):', pet);
  }
}, 6000); 
