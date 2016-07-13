export function range(start, end) {
  const result = [];

  for (var i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

export function sample(array) {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}


export function minusArray(values, otherValues) {
  const result = [];
  const groupSet = {};

  for (var i = 0; i < otherValues.length; i++) {
    let el = otherValues[i];
    groupSet[el] = true;
  }

  for (var j = 0; j < values.length; j++) {
    let value = values[j];
    if (!groupSet[value]) {
      result.push(value);
    }
  }

  return result;
}
