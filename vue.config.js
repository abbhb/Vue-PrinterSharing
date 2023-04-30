module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://127.0.0.1:55550',//接口的前缀
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                pathRewrite:{
                    '^/api':'/api'//重写路径
                }
            }
        },
    },
    //这个在打包时必须打开
    publicPath:'./',



}