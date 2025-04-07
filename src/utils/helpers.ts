import { GetRoutineStagingCodeUploadInfoResponse } from '@alicloud/esa20240910';
import { IOssConfig } from './types';

export function log(...args: unknown[]) {
  const msg = `[DEBUG ${new Date().toISOString()}] ${args.join(' ')}\n`;
  process.stderr.write(msg);
}

export const uploadCodeToOSS = async (
  res: GetRoutineStagingCodeUploadInfoResponse,
  code: string,
) => {
  const ossConfig = res?.body?.ossPostConfig as IOssConfig;

  if (res.statusCode !== 200 || !ossConfig) {
    return false;
  }

  const { OSSAccessKeyId, Signature, callback, Url, key, policy }: IOssConfig =
    ossConfig;
  const formData = new FormData();
  formData.append('OSSAccessKeyId', OSSAccessKeyId);
  formData.append('Signature', Signature);
  formData.append('callback', callback);
  formData.append('x:codeDescription', ossConfig['x:codeDescription']);
  formData.append('policy', policy);
  formData.append('key', key);
  formData.append('file', code);

  const ossRes = await fetch(Url, {
    method: 'post',
    body: formData,
  }).catch((e) => console.error(e));

  return ossRes && ossRes.status === 200;
};
