function sortObject(obj) {
  if (Array.isArray(obj)) {
    const array = [];

    obj.forEach((e) => array.push(sortObject(e)));
    return array;
  } else if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    const sortedKeys = keys.sort();
    // Step 3: Createnew object with sorted keys
    const sortedObj = {};
    sortedKeys.forEach((key) => {
      sortedObj[key] = obj[key];
    });

    return sortedObj;
  } else {
    return obj;
  }
}

module.exports = sortObject;
