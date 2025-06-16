import ESA, {
  CommitRoutineStagingCodeRequest,
  CommitRoutineStagingCodeResponse,
  CreateRecordRequest,
  CreateRecordResponse,
  CreateRoutineRelatedRecordRequest,
  CreateRoutineRelatedRecordResponse,
  CreateRoutineRequest,
  CreateRoutineResponse,
  CreateRoutineRouteRequest,
  CreateRoutineRouteResponse,
  DeleteRoutineCodeVersionRequest,
  DeleteRoutineCodeVersionResponse,
  DeleteRoutineRelatedRecordRequest,
  DeleteRoutineRelatedRecordResponse,
  DeleteRoutineRequest,
  DeleteRoutineResponse,
  DeleteRoutineRouteRequest,
  DeleteRoutineRouteResponse,
  GetRoutineRequest,
  GetRoutineResponse,
  GetRoutineRouteRequest,
  GetRoutineRouteResponse,
  GetRoutineStagingCodeUploadInfoRequest,
  GetRoutineStagingCodeUploadInfoResponse,
  ListRecordsRequest,
  ListRecordsResponse,
  ListRoutineRoutesRequest,
  ListRoutineRoutesResponse,
  ListSiteRoutesRequest,
  ListSiteRoutesResponse,
  ListSitesRequest,
  ListSitesResponse,
  PublishRoutineCodeVersionRequest,
  PublishRoutineCodeVersionResponse,
  UpdateRoutineRouteRequest,
  UpdateRoutineRouteResponse,
  CreateSiteRequest,
  CreateSiteResponse,
  UpdateSitePauseRequest,
  UpdateSitePauseResponse,
  GetSitePauseRequest,
  GetSitePauseResponse,
  UpdateRecordRequest,
  UpdateRecordResponse,
  DeleteRecordRequest,
  DeleteRecordResponse,
  GetRecordRequest,
  GetRecordResponse,
  GetIPv6Request,
  GetIPv6Response,
  UpdateIPv6Request,
  UpdateIPv6Response,
  UpdateManagedTransformRequest,
  UpdateManagedTransformResponse,
  GetManagedTransformRequest,
  GetManagedTransformResponse,
} from "@alicloud/esa20240910";
import * as $OpenApi from "@alicloud/openapi-client";
import * as $Util from "@alicloud/tea-util";
import {
  CliConfig,
  GetMatchSiteRequest,
  ListRoutineRelatedRecordsRequest,
} from "./types";

export interface ApiMethod<RequestType, ResponseType> {
  (runtime: $Util.RuntimeOptions): Promise<ResponseType>;
  (request: RequestType, runtime: $Util.RuntimeOptions): Promise<ResponseType>;
}
class Client {
  client: ESA;

  constructor() {
    const config = {
      auth: {
        accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || '',
        accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET || '',
        securityToken: process.env.ALIBABA_CLOUD_SECURITY_TOKEN,
      },
      endpoint: 'esa.cn-hangzhou.aliyuncs.com',
    };
    this.client = Client.createClient(config);
  }

