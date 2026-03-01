import { HTML_DEPLOY_TOOL, html_deploy } from './html-deploy';
import { FOLDER_DEPLOY_TOOL, folder_deploy } from './folder-deploy';
import { ToolHandlers } from '../../utils/types';

export const PAGES_TOOLS = [HTML_DEPLOY_TOOL, FOLDER_DEPLOY_TOOL];

export const pagesHandlers: ToolHandlers = {
  html_deploy,
  folder_deploy,
};
