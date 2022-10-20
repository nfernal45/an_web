/*
 * Copyright (c) 2015 FORS Development Center
 * Trifonovskiy tup. 3, Moscow, 129272, Russian Federation
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * FORS Development Center ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with FORS.
 */

var fors = fors || {};

fors.ElectronicSignature = function (successCallbackUrl, errorCallbackUrl) {
    this.successCallbackUrl = successCallbackUrl;
    this.errorCallbackUrl = errorCallbackUrl;

    this.CAPICOM_MY_STORE = "My";
    this.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
    this.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
    this.CAPICOM_STORE_OPEN_READ_ONLY = 0;
    this.CAPICOM_CURRENT_USER_STORE = 2;
    this.CAPICOM_ENCODE_BASE64 = 0;
    this.CADESCOM_BASE64_TO_BINARY = 1;
    this.CADESCOM_CADES_BES = 1;
    this.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
};

/**
 * Создать объект Крипто-Про
 */
fors.ElectronicSignature.prototype.createObject = function (name) {
    try {
        try {
            return new ActiveXObject(name);
        } catch (e) {
            var cadesObject = document.getElementById('cadesplugin');
            return cadesObject.CreateObject(name);
        }
    } catch (e) {
        throw "Для подписи запроса электронно-цифровой подписью необходимо наличие установленного плагина Крипто-Про на вашей рабочей станции. Failed to create " + name + ". " + this.getErrorMessage(e);
    }
};

/**
 * Получить сертификат пользователя
 */
fors.ElectronicSignature.prototype.getCertificate = function (signerSubjectName, signerGivenName, fingerprint) {
    // if (!fingerprint && !signer) throw "Сертификат не найден. Signer is empty.";

// Создание объектов КриптоПро ЭЦП Browser plug-in
// var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
// var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
// var oPrivateKey = yield cadesplugin.CreateObjectAsync("CAdESCOM.CX509PrivateKey");

    if (this.store == null) this.store = this.createObject("CAdESCOM.Store");//("CAPICOM.Store");
    if (this.signer == null) this.signer = this.createObject("CAdESCOM.CPSigner");
    if (this.signedData == null) this.signedData = this.createObject("CAdESCOM.CadesSignedData");

    try {
        this.store.Open(this.CAPICOM_CURRENT_USER_STORE, this.CAPICOM_MY_STORE, this.CAPICOM_STORE_OPEN_READ_ONLY);
    } catch (e) {
        throw "Сертификат не найден. Can't open CAPICOM.Store. " + this.getErrorMessage(e);
    }

    var certificates;
    certificates = this.store.Certificates;
    try {
        if (fingerprint){
            certificates = this.store.Certificates.Find(this.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, fingerprint);
        }
        if (signerSubjectName && signerGivenName && (!certificates || certificates.Count == 0)) {
            certificates = this.store.Certificates.Find(this.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, signerSubjectName);
            if (certificates.Count != 0) {
                certificates = this.store.Certificates.Find(this.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, signerGivenName);
            }
        }

        if (!certificates || certificates.Count == 0) throw "Certificate not found.";

        return certificates.Item(1);

    } catch (e) {
        throw "Сертификат не найден. " + this.getErrorMessage(e);
    }
}

/**
 * Подписать
 */
fors.ElectronicSignature.prototype.signData = function (signerSubjectName, signerGivenName, content, fingerprint) {
    var can = !!cadesplugin.CreateObject;
    if (can) {
        try {
            var certificate = this.getCertificate(signerSubjectName, signerGivenName, fingerprint);
            this.signer.Certificate = certificate;

            this.signedData.ContentEncoding = this.CADESCOM_BASE64_TO_BINARY;

            var signature;
            var arr = content.split(',');
            if ($.isArray(arr) && arr.length > 1) {
                signature = [];
                var th = this;
                $.each(arr, function (ind, val) {
                    th.signedData.Content = val;
                    signature.push(th.signedData.SignCades(th.signer, th.CADESCOM_CADES_BES, true))
                });
            } else {
                this.signedData.Content = content;
                signature = this.signedData.SignCades(this.signer, this.CADESCOM_CADES_BES, true);
            }

            this.sendSignature(signature);

        } catch (e) {
            this.sendError("Ошибка подписи документа: " + this.getErrorMessage(e));
        }
    } else {
        this.SignAsync(signerSubjectName, signerGivenName, content, fingerprint);
    }
};

/**
 * Подписать Исполнительный документ и получить отсоединенную подпись
 */
