// /**
//  * 环境配置文件 environment configuration file
//  * 一般在企业级项目中，会有多个环境，如开发环境、测试环境、线上（生产）环境等
//  */



// // 当前的环境变量 current environment variable
// const env = import.meta.env.MODE || 'prod'


// const EnvConfig = {
//     development: { // 开发环境 development environment
//         baseApi: '/api', // 接口请求地址 interface request address
//         mockApi: 'https://mock.apifox.com/m1/4216854-0-default/api'
//     },
//     test: { // 测试环境 test environment
//         baseApi: '//test.futurefe.com/api',
//         mockApi: 'https://mock.apifox.com/m1/4216854-0-default/api'
//     },
//     prod: { // 开发（生产）环境 production environment
//         baseApi: '//futurefe.com/api',
//         mockApi: 'https://mock.apifox.com/m1/4216854-0-default/api'
//     }
// }

// export default {
//     env,
//     // mock 总开关，是否开启模拟数据功能 whether to enable mock data function
//     mock: true, 
//     ...EnvConfig[env]
// }