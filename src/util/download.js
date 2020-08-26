import axios from 'axios';
import query from './query';
import verifyurl from './url'
import {domainCom} from './url'

// 使用a标签实现点击下载
const downloadWithArch = async params => {
  try {
    await new Promise(() => {
      // data数据流
      let { data, type, name } = params;

      // type文件类型，默认excel
      type = type || 'application/vnd.ms-excel;charset=utf-8'; // excel
      // name文件名称，默认时间戳
      name = name || `${+new Date()}.xls`;

      // create blob、url and download-element, below using anchor
      const blob = new Blob([data], { type });
      const url = window.URL.createObjectURL(blob);
      const downLoadElement = document.createElement('a');

      // assign url and name to the download-element
      downLoadElement.href = url;
      downLoadElement.download = name;

      // append download-element to body
      document.body.appendChild(downLoadElement);

      // mock click download-element to download the blob
      downLoadElement.click();

      // remove the download-element from body after trigger download
      document.body.removeChild(downLoadElement);

      // revoke the url-resource
      window.URL.revokeObjectURL(url);

    });

    return true;

  } catch (e) {
    return false;
  }

};

export default async params => {
  let { url, method, headers, data, name } = params;
  method = method || 'GET';
  
  url = url.indexOf("http") > -1 ? url : verifyurl(domainCom(url));
  
  try {
    // 基本参数
    const baseCfg = { responseType: 'blob' };

    // 创建axios实例
    const instance = await axios.create(baseCfg);

    // 针对不同method的请求参数处理
    const reqParams = method === 'post' || method === 'put' || method === 'patch'
    // post, put or patch method
      ?            (
        headers && headers['Content-Type'] && headers['Content-Type'].includes('application/x-www-form-urlencoded')
        // Content-Type: 'application/x-www-form-urlencoded;charset=UTF-8'
          ?                {
            data,
            // transform request data to query-string if Content-Type is 'application/x-www-form-urlencoded'
            transformRequest: [
              function(datas) {
                return query.serialize(datas);

              }
            ]
          }
        // Content-Type: 'application/json;charset=UTF-8'
          :                { data }
      )
    // get, delete or head method
      :            { params: data };

    // 发起请求
    const res = await instance.request(Object.assign({}, { url, method }, reqParams));
    return await downloadWithArch({ data: res.data, name: name });

  } catch (e) {
    return null;

  }

};
