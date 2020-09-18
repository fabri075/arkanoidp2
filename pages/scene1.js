class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }


preload()
{
    this.load.atlas('assets', '/assets/arkanoiditems.png', '/assets/arkanoiditems_atlas.json');
    this.load.image('tiles1', '/assets/tileset_complet.png');
    this.load.image('tiles2', '/assets/Letters.PNG')
    this.load.tilemapTiledJSON('map', '/assets/Arkanoidmap.json');
}

create()
{
    map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('tileset_complet', 'tiles1');
    var tileset1 = map.addTilesetImage('Letters', 'tiles2');
    var layer = map.createDynamicLayer('Capa de patrones 1', tileset, 0 , 0);
    var layer2 = map.createDynamicLayer('Capa de patrones 2', tileset1, 0, 0);
    var layer3 = map.createDynamicLayer('Capa de patrones 3', tileset1, 0, 0).setVisible(false);
    
    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
        key: 'assets', frame: [ 'blue', 'red', 'green', 'yellow'],
        frameQuantity: 10,
        gridAlign: { width: 10, height: 4, cellWidth: 58, cellHeight: 50, x: 120, y: 100 }
    });

    this.ball = this.physics.add.image(400, 500, 'assets', 'ball').setCollideWorldBounds(true).setBounce(1);
    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle').setImmovable();

    //  Our colliders
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    //  Input events
    this.input.on('pointermove', function (pointer) {

        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 740);

        if (this.ball.getData('onPaddle'))
        {
            this.ball.x = this.paddle.x;
        }

    }, this);

    this.input.on('pointerup', function (pointer) {
        layer2 = layer2.setVisible(false);
        layer3 = layer3.setVisible(true);

        if (this.ball.getData('onPaddle'))
        {
            this.ball.setVelocity(-75, -300);
            this.ball.setData('onPaddle', false);
        }

    }, this);
    
    scoreText = new totalscore ({scene:this, x:620, y: 16})
}
update()
{
    if (this.ball.y > 600)
    {
        this.resetBall();
    }
}

hitBrick(ball, brick)
{
    brick.disableBody(true, true);
    
    score += 5;
    scoreText.setText('Puntaje: ' + score);
    if (this.bricks.countActive() === 0)
    {
        this.scene.start('scene2');
    }
}

resetBall()
{
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData('onPaddle', true);
}

resetLevel()
{
    this.resetBall();

    this.bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);

    });
}

hitPaddle(ball, paddle)
{
    var diff = 0;

    if (ball.x < paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = paddle.x - ball.x;
        ball.setVelocityX(-10 * diff);
    }
    else if (ball.x > paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = ball.x -paddle.x;
        ball.setVelocityX(10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.setVelocityX(2 + Math.random() * 8);
    }
}

}
