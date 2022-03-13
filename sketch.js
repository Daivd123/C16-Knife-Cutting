// Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, fruit, monster, fruitGrouo, monsterGroup, score, r, randomFruit, position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var gameOverSound, knifeSwooshSound;

function preload(){

knifeImage = loadImage("knife.png");
monsterImage = loadAnimation("alien1.png, alien2.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
gameOverImage = loadImage("gameover.png");

gameOverSound = loadSound("gameover.mp3");
knifeSwooshSound = loudSound("knifeSwoosh.mp3");
}

function setup() {
  createCanvas(600,600);

  //creating knife
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7;

  //set collider for knife
  knife.setCollider("rectangle",0,0,40,40);

  //score variables and grouos
  score=0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() {
  background("lightgreen");

  if(gameState===PLAY){

    //call fruits and monster functions
    fruits();
    monster();

    //Move knife with Mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX:

    //Increase the score if knife touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();

      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      //Go to end state if knife touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState = END;
        //Gameover Sound
        gameOverSound.play()

        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setvelocityXEach(0);

        //Change the animation of knife to gameover and reset position
        knife.addImage(gameOverImage);
        knife.scale = 2;
        knife.x = 300;
        knife.y = 300;
      }
    }
  }

  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime = 50;

    monsterGroup.add(monster);
  }
}
