// import sample from 'lodash/sample';

export function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

// export function randomEnumLodash<T>(myEnum: T) {
//   return sample(Object.values(myEnum)) as T;
// }

// enum Tr {
//   Admin,
//   Aris,
//   ssss,
// }
//
// randomEnumLodash(Tr);
