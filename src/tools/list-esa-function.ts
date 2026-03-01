import { PAGES_TOOLS, pagesHandlers } from './pages';
import { ER_TOOLS, erHandlers } from './er';
import { SITE_TOOLS, siteHandlers } from './site';
import { ToolHandlers } from '../utils/types';

export const ESA_OPENAPI_LIST = [...PAGES_TOOLS, ...ER_TOOLS, ...SITE_TOOLS];

export const esaHandlers: ToolHandlers = {
  ...pagesHandlers,
  ...erHandlers,
  ...siteHandlers,
};