  static createClient(config: CliConfig) {
    const apiConfig = new $OpenApi.Config({
      accessKeyId: config.auth?.accessKeyId || '',
      accessKeySecret: config.auth?.accessKeySecret || '',
      securityToken: config.auth?.securityToken || '',
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

  publishRoutineCodeVersion(params: PublishRoutineCodeVersionRequest) {
    const request = new PublishRoutineCodeVersionRequest(params);
    return this.callApi(
      this.client.publishRoutineCodeVersion.bind(this.client) as ApiMethod<
        PublishRoutineCodeVersionRequest,
        PublishRoutineCodeVersionResponse
      >,
      request,
    );
  }

  listRoutineCanaryAreas() {
    return this.callApi(this.client.listRoutineCanaryAreas.bind(this.client));
  }

  listSites(params: ListSitesRequest) {
    const request = new ListSitesRequest(params);
    return this.callApi(
      this.client.listSites.bind(this.client) as ApiMethod<
        ListSitesRequest,
        ListSitesResponse
      >,
      request,
    );
  }

  deleteRoutineCodeVersion(params: DeleteRoutineCodeVersionRequest) {
    const request = new DeleteRoutineCodeVersionRequest(params);
    return this.callApi(
      this.client.deleteRoutineCodeVersion.bind(this.client) as ApiMethod<
        DeleteRoutineCodeVersionRequest,
        DeleteRoutineCodeVersionResponse
      >,
      request,
    );
  }

  createRoutineRelatedRecord(params: CreateRoutineRelatedRecordRequest) {
    const request = new CreateRoutineRelatedRecordRequest(params);
    return this.callApi(
      this.client.createRoutineRelatedRecord.bind(this.client) as ApiMethod<
        CreateRoutineRelatedRecordRequest,
        CreateRoutineRelatedRecordResponse
      >,
      request,
    );
  }

  createRoutineRoute(params: CreateRoutineRouteRequest) {
    const request = new CreateRoutineRouteRequest(params);
    return this.callApi(
      this.client.createRoutineRoute.bind(this.client) as ApiMethod<
        CreateRoutineRouteRequest,
        CreateRoutineRouteResponse
      >,
      request,
    );
  }

  deleteRoutineRoute(params: DeleteRoutineRouteRequest) {
    const request = new DeleteRoutineRouteRequest(params);
    return this.callApi(
      this.client.deleteRoutineRoute.bind(this.client) as ApiMethod<
        DeleteRoutineRouteRequest,
        DeleteRoutineRouteResponse
      >,
      request,
    );
  }

  getRoutineRoute(params: GetRoutineRouteRequest) {
    const request = new GetRoutineRouteRequest(params);
    return this.callApi(
      this.client.getRoutineRoute.bind(this.client) as ApiMethod<
        GetRoutineRouteRequest,
        GetRoutineRouteResponse
      >,
      request,
    );
  }

  listSiteRoutes(params: ListSiteRoutesRequest) {
    const request = new ListSiteRoutesRequest(params);
    return this.callApi(
      this.client.listSiteRoutes.bind(this.client) as ApiMethod<
        ListSiteRoutesRequest,
        ListSiteRoutesResponse
      >,
      request,
    );
  }

  listRoutineRoutes(params: ListRoutineRoutesRequest) {
    const request = new ListRoutineRoutesRequest(params);
    return this.callApi(
      this.client.listRoutineRoutes.bind(this.client) as ApiMethod<
        ListRoutineRoutesRequest,
        ListRoutineRoutesResponse
      >,
      request,
    );
  }

  updateRoutineRoute(params: UpdateRoutineRouteRequest) {
    const request = new UpdateRoutineRouteRequest(params);
    return this.callApi(
      this.client.updateRoutineRoute.bind(this.client) as ApiMethod<
        UpdateRoutineRouteRequest,
        UpdateRoutineRouteResponse
      >,
      request,
    );
  }

  deleteRoutineRelatedRecord(params: DeleteRoutineRelatedRecordRequest) {
    const request = new DeleteRoutineRelatedRecordRequest(params);
    return this.callApi(
      this.client.deleteRoutineRelatedRecord.bind(this.client) as ApiMethod<
        DeleteRoutineRelatedRecordRequest,
        DeleteRoutineRelatedRecordResponse
      >,
      request,
    );
  }

  getMatchSite(requestParams: GetMatchSiteRequest) {
    const params = {
      action: 'GetMatchSite',
      version: '2024-09-10',
      protocol: 'https',
      method: 'GET',
      authType: 'AK',
      bodyType: 'json',
      reqBodyType: 'json',
      style: 'RPC',
      pathname: '/',
      toMap: function () {
        return this;
      },
    };
    const request = new $OpenApi.OpenApiRequest({
      query: {
        RecordName: requestParams.recordName,
      },
    });
    const runtime = {
      toMap: function () {
        return this;
      },
    };
    return this.client.callApi(params, request, runtime);
  }

  listRoutineRelatedRecords(requestParams: ListRoutineRelatedRecordsRequest) {
    const params = {
      action: 'ListRoutineRelatedRecords',
      version: '2024-09-10',
      protocol: 'https',
      method: 'GET',
      authType: 'AK',
      bodyType: 'json',
      reqBodyType: 'json',
      style: 'RPC',
      pathname: '/',
      toMap: function () {
        return this;
      },
    };
    const request = new $OpenApi.OpenApiRequest({
      query: {
        Name: requestParams.Name,
        PageNumber: requestParams.PageNumber,
        PageSize: requestParams.PageSize,
        SearchKeyWord: requestParams.SearchKeyWord,
      },
    });
    const runtime = {
      toMap: function () {
        return this;
      },
    };
    return this.client.callApi(params, request, runtime);
  }

  createRecord(params: CreateRecordRequest) {
    const request = new CreateRecordRequest(params);
    return this.callApi(
      this.client.createRecord.bind(this.client) as ApiMethod<
        CreateRecordRequest,
        CreateRecordResponse
      >,
      request,
    );
  }

  listRecords(params: ListRecordsRequest) {
    const request = new ListRecordsRequest(params);
    return this.callApi(
      this.client.listRecords.bind(this.client) as ApiMethod<
        ListRecordsRequest,
        ListRecordsResponse
      >,
      request,
    );
  }
  createSite(params: CreateSiteRequest) {
    const request = new CreateSiteRequest(params);
    return this.callApi(
      this.client.createSite.bind(this.client) as ApiMethod<
        CreateSiteRequest,
        CreateSiteResponse
      >,
      request,
    );
  }
  updateSitePause(params: UpdateSitePauseRequest) {
    params.pause = params.pause || false;
    const request = new UpdateSitePauseRequest(params);
    return this.callApi(
      this.client.updateSitePause.bind(this.client) as ApiMethod<
        UpdateSitePauseRequest,
        UpdateSitePauseResponse
      >,
      request,
    );
  }

  getSitePause(params: GetSitePauseRequest) {
    const request = new GetSitePauseRequest(params);
    return this.callApi(
      this.client.getSitePause.bind(this.client) as ApiMethod<
        GetSitePauseRequest,
        GetSitePauseResponse
      >,
      request,
    );
  }

  updateRecord(params: UpdateRecordRequest) {
    const request = new UpdateRecordRequest(params);
    return this.callApi(
      this.client.updateRecord.bind(this.client) as ApiMethod<
        UpdateRecordRequest,
        UpdateRecordResponse
      >,
      request,
    );
  }

  deleteRecord(params: DeleteRecordRequest) {
    const request = new DeleteRecordRequest(params);
    return this.callApi(
      this.client.deleteRecord.bind(this.client) as ApiMethod<
        DeleteRecordRequest,
        DeleteRecordResponse
      >,
      request,
    );
  }

  getRecord(params: GetRecordRequest) {
    const request = new GetRecordRequest(params);
    return this.callApi(
      this.client.getRecord.bind(this.client) as ApiMethod<
        GetRecordRequest,
        GetRecordResponse
      >,
      request,
    );
  }

  updateIPv6(params: UpdateIPv6Request) {
    const request = new UpdateIPv6Request(params);
    return this.callApi(
      this.client.updateIPv6.bind(this.client) as ApiMethod<
        UpdateIPv6Request,
        UpdateIPv6Response
      >,
      request,
    );
  }

  getIPv6(params: GetIPv6Request) {
    const request = new GetIPv6Request(params);
    return this.callApi(
      this.client.getIPv6.bind(this.client) as ApiMethod<
        GetIPv6Request,
        GetIPv6Response
      >,
      request,
    );
  }

  updateManagedTransform(params: UpdateManagedTransformRequest) {
    const request = new UpdateManagedTransformRequest(params);
    return this.callApi(
      this.client.updateManagedTransform.bind(this.client) as ApiMethod<
        UpdateManagedTransformRequest,
        UpdateManagedTransformResponse
      >,
      request,
    );
  }

  getManagedTransform(params: GetManagedTransformRequest) {
    const request = new GetManagedTransformRequest(params);
    return this.callApi(
      this.client.getManagedTransform.bind(this.client) as ApiMethod<
        GetManagedTransformRequest,
        GetManagedTransformResponse
      >,
      request,
    );
  }
}

export default new Client();
