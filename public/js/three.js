let bossHealth = 100

let Three = {
  preload: function() {

    // Level Music
    // game.load.audio('lvl3', 'assets/audio/music/lvl3.mp3')
    game.load.audio('win', 'assets/audio/music/win-game.mp3')

    game.load.image('shuriken', 'assets/images/shuriken.png')
    game.load.image('corn', 'assets/images/tiny-corn.png')
    game.load.image('lvl3bg', 'assets/images/lvl3bg-900x2000.png')

    // Boundaries
    game.load.image('wall1', 'assets/images/lvl3-wall1-201x823.png')
    game.load.image('wall2', 'assets/images/lvl3-wall2-589x823.png')
    game.load.image('wall3', 'assets/images/lvl3-wall3-589x713.png')
    game.load.image('wall4', 'assets/images/lvl3-wall4-0x713.png')
    game.load.image('wall5', 'assets/images/lvl3-wall5-0x0.png')
    game.load.image('wall6', 'assets/images/lvl3-wall6-0x111.png')
    game.load.image('wall7', 'assets/images/lvl3-wall7-789x111.png')

    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45)
    game.load.spritesheet('boss', 'assets/images/boss-spritesheet-175x170.png', 175, 170)
    game.load.spritesheet('boss-dead', 'assets/images/boss-dead-spritesheet-175x170.png', 175, 170)

    // Sound Effects
    game.load.audio('shootingSound', 'assets/audio/SFX/shuriken.mp3')
    game.load.audio('playerSound', 'assets/audio/SFX/player-dies-sfx.mp3')
    game.load.audio('enemySound', 'assets/audio/SFX/enemy-dies-sfx.mp3')
  },

  create: function() {

    // Sounds
    // lvl3Sound = game.add.audio('lvl3')
    // lvl3Sound.loop = true
    // lvl3Sound.play()

    shootingSound = game.add.audio('shootingSound')
    winSound = game.add.audio('win')
    playerSound = game.add.audio('playerSound')
    enemySound = game.add.audio('enemySound')

    initWorldBounds(0, 0, 900, 2000, 'lvl3bg')
    game.add.image(0, 0, 'lvl3bg')

    player = makeSprite(440, 500, 'hamster')
    initPlayerAnimations(player)

    // Add a Timer
    timer = game.time.create(false);
    timer.loop(1250, this.updateCounter, this)
    timer.start()

    //Add boss
    boss = makeSprite(500, 320, 'boss')

    // Boss Animations
    boss.animations.add('down', [0, 1, 2, 3, 4], 15, true);

    // Add Boss Weapon
    bossWeapon = game.add.weapon(30, 'corn')

    // Weapon Methods
    initEnemyWeapon(bossWeapon)
    bossWeapon.fireAngle = Phaser.ANGLE_DOWN
    bossWeapon.trackSprite(boss, 30, 30, false)

    tween = game.add.tween(boss)
    tween.to({ x: 150 }, 2000, 'Linear', true, 0, 20, true).loop(true)

    // Boss Health Bar
    this.bossHealthBar = new HealthBar(this.game, {x: 700, y: 50, width: 120});
    this.bossHealthBar.setPercent(bossHealth);

    // Health Bar Text
    healthText = game.add.text(this.bossHealthBar.x, this.bossHealthBar.y + 50, "Health ", { fill: 'white'} );
    healthText.fixedToCamera = true
    healthText.anchor.setTo(0.5)
    healthText.font = 'Press Start 2P'
    healthText.fontSize = 16

    timer.loop(4000, this.createBossActions, this)

    weapon = makeWeapon(30, 'shuriken')
    weapon.multiFire = true
    initWeapon(weapon)

    boundaries = game.add.group()
    boundaries.add(makeSprite(201, 823, 'wall1'))
    boundaries.add(makeSprite(589, 823, 'wall2'))
    boundaries.add(makeSprite(589, 713, 'wall3'))
    boundaries.add(makeSprite(0, 713, 'wall4'))
    boundaries.add(makeSprite(0, 0, 'wall5'))
    boundaries.add(makeSprite(0, 111, 'wall6'))
    boundaries.add(makeSprite(789, 111, 'wall7'))

    alpha(boundaries)

    game.physics.enable([
      player,
      boss,
      bossWeapon,
      boundaries],
      Phaser.Physics.ARCADE)

    // Make sure boss doesn't move on hit
    immovable(boss)

    // Player World Bounds
    collision(player)

    // World Boundaries
    collisionGroup(boundaries)

    // Main Character Controls / View
    camera(player)
    gameControls()

    // Player score
    scoreDisplay = game.add.text(25, 5, "Score: " + `${score}  `, { fill: 'white'})
    scoreDisplay.fixedToCamera = true
    scoreDisplay.font = 'Press Start 2P'
    scoreDisplay.fontSize = 16

    // Player lives
    ninjaLivesDisplay = game.add.text(scoreDisplay.x, scoreDisplay.y +20, "Lives: " + `${ninjaLives} `, { fill: 'white'})
    ninjaLivesDisplay.fixedToCamera = true
    ninjaLivesDisplay.font = 'Press Start 2P'
    ninjaLivesDisplay.fontSize = scoreDisplay.fontSize

    // Timer display
    time = game.add.text(scoreDisplay.x, scoreDisplay.y + 40)
    time.fixedToCamera = true
    time.font = 'Press Start 2P'
    time.fontSize = scoreDisplay.fontSize
    time.addColor('white', 0);
  },

  update: function() {
    if (player.body.y < 1000) {
      bossWeapon.autofire = true
    }

    else {
      bossWeapon.autofire = false
    }

    if (cursors.left.isDown) {
      bossWeapon.bulletGravity.y = 800
      bossWeapon.fireAngle = Phaser.ANGLE_LEFT
    }

    if (cursors.right.isDown) {
      bossWeapon.bulletGravity.y = 800
      bossWeapon.fireAngle = Phaser.ANGLE_RIGHT
    }

    if (cursors.down.isDown) {
      bossWeapon.bulletGravity.y = 200
      bossWeapon.fireAngle = Phaser.ANGLE_DOWN
    }

    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(player, boss, this.killPlayer, null, this)
    game.physics.arcade.collide(player, boss, this.killPlayerCollide, null, this)
    game.physics.arcade.collide(weapon.bullets, boss, this.killBoss, null, this)
    game.physics.arcade.collide(weapon.bullets, boss, this.killEnemy, null, this)

    // game.physics.arcade.collide(bossWeapon.bullets, player, this.killPlayer, null, this)

    startingVelocity(player)
    playerMovement(player, weapon)

    if (fireButton.isDown) {
      weapon.fire()
      shootingSound.play()
    }

    boss.animations.play('down')
  },

  killPlayer: function(player, enemyWeapon) {
    playerSound.play()

    player.body.immovable = true
    player.reset(player.body.velocity.x = 440, player.body.velocity.y = 2000)

    // enemyWeapon.kill()

    ninjaLives -= 1
    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)

    if (ninjaLives == 0) {
      ninjaLives = 3
      score = 0

      game.state.start('GameOver')
    }
  },

  // killPlayerCollide: function(player, enemy) {
  //   playerSound.play()

  //   enemy.body.immovable = true

  //   // player.reset(player.body.velocity.x = 440, player.body.velocity.y = 2000)

  //   ninjaLives -= 1
  //   ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)

  //   if (ninjaLives == 0) {
  //     ninjaLives = 3
  //     score = 0

  //     game.state.start('GameOver')
  //   }
  // },

  createBossActions: function() {
    tween1 = game.add.tween(boss)
    tween1.to({ y: 150 }, 2000, 'Linear', true, 0, 20, true).loop(true)
    weapon.multiFire = true
  },

  killBoss: function(weapon, boss) {
    score += 200
    scoreDisplay.text = ('Score: ' + `${score}`)

    bossHealth -= 40
    boss.kill()
    this.bossHealthBar.setPercent(bossHealth)

    if (bossHealth < 0) {
      enemySound.play()

      bossDead = makeSprite(boss.body.x, boss.body.y - 120, 'boss-dead')
      bossDead.animations.add('kill', [0, 1, 2, 3, 4], 15, true)
      bossDead.play('kill', 15, true)

      boss.kill()
      weapon.kill()

      score += 500
      bossHealth = 100

      // game.sound.remove(lvl3Sound)
      winSound.play()

      game.time.events.add(1000, () => {
        game.state.start('EndGame')
      })
    }
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime)
  }
}
