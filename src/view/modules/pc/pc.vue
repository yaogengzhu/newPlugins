<template>
    <div class="senguo-consulting-plugin">
        <div class="base-advisory-pop base_advisory_pop">
            <div class="advisory-cont">
                <div class="cont-top" v-show="!submitStatus">
                    <div class="top-lef">
                       
                        <div class="lef-title">果蔬经营更赚钱，xx系统来帮您</div>
                    </div>
                    <div class="top-rig">
                        <img class="rig-close" @click.stop="hideAdPop" src="https://static.ls.senguo.cc/static/official/img/delete_grey.png?v=6d8053f9753735b8c71b0adb26599763"/>
                        <img class="rig-ill" src="https://static.ls.senguo.cc/static/official/img/title_ill_p.png?v=2898a9864ba74d4f5703815fc22440d3"/>
                    </div>
                </div>
                <div class="cont-msg" v-show="!submitStatus">
                    <div class="cont-form">
                        <div class="form-box mb20">
                            <input
                                v-model="customer_name"
                                ref="namIpt"
                                placeholder="姓名"
                                class="box-ipt"></input>
                            <label class="box-label">姓名</label>
                        </div>
                        <div class="form-box mb20">
                            <input
                                v-model="wx_or_phone"
                                type=""
                                onkeyup="value=value.replace(/[^\d]/g,'')"
                                maxlength=11
                                @focus="phoneError=''"
                                placeholder="手机号"
                                :class="[{'el-input_error':phoneError}]"
                                class="box-ipt"></input>
                            <label class="box-label">手机号</label>
                        </div>
                        <div class="form-box mb20">
                            <input
                                v-model="shop_name"
                                placeholder="店铺名称"
                                class="box-ipt"></input>
                            <label class="box-label">店铺名称</label>
                        </div>
                        <div class="form-box mb10">
                            <el-cascader
                                class="box-cader"
                                v-model="shop_address"
                                placeholder="店铺地址(必填)"
                                :options="cityOptions"
                                :props="{ expandTrigger: 'hover'}"
                                @change="addressChange"></el-cascader>
                        </div>
                        <div class="form-box mb10 ">
                            <div class="box-title">您想了解的解决方案是:（多选）</div>
                            <el-checkbox-group v-model="manage_type">
                              <el-checkbox class="box-checkbox" label="0">方案1</el-checkbox>
                              <el-checkbox class="box-checkbox" label="1">方案2</el-checkbox>
                              <el-checkbox class="box-checkbox" label="2">方案3</el-checkbox>
                              <el-checkbox class="box-checkbox" label="3">方案4</el-checkbox>
                              <el-checkbox class="box-checkbox" label="4">方案5</el-checkbox>
                              <el-checkbox class="box-checkbox" label="5">方案6</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="form-box mb10">
                            <div class="box-title">您方便接听电话的时间(多选)</div>
                            <el-checkbox class="box-checkbox" v-model="available_time1" :true-label="1" :false-label="0">08:00-12:00</el-checkbox>
                            <el-checkbox class="box-checkbox" v-model="available_time2" :true-label="1" :false-label="0">12:00-18:00</el-checkbox>
                            <el-checkbox class="box-checkbox" v-model="available_time3" :true-label="1" :false-label="0">18:00-21:00</el-checkbox>
                        </div>
                        <div class="form-box mb20">
                            <el-input
                                class="box-area"
                                type="textarea"
                                v-model="remark"
                                placeholder="其他需求(选填)"></el-input>
                        </div>
                        <button
                        :class="['form-btn',{'btn-active':allowSubmit}, {'btn-cli-active':submitBtnClickClass}]"
                        @click.stop="submit"
                        @mousedown.stop="mousedownHandler"
                        @mousemove.stop="mouseupHandler"
                        @mouseup.stop="mouseupHandler"
                        >确认提交</button>
                    </div>
                    <div class="cont-bottom mt10">
                        <div>我们会在24小时内匹配最合适的人、在您指定的时间段尽快与您联系，</div>
                        <div>并承诺对您提交的信息进行保密</div>
                        <div>您还可以主动拨打森果服务热线：400xxx-xxx-xxxx</div>
                    </div>
                </div>
                <div class="cont-suc" v-show="submitStatus">
                    <img class="suc-close" @click.stop="hideAdPop" src="https://static.ls.senguo.cc/static/official/img/delete_grey.png?v=6d8053f9753735b8c71b0adb26599763"/>
                    <div class="suc-box">
                        <img class="suc-img" src="https://static.ls.senguo.cc/static/official/img/pay_success.png?v=37db0bea83775f2c1fd01a2011053440">
                    </div>
                    <div class="suc-txt">提交完成</div>
                    <div class="suc-info">我们将在您指定的时间段与您尽快联系</div>
                    <button
                        :class="['suc-btn', {'btn-cli-active':submitBtnClickClass}]"
                        @click.stop="hideAdPop"
                        @mousedown.stop="mousedownHandler"
                        @mousemove.stop="mouseupHandler"
                        @mouseup.stop="mouseupHandler"
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
import { citysOptions } from './city'

