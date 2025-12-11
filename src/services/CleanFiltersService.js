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

export const numberValue = (value) => {
  value = Number(value);
  if (isNaN(value)) {
    return null;
  }
  return value;
}

export const integerValue = (value) => {
  value = parseInt(value);
  if (isNaN(value)) {
    return null;
  }
  return value;
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
    if (validFilters.includes(newKey) && newValue && newValue!="") {
      cleanedFilters[newKey] = newValue;
    }
  }
  return cleanedFilters;
}