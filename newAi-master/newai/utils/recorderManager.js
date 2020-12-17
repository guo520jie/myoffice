export default class RecorderManager {
  constructor() {
    this.recorderManager = wx.getRecorderManager();
    this.mp3RecorderOptions = {
      duration: 60000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: "mp3"
    };
    this.onStopCallBack = "";
  }

  setOnStopFn(fn) {
    this.onStopCallBack = fn;
  }

  start(options = this.mp3RecorderOptions) {
    this.recorderManager.start(options);
  }
  stop() {
    this.recorderManager.stop();
  }
  onStop() {
    this.recorderManager.onStop(res => {
      if (this.onStopCallBack) {
        const { tempFilePath } = res;
        this.onStopCallBack(tempFilePath);
      }
    });
  }
}
