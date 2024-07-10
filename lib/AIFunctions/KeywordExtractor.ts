export const keys: string[] = [
    'allowable stress',
    'tangible load',
    'module',
    'face width',
    'Lewis form factor',
    'pressure angle',
    'addendum',
    'dedendum',
    'clearance',
    'center distance',
    'pitch diameter',
    'base circle diameter',
    'outside diameter',
    'root diameter',
    'working depth of tooth',
    'whole depth of tooth',
    'gear ratio',
    'number of teeth',
    'circular pitch',
    'diametral pitch',
    'tensile strength',
    'factor of safety',
    'torque',
    'pitch',
    'stress',
    'module',
    'pitch diameter',
    'thickness',
    'material',
    'teeth',
    'torque',
    'force',
    'budget'
];
  
export function findKeywords(str: string): { foundKeywords: string[] } | { message: string } {
  const foundKeywords: string[] = [];
  keys.forEach(keyword => {
    if (str.toLowerCase().includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword);
    }
  });
  return foundKeywords.length > 0 ? { foundKeywords } : { message: 'No keywords found' };
}
  