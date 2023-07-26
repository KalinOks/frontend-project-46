import _ from 'lodash';
import { Statuses } from '../diff.js';

const drawSpaces = (length) => new Array(length + 1).join(' ');

const parseToString = (obj, deep = 0) => {
  const step = 4;
  const closeBracketsStep = step * deep - 2 > 0 ? step * deep - 2 : 0;

  const drawSymbol = (status) => {
    const statusToSymbol = {
      [Statuses.removed]: '-',
      [Statuses.added]: '+',
      [Statuses.notChanged]: ' ',
      [Statuses.childrenChanged]: ' ',
    };

    return statusToSymbol[status];
  };

  const drawValue = (value) => (_.isPlainObject(value) ? parseToString(value, deep + 1) : value);
  const drawKey = (key, keyStatus) => `${drawSpaces(step * deep)}${drawSymbol(keyStatus)} ${key}`;

  const drawLine = (key, status, value) => {
    if (status === Statuses.changed) {
      return (
        `${drawKey(key, Statuses.removed)}: ${drawValue(value.oldValue)}\n${drawKey(key, Statuses.added)}: ${drawValue(value.newValue)}`);
    }

    return `${drawKey(key, status)}: ${drawValue(value)}`;
  };

  return `{\n${Object.entries(obj).map(
    ([key, { status, value }]) => `${drawLine(key, status, value)}`,
  ).join('\n')}\n${drawSpaces(closeBracketsStep)}}`;
};

export default parseToString;
