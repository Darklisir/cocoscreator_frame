// var UserData = require('UserData');
// var gameManager = require("GameManager");
cc.Class({
  extends: cc.Component,

  properties: {
    onImg: cc.SpriteFrame, //开启状态图片
    offImg: cc.SpriteFrame, //关闭状态图片


    isPlay: {
      default: true,
      notify: function () {
        this._updateSoundImg();
      }
    },
  },

  onEnable: function () {
    this.isPlay = ga.SoundMgr.getEnable();
  },

  _updateSoundImg: function () {
    if (this.isPlay) {
      this.node.getComponent(cc.Sprite).spriteFrame = this.onImg;
    } else {
      this.node.getComponent(cc.Sprite).spriteFrame = this.offImg;
    }
  },

  changeSound: function () {
    if (this.isPlay) {
      ga.SoundMgr.setEnabled(false);
      cc.log("音乐暂停");
    } else {
      ga.SoundMgr.setEnabled(true);
      cc.log("音乐继续");
    }
    this.isPlay = ga.SoundMgr.getEnable();
  },


  // update (dt) {},
});
