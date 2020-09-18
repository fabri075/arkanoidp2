class totalscore extends Phaser.GameObjects.Text {
    constructor(config)
    {
      super(config.scene, config.x, config.y, 'Puntaje: ' + score, { fontSize: '32px', fill: 'white', fontFamily: 'Comic Sans MS'})
      config.scene.add.existing(this); 
    }
}