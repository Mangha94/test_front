import serverSv from "@/common/sv/serverSv";

export default {
    namespaced: true,
    state: {'sellerType':'','subMenu' : {}},
    getters: {
        getSubMenu: state => state.subMenu,
    },
    mutations: {
        //로그아웃
        logOut : (state) =>{
            state.token = null;
            localStorage.removeItem("token");
            location.href='/login';
        },
        setSubMenu : (state,payload) =>{
            state.subMenu = payload;
        }

    },
    actions: {

        //로그인
        async loginAct ({commit},payload) {

            console.log(commit);
            console.log(payload);

            const res = await serverSv.post('/loginAct', payload);
            localStorage.setItem('token',res.data.token);

            if(res.data.success)
                location.href='/am';
        }
    }
}