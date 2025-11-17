// Demo of the EnemyTiles extension

// Create a simple player
let player = sprites.create(img`
    . . f f f f . .
    . f f f f f f .
    f f f f f f f f
    f f f f f f f f
    . f f f f f f .
    . . f f f f . .
`, SpriteKind.Player);

// Let the player move and follow them with camera
controller.moveSprite(player);
scene.cameraFollowSprite(player);

// Load a tilemap (you may replace this with your own)
tiles.setCurrentTilemap(tilemap`level1`);

// Tell EnemyTiles which sprite is the player to detect distance
EnemyTiles.setPlayer(player);

// Register an enemy tile that spawns an enemy when approached
EnemyTiles.registerEnemyTile(
    assets.tile`myTile`,       // the tile that triggers the enemy
    img`                      // enemy sprite image
        . . 2 2 2 . .
        . 2 2 2 2 2 .
        2 2 2 2 2 2 2
        2 2 2 2 2 2 2
        . 2 2 2 2 2 .
        . . 2 2 2 . .
    `,
    EnemyTiles.AI.followPlayer(30),  // AI pattern
    EnemyTiles.Attack.shootProjectile(
        img`
            . 5 .
            5 5 5
            . 5 .
