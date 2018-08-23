var test2Layer = cc.Layer.extend({
    sprite: null,
    bg: null,
    mn: null,
    spriteRec: null,
    bz: null,
    roll: null,
    imgArr: new Array(3),
    tombArr: new Array(3),
    randomI: null,
    tomb: null,
    spriteMoveGround: null,
    imgid: null,
    score: 0,
    showScore: null,


    ctor: function () {
        this._super();

        this.imgArr = [res.cat_png, res.dog_png, res.sheep_png, res.cat_png, res.dog_png, res.sheep_png, res.cat_png,
            res.dog_png, res.sheep_png, res.sheep_png];
        this.tombArr = [res.tomb_png, res.tomb_png, res.tomb_png, res.tomb_png, res.tomb_png, res.tomb_png,
            res.tomb_png, res.tomb_png, res.tomb_png, res.tomb_png];

        this.spriteMoveGround = new cc.Sprite(res.meat_png);

        this.bg = new cc.Sprite(res.Background_png);
        this.bg.x = cc.winSize.width / 2;
        this.bg.y = cc.winSize.height / 2;
        this.addChild(this.bg);

        this.showScore = new cc.LabelTTF("0", "", 48);
        this.showScore.x = cc.winSize.width * 5 / 6;
        this.showScore.y = cc.winSize.height * 6 / 8;
        this.addChild(this.showScore);

        var goMenuItem = new cc.MenuItemImage(res.Go_up_png,
            res.Go_down_png,
            this.onMenuCallback, this);
        goMenuItem.x = 820;
        goMenuItem.y = cc.winSize.height - 540;

        this.sprite = new cc.Sprite(res.hidden_png);
        this.sprite.x = this.sprite.width / 5;
        this.sprite.y = cc.winSize.height / 3;

        this.addChild(this.sprite);


        this.mn = new cc.Menu(goMenuItem);
        this.addChild(this.mn, 1);
        this.mn.x = 0;
        this.mn.y = 0;
        this.mn.anchorX = 0.5;
        this.mn.anchorY = 0.5;
        this.setUpmymouse(this);
        this.scheduleUpdate();


        // this.changeImg();
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
                    let dropDown = cc.moveTo(1, cc.p(x + 50, cc.winSize.height / 3));

                    let changeTombImg = function () {
                        layer.tomb.x = x + 50;
                        layer.tomb.y = cc.winSize.height / 3;
                        layer.removeChild(layer.spriteMoveGround);
                        layer.addChild(layer.tomb);

                    };

                    if (cc.rectContainsPoint(layer.spriteRec, point)) {
                        if (layer.imgid === 2) {
                            layer.score += 10;
                            layer.showScore.setString(layer.score);
                        }
                        layer.spriteMoveGround.x = x;
                        layer.spriteMoveGround.y = y;
                        layer.removeChild(layer.sprite);
                        layer.addChild(layer.spriteMoveGround);
                        layer.spriteMoveGround.runAction(cc.sequence(dropDown, cc.callFunc(changeTombImg)));
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

    onMenuCallback() {
        this.sprite.schedule(this.testUpdate, 2, 9, 0.1);
        this.removeChild(this.mn);
    },
    testUpdate() {
        let layer = this.getParent();
        layer.changeImg();
        let i = Math.floor((Math.random() * 300) + 100);
        let bezier = [cc.p(layer.sprite.x, cc.winSize.height / 3), cc.p(cc.winSize.width / 2, cc.winSize.height + i),
            cc.p(cc.winSize.width, cc.winSize.height / 3)];
        let bz = cc.bezierTo(2, bezier);
        let roll = cc.rotateBy(2, 360 * 10);
        let imgSpawn = cc.spawn(bz, roll);
        layer.sprite.runAction(imgSpawn);
        this.removeChild(layer.sprite);
        layer.imgArr.splice(layer.randomI, 1);
        layer.tombArr.splice(layer.randomI, 1);

    },
    changeImg() {
        console.log(this.imgArr.length);
        this.randomI = Math.floor((Math.random() * this.imgArr.length));
        this.sprite = new cc.Sprite(this.imgArr[this.randomI]);
        this.tomb = new cc.Sprite(this.tombArr[this.randomI]);
        this.imgid = i;
        // this.sprite.x = this.sprite.width / 5;
        // this.sprite.y = cc.winSize.height / 3;
        this.spriteRec = new cc.Rect(
            this.sprite.x - this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
          this.addChild(this.sprite);

    }


});

var test2Scene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new test2Layer();
        this.addChild(layer);
    }
});

