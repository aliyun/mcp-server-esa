#!/usr/bin/env node

import { SITE_TOOLS, siteHandlers } from '../tools/site';
import { createServer } from '../server';

createServer('esa-site', SITE_TOOLS, siteHandlers);
