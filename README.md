# Enemy Tiles + AI & Attack Patterns — MakeCode Arcade Extension

This extension allows tiles to transform into enemies when the player approaches.  
It also includes a **fully modular AI system** and **customizable attack patterns**.

---

## Features
- Turn any tile into an enemy trigger
- Custom AI patterns (follow, wander, or your own)
- Custom attack patterns (projectiles, custom logic, etc.)
- Status bar health support
- Enemy behavior fully editable in code

---

## Example Usage

```ts
EnemyTiles.setPlayer(myPlayer);

EnemyTiles.registerEnemyTile(
    assets.tile`SkullTile`,
    assets.image`SkullEnemy`,
    EnemyTiles.AI.followPlayer(40),
    EnemyTiles.Attack.shootProjectile(assets.image`proj`, 80, 500),
    40
);
