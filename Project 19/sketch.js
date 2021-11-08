var road, roadImg;
var carsGroup, car1, car2, car3, car4, car5;
var mainCar, mainCarImg;
var restart, restartImg, gameOver, gameOverImg;
var score;
var gameState = "play";

function preload(){
    roadImg = loadImage("road.png");
    mainCarImg = loadImage("redCar.png");
    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");

    car1 = loadImage("blueCar.png");
    car2 = loadImage("greenCar.png");
    car3 = loadImage("purpleCar.png");
    car4 = loadImage("whiteCar.png");
    car5 = loadImage("yellowCar.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    road = createSprite(windowWidth/2, windowHeight/2);
    road.addImage("road", roadImg);
    road.scale = 2;

    mainCar = createSprite(windowWidth/2, 600);
    mainCar.addImage("mainCar", mainCarImg);
    mainCar.scale = 0.5;

    mainCar.setCollider("circle", 0, 0, 30);
    //mainCar.debug = true;

    restart = createSprite(windowWidth/2, windowHeight/2);
    restart.addImage("restart", restartImg);

    gameOver = createSprite(windowWidth/2, windowHeight/2 -100);
    gameOver.addImage("gameOver", gameOverImg);

    carsGroup = new Group();

    score = 0;
}


function draw() {
    background(rgb(151, 196, 236));
    text("Score: " + score, 950, 30);

    if (gameState === "play") {
        road.velocityY = 5;
        restart.visible = false;
        gameOver.visible= false;
        score += Math.round(frameCount/80);

        if (score > 0 && score % 1000 === 0) {
            road.velocityY += 2;
        }

        if (keyDown("right_arrow")) {
            mainCar.x = mainCar.x + road.velocityY + 2;
        }

        if (keyDown("left_arrow")) {
            mainCar.x = mainCar.x - road.velocityY - 2;
        }

        if (road.y > windowHeight/2 + 250) {
            road.y = windowHeight/2;
        }

        


        spawnCars();

        if (carsGroup.isTouching(mainCar)) {
            gameState = "end";
        }
    }

    else if (gameState === "end") {
        gameOver.visible = true;
        restart.visible = true;

        carsGroup.destroyEach();
        road.velocityY = 0;
        mainCar.velocityY = 0;
        carsGroup.velocityY = 0;

        if (mousePressedOver(restart)) {
            reset();
        }
    }
 
    drawSprites();
}

function spawnCars() {
    if (frameCount % 45 === 0) {
        var car = createSprite();
        car.y = -5;
        car.x = random(550, 900);

        var rand = Math.round(random(1, 5));
        switch(rand) {
            case 1: car.addImage(car1);
                    break;
            case 2: car.addImage(car2);
                    break;
            case 3: car.addImage(car3);
                    break;
            case 4: car.addImage(car4);
                    break;
            case 5: car.addImage(car5);
                    break;
            default: break;
        }

        car.scale = 0.5;
        car.velocityY = road.velocityY + 2;
        car.lifetime = 300;
        car.rotation = 180;
        car.depth = mainCar.depth;

        carsGroup.add(car);

        if (score > 0 && score % 2000 === 0) {
            car.velocityY += 2;
        }
    }
}

function reset() {
    carsGroup.destroyEach();
    score = 0;
    gameState = "play";
}