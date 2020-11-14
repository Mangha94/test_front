'use strict';

import Vue from 'vue';

export default {
    /**-- isNotNull --**/
    isNotNull (data){
        return data !== null && data !== 'null' && data !== undefined && data !== '';
    },

    /**-- isNotNull --**/
    isNull (data){
        return data === null || data === 'null' || data === undefined || data === '';
    },

    /**
     * 콤마 삭제
     * @param {string} data
     * @returns {string}
     */
    setDelComma (data) {
        return data.toString().replace(/[^0-9]/g, '');
    },

    /**
     * 핸드폰, 전화번호 유효성 체크
     * @param {string} p 핸드폰 번호
     */
    isCellPhone(p) {
        var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        if (!regExp.test(p)) return false;
        else return true;
    },

    /**
     * 숫자인지 여부
     * @param v
     * @returns {boolean}
     */
    isNum (v) {
        var regNumber = /^[0-9]+$/gi;

        if (regNumber.test(v)) return true;
        else return false;
    },

    /**
     * 유효성 체크
     * @param type
     * @param value
     * @param message
     * @returns {boolean}
     */
    regExpTest(type, value, message){

        var regExp = '';
        switch (type) {
            case ('MOBILE') :
                regExp = /^\d{3}-\d{3,4}-\d{4}$/;
                break;
            case ('MOBILE2') :
                regExp = /(01[016789])(\d{4}|\d{3})\d{4}$/g;
                break;
            case ('HANGUL') :
                regExp = /[가-힣]/;
                break;
            case ('EMPTY') :
                regExp = /\s/g;
                break;
            case ('NUM') :
                regExp = /^[0-9]+$/;
                break;
            case ('ID') :
                regExp = /^[a-zA-Z]+[a-zA-Z0-9]{3,30}$/g;
                break;
            case ('PASSWD') :
                regExp = /^.*(?=.{8,30})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
                break;
        }

        if (!regExp.test(value) || value === undefined ) {
            if (message !== null) Vue.bus.emit('showAlert', 'alert', message);
            return false;
        }
        else
            return true;

    },
    /**
     * 쿠키 생성
     * @param cName
     * @param cValue
     * @param cDay
     */
    setCookie (cName, cValue, cDay){
        var date = new Date();
        date.setTime(date.getTime() + cDay * 60 * 60 * 24 * 1000);
        document.cookie = cName + '=' + escape(cValue) + ';expires=' + date.toUTCString() + ';path=/';
    },

    /**
     * 쿠키 가저오기
     * @param cName
     * @returns {*}
     */
    getCookie (cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start !== -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end === -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    },

    /**
     * 디바이스 정보 가져오기
     * @returns {string}
     */
    getAgentInfo (){
        var userAgentInfo = navigator.userAgent;

        if(userAgentInfo.match('iPhone') !== null){
            userAgentInfo = 'iPhone';
        }	else if(userAgentInfo.match('Android') !== null) {
            userAgentInfo = 'Android';
        } else {
            if (userAgentInfo.indexOf('Swing') !== -1) {
                userAgentInfo = 'Swing';
            } else if (userAgentInfo.indexOf('MSIE') !== -1 || userAgentInfo.indexOf('Trident') !== -1) {
                if (userAgentInfo.indexOf('Mozilla/5.0') !== -1) { // HTML5 Support
                    if (userAgentInfo.indexOf('rv:11.0') !== -1) {
                        userAgentInfo = 'IE11';
                    } else if (userAgentInfo.indexOf('MSIE 10.0') !== -1) {
                        userAgentInfo = 'IE10';
                    } else if (userAgentInfo.indexOf('MSIE 9.0') !== -1) {
                        userAgentInfo = 'IE9';
                    }
                } else {
                    if (userAgentInfo.indexOf('MSIE 8.0') !== -1) {
                        userAgentInfo = 'IE8';
                    } else if (userAgentInfo.indexOf('MSIE 7.0') !== -1) {
                        if (userAgentInfo.indexOf("Trident/7.0") !== -1 || (userAgentInfo.indexOf("NT 10.0;") !== -1 && userAgentInfo.indexOf("Trident/8.0") !== -1)) {
                            userAgentInfo = 'IE11(Compatibility)';
                        } else if (userAgentInfo.indexOf('Trident/6.0') !== -1) {
                            userAgentInfo = 'IE10(Compatibility)';
                        } else if (userAgentInfo.indexOf('Trident/5.0') !== -1) {
                            userAgentInfo = 'IE9(Compatibility)';
                        } else {
                            userAgentInfo = "IE7";
                        }
                    } else if (userAgentInfo.indexOf('MSIE 6.0') !== -1) {
                        userAgentInfo = 'IE6';
                    } else if (userAgentInfo.indexOf("MSIE 5.5") !== -1) {
                        userAgentInfo = "IE5.5";
                    } else if (userAgentInfo.indexOf("MSIE 5.2") !== -1) {
                        userAgentInfo = "IE5.2";
                    } else if (userAgentInfo.indexOf("MSIE 5.1") !== -1) {
                        userAgentInfo = "IE5.1";
                    } else if (userAgentInfo.indexOf("MSIE 5.0") !== -1) {
                        userAgentInfo = "IE5";
                    }
                }
            } else if (userAgentInfo.indexOf('Edge') !== -1) {
                userAgentInfo = 'Edge';
            } else if (userAgentInfo.indexOf('Chrome') !== -1) {
                userAgentInfo = 'Chrome';
            } else if (userAgentInfo.indexOf('Firefox') !== -1) {
                userAgentInfo = 'Firefox';
            } else if (userAgentInfo.indexOf('Safari') !== -1) {
                userAgentInfo = 'Safari';
            } else if (userAgentInfo.indexOf('Opera') !== -1) {
                userAgentInfo = 'Opera';
            }
        }
        return userAgentInfo;
    },

    /**
     * 쿠키 생성
     * @param cName
     * @param cValue
     * @param cDay
     * @param domain
     */
    setDomainCookie(cName, cValue, cDay, domain) {
        var date = new Date();
        date.setTime(date.getTime() + cDay * 60 * 60 * 24 * 1000);
        if (domain) document.cookie = cName + '=' + escape(cValue) + ';domain=' + domain + ';expires=' + date.toUTCString() + ';path=/';
        else document.cookie = cName + '=' + escape(cValue) + ';expires=' + date.toUTCString() + ';path=/';
    },

    makeQueryString(data) {
        let queryParam = '';
        Object.keys(data).forEach(key => {
            const value = data[key];

            if(value) {
                if (queryParam === '')
                    queryParam += '?';
                else
                    queryParam += '&';

                queryParam += (key + '=' + data[key]);
            }
        });

        return queryParam;
    }
}