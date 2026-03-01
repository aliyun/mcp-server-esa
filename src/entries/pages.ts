#!/usr/bin/env node

import { PAGES_TOOLS, pagesHandlers } from '../tools/pages';
import { createServer } from '../server';

createServer('esa-pages', PAGES_TOOLS, pagesHandlers);
