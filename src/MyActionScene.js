﻿var MyActionLayer = cc.Layer.extend({
    flagTag: 0,                     	// 動作標志
    ctor: function (flagTag) {
        // ////////////////////////////
        // 1. super init first
        this._super();
        this.flagTag = flagTag;

        cc.log("MyActionLayer init flagTag " + this.flagTag);

        var size = cc.director.getWinSize();

        var bg = new cc.Sprite(res.Background_png);
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

        var sprite = new cc.Sprite(res.hero_png);
        sprite.x = size.width / 2;
        sprite.y = size.height / 2;
        this.addChild(sprite, 1, SP_TAG);

        var backMenuItem = new cc.MenuItemImage(res.Back_up_png, res.Back_down_png,
            function () {
                cc.director.popScene();
            }, this);
        backMenuItem.x = 140;
        backMenuItem.y = size.height - 65;

        var goMenuItem = new cc.MenuItemImage(res.Go_up_png,
            res.Go_down_png,
            this.onMenuCallback, this);
        goMenuItem.x = 820;
        goMenuItem.y = size.height - 540;

        var mn = new cc.Menu(backMenuItem, goMenuItem);
        this.addChild(mn, 1);
        mn.x = 0;
        mn.y = 0;
        mn.anchorX = 0.5;
        mn.anchorY = 0.5;

        return true;
    },
    onMenuCallback: function (sender) {
        cc.log("Tag = " + this.flagTag);
        var sprite = this.getChildByTag(SP_TAG);
        var size = cc.director.getWinSize();

        switch (this.flagTag) {
            case ActionTypes.kMoveTo:
                sprite.runAction(cc.moveTo(2, cc.p(size.width - 50, size.height - 50)));
                break;
            case ActionTypes.kMoveBy:
                sprite.runAction(cc.moveBy(2, cc.p(-50, -50)));
                break;
            case ActionTypes.kJumpTo:
                sprite.runAction(cc.jumpTo(2, cc.p(150, 50), 30, 5));
                break;
            case ActionTypes.kJumpBy:
                sprite.runAction(cc.jumpBy(2, cc.p(100, 100), 30, 5));
                break;
            case ActionTypes.kBezierBy:
                var bezier = [cc.p(0, size.height / 2), cc.p(500, -size.height / 3), cc.p(size.width/2, 0)];
                sprite.runAction(cc.bezierBy(3, bezier));
                break;
            case ActionTypes.kScaleTo:
                sprite.runAction(cc.scaleTo(2, 4));
                break;
            case ActionTypes.kScaleBy:
                sprite.runAction(cc.scaleBy(2, 0.5));
                break;
            case ActionTypes.kRotateTo:
                sprite.runAction(cc.rotateTo(2, 180));
                break;
            case ActionTypes.kRotateBy:
                sprite.runAction(cc.rotateBy(2, -180));
                break;
            case ActionTypes.kBlink:
                sprite.runAction(cc.blink(3, 5));
                break;
            case ActionTypes.kTintTo:
                sprite.runAction(cc.tintTo(2, 255, 0, 0));
                break;
            case ActionTypes.kTintBy:
                sprite.runAction(cc.tintBy(0.5, 0, 255, 255));
                break;
            case ActionTypes.kFadeTo:
                sprite.runAction(cc.fadeTo(1, 80));
                break;
            case ActionTypes.kFadeIn:
                sprite.opacity = 10;
			    sprite.runAction(cc.fadeIn(1));
                break;
            case ActionTypes.kFadeOut:
                sprite.runAction(cc.fadeOut(1));
                break;
        }
    }
});

var MyActionScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        // var layer = new MyActionLayer();
        // this.addChild(layer);
    }
});

