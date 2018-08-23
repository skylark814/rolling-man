cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new test2Scene());
    }, this);
};
cc.game.run();