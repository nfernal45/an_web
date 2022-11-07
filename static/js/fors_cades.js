function checkPluginLoadedAsync() {
  return new Promise(function (resolve, reject) {
    cadesplugin.async_spawn(function* () {
      try {
        var oAbout = yield cadesplugin.CreateObjectAsync("CAdESCOM.About");
        var sCSPName = yield oAbout.CSPName(80);
        resolve(sCSPName)
      } catch (err) {
        reject(err)
      }
    }); //cadesplugin.async_spawn
  });
}

function loadCertificatesAsync() {
  return new Promise(function (resolve, reject) {
    const lstId = 'CertListBox';
    cadesplugin.async_spawn(function *() {
      var MyStoreExists = true;
      try {
        var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
        if (!oStore) {
          alert("Create store failed");
          reject(new Error("Ошибка при перечислении объектов плагина"));
          return;
        }

        yield oStore.Open();
      }
      catch (ex) {
        MyStoreExists = false;
      }

      var certCnt;
      var certs;
      var forsCertificates = [];
      if (MyStoreExists) {
        try {
          certs = yield oStore.Certificates;
          certCnt = yield certs.Count;
        }
        catch (ex) {
          const errorMessage = "Ошибка при получении Certificates или Count: " + cadesplugin.getLastError(ex);
          reject(new Error(errorMessage));
          return;
        }
        for (var i = 1; i <= certCnt; i++) {
          var cert;
          try {
            cert = yield certs.Item(i);
          }
          catch (ex) {
            const errorMessage = "Ошибка при перечислении сертификатов: " + cadesplugin.getLastError(ex);
            reject(new Error(errorMessage));
            return;
          }

          var oOpt = document.createElement("OPTION");
          var dateObj = new Date();
          try {
            var ValidFromDate = new Date((yield cert.ValidFromDate));
            var ValidToDate = new Date(yield cert.ValidToDate);
            var IsValid = ValidToDate > Date.now();

            if (IsValid) {
              const certText = new CertificateAdjuster().GetCertInfoString(yield cert.SubjectName, ValidFromDate);
              forsCertificates.push({
                thumbprint: yield cert.Thumbprint,
                text: certText,
                cert: cert
              })
            }
          }
          catch (ex) {
            const errorMessage = "Ошибка при получении свойства SubjectName: " + cadesplugin.getLastError(ex);
            alert(errorMessage);
          }
        }

        if (forsCertificates.length === 0) {
          reject(new Error("Не найдены валидные сертификаты"))
        }

        yield oStore.Close();
      }

      //В версии плагина 2.0.13292+ есть возможность получить сертификаты из
      //закрытых ключей и не установленных в хранилище
      try {
        yield oStore.Open(cadesplugin.CADESCOM_CONTAINER_STORE);
        certs = yield oStore.Certificates;
        certCnt = yield certs.Count;
        for (var i = 1; i <= certCnt; i++) {
          var cert = yield certs.Item(i);
          //Проверяем не добавляли ли мы такой сертификат уже?
          var found = false;
          for (var j = 0; j < forsCertificates.length; j++)
          {
            if ((forsCertificates[j].thumbprint) === (yield cert.Thumbprint))
            {
              found = true;
              break;
            }
          }
          if(found)
            continue;
          var ValidFromDate = new Date((yield cert.ValidFromDate));
          var ValidToDate = new Date(yield cert.ValidToDate);
          var IsValid = ValidToDate > Date.now();
          if (IsValid) {
            const certText = new CertificateAdjuster().GetCertInfoString(yield cert.SubjectName, ValidFromDate);
            forsCertificates.push({
              thumbprint: yield cert.Thumbprint,
              text: certText,
              cert: cert
            })
          }
        }

        yield oStore.Close();
      }
      catch (ex) {
      }

      if (forsCertificates.length === 0) {
        reject(new Error("Не найдены валидные сертификаты"))
      }
      resolve(forsCertificates);
    });//cadesplugin.async_spawn
  });
}

function signCadesBesAsync(certificate, contentForSign) {
  const appContentStr = contentForSign.appContentStr
  const requestContentStr = contentForSign.requestContentStr

  return new Promise(function (resolve, reject) {
    if (!cadesplugin) {
      reject(new Error("Плагин не загружен"))
    }
    cadesplugin.async_spawn(function*(arg) {
      try
      {
        var appContentToSign = Base64.encode(appContentStr)
        var requestContentToSign = Base64.encode(requestContentStr)

        var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
        yield oSigner.propset_Certificate(certificate);
        yield oSigner.propset_CheckCertificate(true);

        var oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
        yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY); //
        yield oSignedData.propset_Content(appContentToSign);

        var reqSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
        yield reqSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY); //
        yield reqSignedData.propset_Content(requestContentToSign);

        var appContentSignature = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES)
        var reqContentSignature = yield reqSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES)
        resolve({
          appSign: appContentSignature,
          requestSign: reqContentSignature
        })
      }
      catch(err)
      {
        reject(err)
      }
    }); //cadesplugin.async_spawn
  })
}

function CertificateAdjuster()
{
}
CertificateAdjuster.prototype.checkQuotes = function(str)
{
  var result = 0, i = 0;
  for(i;i<str.length;i++)if(str[i]==='"')
    result++;
  return !(result%2);
}

CertificateAdjuster.prototype.extract = function(from, what)
{
  var certName = "";

  var begin = from.indexOf(what);

  if(begin>=0)
  {
    var end = from.indexOf(', ', begin);
    while(end > 0) {
      if (this.checkQuotes(from.substr(begin, end-begin)))
        break;
      end = from.indexOf(', ', end + 1);
    }
    certName = (end < 0) ? from.substr(begin) : from.substr(begin, end - begin);
  }

  return certName;
}

CertificateAdjuster.prototype.Print2Digit = function(digit)
{
  return (digit<10) ? "0"+digit : digit;
}

CertificateAdjuster.prototype.GetCertDate = function(paramDate)
{
  var certDate = new Date(paramDate);
  return this.Print2Digit(certDate.getUTCDate())+"."+this.Print2Digit(certDate.getUTCMonth()+1)+"."+certDate.getFullYear() + " " +
    this.Print2Digit(certDate.getUTCHours()) + ":" + this.Print2Digit(certDate.getUTCMinutes()) + ":" + this.Print2Digit(certDate.getUTCSeconds());
}

CertificateAdjuster.prototype.GetCertName = function(certSubjectName)
{
  return this.extract(certSubjectName, 'CN=');
}

CertificateAdjuster.prototype.GetIssuer = function(certIssuerName)
{
  return this.extract(certIssuerName, 'CN=');
}

CertificateAdjuster.prototype.GetCertInfoString = function(certSubjectName, certFromDate)
{
  return this.extract(certSubjectName,'CN=') + "; Выдан: " + this.GetCertDate(certFromDate);
}

var Base64 = {


  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


  encode: function(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
  },


  decode: function(input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    }

    output = Base64._utf8_decode(output);

    return output;

  },

  _utf8_encode: function(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  },

  _utf8_decode: function(utftext) {
    var string = "";
    var i = 0;
    var c, c2, c3;
    c = c2 = c3 = 0;

    while (i < utftext.length) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    }

    return string;
  }

}
