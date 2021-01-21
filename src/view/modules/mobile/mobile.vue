<template>
<div class="m-consulting-wrap">
    <div class="base-advisory-pop base_advisory_pop">
        <div class="advisory-cont">
            <div class="cont-top" v-show="!submitStatus">
                <div class="top-lef">
                    <div class="lef-title">果蔬经营更赚钱，xx系统来帮您</div>
                </div>
                <div class="top-rig">
                    <img class="rig-close" @click.stop="hideAdPop" src="./images/delete_grey.png"/>
                    <img class="rig-ill" src="./images/title_ill_m.png"/>
                </div>
            </div>
            <div class="cont-msg" v-show="!submitStatus">
                <div class="cont-form">
                    <div class="form-box">
                        <div class="box-label">姓名</div>
                        <input
                            v-model="customer_name"
                            placeholder="必填"
                            class="box-ipt"
                            @focus="iptFocusHandler($event)"></input>
                    </div>
                    <div class="form-box">
                        <div class="box-label">手机号</div>
                        <input
                            v-model="wx_or_phone"
                            type="text"
                            onkeyup="value=value.replace(/[^\d]/g,'')"
                            maxlength=11
                            @focus="phoneError=''"
                            placeholder="必填"
                            :class="[{'el-input_error':phoneError}]"
                            class="box-ipt"></input>
                    </div>
                    <div class="form-box">
                        <div class="box-label">店铺名称</div>
                        <input
                            v-model="shop_name"
                            placeholder="必填"
                            class="box-ipt"
                            @focus="iptFocusHandler($event)"></input>
                    </div>
                    <div class="form-box">
                        <div class="box-label" >店铺地址</div>
                        <div class="box-ipt box-address" @click.stop="showCitySelect=true">
                            <input
                                v-model="shop_address_name"
                                placeholder="必填"
                                readonly
                                class="ipt-area box-ipt"></input>
                            <img class="arrow-img" src="./images/a_r.png">
                        </div>
                        <van-popup
                            v-model="showCitySelect"
                            round
                            :style="{ height: '392px'}"
                            position="bottom">
                            <van-area
                                :area-list="cityOptions"
                                :columns-num="2"
                                :visible-item-count="7"
                                :value="shop_address"
                                class="box-area"
                                @cancel="showCitySelect=false"
                                @confirm="areaConfirm"/>
                        </van-popup>
                    </div>
                    <div class="form-box">
                        <div class="box-label">解决方案</div>
                        <div class="box-radio">
                            <div :class="['radio-btn',{'radio-active':manage_type.includes(0)}]" @click.stop="() => checkType(0)">方案1</div>
                            <div :class="['radio-btn',{'radio-active':manage_type.includes(1)}]" @click.stop="() => checkType(1)">方案2</div>
                            <div :class="['radio-btn',{'radio-active':manage_type.includes(2)}]" @click.stop="() => checkType(2)">方案3</div>
                            <div :class="['radio-btn',{'radio-active':manage_type.includes(3)}]" @click.stop="() => checkType(3)">方案4</div>
                            <div :class="['radio-btn',{'radio-active':manage_type.includes(4)}]" @click.stop="() => checkType(4)">方案5</div>
                            <div :class="['radio-btn',{'radio-active':manage_type.includes(5)}]" @click.stop="() => checkType(5)">方案6</div>
                        </div>
                    </div>
                    <div class="form-box">
                        <div class="box-label">您方便接听电话的时间</div>
                        <div class="box-radio">
                            <div :class="['radio-btn',{'radio-active':available_time1==1}]" @click.stop="available_time1=available_time1==0?1:0">
                                <span>08:00-12:00</span>
                                <img class="avtive-img" v-show="available_time1==1" src="https://static.ls.senguo.cc/static/official/img/m_choose.png">
                            </div>
                            <div :class="['radio-btn',{'radio-active':available_time2==1}]" @click.stop="available_time2=available_time2==0?1:0">
                                <span>12:00-18:00</span>
                                <img class="avtive-img" v-show="available_time2==1" src="https://static.ls.senguo.cc/static/official/img/m_choose.png">
                            </div>
                            <div :class="['radio-btn',{'radio-active':available_time3==1}]" @click.stop="available_time3=available_time3==0?1:0">
                                <span>18:00-21:00</span>
                                <img class="avtive-img" v-show="available_time3==1" src="https://static.ls.senguo.cc/static/official/img/m_choose.png">
                            </div>
                        </div>
                    </div>
                    <div class="form-box">
                        <div class="box-label">其他需求</div>
                        <input
                            class="box-ipt"
                            v-model="remark"
                            placeholder="选填"
                            @focus="iptFocusHandler($event)"></input>
                    </div>
                    <button
                      :class="['mt20', 'form-btn',{'btn-active':allowSubmit}, {'btn-cli-active':submitBtnClickClass}]"
                      @click.stop="submit"
                      @touchstart.stop="touchstartHandler"
                      @touchmove.stop="touchendHandler"
                      @touchend.stop="touchendHandler"
                      >确认提交</button>
                </div>
                <div class="cont-bottom mt10">
                    <div>我们会在24小时内匹配最合适的人、在您指定的时间段尽快与您联系，</div>
                    <div>并承诺对您提交的信息进行保密</div>
                    <div>您还可以主动拨打森果服务热线：4xxx-xxx-xxx</div>
                </div>
            </div>
            <div class="cont-suc" v-show="submitStatus">
                <img class="suc-close" @click.stop="hideAdPop" src="https://static.ls.senguo.cc/static/official/img/delete_grey.png"/>
                <div class="suc-box">
                    <img class="suc-img" src="https://static.ls.senguo.cc/static/official/img/pay_success.png">
                </div>
                <div class="suc-txt">提交完成</div>
                <div class="suc-info">我们将在您指定的时间段与您尽快联系</div>
                <button
                    :class="['suc-btn', {'btn-cli-active':submitBtnClickClass}]"
                    @click.stop="hideAdPop"
                    @touchstart.stop="touchstartHandler"
                    @touchmove.stop="touchendHandler"
                    @touchend.stop="touchendHandler"
                >知道了</button>
                <div class="suc-allow">
                    <span class="all-line all-lef"></span>
                    <span class="all-txt">您还可以</span>
                    <span class="all-line all-rig"></span>
                </div>
                <div class="suc-code">
                    <div class="code-info">
                        <div class="info-txt">扫码添加客服微信</div>
                        <div class="info-txt">主动拨打xx热线</div>
                        <div class="info-txt info-phone">400-xxx-xxx</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { vantCitysOptions } from './city'

