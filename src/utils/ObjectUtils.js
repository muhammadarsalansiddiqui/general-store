export function oForEach<T>(
  subject: {[key:string]: T},
  operation: (value: T, key: string) => void
): void {
  for (const key in subject) {
    if (subject.hasOwnProperty(key)) {
      operation(subject[key], key);
    }
  }
}

export function oMap<T, R>(
  subject: {[key:string]: T},
  mapper: (value: any, key: string) => R
): R {
  const result = {};
  oForEach(subject, (value, key) => {
    result[key] = mapper(value, key);
  });
  return result;
}

export function oReduce<T, R>(
  subject: {[key:string]: T},
  reducer: (acc: R, value: T, key: string) => R,
  initialAcc: R
): R {
  let result = initialAcc;
  oForEach(subject, (value, key) => {
    result = reducer(result, value, key);
  });
  return result;
}

export function oFilterMap<T, R>(
  subject: {[key:string]: T},
  filter: (value: T, key: string) => bool,
  mapper: (value: T, key: string) => R
): {[key:string]: R} {
  return oReduce(subject, (result, value, key) => {
    if (filter(value, key)) {
      result[key] = mapper(value, key);
    }
    return result;
  });
}
