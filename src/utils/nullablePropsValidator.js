export default function nullable(propType) {
  return function(props, propName, ...rest) {
    if (props[propName] === null) {
      return null;
    }
    return propType(props, propName, ...rest);
  }
}
