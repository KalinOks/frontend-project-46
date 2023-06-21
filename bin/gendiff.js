#!/usr/bin/env node

import { program } from 'commander';

program.version('1.0.0');

program.addHelpText('before', 'Compares two configuration files and shows a difference.');

program.parse();