const getUrlParam = function (name, default_value) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return default_value || null;
}

export default {
  data: function () {
    return {
        isShow: true,
        customer_name: "",
        wx_or_phone: "",
        shop_name: "",
        shop_address: [],
        manage_type: [],
        available_time1: 0,
        available_time2: 0,
        available_time3: 0,
        remark: "",
        shop_province: "",
        shop_city: "",
        cityOptions: citysOptions, //省市级联数据
        submitStatus: false, //提交状态
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
      } else if (this.shop_address.length == 0) {
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
    }
  },
  methods: {
    hideAdPop: function () {
      this.resetVmStatus();
      this.$emit('onClose')
    },
    addressChange: function (value) {
      this.shop_province = value[0];
      this.shop_city = value[1];
    },
    mousedownHandler: function () {
      if (!this.allowSubmit) return;
      this.submitBtnClickClass = true;
    },
    mouseupHandler: function () {
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
      var url = "https://xxxx/xxx"; // 向服务器提交请求地址
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

      if (this.source_args) {
        args.source_args = this.source_args;
      }
      $.postJson(
        url,
        args,
        function (res) {
          if (res.success) {
            window._agl && window._agl.push(["track", ["success", { t: 3 }]]);
            self.submitStatus = true;
          } else {
            self.$message({
              message: res.error_text,
              type: "error",
              duration: 1500,
            });
          }
        },
        function (error) {
          self.$message({
            message: error.error_text,
            type: "error",
            duration: 1500,
          });
        }
      );
    },
    // 重置实例状态
    resetVmStatus: function () {
      this.customer_name = "";
      this.wx_or_phone = "";
      this.shop_name = "";
      this.shop_address = [];
      this.manage_type = [];
      this.available_time1 = 0;
      this.available_time2 = 0;
      this.available_time3 = 0;
      this.remark = "";
      this.shop_province = "";
      this.shop_city = "";
      this.submitStatus = false;
    },
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
      } else {
        this.phoneError = "";
      }
      if (this.phoneError !== "") {
        this.$message({
          message: this.phoneError,
          type: "error",
          duration: 1500,
        });
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
body /deep/ .el-cascader__dropdown .el-cascader-menu .in-active-path{color: #58D0A6}
body /deep/ .el-cascader__dropdown .el-cascader-menu .el-cascader-node.is-active{color: #58D0A6}
body /deep/ .el-cascader-menu__item {
  display: block !important;
}
.el-cascader-menu__item.is-active {
    color: #58D0A6 !important;
}

.senguo-consulting-plugin {
    input {
        outline: none;
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

    /* 官网意向单提交功能 */
    .head .header-phone{font-weight: bold;color: rgb(255, 255, 255)}
    .head-active .header-phone{color: rgb(51, 51, 51);}
    .base-advisory{position:fixed;bottom: 0;right: 0;z-index:1000;cursor: pointer;}
    .base-advisory .advisory-p{display: block;width: 138px;height: 140px;}
    .base-advisory-pop{width: 100%;height: 100%;position: fixed;background-color: rgba(0,0,0,.4);top: 0;left: 0;z-index: 1999;}
    .base-advisory-pop .advisory-cont{position: absolute;bottom: 0;right: 0;width: 480px;height: 100%;background: #fff;border-radius: 20px 0 0 20px;background-image: linear-gradient(-81deg, #EAF5DD 6%, #DDF5ED 59%);overflow: auto;}
    .advisory-cont .cont-top{position:relative;display: flex;align-items: center;justify-content: space-between;height: 106px;padding: 10px 0 0 10px;overflow: hidden;}
    .advisory-cont .cont-top .top-lef{}
    .advisory-cont .top-lef .lef-logo{display: block;width: 70px;}
    .advisory-cont .top-lef .lef-title{margin-top: 8px;font-size: 24px;font-weight: bold;color: #333333;letter-spacing: 0;line-height: 32px;}
    .advisory-cont .cont-top .top-rig{position: absolute;width: 120px;height: 100%;display: flex;justify-content: flex-end;top: 10px;right:0px;}
    .advisory-cont .top-rig .rig-close{display: block;width: 20px;height: 20px;position: relative;right: 10px;cursor: pointer;}
    .advisory-cont .top-rig .rig-ill{position: absolute;bottom: -15px;right: 0;display: block;width: 120px;}
    .advisory-cont .cont-msg{
      padding: 20px 30px 20px 30px;
      background: #fff;
      border-radius: 20px 0 0 20px;
      box-shadow: 0 -1px 4px 0 rgba(2,121,93,0.15);
      position: absolute;
      bottom: 0;
      top: 118px;
      overflow: auto;
    }
    .advisory-cont .cont-form .form-box{}
    .advisory-cont .form-box .box-ipt{width: 420px;height: 44px;font-size: 14px;color: #333333;padding-left: 5px;border-radius: 5px;border: 1px solid #ddd;}
    .advisory-cont .form-box .el-input_error{border-color:#FF0000;}
    /* ipt输入框 */
    .advisory-cont .form-box .box-ipt::-webkit-input-placeholder {color: #adadad;}
    .advisory-cont .form-box .box-ipt::-moz-placeholder {color: #adadad;}
    .advisory-cont .form-box .box-ipt:-ms-input-placeholder {color: #adadad;}
    .advisory-cont .form-box .box-ipt:-moz-placeholder {color: #adadad;}
    .advisory-cont .box-ipt:focus{border: 1px solid #58D0A6;}
    .advisory-cont .form-box .box-label{display: none;} 
    /* 级联选择器 */
    .advisory-cont .form-box .box-cader{width: 420px;height: 44px;font-size: 14px;color: #333333;}
    .advisory-cont .box-cader /deep/ .is-focus .el-input__inner{border-color:#58D0A6!important;padding-left: 5px;}
    .advisory-cont .box-cader /deep/ .el-input__inner{height: 44px;padding-left: 5px;border-radius: 5px;border: 1px solid #ddd;}
    
    .advisory-cont .form-box .box-title{margin-bottom: 8px;font-size: 12px;color: #999999;letter-spacing: 0;line-height: 16px;text-align: left;font-weight: normal;}
    /* 单选radio */
    .advisory-cont /deep/  .box-radio{height: 20px;}
    .advisory-cont .box-radio /deep/ .is-checked .el-radio__inner{border-color: #58D0A6;background: #58D0A6;}
    .advisory-cont .box-radio /deep/ .el-radio__label{color: #333;font-weight: normal;}
    .advisory-cont /deep/ .is-checked .el-radio__input.is-checked+.el-radio__label{color: #333;font-weight: bold;}
    /* 多选checkbox */
    .advisory-cont /deep/  .box-checkbox{height: 20px;}
    .advisory-cont .box-checkbox /deep/ .is-checked .el-checkbox__inner{ background-color: #58D0A6;border-color: #58D0A6;}
    .advisory-cont .box-checkbox /deep/ .el-checkbox__label{color: #333;font-weight: normal;}
    .advisory-cont /deep/ .is-checked .el-checkbox__input.is-checked+.el-checkbox__label{color: #333;font-weight: bold;}
    .advisory-cont .form-box .box-area{width: 420px;height: 88px;font-size: 14px;color: #333333; }
    /* textarea */
    .advisory-cont .box-area /deep/ .el-textarea__inner{border-radius: 5px; height: 88px;padding: 5px;}
    .advisory-cont .box-area /deep/ .el-textarea__inner:focus{border: 1px solid #58D0A6;}
    .advisory-cont .form-btn{width: 420px;height: 44px;font-size: 16px;border-radius: 5px;color: #fff;background: #DDDDDD;border: none;}
    .advisory-cont .btn-active{background: #58D0A6;box-shadow: 0 4px 4px 0 rgba(88,208,166,0.35)}
    .advisory-cont .cont-bottom{font-size: 12px;color: #999999;letter-spacing: 0;text-align: center;line-height: 16px;}
    /* 提交成功页面 */
    .advisory-cont .cont-suc{position: relative;width: 480px;height: 100%;border-radius: 20px 0 0 20px;background: #fff;text-align: center;}
    .advisory-cont .cont-suc .suc-close{position: absolute;right: 10px;top: 10px;display: block;width: 20px;height: 20px;cursor: pointer;}
    .advisory-cont .cont-suc .suc-box{display: flex;align-items: center;justify-content: center;padding-top: 120px;}
    .advisory-cont .suc-box .suc-img{width: 80px;height: 80px;display: block;}
    .advisory-cont .cont-suc .suc-txt{margin-top: 10px;text-align: center;font-size: 20px;color: #333333;letter-spacing: 0;font-weight: bold;}
    .advisory-cont .cont-suc .suc-info{margin-top: 10px;font-size: 14px;color: #666666;letter-spacing: 0;text-align: center;line-height: 16px;}
    .advisory-cont .cont-suc .suc-btn{width: 400px;height: 44px;display: flex;align-items: center;justify-content: center;margin: 20px auto 0 auto;background: #58D0A6;box-shadow: 0 4px 4px 0 rgba(88,208,166,0.35);border-radius: 5px;font-size: 16px;color: #FFFFFF;border: none;}
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