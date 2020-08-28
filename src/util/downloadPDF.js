import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

const html2canvasDefaultOpts = {
  dpi: 300,
  // 允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
  // allowTaint: true,
  // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
  useCORS: true
};

/**
 * @desc generate .pdf file from HTMLElement
 * @param element
 * @param filename default `${timestamp}.pdf`
 * @returns flag {Promise<Boolean>}
 */
export default async (element, filename = `${Date.now()}.pdf`) => {
  return await new Promise(resolve => {
    window.scrollTo(0, 0);

    // 获得该容器的宽
    let eleW = element.offsetWidth;
    // 获得该容器的高
    let eleH = element.offsetHeight;
    // 获得该容器到文档顶部的距离
    let eleOffsetTop = element.offsetTop;
    // 获得该容器到文档最左的距离
    let eleOffsetLeft = element.offsetLeft;

    let abs = 0;
    // 获得当前可视窗口的宽度（不包含滚动条）
    let win_in = document.documentElement.clientWidth || document.body.clientWidth;
    // 获得当前窗口的宽度（包含滚动条）
    let win_out = window.innerWidth;

    // 获得滚动条宽度的一半
    if (win_out > win_in) abs = (win_out - win_in) / 2;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 将画布宽&&高放大两倍
    canvas.width = eleW * 2;
    canvas.height = eleH * 2;

    context.scale(2, 2);
    context.translate(-eleOffsetLeft - abs, -eleOffsetTop);
    // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
    // translate的时候，要把这个差值去掉

    html2canvas(element, html2canvasDefaultOpts)
      .then(canvas => {
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页

        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = contentWidth / 595.28 * 841.89;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28;
        const imgHeight = 595.28 / contentWidth * contentHeight;
        const pageData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new JsPDF('', 'pt', 'a4');

        if (leftHeight < pageHeight) {
          // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
          // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);

        } else {    // 分页
          while (leftHeight > 10) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);

            leftHeight -= pageHeight;
            position -= 841.89;

            // 避免添加空白页
            leftHeight > 10 && pdf.addPage();
          }
        }

        // 可动态生成
        pdf.save(filename);

        resolve(true);

      })
      .catch(() => resolve(false));

  });
}
