var HelpLayer = cc.Layer.extend({
    sprite: null,
    bg: null,
    mn: null,
    desc1:null,
    desc2:null,
    desc3:null,
    desc4:null,
    x3:null,
    x4:null,
    x5:null,
    man:null,
    arrow:null,

    ctor: function () {
        this._super();

        this.bg = new cc.Sprite(res.helpbg_jpg);
        this.bg.x = cc.winSize.width / 2;
        this.bg.y = cc.winSize.height / 2;
        this.addChild(this.bg);

        this.sprite = new cc.Sprite(res.demo_png);
        this.sprite.x = cc.winSize.width*4/5;
        this.sprite.y = cc.winSize.height/2;
        this.sprite.setScale(0.7,1);
        this.addChild(this.sprite);

        this.desc1 = new cc.Sprite(res.desc1_png);
        this.desc1.x = cc.winSize.width/2+50;
        this.desc1.y = cc.winSize.height*8/9;
        this.addChild(this.desc1);

        this.desc2 = new cc.Sprite(res.desc2_png);
        this.desc2.x = cc.winSize.width*1/5;
        this.desc2.y = cc.winSize.height*4/6;
        this.addChild(this.desc2);

        this.desc3 = new cc.Sprite(res.desc3_png);
        this.desc3.x = cc.winSize.width*1/5;
        this.desc3.y = cc.winSize.height*3/6;
        this.addChild(this.desc3);

        this.desc4 = new cc.Sprite(res.desc4_png);
        this.desc4.x = cc.winSize.width*1/5;
        this.desc4.y = cc.winSize.height*2/6;
        this.addChild(this.desc4);

        this.man = new cc.Sprite(res.man_png);
        this.man.x = cc.winSize.width*2/5;
        this.man.y = cc.winSize.height*3/6;
        this.man.setScale(0.4,0.4);
        this.addChild(this.man);

        this.arrow = new cc.Sprite(res.arrow_png);
        this.arrow.x = cc.winSize.width*2/5;
        this.arrow.y = cc.winSize.height*5/7+40;
        this.addChild(this.arrow);


        this.x3 = new cc.Sprite(res.x3_png);
        this.x3.x = cc.winSize.width*11/20;
        this.x3.y = cc.winSize.height*4/6;
        this.addChild(this.x3);

        this.x4 = new cc.Sprite(res.x4_png);
        this.x4.x = cc.winSize.width*11/20;
        this.x4.y = cc.winSize.height/2;
        this.addChild(this.x4);

        this.x5 = new cc.Sprite(res.x5_png);
        this.x5.x = cc.winSize.width*11/20;
        this.x5.y = cc.winSize.height*2/6;
        this.addChild(this.x5);

        let backMenuItem = new cc.MenuItemImage(res.back_png, res.back_png,
            function () {
                cc.director.popScene();
            }, this);
        backMenuItem.x = cc.winSize.width / 10;
        backMenuItem.y = cc.winSize.height * 9 / 10;

        this.mn = new cc.Menu(backMenuItem);
        this.addChild(this.mn, 2);
        this.mn.x = 0;
        this.mn.y = 0;
        this.mn.anchorX = 0.5;
        this.mn.anchorY = 0.5;

        return true;
    }
});
var HelpScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelpLayer();
        this.addChild(layer);
    }
});

