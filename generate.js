var fs = require('fs'),
  Konva = require('konva');

function readImageData(path) {
  return fs
    .readFileSync(path)
    .toString('base64');
}
// 返回图片对象
async function addImage(filePath) {
  return new Promise(resolve => {
    let imageObj = new Konva
      .window
      .Image();
    imageObj.onload = function () {
      let image = new Konva.Image({image: imageObj, x: 0, y: 0});
      resolve(image);
    }
    imageObj.src = filePath;
  })
}

module.exports = async function () {
  var stage = new Konva.Stage({width: 1772, height: 1772});

  var layer = new Konva.Layer();
  stage.add(layer);
  const bgImage = await addImage('./bg.jpg');
  layer.add(bgImage);
  var text = new Konva.Text({
    text: '苏靖鑫' ,
    x: 294,
    y: 183,
    fill: 'white',
    fontSize: 220,
    fontStyle: 'bold'
  });
  layer.add(text);
  layer.draw();

  return new Promise(resolve => {
    stage.toDataURL({
      callback: function (data) {
        var base64Data = data.replace(/^data:image\/png;base64,/, '');
        resolve(new Buffer(base64Data, 'base64'))
      }
    });
  })
}