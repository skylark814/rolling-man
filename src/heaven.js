var HeavenLayer = cc.Layer.extend({
    sprite: null,
    bg: null,
    mn1: null,
    mn2: null,
    spriteRec: null,
    bz: null,
    roll: null,
    imgArr: new Array(),
    tombArr: new Array(),
    bloodArr: new Array(),
    randomI: null,
    tomb: null,
    blood: null,
    spriteMoveGround: null,
    imgId: 0,
    score: 0,
    showScore: null,
    winImg: null,
    loseImg: null,
    sight: null,
    ctor: function () {
        this._super();

        this.imgArr = [res.man_png, res.man_png, res.man_png, res.cat_png, res.dog_png, res.sheep_png,
            res.cat_png, res.dog_png, res.sheep_png, res.cat_png,];
        this.tombArr = [res.tomb1_png, res.tomb1_png, res.tomb1_png, res.tomb1_png, res.tomb1_png, res.tomb1_png,
            res.tomb1_png, res.tomb1_png, res.tomb1_png, res.tomb1_png];
        this.bloodArr = [res.blood_png, res.blood_png, res.blood_png, res.blood_png, res.blood_png, res.blood_png,
            res.blood_png, res.blood_png, res.blood_png];

        this.bg = new cc.Sprite(res.bg_jpg);
        this.bg.x = cc.winSize.width / 2;
        this.bg.y = cc.winSize.height / 2;
        this.addChild(this.bg);

        this.sight = new cc.Sprite(res.sight_png);
        this.addChild(this.sight, 5);


        this.showScore = new cc.LabelTTF("Score:0", "Vani", 50);
        this.showScore.x = cc.winSize.width * 17 / 20;
        this.showScore.y = cc.winSize.height * 9 / 10;
        this.showScore.setColor(cc.color(102, 0, 255));
        this.addChild(this.showScore);

        this.sprite = new cc.Sprite(res.hidden_png);
        this.sprite.x = -150;
        this.sprite.y = cc.winSize.height * 2 / 3;
        this.addChild(this.sprite);

        let goMenuItem = new cc.MenuItemImage(res.start_png,
            res.start_png,
            this.onMenuCallback, this);
        goMenuItem.x = cc.winSize.width * 9 / 10;
        goMenuItem.y = cc.winSize.height * 4 / 30;

        let backMenuItem = new cc.MenuItemImage(res.back_png, res.back_png,
            function () {
                cc.director.popScene();
            }, this);
        backMenuItem.x = cc.winSize.width / 10;
        backMenuItem.y = cc.winSize.height * 9 / 10;

        let backMenuItem2 = new cc.MenuItemImage(res.back_png, res.back_png,
            function () {
                cc.director.popScene();
            }, this);
        backMenuItem2.x = cc.winSize.width / 10;
        backMenuItem2.y = cc.winSize.height * 9 / 10;

        this.mn1 = new cc.Menu(goMenuItem, backMenuItem);
        this.addChild(this.mn1, 2);
        this.mn1.x = 0;
        this.mn1.y = 0;
        this.mn1.anchorX = 0.5;
        this.mn1.anchorY = 0.5;

        this.mn2 = new cc.Menu(backMenuItem2);
        this.mn2.x = 0;
        this.mn2.y = 0;
        this.mn2.anchorX = 0.5;
        this.mn2.anchorY = 0.5;
        this.addChild(this.mn2, 1);

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
                    let dropDown = cc.moveTo(0.5, cc.p(x + 50, cc.winSize.height / 4 - 30));
                    let rote = cc.rotateBy(0.5, 360);
                    let dropSpawn = cc.spawn(dropDown, rote);
                    let changeTombImg = function () {
                        layer.tomb.x = x + 50;
                        layer.tomb.y = cc.winSize.height / 4;
                        layer.blood.x = x + 50;
                        layer.blood.y = cc.winSize.height / 4 - 40;
                        layer.removeChild(layer.spriteMoveGround);
                        if (layer.imgId === 0) {
                            layer.addChild(layer.tomb);
                        }
                        else {
                            layer.addChild(layer.blood);
                        }
                    };
                    audioEngine.playEffect(res.gun_wav);

                    if (cc.rectContainsPoint(layer.spriteRec, point)) {
                        if (layer.imgId === 0) {
                            layer.score += 10;
                            layer.showScore.setString("Score:" + layer.score);
                        }
                        else {
                            layer.score -= 10;
                            layer.showScore.setString("Score:" + layer.score);
                        }
                        layer.spriteMoveGround.x = x;
                        layer.spriteMoveGround.y = y;
                        layer.removeChild(layer.sprite);
                        layer.addChild(layer.spriteMoveGround);
                        layer.spriteMoveGround.runAction(cc.sequence(dropSpawn, cc.callFunc(changeTombImg)));
                    }
                },
                onMouseMove: function (e) {
                    let x = e.getLocationX();
                    let y = e.getLocationY();
                    cc._canvas.style.cursor = "none";
                    layer.sight.x = x;
                    layer.sight.y = y;
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
        this.sprite.schedule(this.actionUpdate, 3.5, 10, 0.1);
        this.removeChild(this.mn1);
        this.sprite.schedule(this.winOrLose, 0.1, 0, 35.1);
    },
    actionUpdate() {
        let layer = this.getParent();
        layer.changeImg();
        let i = Math.floor((Math.random() * 300) + 100);
        let bezier = [cc.p(layer.sprite.x, cc.winSize.height / 3), cc.p(cc.winSize.width / 2, cc.winSize.height + i),
            cc.p(cc.winSize.width + 100, cc.winSize.height / 3)];
        let bz = cc.bezierTo(3, bezier);
        let roll = cc.rotateBy(3, 360 * 2);
        let imgSpawn = cc.spawn(bz, roll);
        layer.sprite.runAction(imgSpawn);
        this.removeChild(layer.sprite);
        layer.imgArr.splice(layer.randomI, 1);
        layer.tombArr.splice(layer.randomI, 1);
    },
    changeImg() {
        this.randomI = Math.floor((Math.random() * this.imgArr.length));
        this.sprite = new cc.Sprite(this.imgArr[this.randomI]);
        this.tomb = new cc.Sprite(this.tombArr[this.randomI]);
        this.blood = new cc.Sprite(this.bloodArr[this.randomI]);
        if (this.imgArr[this.randomI] === res.man_png) {
            this.sprite.setScale(0.2, 0.2);
            this.spriteMoveGround = new cc.Sprite(res.man_png);
            this.spriteMoveGround.setScale(0.2, 0.2);
            this.imgId = 0;
        }
        else {
            this.spriteMoveGround = new cc.Sprite(res.blood_png);
            this.imgId = 1;
        }
        this.sprite.x = -100;
        this.sprite.y = cc.winSize.height / 3;
        this.spriteRec = new cc.Rect(
            this.sprite.x - this.sprite.width / 2,
            this.sprite.y - this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
        this.addChild(this.sprite);
    },
    winOrLose() {
        let layer = this.getParent();
        if (layer.score === 30) {
            layer.winImg = new cc.Sprite(res.win_png);
            layer.winImg.x = cc.winSize.width / 2;
            layer.winImg.y = cc.winSize.height / 2;
            layer.addChild(layer.winImg);
            audioEngine.playEffect(res.win_mp3);
        }
        else {
            layer.loseImg = new cc.Sprite(res.lose_png);
            layer.loseImg.x = cc.winSize.width / 2;
            layer.loseImg.y = cc.winSize.height / 2;
            layer.loseImg.setScale(0.5, 0.5);
            layer.addChild(layer.loseImg);
            audioEngine.playEffect(res.lose_mp3);
        }
    }
});
var HeavenScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HeavenLayer();
        this.addChild(layer);
    }
});