fors.ElectronicSignature.prototype.signIId = function (signerSubjectName, certGivenName, iidBase64, fingerprint) {
    try {
        var certificate = this.getCertificate(signerSubjectName, certGivenName, fingerprint);
        this.signer.Certificate = certificate;

        this.signedData.ContentEncoding = this.CADESCOM_BASE64_TO_BINARY;
        this.signedData.Content = iidBase64;

        var unsignedAttr = this.createObject("CAdESCOM.CPAttribute");
        unsignedAttr.OID.Value = "1.2.643.5.1.5.2.3.1";
        var timeNow = new Date();
        switch (navigator.appName) {
            case "Microsoft Internet Explorer":
                unsignedAttr.Value = timeNow.getVarDate();
                break;
            default:
                unsignedAttr.Value = timeNow;
                break;
        }

        this.signer.Options = this.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN;
        this.signer.UnauthenticatedAttributes.Add(unsignedAttr);

        var signature = this.signedData.SignCades(this.signer, this.CADESCOM_CADES_BES, true, this.CAPICOM_ENCODE_BASE64);

        this.sendSignature(signature);

    } catch (e) {
        this.sendError("Ошибка подписи документа: " + this.getErrorMessage(e));
    }
}



/**
 * Сформировать текст ошибки
 */
fors.ElectronicSignature.prototype.getErrorMessage = function (e) {
    var err = e.message;
    if (!err) {
        err = e;
    } else if (e.number) {
        err += " (" + e.number + ")";
    }
    return err;
}

/**
 * Передать на сервер сигнатуру подписи
 */
fors.ElectronicSignature.prototype.sendSignature = function (signature) {
    Wicket.Ajax.post({"u": this.successCallbackUrl, "ep": {"signature": signature}});
};

/**
 * Передать на сервер сообщение об ошибке
 */
fors.ElectronicSignature.prototype.sendError = function (message) {
    console.log(message);
    Wicket.Ajax.get({"u": this.errorCallbackUrl, "ep": {"message": message}});
};

/**
 * Создание и получение асинхронной подписи
 * @param certSubjectName - имя субъекта(Фамилия)
 * @param certGivenName - имя субъекта(Имя Отчество)
 * @param dataToSign - подписываемый документ
 * @param fingerprint - ХЭШ отпечаток
 */
fors.ElectronicSignature.prototype.SignAsync = function(certSubjectName, certGivenName, dataToSign, fingerprint) {
    var my = this;
    return new Promise(function(resolve, reject){
        cadesplugin.async_spawn(function *(args) {
            try {
                var oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                yield oStore.Open();
            }
            catch (e) {
                my.sendError("Для подписи запроса электронно-цифровой подписью необходимо наличие установленного плагина Крипто-Про на вашей рабочей станции. " + my.getErrorMessage(e));
                throw e;
            }

            try {
                var all_certs = yield oStore.Certificates;

                var CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
                var CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
                var oCerts;

                if (fingerprint) {
                    oCerts = yield all_certs.Find(CAPICOM_CERTIFICATE_FIND_SHA1_HASH, fingerprint);
                }
                if (certSubjectName && certGivenName && (!oCerts || oCerts.Count == 0)) {
                    oCerts = yield all_certs.Find(CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certSubjectName);
                    if (oCerts.Count != 0) {
                        oCerts = yield all_certs.Find(CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certGivenName);
                    }
                }

                if (oCerts.Count == 0) {
                    throw("Certificate not found: " + args[0] + " " + args[1]);
                }
                var certificate = yield oCerts.Item(1);
            } catch (e) {
                my.sendError("Сертификат не найден: " + my.getErrorMessage(e));
                throw e;
            }

            try {
                var oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");

                yield oSigner.propset_Certificate(certificate);

                var oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                yield oSignedData.propset_ContentEncoding(1);
                yield oSigner.propset_Options(1);

                var signature;
                var arr = dataToSign.split(',');
                if ($.isArray(arr) && arr.length > 1) {
                    signature = [];
                    var th = this;
                    /*not async sign group documents (with common inititialization)*/
                    for (var val of arr){
                        yield oSignedData.propset_Content(val);
                        signature.push(yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true, cadesplugin.CADESCOM_ENCODE_BASE64));
                    }
                } else {
                    yield oSignedData.propset_Content(dataToSign);
                    signature = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true, cadesplugin.CADESCOM_ENCODE_BASE64);
                }

                yield oStore.Close();

                my.sendSignature(signature);
            }
            catch (e)
            {
                my.sendError("Ошибка подписи документа: " + my.getErrorMessage(e));
            }
        }, certSubjectName, certGivenName, dataToSign, resolve, reject);
    });
};