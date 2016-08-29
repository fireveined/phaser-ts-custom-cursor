export class CustomCursor extends Phaser.Sprite {
    private tweenAnimation: boolean = false;
    private translateVector: Phaser.Point = new Phaser.Point(0, 0);

    constructor(phaser: Phaser.Game, cursorTextureKey: string | Phaser.BitmapData | Phaser.RenderTexture | PIXI.Texture) {
        super(phaser, 0, 0, cursorTextureKey, 0);
        phaser.add.existing(this);
        this.visible = false;
    }

    public enableAnimation(enable: boolean = true) {
        this.tweenAnimation = enable;
        if (enable) {
            this.anchor.set(0.9, 0.9);
            this.translateVector.set(this.width * 0.9, this.height * 0.9);
        } else {
            this.anchor.set(0.0, 0.0);
            this.translateVector.set(0, 0);
        }
    }

    public setupCursor() {
        this.visible = true;
        this.transformCallback = () => {
            if (this.game.canvas.style.cursor == 'pointer') 
                this.frame = 1;
            if (this.game.canvas.style.cursor == 'default')
                this.frame = 0;

            this.game.canvas.style.cursor = 'none';
            this.game.world.bringToTop(this);
            this.x = this.game.input.activePointer.x + this.translateVector.x;
            this.y = this.game.input.activePointer.y + this.translateVector.y;
        };

        this.game.canvas.addEventListener("mouseout", () => this.visible = false);
        this.game.canvas.addEventListener("mouseenter", () => this.visible = true);

        this.game.input.onDown.add(() => {
            if (!this.tweenAnimation)
                return;
            this.angle = -20;
            this.game.add.tween(this).to({ angle: 0 }, 50).start();
        });
    }
}