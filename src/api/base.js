export default {
    baseUrl: "http://localhost:3000",//
    register: "/api/register",//注册
    login: "/api/login",//登录
    selectTbItemAllByPage: "/api/backend/item/selectTbItemAllByPage",// 商品查询
    total: '/api/total',// 分页
    search: '/api/search', // 模糊查询
    selectItemCategoryByParentId: '/api/backend/itemCategory/selectItemCategoryByParentId', // 类目选择
    insertTbItem: '/api/backend/item/insertTbItem', //添加商品
    deleteItemById: '/api/backend/item/deleteItemById',// 删除商品
    preUpdateItem: '/api/backend/item/preUpdateItem', // 预更新
    updateTbItem: '/api/backend/item/updateTbItem', // 编辑商品
}