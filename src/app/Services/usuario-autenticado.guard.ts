import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { NotificationService } from './notification.service';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
    const oauthService: UsuarioService = inject(UsuarioService);
    
    if (oauthService.hasAccess() ) {
      return true;
    }
    oauthService.login();
    return false;
};
