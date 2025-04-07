import { ToolHandlers } from '../utils/types';
import { routine_code_commit, ROUTINE_CODE_COMMIT_TOOL } from './commit';
import {
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  routine_delete,
  routine_create,
  routine_list,
  routine_get,
} from './routine';

export const ESA_OPENAPI_ER_LIST = [
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  ROUTINE_CODE_COMMIT_TOOL,
];

export const ESA_OPENAPI_LIST = [...ESA_OPENAPI_ER_LIST];
export const routineHandlers: ToolHandlers = {
  routine_create,
  routine_delete,
  routine_list,
  routine_get,
  routine_code_commit,
};
