export function lower(string) {
  string = string.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
  string = string.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
  string = string.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
  string = string.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
  string = string.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
  string = string.replace(new RegExp("[Ç]", "gi"), "c");
  string = string.toLowerCase();
  return string;
}

export function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];

    let comparison = 0;
    if (lower(varA) > lower(varB)) {
      comparison = 1;
    } else if (lower(varA) < lower(varB)) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

// function orderByNameDesc() {
//   const filterNames = userInfo
//     .map(user => lower(user.name.split(" ")[0]))
//     .sort()
//     .reverse()
//   console.log(filterNames)
// }

// function orderByIdDesc() {
//   return (
//     <>
//       {userInfo
//         .sort((a, b) => b.id - a.id)
//         .map(info => (
//           <div key={info.id}>
//             <User {...info} />
//           </div>
//         ))}
//     </>
//   );
// }
