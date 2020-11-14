'use strict';

export default {
    name : 'auth',
    tokenCheck(){
        return localStorage.getItem('token') !== 'null' && localStorage.getItem('token') !== null;
    },
    layoutCheck(){
        return location.pathname !== '/login';
    }
}