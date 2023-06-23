#!/usr/bin/env node

import { program } from 'commander';

program.version('1.0.0');
program.addHelpText('before', 'Compares two configuration files and shows a difference.');

program.argument('<filepath1>');
program.argument('<filepath2>');
program.option('-f, --format <type>', 'output format');

program.parse();
