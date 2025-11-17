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

// No invalid tilemap
// Instead we directly build a tilemap using createTilemap()
const triggerTile = img`
    1 1 1 1
    1 0 0 1
    1 0 0 1
    1 1 1 1
`;

tiles.setTilemap(
    tiles.createTilemap(
        hex`08000400000000000000000000000000`,
        img`
            . . . . . . . .
            . . . . . . . .
            . . . . . . . .
            . . . . . . . .
        `,
        [triggerTile, img`. . . .`],
        TileScale.Sixteen
    )
);

EnemyTiles.setPlayer(player);

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
