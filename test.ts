// Safe demo for EnemyTiles extension

let player = sprites.create(img`
    . . f f f f . .
    . f f f f f f .
    f f f f f f f f
    f f f f f f f f
    . f f f f f f .
    . . f f f f . .
`, SpriteKind.Player);

controller.moveSprite(player);
scene.cameraFollowSprite(player);

// A simple blank tilemap so it always compiles
tiles.setCurrentTilemap(tilemap`level0`);

// Define a tile locally so no external assets are needed
const triggerTile = img`
    1 1 1 1
    1 0 0 1
    1 0 0 1
    1 1 1 1
`;
tiles.setTilemap(tiles.createTilemap(
    hex`1000100000000000000000000000000000000000000000000000000000000000`,
    img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,
    [triggerTile, img`. . . .`],
    TileScale.Sixteen
));

EnemyTiles.setPlayer(player);

// Minimal working enemy registration
EnemyTiles.registerEnemyTile(
    triggerTile,
    img`
        . 2 2 .
        2 2 2 2
        2 2 2 2
        . 2 2 .
    `,
    EnemyTiles.AI.followPlayer(30),
    EnemyTiles.Attack.shootProjectile(img`
        . 5 .
        5 5 5
        . 5 .
    `, 50, 700),
    40
);
