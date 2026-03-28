import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { map } from 'rxjs/operators';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.currentUser$.pipe(
    map(user => user ? true : router.createUrlTree(['/board']))
  );
};
