/*
【随机互助使用方法】把你自己的对应活动的互助码复制，替换链接中（互助码三个文字），然后点击链接即可，还不懂就自杀吧。
每个月1号，10号，20号凌晨2点清理一次数据库，清理后需重新点击链接提交互助码。

东东工厂互助码api
http://api.turinglabs.net/api/v1/jd/ddfactory/create/P04z54XCjVWnYaS5nRNUzykgCoV1zFeT4o/
http://api.turinglabs.net/api/v1/jd/ddfactory/create/P04z54XCjVWnYaS5m9cZ2SqiXwelyODJ-3Utwg/
查看上车人数
http://api.turinglabs.net/api/v1/jd/ddfactory/count/

京喜工厂互助码api
http://api.turinglabs.net/api/v1/jd/jxfactory/create/互助码/
查看上车人数
http://api.turinglabs.net/api/v1/jd/jxfactory/count/

种豆提交互助码api
http://api.turinglabs.net/api/v1/jd/bean/create/l7wp3ujmrq2uxr2uhviqc6ncduwpccvpesym3pi/
http://api.turinglabs.net/api/v1/jd/bean/create/e7lhibzb3zek3wvznwm6szetubfzjw3xouoz6dy/
查看上车人数
http://api.turinglabs.net/api/v1/jd/bean/count/

农场提交互助码api
http://api.turinglabs.net/api/v1/jd/farm/create/49a95a4bcd104c568ba2852c50a7ca2a/
http://api.turinglabs.net/api/v1/jd/farm/create/35e3300dd0164c0babfbf841bd1e2baa/
查看上车人数
http://api.turinglabs.net/api/v1/jd/farm/count/

萌宠提交互助码api
http://api.turinglabs.net/api/v1/jd/pet/create/MTAxODc2NTEzNTAwMDAwMDAwMDA3NjcxNw==/
http://api.turinglabs.net/api/v1/jd/pet/create/MTAxODcxOTI2NTAwMDAwMDAwNTkyNTk2OQ==/
查看上车人数
http://api.turinglabs.net/api/v1/jd/pet/count/

查看数据库清空时间
http://api.turinglabs.net/api/v1/jd/cleantimeinfo/

京东赚赚小程序实现随机互助

【随机互助使用方法】把你自己的对应活动的互助码复制，替换链接中（互助码三个文字），然后点击链接即可，还不懂就自杀吧。每个月1号，10号，20号凌晨2点清理一次数据库，清理后需重新点击链接提交互助码。有啥问题别问我，下次回复这条信息禁言12小时。 

京东赚赚小程序互助码api (由@C_Hiang提供) 
https://code.chiang.fun/api/v1/jd/jdzz/create/助力码/
查看上车人数 (由@C_Hiang提供)
https://code.chiang.fun/api/v1/jd/jdzz/count

--------------------------------*/
const $ = new Env('上传互助码');
const notify = $.isNode() ? require('./sendNotify') : '';

const codeApi = 'http://api.turinglabs.net/api/v1/jd/'
const codeApi2 = 'https://code.chiang.fun/api/v1/jd/'
const codeArr = [
  /* { type: 'ddfactory', code: 'P04z54XCjVWnYaS5nRNUzykgCoV1zFeT4o', api: codeApi },
  { type: 'ddfactory', code: 'P04z54XCjVWnYaS5m9cZ2SqiXwelyODJ-3Utwg', api: codeApi },
  { type: 'bean', code: 'l7wp3ujmrq2uxr2uhviqc6ncduwpccvpesym3pi', api: codeApi },
  { type: 'bean', code: 'e7lhibzb3zek3wvznwm6szetubfzjw3xouoz6dy', api: codeApi },
  { type: 'farm', code: '49a95a4bcd104c568ba2852c50a7ca2a', api: codeApi },
  { type: 'farm', code: '35e3300dd0164c0babfbf841bd1e2baa', api: codeApi },
  { type: 'pet', code: 'MTAxODc2NTEzNTAwMDAwMDAwMDA3NjcxNw==', api: codeApi },
  { type: 'pet', code: 'MTAxODcxOTI2NTAwMDAwMDAwNTkyNTk2OQ==', api: codeApi },
  { type: 'jxfactory', code: 'aByTSdNHBLuf06a645erLg==', api: codeApi },
  { type: 'jxfactory', code: 'KTSdls8lA2sDl8_62GzlVg==', api: codeApi }, */
  { type: 'jdzz', code: 'ASnANw_HNm2pKXSatnw', api: codeApi2 },
  { type: 'jdzz', code: 'AUWE5m__EzWEKCWSu334Zkg', api: codeApi2 }
]


~(async () => {
  for (let i of codeArr) {
    await sendCodes(i)
  }
})()
    .catch((e) => {
      $.log('', `❌ 互助码上传失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

async function sendCodes(item) {
  await $.wait(3000); // 每一个push完休息一下下
  return new Promise((resolve) => {
    $.get(taskUrl(item), (err, resp, data) => {
      try {
        if (err) {
          console.log('\n互助码上传API查询请求失败 ‼️‼️')
          console.log(JSON.stringify(err));
        } else {
          data = JSON.parse(data);
          let msg = data.message || data.msg
          console.log(`【type】${item.type}\n`);
          console.log(`【状态】${data.code}\n`);
          console.log(`【Message】${msg}\n`);

          notify.sendNotify(`【type】${item.type}\n`, `【Message】${msg}\n`);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// api 链接生成
function taskUrl(item) {
  return {
    // http://api.turinglabs.net/api/v1/jd/pet/create/MTAxODcxOTI2NTAwMDAwMDAwNTkyNTk2OQ==/
    url: `${item.api}${item.type}/create/${item.code}/`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
      // 'Host': 'api.turinglabs.net'
    }
  };
}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),h=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t))}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",o){const r=t=>{if(!t||!this.isLoon()&&this.isSurge())return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}