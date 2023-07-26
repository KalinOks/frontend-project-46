import _ from 'lodash';
import { Statuses } from '../diff.js';

const renderValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (tree, path = []) => Object.entries(tree).map(([key, { status, value }]) => {
  if (status === Statuses.removed) {
    return `Property '${[...path, key].join('.')}' was removed`;
  }
  if (status === Statuses.added) {
    return `Property '${[...path, key].join('.')}' was added with value: ${renderValue(value)}`;
  }
  if (status === Statuses.changed) {
    return `Property '${[...path, key].join('.')}' was updated. From ${renderValue(value.oldValue)} to ${renderValue(value.newValue)}`;
  }
  if (status === Statuses.childrenChanged) {
    return plain(value, [...path, key]);
  }

  return '';
}).filter((item) => !!item).join('\n');

export default plain;
