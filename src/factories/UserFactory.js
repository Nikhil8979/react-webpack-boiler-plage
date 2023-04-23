import  {SET_USER} from "../constants";
import {$crud} from "./CrudFactory";

export class UserFactory {
    store;

    setStore(store) {
        this.store = store;
        return this;
    }

    async login(params) {
        const {data: {token, user}} = await $crud.post("create/web/login", params);
        this.setUser(user);
        return user;
    }

    async logout() {
        await $crud.post("web/logout");
    }

    setUser(user) {
        this.store.dispatch({
            type: SET_USER,
            user
        });
    }

    getToken() {
        return this.store.getState().user;
    }
}

export const $user = new UserFactory();
