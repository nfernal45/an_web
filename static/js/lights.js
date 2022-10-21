'use strict';

var extImg = "red";
var extTxt = "Расширение не загружено";

var plgImg = "grey";
var plgTxt = "Плагин: ожидание загрузки расширения";

var cspImg = "grey";
var cspTxt = "КриптоПро CSP: ожидание загрузки плагина";

var objImg = "grey";
var objTxt = "Объекты плагина: ожидание загрузки провайдера";

function setImgSrcAttribute(id, value) {
  var elem = document.getElementById(id);
  if (elem) elem.className = "dot " + value;
}

function setInnerText(id, value) {
  var elem = document.getElementById(id);
  if (elem) elem.innerHTML = value;
}

function setHref(id, value) {
  var elem = document.getElementById(id);
  if (elem) elem.href = value;
}

function platformCheck() {
  if (navigator.userAgent.indexOf('Mac') !== -1) {
    return "macOS";
  } else if (navigator.userAgent.indexOf('Win') !== -1) {
    return "Windows";
  } else {
    return "Linux";
  }
}

function check_browser() {
  var ua= navigator.userAgent, tem, M= ua.match(/(opera|yabrowser|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name:'IE', version:(tem[1] || '')};
  }
  if(M[1] === 'Chrome'){
    tem = ua.match(/\b(OPR|Edg|YaBrowser)\/(\d+)/);
    if (tem != null)
    return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null)
  M.splice(1, 1, tem[1]);
  return {name:M[0],version:M[1]};
}
var browserSpecs = check_browser();

function setStateForExtension(img, txt) {
  setImgSrcAttribute("ExtensionEnabledImg", img);
  setInnerText("ExtensionEnabledTxt", txt);
  extImg = img;
  extTxt = txt;
  if (extImg === "red") {
    // ставим значение по умолчанию в зависимости от системы
    var extUrl = "https://docs.cryptopro.ru/cades/plugin/plugin-installation-windows";
    if (platformCheck() === "macOS") {
      extUrl = "https://docs.cryptopro.ru/cades/plugin/plugin-installation-macos";
    } else if (platformCheck() === "Linux") {
      extUrl = "https://docs.cryptopro.ru/cades/plugin/plugin-installation-unix";
    }
    // ставим нужную ссылку если узнали какой браузер
    if (browserSpecs.name === 'Chrome'){
      extUrl = "https://chrome.google.com/webstore/detail/cryptopro-extension-for-c/iifchhfnnmpdbibifmljnfjhpififfog";
    } else if (browserSpecs.name === 'YaBrowser' | browserSpecs.name === 'Opera') {
      extUrl = "https://addons.opera.com/en/extensions/details/cryptopro-extension-for-cades-browser-plug-in";
    } else if (browserSpecs.name === 'Firefox') {
      extUrl = "https://www.cryptopro.ru/sites/default/files/products/cades/extensions/firefox_cryptopro_extension_latest.xpi";
    }
    setInnerText("ExtensionSolution", "<a href='" + extUrl + "'>Загрузить</a>");
  } else {
    setInnerText("ExtensionSolution","");
  }
}

function setStateForPlugin(img, txt) {
  setImgSrcAttribute("PluginEnabledImg", img);
  setInnerText("PluginEnabledTxt", txt);
  plgImg = img;
  plgTxt = txt;
  if (plgImg === "yellow") {
    setInnerText("PluginSolution", "<a href='https://cryptopro.ru/products/cades/plugin/get_2_0'>Обновить</a>");
  } else if (plgImg === "red") {
    setInnerText("PluginSolution", "<a href='https://cryptopro.ru/products/cades/plugin/get_2_0'>Загрузите плагин</a> и обновите страницу");
  } else {
    setInnerText("PluginSolution", "");
  }

}

function setStateForCSP(img, txt) {
  setImgSrcAttribute("CspEnabledImg", img);
  setInnerText("CspEnabledTxt", txt);
  cspImg = img;
  cspTxt = txt;
  if (cspImg === "red") {
    setInnerText("CspSolution", "<a href='https://cryptopro.ru/products/csp?csp=download'>Загрузите CSP</a> и обновите страницу");
  } else {
    setInnerText("CspSolution", "");
  }
}

function setStateForObjects(img, txt) {
  setImgSrcAttribute("ObjectsLoadedImg", img);
  setInnerText("ObjectsLoadedTxt", txt);
  objImg = img;
  objTxt = txt;
  if (objImg === "red") {
    setInnerText("ObjectsSolution", "<a href='javascript:window.location.reload();'>Обновите страницу</a> или <a href='https://support.cryptopro.ru/'>обратитесь в техподдержку</a>");
  } else {
    setInnerText("ObjectsSolution", "");
  }
}

function extensionLoadedCallback() {
  setStateForExtension("green", "Расширение загружено");
  window.cadesplugin_extension_loaded = true;
}

function finalLoad() {
  setStateForExtension(extImg, extTxt);

  setStateForPlugin(plgImg, plgTxt);
  
  setStateForCSP(cspImg, cspTxt);
  
  setStateForObjects(objImg, objTxt);
  
  setInnerText("Platform", "Платформа: " + platformCheck());
  setInnerText("UserAgent", "UserAgent: " + navigator.userAgent);
};

window.cadesplugin_extension_loaded_callback = extensionLoadedCallback;
window.onload = finalLoad;
