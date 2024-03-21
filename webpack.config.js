const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        publicPath: '/assets/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            scriptLoading: 'blocking',
            publicPath: '/assets/'
        })
    ]
}