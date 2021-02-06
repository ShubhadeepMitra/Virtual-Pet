var dog, happyDog,petImg, database, foodS, foodStock;

function preload()
{
  petImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(800,700);
  dog=createSprite(400,400,5,5);
  dog.addImage(petImg);
  dog.scale=0.25;
  foodS=20;
  
}


function draw() {  
background(46, 139, 87)
  drawSprites();
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.Image(happyDog);
  }
  drawSprites();
  textSize(20);
  stroke("red");
  text("Remaining Food: "+foodS,300,200)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}