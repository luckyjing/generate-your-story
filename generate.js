var fs = require('fs'),
  Jimp = require('jimp');
var Konva = require('konva/src/Core');
require('konva/src/shapes/Image');
require('konva/src/shapes/Text');

function readImageData(path) {
  return fs
    .readFileSync(path)
    .toString('base64');
}
// 返回图片对象
async function addImage(filePath, config) {
  return new Promise(resolve => {
    let imageObj = new Konva
      .window
      .Image();
    imageObj.onload = function () {
      let image = new Konva.Image(Object.assign({
        image: imageObj,
        x: 0,
        y: 0
      }, config));
      resolve(image);
    }
    imageObj.src = filePath;
  })
}

module.exports = async function () {
  const WIDTH = 1000;
  const HEIGHT = 1000;
  var stage = new Konva.Stage({width: WIDTH, height: HEIGHT});
  var layer = new Konva.Layer();
  stage.add(layer);
  const bgImage = await addImage('./bg.jpg', {
    width: WIDTH,
    height: HEIGHT
  });
  layer.add(bgImage);
  let random = Math.round(Math.random());
  var text = new Konva.Text({
    text: random
      ? 'LuckyJing'
      : '苏靖鑫',
    x: 153,
    y: 86,
    fill: 'white',
    fontSize: 100,
    fontStyle: 'bold'
  });
  layer.add(text);
  layer.draw();

  return new Promise(resolve => {
    stage.toDataURL({
      callback: function (data) {
        var base64Data = data.replace(/^data:image\/png;base64,/, '');
        const imgBuffer = new Buffer(base64Data, 'base64');
        Jimp.read(imgBuffer, function (err, image) {
          if (err) {
            resolve(err);
          } else {
            image
              .getBuffer(Jimp.MIME_JPEG, function (err, buffer) {
                resolve(buffer);
              });
          }
        })
      }
    });
  })
}