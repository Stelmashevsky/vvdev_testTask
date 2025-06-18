// Создаю класс питомца

class Pet {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.health = 100;
    this.hunger = 0;
    this.mood = 50;  
    this.status = 'alive';
  }

  //Трек-функция состояния питомца с тремя параметрами
  updateStatus() { 
    if (this.health <= 0 || this.hunger >= 100) {
      this.status = 'dead';
    } else if (this.health <= 30 && this.health > 0) {
      this.status = 'sick';
    } else {
      this.status = 'alive';
    }
  }


  // Задание #3: игровая механика

  //функция расчета настроения

  updateMood() { 
    this.mood = Math.floor((this.health + (100 - this.hunger)) / 2);
    this.mood = Math.max(0, Math.min(100, this.mood));
  }

  //Непосредственно механика
  gameMechanics() { 
    this.age++;
    this.health -= (this.hunger > 70) ? 5 : 2;
    this.hunger += 3;

    this.health = Math.max(0, Math.min(100, this.health));
    this.hunger = Math.max(0, Math.min(100, this.hunger));


    this.updateMood();
    this.updateStatus();
  }
}


//Модуль myPet готов для экспортирования, использую exports для вызова в другом месте

module.exports = Pet;

