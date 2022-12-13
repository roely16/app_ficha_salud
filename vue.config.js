module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/apps/ficha_salud/' : '/',
    devServer: {
        host: 'localhost'
    }
}