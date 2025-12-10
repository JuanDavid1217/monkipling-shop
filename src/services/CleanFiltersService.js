import {removeStopwords, spa} from 'stopword';

const normalizeValue = (val) => {
  //return val?.toString().replace(/^["']+|["']+$/g, "")?.trim()?.toLowerCase();
  return val?.toString()?.trim()?.toLowerCase();
}

export const booleanValue = (value) => {
  if (value == "true" || value =="false") {
    return value=="true";
  }else{
    return null
  }
}

export const integerValue = (value) => {
  try {
    return Number(value);
  } catch(error) {
    return null;
  }
}

export const removeStopWords = (text) => {
  const result = removeStopwords(text?.split(' '), spa).join(" ");
  return result;
}

export const cleanFilters = (validFilters, filters) => {
  const cleanedFilters = {}
  for (const [key, value] of Object.entries(filters)) {
    let newKey = normalizeValue(key);
    let newValue = normalizeValue(value)
    if (validFilters.includes(newKey)) {
      cleanedFilters[newKey] = newValue;
    }
  }
  return cleanedFilters;
}