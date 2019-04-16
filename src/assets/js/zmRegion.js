//引入省市区数据json文件
import provinces from '../../../static/json/provinces'
import cities from '../../../static/json/cities'
import areas from '../../../static/json/areas'
import streets from '../../../static/json/streets'


export function zmGetProvincesArr() {

  let provinceArr = [];
  provinces.forEach(function (item) {
    let obj = {};
    obj.name = item.name;
    obj.code = item.code;
    provinceArr.push(obj);
  });
  return provinceArr;
}

export function zmGetCitiesArr(provinceCode) {
  console.log("省：" + provinceCode);
  if (!provinceCode){
    provinceCode = '11'
  }
  let cityArr = [];
  cities.forEach(function (item) {
    if (item.provinceCode == provinceCode) {
      let obj = {};
      obj.name = item.name;
      obj.code = item.code;
      obj.provinceCode = item.provinceCode;
      cityArr.push(obj);
    }
  });
  return cityArr;
}

export function zmGetAreaArr(cityCode) {
  console.log("市：" + cityCode);
  if (!cityCode) {
    cityCode = '1101'
  }
  let areaArr = [];
  areas.forEach(function (item) {
    if (item.cityCode == cityCode) {
      let obj = {};
      obj.name = item.name;
      obj.code = item.code;
      obj.provinceCode = item.provinceCode;
      obj.cityCode = item.cityCode;
      areaArr.push(obj);
    }
  });
  return areaArr;
}
export function zmGetStreetArr(areaCode) {
  console.log("街道：" + areaCode);
  if (!areaCode){
    areaCode = '110101'
  }
  let areaArr = [];
  streets.forEach(function (item) {
    if (item.areaCode == areaCode) {
      let obj = {};
      obj.name = item.name;
      obj.code = item.code;
      obj.provinceCode = item.provinceCode;
      obj.cityCode = item.cityCode;
      obj.areaCode = item.areaCode;
      areaArr.push(obj);
    }
  });
  return areaArr;
}
