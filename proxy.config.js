module.exports = [
  {
    prefix: '/asxc',
    server: 'http://192.168.0.168'
  },
  {
    server: "http://www.cloud.com",
    prefix: '/szhiqu',
    pathRewrite: {
      "^/szhiqu": ""
    }
  },
]