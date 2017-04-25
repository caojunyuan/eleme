/**
 * Created by Administrator on 2017/4/22.
 */
/**
 * @param id
 * @param key
 * @param value
 * @result "{"A": {"key": "value"}, "B": {"key": "value"}}"
 */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    // localStorage中存储的是字符串,所以用JSON.parse()
    seller = JSON.parse(seller);
    // 有seller但没有seller[id]
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value; // 有seller并且有seller[id],对key 和 value 覆盖
  window.localStorage._seller_ = JSON.stringify(seller);
};

export function getFromLocal(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      return def;
    }
    return seller[id][key] || def;
  }
};

