
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,Additional_Ground,InvisibleGround;
var play = 1;
var end = 0;
var scoretime = 0,score = 0,gameState = play;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided =loadImage("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
createCanvas(600,400);
  monkey = createSprite(80,317,20,20);
   monkey.addAnimation("running monkey",monkey_running);
   monkey.scale = 0.1
 // monkey.lifetime = 100
  
  ground = createSprite(200,350,800,5);
  ground.shapeColor = 'green'
  invisibleGround = createSprite(200,355,800,5);
  invisibleGround.visible = false;
  Additional_Ground = createSprite(200,377.5,800,50)
  Additional_Ground.shapeColor = 'green';
  
  obstaclesGroup = new Group();
  bananasGroup = new Group  ();
  
  bananasGroup.setLifetimeEach = 150;
  obstaclesGroup.setLifetimeEach = 150; 
}


function draw() {
  background("skyblue");
  
  text("Survival Time = "+ scoretime,400,50);
  text("Score = "+ score,200,50)
  
  
  
   if(gameState === play){
    if (frameCount % 40 === 0){
    scoretime = scoretime + 1
    }
     spawnObstacles();
  spawnBananas();
     
    if(obstaclesGroup.isTouching(monkey)){
    // obstaclesGroup.destroyEach() ;
     //bananasGroup.destroyEach();
      gameState = end;
   }
       if(bananasGroup.isTouching(monkey)){
     bananasGroup.destroyEach();  
         score = score + 1;
   }
     if(ground.x < 0 ){
  ground.velocityX = scoretime+ground.width/2
  } 
   
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  
  if(keyDown('space') && monkey.y >= 310 ){
  monkey.velocityY = -13;     
       
   }
  
  }
  monkey.collide(invisibleGround);
  
  
  if(gameState === end){
 bananasGroup.setLifetimeEach = (-1);
     obstaclesGroup.setLifetimeEach = (-1);
    obstaclesGroup.setVelocityEach(0,0);
    bananasGroup.setVelocityEach(0,0);
    monkey.setVelocity(0,0);
  //  frameCount = 0;
    
    text("click R to restart",250,150); 
    if(keyDown("r")){
      reset();
    }
      
    
  }
  
  drawSprites();
  
}

function spawnObstacles(){

  if(frameCount % 150 === 0){

  obstacle = createSprite(600,335,20,20);
  obstacle.addImage("obstaclestring",obstacleImage);
  obstacle.scale = 0.07;
  obstacle.velocityX = -(4+scoretime);
    
    obstaclesGroup.add(obstacle);

  }
}
function spawnBananas(){
 
  if(frameCount % 100 === 0){

   var randY = Math.round(random(230,270)); 
  banana = createSprite(600,250,20,20);
  banana.addImage("bananastring",bananaImage);
  banana.scale = 0.07;
  banana.velocityX = -(4+scoretime);
    banana.y = Math.round(random(230,270));
 
    
    bananasGroup.add(banana);
  }
}
function reset(){
      gameState = play
      obstaclesGroup.destroyEach();
     bananasGroup.destroyEach();
  scoretime = 0;
  score = 0;
}






