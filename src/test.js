var testLayer = cc.Layer.extend({
    sprite: null,
    bg: null,
    spriteRec: null,
    bz: null,
    roll: null,
    imgArr: new Array(3),
    tombArr: new Array(3),
    tomb: null,
    spriteMoveGround: null,


    ctor: function () {
        this._super();

        this.imgArr = [res.cat_png, res.dog_png, res.sheep_png];
        this.tombArr = [res.tomb_png, res.tomb_png, res.tomb_png];


        this.bg = new cc.Sprite(res.Background_png);
        this.bg.x = cc.winSize.width / 2;
        this.bg.y = cc.winSize.height / 2;
        this.addChild(this.bg);

        var goMenuItem = new cc.MenuItemImage(res.Go_up_png,
            res.Go_down_png,
            this.startBezier, this);
        goMenuItem.x = 820;
        goMenuItem.y = cc.winSize.height - 540;

        var mn = new cc.Menu(goMenuItem);
        this.addChild(mn, 1);
        mn.x = 0;
        mn.y = 0;
        mn.anchorX = 0.5;
        mn.anchorY = 0.5;

        this.changeImg();
        this.setUpmymouse(this);
        this.scheduleUpdate();
        return true;
    },
    setUpmymouse: function (layer) {
        if ('mouse' in cc.sys.capabilities) {
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    let x = event.getLocationX();
                    let y = event.getLocationY();
                    let point = new cc.Point(x, y);
                    let goCenter = cc.moveTo(1, cc.p(x + 50, cc.winSize.height / 2));

                    let changeTombImg = function () {
                        layer.tomb.x = x + 50;
                        layer.tomb.y = cc.winSize.height / 2;
                        layer.removeChild(layer.spriteMoveGround);
                        layer.addChild(layer.tomb);
                        // layer.changeImg();
                        // layer.startBezier();
                    };

                    if (cc.rectContainsPoint(layer.spriteRec, point)) {
                        layer.spriteMoveGround.x = x;
                        layer.spriteMoveGround.y = y;
                        layer.removeChild(layer.sprite);
                        layer.addChild(layer.spriteMoveGround);
                        layer.spriteMoveGround.runAction(cc.sequence(goCenter, cc.callFunc(changeTombImg)));
                        // spriteDown.runAction(cc.moveTo(2, cc.p(cc.winSize.width / 2, cc.winSize.height / 2)));
                    }

                }
            };
            cc.eventManager.addListener(mouseListener, this);
        }
    },
    update() {
        this.spriteRec = new cc.Rect(
            this.sprite.x - this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );

    },

    startBezier() {

        var bezier = [cc.p(this.sprite.x, cc.winSize.height / 3), cc.p(cc.winSize.width / 2, cc.winSize.height + 200),
            cc.p(cc.winSize.width, cc.winSize.height / 3)];
        bz = cc.bezierTo(2, bezier);
        roll = cc.rotateBy(5, 360 * 10);
        let imgSpawn = cc.spawn(bz, roll);
        this.sprite.runAction(imgSpawn);

    },
    changeImg() {

        let i = Math.floor((Math.random() * 3));
        this.sprite = new cc.Sprite(this.imgArr[i]);
        this.spriteMoveGround = new cc.Sprite(this.imgArr[i]);
        this.tomb = new cc.Sprite(this.tombArr[i]);

        this.sprite.x = this.sprite.width / 5;
        this.sprite.y = cc.winSize.height / 3;
        this.spriteRec = new cc.Rect(
            this.sprite.x - this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
        this.addChild(this.sprite);

    },
    onMenuCallback(layer){

        sprite.schedule(layer.changeAndStart,1,cc.repeatForever,1);
    },
    changeAndStart(){
        let i = Math.floor((Math.random() * 3));
        this.sprite = new cc.Sprite(this.imgArr[i]);
        this.spriteMoveGround = new cc.Sprite(this.imgArr[i]);
        this.tomb = new cc.Sprite(this.tombArr[i]);

        this.sprite.x = this.sprite.width / 5;
        this.sprite.y = cc.winSize.height / 3;
        this.spriteRec = new cc.Rect(
            this.sprite.x - this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
        this.addChild(this.sprite);
        var bezier = [cc.p(this.sprite.x, cc.winSize.height / 3), cc.p(cc.winSize.width / 2, cc.winSize.height + 200),
            cc.p(cc.winSize.width, cc.winSize.height / 3)];
        bz = cc.bezierTo(2, bezier);
        roll = cc.rotateBy(5, 360 * 10);
        let imgSpawn = cc.spawn(bz, roll);
        this.sprite.runAction(imgSpawn);
    }



});

var testScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new testLayer();
        this.addChild(layer);
    }
});

