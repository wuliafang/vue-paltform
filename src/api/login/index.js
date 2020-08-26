import request from '@/lib/request'

export const  login = async data => {
  const url = 'szhiqu/uorg/login/loginByPsw'
  return await request({
    url,
    method: 'post',
    data: data
  })
}