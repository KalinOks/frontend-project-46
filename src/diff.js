import _ from 'lodash';

export const Statuses = {
  removed: 'removed',
  added: 'added',
  notChanged: 'not_changed',
  childrenChanged: 'children_changed',
  changed: 'changed',
};

export const createObjectsDiff = (firstObject, secondObject) => {
  const keys1 = _.orderBy(Object.keys(firstObject), (key) => key, ['asc']);
  const keys2 = _.orderBy(Object.keys(secondObject), (key) => key, ['asc']);

  const allKeys = _.uniq([...keys1, ...keys2]);
  const sortedKeys = _.orderBy(allKeys, (key) => key, ['asc']);

  const createNode = (nodeStatus, firstValue, secondValue) => {
    let value;

    switch (nodeStatus) {
      case Statuses.removed:
      case Statuses.added:
      case Statuses.notChanged:
      case Statuses.childrenChanged:
        value = _.isPlainObject(firstValue) && _.isPlainObject(secondValue)
          ? createObjectsDiff(firstValue, secondValue)
          : firstValue;
        break;
      case Statuses.changed:
        value = {
          oldValue: _.isPlainObject(firstValue)
            ? createObjectsDiff(firstValue, firstValue)
            : firstValue,
          newValue: _.isPlainObject(secondValue)
            ? createObjectsDiff(secondValue, secondValue)
            : secondValue,
        };
        break;
      default:
        throw new Error('wrong Status');
    }

    return {
      status: nodeStatus,
      value,
    };
  };

  const tree = sortedKeys.reduce((acc, key) => {
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    if (!keys2.includes(key)) {
      acc[key] = createNode(Statuses.removed, firstValue, firstValue);
      return acc;
    }

    if (!keys1.includes(key)) {
      acc[key] = createNode(Statuses.added, secondValue, secondValue);
      return acc;
    }

    if (_.isEqual(firstValue, secondValue)) {
      acc[key] = createNode(Statuses.notChanged, firstValue, firstValue);
    } else if (_.isPlainObject(firstValue) && _.isPlainObject(secondValue)) {
      acc[key] = createNode(Statuses.childrenChanged, firstValue, secondValue);
    } else {
      acc[key] = createNode(Statuses.changed, firstValue, secondValue);
    }

    return acc;
  }, {});

  return tree;
};
