'use strict'

import axios from 'axios'
import strLib from '@/common/lib/strLib'

export default {
    obj : {
        title : 'Error',
        message : '에러!',
        type : 'error',
        isConfirm : false
    },
    req : {
        method : '',
        url : '',
        date : '',
        header : {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control=Allow-Headers' : '*'
        }
    },
    get(url){
        this.req.method = "GET";
        this.req.url = url;
        return this.ajax(this.req)
    },
    delete(url, data){
      this.req.method = "DELETE";
      this.req.data = data;
      this.req.url = url;
      return this.ajax(this.req)

    },
    post(url, data){
      this.req.method = "POST";
      this.req.data = data;
      this.req.url = url;
      return this.ajax(this.req)
    },
    put(url, data){
        this.req.method = "PUT";
        this.req.data = data;
        this.req.url = url;
        return this.ajax(this.req)
    },
    errorDirect(error) {
        const err = String(error);
        const url = String(location.href);
        if ((err.indexOf("401") > -1 && url.indexOf("/login") === -1) || err.indexOf('Network Error') > -1) {
            localStorage.removeItem('token');
            location.href = "/login";
            return false;
        } else if (err.indexOf("401") > -1 && url.indexOf("/login") > -1) {
            alert("아이디와 비밀번호를 확인 해주세요.");
        }
    },
    ajax(req) {

        // axios.defaults.headers.common['x-auth-token'] = "Bearer " + localStorage.getItem('token');

        if ('GET' === req.method) {
            return new Promise((resolve, reject) => {
                axios.get('localhost:8019' + req.url)
                    .then((response) => {
                        if (!response.data.success && response.data.message) {
                            this.obj.message = response.data.message;
                            alert(this.obj.message)
                        }
                        if (response.data.success)
                            resolve(response);
                        else
                            reject(response)
                    }).catch(error => {
                    this.errorDirect(error)
                    //Vue.bus.emit('showAlert', 'alert', this.obj)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                axios[req.method.toLowerCase()]('localhost:8019' + req.url, req.data)
                    .then((response) => {
                        if (!response.data.success && response.data.message) {
                            this.obj.message = response.data.message;
                            alert(this.obj.message);
                        }
                        if (response.data.success)
                            resolve(response);
                        else
                            reject(response)
                    }).catch(error => {
                    this.errorDirect(error)
                    //Vue.bus.emit('showAlert', 'alert', this.obj)
                })
            })
        }
    }, login(data) {
        return new Promise((resolve, reject) => {
            // IE 이슈로 이걸로 변경
            let form = new FormData();
            form.append("grant_type", "password");
            form.append("client_id", 'lee');
            form.append("scope", "read");
            form.append("username", data.username);
            form.append("password", data.password);

            const headers = {
                "content-type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa('lee' + ":" + '111101111')
            };

            axios.post('http://localhost:8019/login', form, {headers: headers})
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response);
                    }
                    else
                        reject(response);
                }).catch(error => {
                reject(error);
            })
        })
    }, logout() {
        localStorage.removeItem("token");
        process.env.NODE_ENV === 'production' ? strLib.setCookie('resellerToken', "", -1, ".paysell.co.kr") : strLib.setCookie('resellerToken', "", -1);
        location.href = '/login';
    }
}
