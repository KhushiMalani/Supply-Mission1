var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:3, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	 World.add(world, ground);
	 keyPressed();
	bounceOff(packageSprite,groundSprite);
	Matter.Body.setStatic(false);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on
    packageSprite.y=packageSprite.y-10;
  }
}
function bounceOff(package,ground) //functions with arguments
{
  if(package.x-ground.x<package.width/2+ground.width/2
	&&ground.x-package.x<package.width/2+ground.width/2){
  
	 package.velocityX=package.velocityX*(-1);
	 ground.velocityX=package.velocityX*(-1);
  }
 if (package.y-ground.y<package.height/2+ground.height/2
  &&ground.y-package.y<package.height/2+ground.height/2) {
	package.velocityY=package.velocityY*(-1);
	 ground.velocityY=ground.velocityY*(-1);
 }

}






