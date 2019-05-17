var SoundMgr = function () {
};

var instance = null;

SoundMgr.getInstance = function () {
  if (instance == null) {
    instance = new SoundMgr();
    instance.init();
  }
  return instance;
};

SoundMgr.prototype.init = function () {
  this.sounds = {};
  this.music = "";
  this.enabled = true;

  //初始化时加载所有音频资源 Resources目录下   "sounds" 文件夹
  let self = this;
  cc.loader.loadResDir('sounds', cc.AudioClip, function (err, clips) {
    for (let i = 0; i < clips.length; i++) {
      self.addSound(clips[i].name, clips[i]);
      console.log("-------------SoundMgr_music---------", clips[i].name);
    }
  });
};

//添加音乐
SoundMgr.prototype.addSound = function (key, clip) {
  this.sounds[key] = clip;
  // console.log("-------------addSound---------")
};

//播放音效
SoundMgr.prototype.playFx = function (fxName) {
  if (!this.enabled) return; //根据音乐开关 是否 播放音效
  cc.audioEngine.playEffect(this.sounds[fxName], false);
  console.log("-------------playFxMusic---------", fxName);
};

//播放背景音乐
SoundMgr.prototype.playBgMusic = function (musicName) {
  this.music = musicName;
  if (!this.enabled) return; //根据音乐开关 是否 播放音乐
  if (cc.audioEngine.getState(this.audioID) > 0) return; //防止重复播放音乐
  this.audioID = cc.audioEngine.play(this.sounds[musicName], true);
  console.log("-------------playBgMusic---------", musicName);
};

//停止播放背景音乐
SoundMgr.prototype.stopBgMusic = function () {
  cc.audioEngine.stop();
};

//控制音乐开关
SoundMgr.prototype.setEnabled = function (isEnabled) {
  this.enabled = isEnabled;
  if (this.enabled) {
    this.playBgMusic(this.music);
  } else {
    cc.audioEngine.stopAll();
  }
};

//获取音乐开关状态
SoundMgr.prototype.getEnable = function () {
  return this.enabled;
}

module.exports = SoundMgr;