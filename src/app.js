var audioEngine = cc.audioEngine;

var MainLayer = cc.Layer.extend({
    title:null,
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.bg_jpg);
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

        cc._canvas.style.cursor ="default";


        this.title = new cc.Sprite(res.title_png);
        this.title.x = cc.winSize.width/2;
        this.title.y = cc.winSize.height * 8 / 10;
        this.addChild(this.title);

        let pItmMenu1 = new cc.MenuItemImage(res.heaven_png,
            res.heaven_png,
            this.onMenuCallback1, this);
        // pItmMenu1.x = cc.winSize.width /2;
        // pItmMenu1.y = cc.winSize.height*1/10;

        let pItmMenu2 = new cc.MenuItemImage(res.normal_png,
            res.normal_png,
            this.onMenuCallback2, this);
        // pItmMenu2.x = cc.winSize.width /2;
        // pItmMenu2.y = cc.winSize.height*4/10;

        let pItmMenu3 = new cc.MenuItemImage(res.hell_png,
            res.hell_png,
            this.onMenuCallback3, this);
        // pItmMenu3.x = cc.winSize.width /2;
        // pItmMenu3.y = cc.winSize.height*6/10;

        var mn = new cc.Menu(pItmMenu1, pItmMenu2, pItmMenu3);
        mn.alignItemsVertically();
        mn.x = cc.winSize.width/2;
        mn.y = cc.winSize.height*1/3;
        this.addChild(mn);
        return true;
    },
    onMenuCallback1: function () {
        cc.director.pushScene(new cc.TransitionJumpZoom(1, new HeavenScene()));
    },
    onMenuCallback2: function () {
        cc.director.pushScene(new cc.TransitionSlideInR(1, new NormalScene()));
    },
    onMenuCallback3: function () {
        cc.director.pushScene(new cc.TransitionSlideInR(1, new HellScene()));
    },
    onEnterTransitionDidFinish: function () {
        this._super();
        audioEngine.playMusic(res.bg_mp3, true);
    }
});

var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

