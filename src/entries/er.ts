#!/usr/bin/env node

import { ER_TOOLS, erHandlers } from '../tools/er';
import { createServer } from '../server';

createServer('esa-er', ER_TOOLS, erHandlers);
