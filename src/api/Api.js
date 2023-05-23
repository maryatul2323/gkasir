import ApiManager from "./ApiManager";

class Api {
    static urlAPI() {
        return "http://koperasiukm.bengkaliskab.go.id/express/"
    }
    static login(email, password) {
        let path = 'login';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data: {
                email,
                password,
            },
        })
    }
    static editPesanan(token, data, id) {
        let path = 'dinein/9cc1d21f-cd92-4e82-b284-694f671b2832';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data: {
                jumlah_pemesanan:23
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static editProfile(token, data) {
        let path = 'users/updateProfile';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'PUT',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
 
    static getPopuler(token) {
        let path = 'dashboard/populer';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getMeja(token) {
        let path = 'datameja';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getProfile(token) {
        let path = 'users/profile';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getCart(token) {
        let path = 'dinein/keranjang';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    static getMakanan(token) {
        let path = 'products/type/48145f46-974d-4db9-8212-423d37982063';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getMinuman(token) {
        let path = 'products/type/20d2c405-c07c-4dcc-bed6-6eefba0b930e';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getDessert(token) {
        let path = 'products/type/29bd5ba2-b889-4e6e-8010-58056792ab51';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getHistory(token) {
        let path = 'dinein/history';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getHistoryDetail(token) {
        let path = 'dinein/historyPesanan';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getProduct(token) {
        let path = 'products';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static addCustomer(token, data) {
        let path = 'dinein';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static onCheckout(token) {
        let path = 'dinein/checkout';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static addCart(token, data) {
        let path = 'dinein/add';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getDetail(token) {
        let path = 'dinein/checkout/d1bc46ea-2357-49ee-848b-3aad013129bb';
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getDetailCO(token,id_checkout) {
        let path = 'dinein/checkout/'+id_checkout;
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }
    static getEditCO(token,id_checkout) {
        let path = 'dinein/checkout/'+id_checkout;
        return ApiManager(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }


}
export default Api;
