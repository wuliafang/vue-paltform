// 登录过期提醒 回到登录页面
const loginoutMessage = () => {
  MessageBox.alert("登录过时，请重新登录", '提示', {
    confirmButtonText: '确定',
    closeOnClickModal: false,
    showClose: false,
    type: 'warning'
  }).then(() => {
    router.push({ path: "/login" })
  })
}

export { loginoutMessage }