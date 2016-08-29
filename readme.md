# Phaser TypeScript Custom Cursor
Phaser can't handle custom cursors and that little class allows you to substitute both default pointer and hand pointer used when cursor is over phaser buttons. 

## How to use
```typescript
import { CustomCursor } from "./customCursor";

let cursor = new CustomCursor(game, "cursor_spritesheet"); 
cursor.setupCursor(); // hides default browser cursor and shows custom one
cursor.enableAnimation(); // simple tween click animation 

// CustomCursor inherits from Phaser.Sprite
cursor.alpha = 0.5;
cursor.scale.x = 2;
```

Cursors example:
![cursor example](http://fireveined.pl/img/cursor.png)

