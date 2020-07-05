import {
  IControllerMethod,
  IHTTPRequest,
  IHTTPResponse,
} from "../interfaces/interfaces.ts";

export class HTTPFrameworkControllerAdaptor {
  public makeOakCallback(
    controller: IControllerMethod,
  ): (context: any) => any {
    return async (context) => {
      const { request, response } = context;
      const requestBody = await request.body();
      const httpRequest: IHTTPRequest = {
        body: requestBody.value,
        query: "query",
        params: "params",
        ip: "10.200.155.1",
        method: request.method,
        path: request.url.pathname,
        headers: {
          "Content-Type": request.headers.get("Content-Type"),
          Referer: request.headers.get("referer"),
          "User-Agent": request.headers.get("User-Agent"),
        },
      };

      try {
        const httpResponse: IHTTPResponse = await controller(httpRequest);
        response.headers.set("Content-Type", httpResponse.headers["Content-Type"]);
        response.headers.set("Last-Modified", httpResponse.headers["Last-Modified"]);
        response.status = httpResponse.statusCode;
        response.body = httpResponse.body;
      } catch (error) {
        response.status = 500;
        response.body = { error: "An unknown error occurred." };
      }
    };
  }
}
