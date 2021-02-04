import axios from '../utils/request'
import base from './base'

const api = {
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    /**
     * 商品查询
     */
    selectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {
            params
        })
    },
    /**
     * 分页
     */
    total() {
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 模糊查询
     */
    search(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    /**
     * 类目选择
     */
    selectItemCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId, {
            params
        })
    },
    /**
     * 添加商品
     */
    insertTbItem(params) {
        return axios.get(base.baseUrl + base.insertTbItem, {
            params
        })
    },
    /**
     * 删除商品
     */
    deleteItemById(params) {
        return axios.get(base.baseUrl + base.deleteItemById, {
            params
        })
    },
    /**
     * 预更新
     */
    preUpdateItem(params) {
        return axios.get(base.baseUrl + base.preUpdateItem, {
            params
        })
    },
    /**
     * 编辑商品
     */
    updateTbItem(params) {
        return axios.get(base.baseUrl + base.updateTbItem, {
            params
        })
    }
}

export default api