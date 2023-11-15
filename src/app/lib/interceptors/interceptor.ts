import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@lib/services';
/**
 * Interceptor that adds an Authorization header to requests that are authenticated and target the API URL.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const Interceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    console.log(request);
    // request = request.clone({
    //     setHeaders: {
    //         'x-auth-token': session ? session.token : '',
    //     },
    // });

    return next(request);
};
