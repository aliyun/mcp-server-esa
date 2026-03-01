#!/usr/bin/env node

import { ESA_OPENAPI_LIST, esaHandlers } from './tools/list-esa-function';
import { createServer } from './server';

createServer('esa-server', ESA_OPENAPI_LIST, esaHandlers);
