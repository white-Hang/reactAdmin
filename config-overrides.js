const { override, fixBabelImports,addLessLoader } = require('customize-cra')
//针对antd实现按需打包，根据import来打包（babel-plugin-import）
module.exports = override(
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: true,
       }),
       addLessLoader({
          javascriptEnabled: true,
          modifyVars: { '@primary-color': '#1DA57A' },
          }),
     );