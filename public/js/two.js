let Two = {
  preload: function() {

    // Music Sounds
    game.load.image('bg', 'assets/images/lvl2bg-2750x1500.png')

    game.load.image('shuriken', 'assets/images/shuriken.png')

    game.load.image('log-vert', 'assets/images/new-log-vertical-lvl2.png')
    game.load.image('log2', 'assets/images/movable-log-2-1762x1036.png')

    game.load.image('wall1', 'assets/images/wall1-0x0.png')
    game.load.image('wall2', 'assets/images/wall2-326x414.png')
    game.load.image('wall4', 'assets/images/wall4-891x0.png')
    game.load.image('wall5', 'assets/images/wall5-1517x0.png')
    game.load.image('wall6', 'assets/images/wall6-2243x-11.png')
    game.load.image('wall7', 'assets/images/wall7-2076x552.png')
    game.load.image('wall8', 'assets/images/wall8-2470x0.png')
    game.load.image('wall9', 'assets/images/wall9-1620x0.png')
    game.load.image('wall10', 'assets/images/wall10-1729x822.png')
    game.load.image('wall11', 'assets/images/wall11-2133x1042.png')
    game.load.image('wall12', 'assets/images/wall12-1974x1107.png')
    game.load.image('wall13', 'assets/images/wall13-1729x876.png')
    game.load.image('wall14', 'assets/images/wall14-1729x1099.png')
    game.load.image('wall15', 'assets/images/wall15-1964x1245.png')
    game.load.image('wall16', 'assets/images/wall16-2346x0.png')
    game.load.image('wall17', 'assets/images/wall17-25970x0.png')

    game.load.image('water1', 'assets/images/water1-656x489.png')
    game.load.image('water2', 'assets/images/water2-656x900.png')
    game.load.image('water3', 'assets/images/water3-1340x900.png')
    game.load.image('water4', 'assets/images/water4-576x1356.png')
    game.load.image('water5', 'assets/images/water5-465x489.png')

    game.load.image('river1', 'assets/images/river1-139x1226.png')
    game.load.image('river2', 'assets/images/river2-202x1074.png')

    game.load.image('cliff1', 'assets/images/cliff1-0x325.png')
    game.load.image('cliff2', 'assets/images/cliff2-264x325.png')
    game.load.image('cliff3', 'assets/images/cliff3-1665x1156.png')

    game.load.spritesheet('hamster', 'assets/images/hamster-animation-sheet.png', 37, 45)
    game.load.spritesheet('red-hamster-left', 'assets/images/hamster-left-red-animation-sheet.png', 37, 45)
    game.load.spritesheet('red-hamster-front', 'assets/images/hamster-front-red-animation-sheet.png', 37, 45)
    game.load.spritesheet('red-hamster-back', 'assets/images/hamster-back-red-animation-sheet.png', 37, 45)
    game.load.spritesheet('enemy-dead', 'assets/images/hamster-red-dead-animation-sheet.png', 37, 45)

    // REFACTOR
    // game.load.audio('lvl2', 'assets/audio/music/lvl2.wav')
    // game.load.audio('lvl3', 'assets/audio/music/lvl3.wav')
    game.load.audio('enemy-death', 'assets/audio/SFX/enemy-dies-sfx.mp3')
    game.load.audio('exit', 'assets/audio/SFX/exit-sfx.mp3')
    game.load.audio('push-log', 'assets/audio/SFX/push-sfx.mp3')
    game.load.audio('stairs', 'assets/audio/SFX/stairs-sfx.mp3')
    game.load.audio('death', 'assets/audio/SFX/player-dies-sfx.mp3')
    game.load.audio('shuriken', 'assets/audio/SFX/shuriken.mp3')
  },

  create: function() {

    // Sounds // REFACTOR
    exitSound = game.add.audio('exit')
    logSound = game.add.audio('push-log')
    deathSound = game.add.audio('death')
    enemyDeathSound = game.add.audio('enemy-death')
    // lvl2Sound = game.add.audio('lvl2')
    // lvl3Sound = game.add.audio('lvl3')
    shootingSound = game.add.audio('shuriken')

    // lvl2Sound.loop = true
    // lvl2Sound.play()

    initWorldBounds(0, 0, 2750, 1500, 'bg')
    game.add.image(0, 0, 'bg')

    // player = makeSprite(240, 1430, 'hamster')
    player = makeSprite(2300, 1600, 'hamster')
    initPlayerAnimations(player)

    // Add a Timer
    timer = game.time.create(false);
    timer.loop(1250, this.updateCounter, this)
    timer.start()

    // Add Enemies
    enemy = makeSprite(300, 0, 'red-hamster-front')
    enemy2 = makeSprite(1400, 10, 'red-hamster-left')
    enemy3 = makeSprite(1870, 1450, 'red-hamster-left')
    enemy4 = makeSprite(2380, 1430, 'red-hamster-back')
    enemy5 = makeSprite(2700, 870, 'red-hamster-front')

    // Enemy Animations
    enemy.animations.add('down', [0, 1, 2, 3, 4], 10, true)
    enemy2.animations.add('down', [0, 1, 2, 3, 4], 10, true)
    enemy3.animations.add('down', [0, 1, 2, 3, 4], 10, true)
    enemy4.animations.add('down', [0, 1, 2, 3, 4], 10, true)
    enemy5.animations.add('down', [0, 1, 2, 3, 4], 10, true)

    // Add Enemy Weapon
    enemyWeapon = game.add.weapon(30, 'shuriken')
    enemyWeapon2 = game.add.weapon(30, 'shuriken')
    enemyWeapon3 = game.add.weapon(30, 'shuriken')
    enemyWeapon4 = game.add.weapon(30, 'shuriken')
    enemyWeapon5 = game.add.weapon(30, 'shuriken')

    // Weapon Methods
    initEnemyWeapon(enemyWeapon)
    enemyWeapon.fireAngle = Phaser.ANGLE_DOWN
    enemyWeapon.trackSprite(enemy, 30, 30, false)

    initEnemyWeapon(enemyWeapon2)
    enemyWeapon2.fireAngle = Phaser.ANGLE_LEFT
    enemyWeapon2.trackSprite(enemy2, 30, 30, false)

    initEnemyWeapon(enemyWeapon3)
    enemyWeapon3.fireAngle = Phaser.ANGLE_LEFT
    enemyWeapon3.trackSprite(enemy3, 30, 30, false)

    initEnemyWeapon(enemyWeapon4)
    enemyWeapon4.fireAngle = Phaser.ANGLE_UP
    enemyWeapon4.trackSprite(enemy4, 30, 30, false)

    initEnemyWeapon(enemyWeapon5)
    enemyWeapon5.fireAngle = Phaser.ANGLE_DOWN
    enemyWeapon5.trackSprite(enemy5, 30, 30, false)

    tween = game.add.tween(enemy5)
    tween.to({ x: 2380 }, 2000, 'Linear', true, 0, 20, true).loop(true)

    tween2 = game.add.tween(enemy4)
    tween2.to({ x: 2700 }, 2000, 'Linear', true, 0, 20, true).loop(true)

    tween3 = game.add.tween(enemy3)
    tween3.to({ y: 1250 }, 2000, 'Linear', true, 0, 20, true).loop(true)

    tween4 = game.add.tween(enemy2)
    tween4.to({ y: 270 }, 2000, 'Linear', true, 0, 20, true).loop(true)

    tween5 = game.add.tween(enemy)
    tween5.to({ x: 150 }, 2000, 'Linear', true, 0, 20, true).loop(true)

    river = makeSprite(891, 0, 'wall4')
    alpha(river)

    log = makeSprite(826, 0, 'log-vert')

    someLog = makeSprite(891, 0, 'log-vert')
    alpha(someLog)

    someLog2 = makeSprite(1762, 886, 'log2')
    alpha(someLog2)

    log2 = makeSprite(1762, 1036, 'log2')

    weapon = makeWeapon(30, 'shuriken')
    initWeapon(weapon)

    boundaries = game.add.group()
    boundaries.add(makeSprite(0, 0, 'wall1'))
    boundaries.add(makeSprite(326, 414, 'wall2'))
    boundaries.add(makeSprite(1517, 0, 'wall5'))
    boundaries.add(makeSprite(2243, 1, 'wall6'))
    boundaries.add(makeSprite(2076, 552, 'wall7'))
    boundaries.add(makeSprite(1620, 0, 'wall9'))
    boundaries.add(makeSprite(1729, 822, 'wall10'))
    boundaries.add(makeSprite(2133, 1042, 'wall11'))
    boundaries.add(makeSprite(1974, 1107, 'wall12'))
    boundaries.add(makeSprite(1729, 876, 'wall13'))
    boundaries.add(makeSprite(1729, 1070, 'wall14'))
    boundaries.add(makeSprite(1964, 1245, 'wall15'))
    boundaries.add(makeSprite(2349, 0, 'wall16'))
    boundaries.add(makeSprite(2597, 0, 'wall17'))

    levelTwoExit = makeSprite(2470, 0, 'wall8')
    alpha(levelTwoExit)

    bridgeTopBoundary = makeWorldSprite(330, 0, 130, 40, 'log2')
    alpha(bridgeTopBoundary)

    boundaries.add(makeSprite(0, 325, 'cliff1'))
    boundaries.add(makeSprite(264, 315, 'cliff2'))
    boundaries.add(makeSprite(1665, 1156, 'cliff3'))

    boundaries.add(makeSprite(656, 475, 'water1'))
    boundaries.add(makeSprite(656, 1000, 'water2'))
    boundaries.add(makeSprite(1340, 900, 'water3'))
    boundaries.add(makeSprite(576, 1356, 'water4'))
    boundaries.add(makeSprite(465, 489, 'water5'))

    alpha(boundaries)

    game.physics.enable([
      player,
      enemy,
      enemy2,
      enemy3,
      enemy4,
      enemy5,
      enemyWeapon,
      enemyWeapon2,
      enemyWeapon3,
      enemyWeapon4,
      enemyWeapon5,
      bridgeTopBoundary,
      boundaries,
      log,
      log2,
      someLog2,
      levelTwoExit],
      Phaser.Physics.ARCADE)

    // Player World Bounds
    collision(player)

    // World Boundaries
    collisionGroup(boundaries)

    // Bridge Top Boundary
    immovable(bridgeTopBoundary)

    // First Log Move
    collisionGroup(log)
    log.body.immovable = false

    // Second Log Move
    collisionGroup(log2)

    // Second Log Replacement
    collisionGroup(someLog2)
    someLog2.body.immovable = true

    immovable(enemy)
    immovable(enemy2)
    immovable(enemy3)
    immovable(enemy4)
    immovable(enemy5)

    // Main Character Controls / View
    camera(player)
    gameControls()

    // Player score
    scoreDisplay = game.add.text(25, 5, "Score: " + `${score}`, {fill: 'white'})
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
    time.addColor('white', 0)
  },

  update: function() {
    if (player.body.y < 300) {
      enemyWeapon.autofire = true
    }

    else {
      enemyWeapon.autofire = false
    }

    if (player.body.x > 1100) {
      enemyWeapon2.autofire = true
    }

    else {
      enemyWeapon2.autofire = false
    }

    if (player.body.x > 1500) {
      enemyWeapon3.autofire = true
    }

    else {
      enemyWeapon3.autofire = false
    }

    if (player.body.x > 2300) {
      enemyWeapon4.autofire = true
      enemyWeapon5.autofire = true
    }

    else {
      enemyWeapon4.autofire = false
      enemyWeapon5.autofire = false
    }

    if (this.dead) {
      enemyWeapon.autofire = false
    }

    if (this.dead2) {
      enemyWeapon2.autofire = false
    }

    if (this.dead3) {
      enemyWeapon3.autofire = false
    }

    if (this.dead4) {
      enemyWeapon4.autofire = false
    }

    if (this.dead5) {
      enemyWeapon5.autofire = false
    }

    enemy.animations.play('down', 15, true)
    enemy2.animations.play('down', 15, true)
    enemy3.animations.play('down', 15, true)
    enemy4.animations.play('down', 15, true)
    enemy5.animations.play('down', 15, true)

    game.physics.arcade.collide(player, boundaries)
    game.physics.arcade.collide(player, bridgeTopBoundary)

    game.physics.arcade.collide(player, levelTwoExit, this.startLevelThree, null, this)
    game.physics.arcade.collide(player, enemy, this.killPlayerCollide, null, this)
    game.physics.arcade.collide(player, enemy2, this.killPlayerCollide, null, this)
    game.physics.arcade.collide(player, enemy3, this.killPlayerCollide, null, this)
    game.physics.arcade.collide(player, enemy4, this.killPlayerCollide, null, this)
    game.physics.arcade.collide(player, enemy5, this.killPlayerCollide, null, this)

    game.physics.arcade.collide(weapon.bullets, enemy, this.killEnemy, null, this)
    game.physics.arcade.collide(weapon.bullets, enemy2, this.killEnemy2, null, this)
    game.physics.arcade.collide(weapon.bullets, enemy3, this.killEnemy3, null, this)
    game.physics.arcade.collide(weapon.bullets, enemy4, this.killEnemy4, null, this)
    game.physics.arcade.collide(weapon.bullets, enemy5, this.killEnemy5, null, this)

    // game.physics.arcade.collide(enemyWeapon.bullets, player, this.killPlayer, null, this)
    // game.physics.arcade.collide(enemyWeapon2.bullets, player, this.killPlayer, null, this)
    // game.physics.arcade.collide(enemyWeapon3.bullets, player, this.killPlayer, null, this)
    // game.physics.arcade.collide(enemyWeapon4.bullets, player, this.killPlayer, null, this)
    // game.physics.arcade.collide(enemyWeapon5.bullets, player, this.killPlayer, null, this)

    game.physics.arcade.collide(player, log, this.moveLog, null, this)
    game.physics.arcade.collide(player, log2, this.moveSecondLog, null, this)
    game.physics.arcade.collide(player, someLog2)

    startingVelocity(player)
    playerMovement(player, weapon)

    if (fireButton.isDown) {
      weapon.fire()
      shootingSound.play()
    }
  },

  killPlayer: function(player, enemyWeapon) {
    deathSound.play()

    player.reset(player.body.velocity.x = 220, player.body.velocity.y = 1350)

    enemyWeapon.kill()

    ninjaLives -= 1

    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)

    if (ninjaLives == 0) {
      ninjaLives = 3
      score = 0
      game.sound.remove(lvl2Sound)
      game.state.start('GameOver')
    }
  },

  killPlayerCollide: function(player, enemy) {
    deathSound.play()

    player.reset(player.body.velocity.x = 220, player.body.velocity.y = 1350)

    ninjaLives -= 1

    ninjaLivesDisplay.text = ('Lives: ' + `${ninjaLives}`)

    if (ninjaLives == 0) {
      ninjaLives = 3
      score = 0

      game.sound.remove(lvl2Sound)
      game.state.start('GameOver')
    }
  },

  killEnemy: function(weapon, enemy) {
    enemyDeathSound.play()

    this.dead = true

    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)

    enemyDeath1 = makeSprite(enemy.body.x, enemy.body.y - 50, 'enemy-dead')
    enemyDeath1.animations.add('kill', [0, 1, 2, 3, 4], 10, true)
    enemyDeath1.animations.play('kill', 15, true)
    enemy.kill()
    weapon.kill()
    fireOff(enemyWeapon)

    game.time.events.add(1000, () => {
      enemyDeath1.kill()
    })
  },

  killEnemy2: function(weapon, enemy2) {
    enemyDeathSound.play()

    this.dead2 = true

    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)

    enemyDeath2 = makeSprite(enemy2.body.x, enemy2.body.y, 'enemy-dead')
    enemyDeath2.animations.add('kill', [0, 1, 2, 3, 4], 10, true)
    enemyDeath2.animations.play('kill', 15, true)
    enemy2.kill()
    weapon.kill()
    fireOff(enemyWeapon2)

    game.time.events.add(1000, () => {
      enemyDeath2.kill()
    })
  },

  killEnemy3: function(weapon, enemy3) {
    enemyDeathSound.play()

    this.dead3 = true

    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)

    enemyDeath3 = makeSprite(enemy3.body.x, enemy3.body.y, 'enemy-dead')
    enemyDeath3.animations.add('kill', [0, 1, 2, 3, 4], 10, true)
    enemyDeath3.animations.play('kill', 15, true)
    enemy3.kill()
    weapon.kill()
    fireOff(enemyWeapon3)

    game.time.events.add(1000, () => {
      enemyDeath3.kill()
    })
  },

  killEnemy4: function(weapon, enemy4) {
    enemyDeathSound.play()

    this.dead4 = true

    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)

    enemyDeath4 = makeSprite(enemy4.body.x, enemy4.body.y, 'enemy-dead')
    enemyDeath4.animations.add('kill', [0, 1, 2, 3, 4], 10, true)
    enemyDeath4.animations.play('kill', 15, true)
    enemy4.kill()
    weapon.kill()
    fireOff(enemyWeapon4)

    game.time.events.add(1000, () => {
      enemyDeath4.kill()
    })
  },

  killEnemy5: function(weapon, enemy5) {
    enemyDeathSound.play()

    this.dead5 = true

    score += 200
    scoreDisplay.setText('Score: ' + `${score}`)

    enemyDeath5 = makeSprite(enemy5.body.x, enemy5.body.y, 'enemy-dead')
    enemyDeath5.animations.add('kill', [0, 1, 2, 3, 4], 10, true)
    enemyDeath5.animations.play('kill', 15, true)
    enemy5.kill()
    weapon.kill()
    fireOff(enemyWeapon5)

    game.time.events.add(1000, () => {
      enemyDeath5.kill()
    })
  },

  moveLog: function(player, log) {
    logSound.play()

    game.world.bringToTop(player)

    game.time.events.add(200, () => {
      this.logMoved = true
      log.reset(log.body.velocity.x = 891, log.body.velocity.y = 0), this
      log.kill()
    })

    game.time.events.add(200, () => {
      someLog.alpha = true
    })
  },

  moveSecondLog: function(player, log2) {
    logSound.play()

    game.time.events.add(500, () => {
      this.logMoved = true
      log2.reset(log2.body.velocity.x = 1762, log2.body.velocity.y = 886), this
      log2.kill()
    })

    game.time.events.add(500, () => {
      someLog2.alpha = true
    })
  },

  updateCounter: function() {
    totalTime++
    time.setText('Time: ' + totalTime);
  },

  startLevelThree: function(player, levelTwoExit) {
    exitSound.play()
    // game.sound.remove(lvl2Sound)

    this.state.start('Three')
  }
}

