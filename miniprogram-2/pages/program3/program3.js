// pages/program5/program5.js

const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var msg = '';
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msg = ' ';
  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '你好，我是微信小助手，欢迎来使用。'
    },
  ]
  that.setData({
    msgList,
    inputVal,
    msg,
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,

  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  // 回车后发送信息
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    // console.log(e.detail.value);
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
    // 发送后将msg归零
    msg = '';
    console.log(msg);
  },
  // 输入内容后将内容存储到msg中
  getInput: function(e){
    console.log(e.detail.value);
    msg=e.detail.value
  },
  // 点击发送后发送信息
  sendMsg: function(e){
    let arr = msgList;
    let obj = ({
      speaker: 'customer',
      contentType: 'text',
      content: msg
    });
    arr.push(obj);
    this.setData({
      msgList:arr,
      inputVal:'',
    });
    // 发送后将msg归零
    msg = '';
    // 发送信息后定位到最下面
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },
  //点击图片，选择一张图片
  sendimage:function(){
    wx.chooseImage({
      success:function(res){
        console.log(res.tempFilePaths);
        let obj = {
              speaker: 'customer',
              contentType: 'image',
              content: res.tempFilePaths,
            };
        msgList.push(obj);
        inputVal='';
      }
    })

    // 发送信息后定位到最下面
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