const getUrlParam = function (name, default_value) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return default_value || null;
}


export default {
  data: function () {
    return {
      customer_name: "",
      wx_or_phone: "",
      shop_name: "",
      shop_address: "",
      shop_address_name: "",
      manage_type: [],
      available_time1: 0,
      available_time2: 0,
      available_time3: 0,
      remark: "",
      shop_province: "",
      shop_city: "",
      cityOptions: vantCitysOptions, //省市级联数据
      submitStatus: false, //提交状态
      showCitySelect: false, //显示省市级联选择器
      submitBtnClickClass: false, //提交按钮
      source_args: "", //百度搜索参数
      hostnameMap: ["www.senguo.cc", "senguo.cc"],
      timer: "",
      phoneError: "",
    };
  },
  computed: {
    //是否允许提交
    allowSubmit: function () {
      var bool = true;
      if (this.customer_name == "") {
        bool = false;
      } else if (this.wx_or_phone == "") {
        bool = false;
      } else if (this.shop_name == "") {
        bool = false;
      } else if (this.shop_address == "") {
        bool = false;
      } else if (this.manage_type === []) {
        bool = false;
      } else if (
        this.available_time1 == 0 &&
        this.available_time2 == 0 &&
        this.available_time3 == 0
      ) {
        bool = false;
      }
      return bool;
    },
  },
  created() {
        /*post*/
        $.postJson = function(url, args, successCall, failCall, outline, timeout){
            // args._xsrf = window.dataObj._xsrf;
            var _failCall;
            _failCall = function (res){
                // 服务器返回
                if(res.readyState == 4){
                    // 登录超时
                    if(res.responseText && (typeof res.responseText == "string") && res.responseText.length>0 && (res.responseText)[0]=="{" && JSON.parse(res.responseText).error_code && JSON.parse(res.responseText).error_code==4031){
                        var responseText = JSON.parse(res.responseText);
                        Tip(responseText.error_text);
                        setTimeout(function() {
                            window.location.href = "/customer/login?next="+responseText.error_redirect;
                        },1500);
                    }else{
                        if(failCall){
                            failCall(res);
                        }else{
                            return Tip("请求失败 ("+res.status+" "+res.statusText+")");
                        }
                    }
                // 网络返回
                }else{
                    if(outline){
                        outline(res);
                    }else{
                        // Tip("无网络或请求超时，请检查您的网络是否正常 ("+res.statusText+")");
                    }
                }
            };
            var req = $.ajax({
                type:"post",
                url:url || window.location.href,
                data:JSON.stringify(args),
                contentType:"application/json; charset=UTF-8",
                timeout:timeout || 30000,
                crossDomain: true,
                success:successCall,
                fail:_failCall,
                error:_failCall
            });
        };
    },
  mounted: function () {
    var fromType = getUrlParam("from");
    var sourceArgs;
    if (fromType == "submit") {
      this.showAdPop();
      sourceArgs = getUrlParam("source_args");
      this.source_args = sourceArgs ? decodeURIComponent(sourceArgs) : "";
    } else {
      sourceArgs = location.search;
      sourceArgs = sourceArgs.startsWith("?")
        ? sourceArgs.substr(1)
        : sourceArgs;
      this.source_args = sourceArgs;
      // this.delayOpenPop();
    }
  },
  methods: {
    hideAdPop: function () {
      this.resetVmStatus();
      this.$emit('onClose')
    //   $(this.$el).hide();
    },

    checkType(type) {
      if (this.manage_type.includes(type)) {
        this.manage_type.splice(this.manage_type.findIndex((i) => i === type), 1) 
      } else {
        this.manage_type.push(type)
      }
    },
    // showAdPop: function () {
    //   // $(this.$el).show();
    //   this.$emit('onShow')
    // },
    //延时弹出意向单弹窗
    // delayOpenPop: function () {
    //   var self = this;
    //   var hostname = location.hostname;
    //   // if (this.hostnameMap.includes(hostname)) {
    //     setTimeout(function () {
    //       self.showAdPop();
    //     }, 5000);
    //   // }
    // },
    areaConfirm(value) {
      this.shop_province = value[0].code;
      this.shop_city = value[1].code;
      this.shop_address = value[0].code + "," + value[1].code;
      this.shop_address_name = value[0].name + "/" + value[1].name;
      this.showCitySelect = false;
    },
    touchstartHandler: function () {
      if (!this.allowSubmit) return;
      this.submitBtnClickClass = true;
    },
    touchendHandler: function () {
      this.submitBtnClickClass = false;
    },
    submit: function () {
      this.deBounce(this.submitAjax);
    },
    // 表单提交
    submitAjax: function () {
      if (!this.allowSubmit) return;
      if (!this.checkParams()) return;
      var self = this;
      var url = "https://xxxxxxx"; // 向服务器提交数据的地址
      var args = {
        customer_name: this.customer_name,
        wx_or_phone: this.wx_or_phone,
        shop_name: this.shop_name,
        manage_type: this.manage_type.join('|'),
        remark: this.remark,
        available_time1: this.available_time1,
        available_time2: this.available_time2,
        available_time3: this.available_time3,
        shop_province: this.shop_province,
        shop_city: this.shop_city,
      };

      // 添加百度搜索参数
      if (this.source_args) {
        args.source_args = this.source_args;
      }
      // var url="/admin/demandform"  // 测试服测试用
      $.postJson(
        url,
        args,
        function (res) {
          if (res.success) {
            window._agl && window._agl.push(["track", ["success", { t: 3 }]]);
            self.submitStatus = true;
          } else {
            vant.Toast(res.error_text);
          }
        },
        function (error) {
          vant.Toast(error.error_text);
        }
      );
    },
    // 重置实例状态
    resetVmStatus: function () {
      this.customer_name = "";
      this.wx_or_phone = "";
      this.shop_name = "";
      this.shop_address = "";
      this.shop_address_name = "";
      this.manage_type = [];
      this.available_time1 = 0;
      this.available_time2 = 0;
      this.available_time3 = 0;
      this.remark = "";
      this.shop_province = "";
      this.shop_city = "";
      this.submitStatus = false;
      this.showCitySelect = false;
    },
    iptFocusHandler: function (event) {},
    // 防抖函数
    deBounce: function (fn, delay) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function () {
        fn && fn();
      }, delay || 300);
    },
    // 校验参数
    checkParams() {
      var reg_phone = /^1[3,4,5,6,7,8,9]\d{9}$/;
      if (!reg_phone.test(this.wx_or_phone)) {
        this.phoneError = "请输入正确的11位手机号";
      }
      if (this.phoneError !== "") {
        vant.Toast(this.phoneError);
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.m-consulting-wrap {

    button {
        border: none;
    }

    /*---public----*/
    .new-font-color{color:#58d0a6;}
    .text-green{color:#6CCA86;}
    .text-green2{color:#89CEC9;}
    .bg-white{background-color:#fff;}
    .bg-red{background-color:#F88081;}
    .bg-green2{background-color:#89CEC9;}
    .text-grey{color:#999;}
    .text-red{color:#F88081;}
    .text-white{color:#fff;}
    .text-black{color:#222 !important;}
    .font12{font-size:12px !important;}
    .font14{font-size:14px;}
    .font16{font-size:16px;}
    .font18{font-size:18px;}
    .font20{font-size:20px;}
    .font24{font-size:24px;}
    .font36{font-size:36px;}
    .mt2{margin-top:2px !important;}
    .mt5{margin-top:5px !important;}
    .mb5{margin-bottom:5px !important;}
    .ml5{margin-left:5px !important;}
    .mr5{margin-right:5px !important;}
    .mt10{margin-top:10px !important;}
    .mt15{margin-top:15px !important;}
    .mt20{margin-top:20px !important;}
    .mt76{margin-top:76px !important;}
    .mb10{margin-bottom:10px !important;}
    .mb20{margin-bottom:20px !important;}
    .ml10{margin-left:10px !important;}
    .ml50{margin-left: 50px !important;}
    .mr10{margin-right:10px !important;}
    .ml20{margin-left:20px !important;}
    .mr20{margin-right:20px !important;}
    .mt40{margin-top:40px !important;}
    .mt30{margin-top:30px !important;}
    .ml40{margin-left:40px !important;}
    .mr40{margin-right:40px !important;}

    /* 意向单提交功能 */
    .base-advisory{position:fixed;bottom: 0;right: 0;z-index:998;cursor: pointer;}
    .base-advisory .advisory-p{display: block;width: 90px;height: 90px;}
    .base-advisory-pop{width: 100%;height: 100%;position: fixed;background-color: rgba(0,0,0,.4);top: 0;left: 0;z-index: 1999;}
    .base-advisory-pop .advisory-cont{bottom: 0;right: 0;width: 100%;height: 100%;background-image: linear-gradient(-81deg, #EAF5DD 6%, #DDF5ED 59%);}
    .advisory-cont .cont-top{display: flex;align-items: center;justify-content: space-between;height: 80px;padding: 10px 0 0 10px;overflow: hidden;}
    .advisory-cont .cont-top .top-lef{}
    .advisory-cont .top-lef .lef-logo{display: block;width: 50px;}
    .advisory-cont .top-lef .lef-title{margin-top: 5px;font-weight: bold;font-size: 18px;color: #333333;letter-spacing: 0;line-height: 28px;}
    .advisory-cont .cont-top .top-rig{position: relative;width: 90px;height: 100%;display: flex;justify-content: flex-end;}
    .advisory-cont .top-rig .rig-close{display: block;width: 20px;height: 20px;margin-right: 10px;cursor: pointer;z-index: 2;}
    .advisory-cont .top-rig .rig-ill{position: absolute;bottom: -15px;right: 0;display: block;width: 90px;}
    .advisory-cont .cont-msg{height: calc(100% - 80px); padding: 0 10px;background: #fff;border-radius: 15px 15px 0 0;}
    .advisory-cont .cont-form .form-box{width: 100%;min-height: 45px;display: flex;align-items: center;justify-content: space-between;}
    .advisory-cont .form-box .box-label{width: 75px;display: flex;flex-wrap: nowrap;font-size: 14px;color: #666666;}
    .advisory-cont .form-box .box-ipt{width: calc(100% - 75px);height: 42px;margin-left: 15px;font-size: 14px;color: #333333;border: none;border-bottom: 1px solid #eee;}
    .advisory-cont .form-box .el-input_error{border-color:#FF0000;}
    .advisory-cont .form-box .box-ipt::-webkit-input-placeholder {color: #999;}
    .advisory-cont .form-box .box-ipt::-moz-placeholder {color: #999;}
    .advisory-cont .form-box .box-ipt:-ms-input-placeholder {color: #999;}
    .advisory-cont .form-box .box-ipt:-moz-placeholder {color: #999;}
    .advisory-cont .form-box .box-ipt:focus{border-bottom:1px solid #58D0A6}
    /* 级联选择器 */
    .advisory-cont .form-box .box-address{position: relative}
    .advisory-cont .box-address .arrow-img{position: absolute;right: 0;top: 11px;width: 20px;height: 20px;}
    .advisory-cont .form-box .ipt-area{width: 100%;height: 40px;background: #fff;color: #333333;margin: 0;border: none;}
    .advisory-cont .form-box .box-area .van-picker__cancel{color: #666;font-size:16px;}
    .advisory-cont .form-box .box-area .van-picker__confirm{color: #58D0A6;font-size:16px;}
    /* 经营类型 、时间*/
    .advisory-cont .form-box .box-radio{display: flex;flex-wrap: wrap; padding: 10px 0 0 0; width: calc(100% - 75px);height: 100%;margin-left: 15px;align-items: center;border-bottom: 1px solid #eee;}
    .advisory-cont .form-box .box-radio .radio-btn{position: relative;width: 72px;margin-bottom: 10px;height: 30px;display: flex;align-items: center;justify-content: center;margin-right: 8px;background: #F2F2F2;border-radius: 4px;font-size: 12px;color: #666666;}
    .advisory-cont .form-box .box-radio .radio-active{background: rgba(88,208,166,0.20);color: #58D0A6;}
    .advisory-cont .box-radio .radio-active .avtive-img{position: absolute;right: 0;bottom: 0;width:12px;height:12px;}
    .advisory-cont .form-btn{width: 100%;height: 44px;font-size: 16px;border-radius: 5px;color: #fff;background: #DDDDDD;}
    .advisory-cont .btn-active{background: #58D0A6;box-shadow: 0 4px 4px 0 rgba(88,208,166,0.35)}
    .advisory-cont .cont-bottom{font-size: 10px;color: #999999;letter-spacing: 0;text-align: center;line-height: 16px;}
    /* 提交成功页面 */
    .advisory-cont .cont-suc{position: relative;width: 100%;height: 100%;padding: 0 10px;border-radius: 15px 15px 0 0;background: #fff;text-align: center;}
    .advisory-cont .cont-suc .suc-close{position: absolute;right: 10px;top: 10px;display: block;width: 20px;height: 20px;cursor: pointer;}
    .advisory-cont .cont-suc .suc-box{display: flex;align-items: center;justify-content: center;padding-top: 70px;}
    .advisory-cont .suc-box .suc-img{width: 80px;height: 80px;display: block;}
    .advisory-cont .cont-suc .suc-txt{margin-top: 10px;text-align: center;font-size: 20px;color: #333333;letter-spacing: 0;}
    .advisory-cont .cont-suc .suc-info{margin-top: 10px;font-size: 14px;color: #666666;letter-spacing: 0;text-align: center;line-height: 16px;}
    .advisory-cont .cont-suc .suc-btn{width: 100%;height: 44px;display: flex;align-items: center;justify-content: center;margin: 20px auto 0 auto;background: #58D0A6;box-shadow: 0 4px 4px 0 rgba(88,208,166,0.35);border-radius: 5px;font-size: 16px;color: #FFFFFF;}
    .advisory-cont .cont-suc .suc-allow{margin-top: 80px;display: flex;justify-content: center;align-items: center;}
    .advisory-cont .suc-allow .all-line{width: 60px;height: 2px;border-radius: 1.5px;}
    .advisory-cont .suc-allow .all-lef{background-image: linear-gradient(90deg, rgba(153,153,153,0.00) 0%, #D2D2D2 100%);}
    .advisory-cont .suc-allow .all-rig{transform: scaleX(-1);background-image: linear-gradient(90deg, rgba(153,153,153,0.00) 0%, #D2D2D2 100%);}
    .advisory-cont .suc-allow .all-txt{padding: 0 5px;font-size: 16px;color: #333333;letter-spacing: 0;text-align: center;line-height: 16px;}
    .advisory-cont .cont-suc .suc-code{margin-top: 10px;display: flex;justify-content: center;align-items: center;}
    .advisory-cont .suc-code .code-img{width: 80px;height: 80px;display: block;}
    .advisory-cont .suc-code .code-info{display: flex;flex-direction: column;justify-content: space-around;align-items: center;height: 80px;padding:5px 8px;}
    .advisory-cont .code-info .info-txt{font-size: 14px;color: #666666;letter-spacing: 0;line-height: 20px;}
    .advisory-cont .code-info .info-phone{font-size: 16px;color: #333333;letter-spacing: 0;line-height: 24px;letter-spacing: 1px;}
    .advisory-cont .btn-cli-active{background: #46a684!important;}
}
</style>