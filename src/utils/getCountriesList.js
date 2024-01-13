export function getCountriesList(data, id) {
  if (id === "All" || data.length <= Number(id)) {
    return [...data];
  } else {
    let num = Number(id);
    const arr = [];
    const list = [];
    while (num > 0) {
      const ind = Math.floor(Math.random() * data.length);
      if (arr.indexOf(ind) === -1) {
        arr.push(ind);
        list.push(data[ind]);
        num--;
      }
    }
    return list;
  }
}
