import {envServerSchema} from '../../utils/server.constants';
import {NextFunction, Request, Response} from 'express';
import ApiError from '../../api-error';
import {StatusCodes} from 'http-status-codes';

type Service_Options = 'account' | 'commerce' | 'payment';

class HippoApiService {

  private accountApi = envServerSchema.ACCOUNT_API_URL;
  private commerceApi = envServerSchema.COMMERCE_API_URL;
  private paymentApi = envServerSchema.PAYMENT_API_URL;
  private apiUser = envServerSchema.API_USER;
  private apiKey = envServerSchema.API_KEY;
  private brandName = envServerSchema.BRAND_NAME;

  async proxyRequest(req: Request, res: Response, next: NextFunction, service: Service_Options): Promise<void> {
    try {
      const proxyUrl = this.getProxyUrl(req, service);
      const headers = this.buildRequestHeaders(req, res);
      // Forward the request to the Hippo API
      const response = await fetch(proxyUrl, {
        method: req.method,
        headers: headers,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
      });
      // Hippo API errors are already formatted as JSON and have the correct status code, so we can just forward them
      // as responses.

      // Forward the response back to the client
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      const apiError = new ApiError(
        'An error occurred while processing the request to the Hippo API.',
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Hippo Service Proxy Error',
      );
      next(apiError);
    }
  }

  private getProxyUrl(req: Request, service: Service_Options): string {
    const apiUrl = this.getApiUrl(service);
    //Get everything after the /api/hippo/ part of the URL
    const pathWithParams = req.path.replace(/^\/api\/hippo\//, '');
    return new URL(pathWithParams, apiUrl).toString();
  }

  private getApiUrl(service: Service_Options): URL {
    switch (service) {
      case 'account':
        return new URL(this.accountApi);
      case 'commerce':
        return new URL(this.commerceApi);
      case 'payment':
        return new URL(this.paymentApi);
      default:
        throw new ApiError(`Unknown service: ${service}`, StatusCodes.INTERNAL_SERVER_ERROR, 'Hippo Service Proxy Error');
    }
  }

  private getApiAuthHeader(): string {
    return `Basic ${Buffer.from(`${this.apiUser}:${this.apiKey}`).toString('base64')}`;
  }

  private buildRequestHeaders(req: Request, res: Response): Headers {
    const requestLanguage = req.headers['x-language'] as string | undefined;
    const requestLocale = req.headers['x-locale'] as string | undefined;
    //If the user is authenticated, use their token and refresh token; otherwise, use the API key
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-brand': this.brandName,
      'x-language': requestLanguage || 'en',
      'x-locale': requestLocale || 'US',
    });
    const userAuth = res.locals['userAuth'];
    if (userAuth) {
      headers.set('Authorization', `Bearer ${userAuth.token}`);
      headers.set('x-app-rt', userAuth.refreshToken);
    } else {
      headers.set('Authorization', this.getApiAuthHeader());
    }
    return headers;
  }
}
