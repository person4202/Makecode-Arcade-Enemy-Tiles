// MakeCode Arcade Extension: Enemy Tiles + AI & Attack Patterns
//% weight=100 color=#d65d0e icon="⚔️"
//% blockNamespace="EnemyTiles" blockGap=8
//% groups=['Setup','Enemy Registration','AI','Attack']
namespace EnemyTiles {
    export type AIPattern = (enemy: Sprite, player: Sprite) => void;
    export type AttackPattern = (enemy: Sprite, player: Sprite) => void;

    export interface EnemyConfig {
        kind: number;
        tile: Image;
        enemyImage: Image;
        triggerDistance?: number;
        health?: number;
        ai?: AIPattern;
        attack?: AttackPattern;
    }

    let configs: EnemyConfig[] = [];
    let enemies: Sprite[] = [];
    let player: Sprite = null;

    // -----------------------
    // BUILT-IN AI
    // -----------------------
    //% group="AI"
    export const AI = {
        followPlayer: (speed: number = 30): AIPattern => {
            return (enemy, player) => enemy.follow(player, speed);
        },

        wander: (): AIPattern => {
            return (enemy, player) => {
                if (Math.percentChance(1)) {
                    enemy.vx = randint(-40, 40);
                    enemy.vy = randint(-40, 40);
                }
            };
        }
    };

    // -----------------------
    // BUILT-IN ATTACKS
    // -----------------------
    //% group="Attack"
    export const Attack = {
        shootProjectile: (
            imgProjectile: Image,
            speed: number = 60,
            cooldown: number = 1000
        ): AttackPattern => {
            let lastFire = 0;
            return (enemy, player) => {
                if (game.runtime() - lastFire > cooldown) {
                    const p = sprites.createProjectileFromSprite(imgProjectile, enemy);
                    p.setVelocity(
                        (player.x - enemy.x) / 20 * speed,
                        (player.y - enemy.y) / 20 * speed
                    );
                    lastFire = game.runtime();
                }
            };
        }
    };

    // -----------------------
    // SETUP
    // -----------------------
    //% group="Setup"
    //% block="set enemy tile trigger player %playerSprite"
    export function setPlayer(playerSprite: Sprite) {
        player = playerSprite;
    }

    // -----------------------
    // REGISTRATION
    // -----------------------
    //% group="Enemy Registration"
    //% block="register enemy tile %tile enemy %enemySprite ai %ai attack %attack distance %distance"
    export function registerEnemyTile(
        tile: Image,
        enemySprite: Image,
        ai: AIPattern,
        attack: AttackPattern,
        distance: number = 32
    ) {
        configs.push({
            tile: tile,
            enemyImage: enemySprite,
            kind: SpriteKind.Enemy,
            triggerDistance: distance,
            ai: ai,
            attack: attack
        });
    }

    function spawnEnemy(cfg: EnemyConfig, loc: tiles.Location) {
        const enemy = sprites.create(cfg.enemyImage, cfg.kind);
        tiles.placeOnTile(enemy, loc);

        // FIX: No missing asset
        tiles.setTileAt(loc, img`. . . .`);

        if (cfg.health && (statusbars && statusbars.create)) {
            const bar = statusbars.create(20, 4, StatusBarKind.EnemyHealth);
            bar.max = cfg.health;
            bar.value = cfg.health;
            bar.attachToSprite(enemy);
        }

        enemies.push(enemy);
        return enemy;
    }

    function trySpawnEnemies() {
        if (!player) return;

        for (const cfg of configs) {
            for (const loc of tiles.getTilesByType(cfg.tile)) {
                const x = tiles.locationXY(loc, tiles.XY.x) * 16 + 8;
                const y = tiles.locationXY(loc, tiles.XY.y) * 16 + 8;

                const dx = x - player.x;
                const dy = y - player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < (cfg.triggerDistance || 32)) {
                    spawnEnemy(cfg, loc);
                }
            }
        }
    }

    function updateAI() {
        if (!player) return;

        for (const e of enemies) {
            const cfg = configs.find(c => c.kind == e.kind);
            if (!cfg) continue;

            if (cfg.ai) cfg.ai(e, player);
            if (cfg.attack) cfg.attack(e, player);
        }
    }

    game.onUpdateInterval(200, trySpawnEnemies);
    game.onUpdate(updateAI);
}
