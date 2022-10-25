import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // Récupérer le token
    const token = req.get('auth-user');
    // // Si le token existe
    // if (token) {
    //   // decode du token
      try {
        const payload: JwtPayload | string = verify(token, 'your-256-bit-secret');
        // si valide
        // on récupére le userId et on l'injecte dans l'objet request
        req['user'] = payload['userId'];
        console.log('req user',  req['user']);
        next();
        return;
      } catch (e) {
        // sinon on throw une exception
        // else {
        //   //Sinon on throw une exception
        //   throw new UnauthorizedException('Veuillez vous authentifier');
        throw new UnauthorizedException('Veuillez vous authentifier');
      }
    }
}
