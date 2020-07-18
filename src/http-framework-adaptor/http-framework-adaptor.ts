import { IHTTPRequest, IHTTPResponse } from '../controllers/comment/comment-controller.ts'

export interface IControllerMethod {
  (httpRequest: IHTTPRequest): Promise<IHTTPResponse>;
}

export class HTTPFrameworkControllerAdaptor {
  private _getQueryParams(searchParams: URLSearchParams): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }

  public makeOakCallback(
    controller: IControllerMethod,
  ): (context: any) => any {
    return async (context) => {
      const { request, response, params } = context;
      const requestBody = await request.body();
      const httpRequest: IHTTPRequest = {
        body: requestBody.value,
        query: this._getQueryParams(
          request.url.searchParams,
        ),
        params,
        ip: request.ip,
        method: request.method,
        path: request.url.pathname,
        headers: {
          "Content-Type": request.headers.get("Content-Type"),
          Referrer: request.headers.get("referer"),
          "User-Agent": request.headers.get("User-Agent"),
        },
      };

      try {
        const httpResponse: IHTTPResponse = await controller(httpRequest);
        response.headers.set(
          "Content-Type",
          httpResponse.headers["Content-Type"],
        );
        response.headers.set(
          "Last-Modified",
          httpResponse.headers["Last-Modified"],
        );
        response.status = httpResponse.statusCode;
        response.body = httpResponse.body;
      } catch (error) {
        response.status = 500;
        response.body = { error: "An unknown error occurred." };
      }
    };
  }
}
