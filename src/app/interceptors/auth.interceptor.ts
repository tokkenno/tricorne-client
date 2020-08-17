import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly router: Router,
        private readonly auth: AuthService
    ) {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const session = this.auth.getSession();
        let request = req;

        if (session != null) {
            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${session.token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigate(['/sign-in']);
                }

                return throwError(err);
            })
        );
    }
}
