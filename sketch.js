//declaring variables
PLAY = 1;
END = 0;
var gameState = PLAY ; 

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var bg, bgImage;
var gameOver, reset;
var score

function preload()
{
  bgImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png",  "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
}

function setup() {
 // createCanvas(600, 600);
  
  var survivalTime=0;
  
  //creating the background
  bg = createSprite(0,0,600,600);
  bg.addImage("bg", bgImage);
  bg.scale = 2.5
  
  //creating the monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  //creating the ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
}

function draw() 
{
   background(255);
  //monkey.debug = true;
  
   // moving ground
    bg.velocityX = -3 

    if (bg.x < 10){
      bg.x = bg.width/2;
    }
  
   if (gameState===PLAY){
   if(ground.x<0) 
   {
    ground.x=ground.width/2;
   }
    
   if(monkey.isTouching(obstaclesGroup))
   {
   gameState = END;
   }
     
    if(keyDown("space") ) 
    {
      monkey.velocityY = -10;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
   }

    monkey.collide(ground);   
  
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  
    if(obstaclesGroup.isTouching(monkey))
    {
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.scale = 0.2;
      
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
      
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
  
    }
  
   if(gameState === END)
   {
   monkey.velocityY = 0;
   ground.velocityX = 0;
   bg.velocityX = 0;
     
   fill("white");
   text("SCORE: "+score,200,270);
   text("GAME OVER!!",100,120);
   
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);  
   
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
 }
  
   if(FoodGroup.isTouching(monkey))
   {
    FoodGroup.destroyEach();
     score = score+2;
   }
  
  switch(score){
    case 10: monkey.scale = 0.12;
             break;
    case 20: monkey.scale = 0.14;
             break;
    case 30: monkey.scale = 0.16;
             break;         
    case 40: monkey.scale = 0.18;
             break;   
    default: break;               
  }
  
  stroke("yellow");
  textSize(15);
  fill("white");
  score=Math.ceil(frameCount/frameRate()) 
  text("SCORE: "+ score, 300,40);
}

function spawnFood()
{
  // spawning the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assigning lifetime to banana
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //adding image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //adding each banana to the group
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles() 
{
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //adding image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //assigning lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //adding each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  
   
  if(monkey.isTouching(obstaclesGroup))
  {
    gameState = END;
    FoodGroup.velocityX = 0;
    obstaclesGroup.velocityX = 0;
    reset();
  }
}

 function reset()
{
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  survivalTime = 1;
  }
