import ESA, {
  CommitRoutineStagingCodeRequest,
  CommitRoutineStagingCodeResponse,
  CreateRoutineRequest,
  CreateRoutineResponse,
  DeleteRoutineRequest,
  DeleteRoutineResponse,
  GetRoutineRequest,
  GetRoutineResponse,
  GetRoutineStagingCodeUploadInfoRequest,
  GetRoutineStagingCodeUploadInfoResponse,
} from '@alicloud/esa20240910';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import { log } from './helpers';

export interface ApiMethod<RequestType, ResponseType> {
  (runtime: $Util.RuntimeOptions): Promise<ResponseType>;
  (request: RequestType, runtime: $Util.RuntimeOptions): Promise<ResponseType>;
}

export interface AuthConfig {
  accessKeyId: string;
  accessKeySecret: string;
}

export interface CliConfig {
  [key: string]: unknown;
  auth?: AuthConfig;
  endpoint?: string;
  lang?: string;
}

class Client {
  client: ESA;

  constructor() {
    const config = {
      auth: {
        accessKeyId: process.env.ESA_ACCESS_KEY_ID || '',
        accessKeySecret: process.env.ESA_ACCESS_KEY_SECRET || '',
      },
      endpoint: 'esa.cn-hangzhou.aliyuncs.com',
    };
    this.client = Client.createClient(config);
  }

  static createClient(config: CliConfig) {
    const apiConfig = new $OpenApi.Config({
      accessKeyId: config.auth?.accessKeyId || '',
      accessKeySecret: config.auth?.accessKeySecret || '',
      endpoint: config.endpoint,
    });
    return new ESA(apiConfig);
  }

  callApi = async <RequestType, ResponseType>(
    action: ApiMethod<RequestType, ResponseType>,
    request?: RequestType,
  ): Promise<ResponseType> => {
    const runtime = new $Util.RuntimeOptions({
      connectTimeout: 10000,
      readTimeout: 10000,
      autoretry: true,
      maxAttempts: 3,
    });
    const response = request
      ? await action(request, runtime)
      : await action(runtime);
    return response;
  };

  createRoutine(params: CreateRoutineRequest) {
    const request = new CreateRoutineRequest(params);
    log('Creating routine with parameters:', JSON.stringify(params));
    return this.callApi(
      this.client.createRoutine.bind(this.client) as ApiMethod<
        CreateRoutineRequest,
        CreateRoutineResponse
      >,
      request,
    );
  }

  deleteRoutine(params: DeleteRoutineRequest) {
    const request = new DeleteRoutineRequest(params);
    return this.callApi(
      this.client.deleteRoutineWithOptions.bind(this.client) as ApiMethod<
        DeleteRoutineRequest,
        DeleteRoutineResponse
      >,
      request,
    );
  }

  getRoutine(params: GetRoutineRequest) {
    const request = new GetRoutineRequest(params);
    return this.callApi(
      this.client.getRoutineWithOptions.bind(this.client) as ApiMethod<
        GetRoutineRequest,
        GetRoutineResponse
      >,
      request,
    );
  }

  getRoutineUserInfo() {
    return this.callApi(this.client.getRoutineUserInfo.bind(this.client));
  }

  async getRoutineStagingCodeUploadInfo(
    params: GetRoutineStagingCodeUploadInfoRequest,
  ) {
    const request = new GetRoutineStagingCodeUploadInfoRequest(params);

    return this.callApi(
      this.client.getRoutineStagingCodeUploadInfo.bind(
        this.client,
      ) as ApiMethod<
        GetRoutineStagingCodeUploadInfoRequest,
        GetRoutineStagingCodeUploadInfoResponse
      >,
      request,
    );
  }

  commitRoutineStagingCode(params: CommitRoutineStagingCodeRequest) {
    const request = new CommitRoutineStagingCodeRequest(params);
    return this.callApi(
      this.client.commitRoutineStagingCode.bind(this.client) as ApiMethod<
        CommitRoutineStagingCodeRequest,
        CommitRoutineStagingCodeResponse
      >,
      request,
    );
  }
}

export default new Client();
