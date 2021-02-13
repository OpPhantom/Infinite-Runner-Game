var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
}

function setup() {  
  canvas = createCanvas(1350,650);
  space = createSprite(780,350,30,20);
  space.addImage(spaceImage);
  space.scale = 2;
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(800,600);
  spaceShip.setCollider("rectangle",15,50)
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 1;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  asteroidGroup.setColliderEach("rectangle", 100, 50)
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    score = score + 1;
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    asteroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(spaceShip.isTouching(asteroidGroup)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    fill("red");
    textSize(40);
    text("GAME OVER!",100,50);
    if(keyDown("space")) {
      gameState = instruction;
      space.velocityY = (5 + score/10);
      
    }
  }


  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("Georgia")
    textSize(50);
    text("_____SU____",500,50);
    text("Press space to start",500,250);
    text("There are hidden obstacels also",400,350);
    
    if(keyDown("space")) {
      gameState = play;
    } 
  }
}
  

function asteroids() {
  if(frameCount % 110 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1350)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = 0.1;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid2);
      asteroid.setCollider("rectangle", 0, 0, 200,100);
              break;
      case 2: asteroid.addImage(asteroid3);
      asteroid.setCollider("rectangle", 0, 0, 200,100);
      default: break;
    }
    asteroidGroup.add(asteroid);
  }
}