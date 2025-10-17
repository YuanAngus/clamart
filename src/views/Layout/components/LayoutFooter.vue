<template>
  <footer class="app_footer">
    <div class="contact">
      <div class="container">
        <dl>
          <dt>Contact Us</dt>
          <dd><i class="iconfont icon-kefu"></i> Customer Service</dd>
          <dd><i class="iconfont icon-question"></i> Send Feedback</dd>
        </dl>
        <dl>
          <dt>Follow Us</dt>
          <dd><i class="iconfont icon-weixin"></i> Follow WeChat</dd>
          <dd><i class="iconfont icon-weibo"></i> Follow Weibo</dd>
        </dl>
        <dl>
          <dt>Download App</dt>
          <dd class="qrcode"><img src="@/assets/images/qrcode.svg" /></dd>
          <dd class="download">
            <span>&nbsp;</span>
            <span>Scan QR Code</span>
            <a href="https://yuanangus.github.io/cray-ui/">Download</a>
          </dd>
        </dl>
        <dl>
          <dt>Hotline</dt>
          <dd class="hotline">400-0000-000 <small>Monday to Friday</small> <small>8:00 am - 11:00 pm</small></dd>
        </dl>
      </div>
    </div>
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>Affordable</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>Quality</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>Fast</span>
          </a>
        </div>
        <div class="copyright">
          <p>
            <a href="javascript:;">About</a>
            <a href="javascript:;">Help</a>
            <a href="javascript:;">Service</a>
            <a href="javascript:;">Delivery</a>
            <a href="javascript:;">Cooperation</a>
            <a href="javascript:;">Recommendation</a>
            <a href="javascript:;">Links</a>
          </p>
          <p>CopyRight © Clamart</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }

    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    dt {
      line-height: 1;
      font-size: 18px;
    }

    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 110px;
      padding-top: 10px;
      border: 1px solid #ededed;

      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }

      &:hover {
        .iconfont {
          color: $clamartColor;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $clamartColor;
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #333;
  }

  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }

      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }

  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>