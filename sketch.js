var dog, happyDog,petImg, database, foodS,foodObj,lastFed, foodStock,feed,addFood;

function preload()
{
  petImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,800);
  foodObj=new Food();
  dog=createSprite(400,400,5,5);
  dog.addImage(petImg);
  dog.scale=0.25;
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood)
}


function draw() {
  background(46, 139, 87)
  foodObj.display();
  fedTime=database.ref('feedTime').on("value",function(data){
    lastFed=data.val()
  })
  fill(255,255,255);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed+" AM",350,30)
  }

  drawSprites();
 
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/'.update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }))
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