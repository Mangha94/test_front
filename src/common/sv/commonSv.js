'use strict';

export default {
    alert(obj, title, msg, type = 'primary', usehtml = false, callback) {
        obj.$alert(msg, title, {
            dangerouslyUseHTMLString: usehtml,
            confirmButtonText: '확인',
            type: type,
            callback: callback
        });
    },

    /**
     * toast 보여줌
     * @param {object} obj this
     * @param {string} title 제목
     * @param {string} msg 내용
     * @param {string} type 타입 (success, warning, info, error)
     * @param {number} duration 사라짐속도
     */
    notify(obj, title, msg, type = 'success', duration = 3000) {
        obj.$notify({
            title: title,
            message: msg,
            type: type,
            duration: duration
        });
    },

    /**
     * 타겟 보임 유무
     * @param {boolean} target 타겟
     */
    showAndHide(target) {
        return !target
    },
}