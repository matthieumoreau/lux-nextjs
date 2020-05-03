export const translateElementFromDictionary = (element, dictionary) => {
  if (typeof element === 'string' || typeof element === 'number') {
    element = {
      Id: element,
    };
  }

  element = {
    ...element,
    ...(element.Id in dictionary ? dictionary[element.Id] : dictionary[0]),
  };

  return element;
};
