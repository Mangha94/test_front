import Vue from 'vue';

// import '../common/filter/commonFilter';
// import '../common/filter/typeFilter';
// import '../assets/scss/basic.scss';
//번들 크기를 줄여준다
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

const options = { name: 'custom', lodash: lodash };
Vue.use(VueLodash, options);