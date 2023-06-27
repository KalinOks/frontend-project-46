#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import createDiff from '../src/index.js';

program.version('1.0.0');
program.addHelpText('before', 'Compares two configuration files and shows a difference.');

program.argument('<filepath1>');
program.argument('<filepath2>');
program.option('-f, --format <type>', 'output format');

program.action((filepath1, filepath2) => {
  const absPath1 = path.resolve(process.cwd(), filepath1);
  const absPath2 = path.resolve(process.cwd(), filepath2);
  const diff = createDiff(absPath1, absPath2);

  console.log(diff);
});

program.parse();
