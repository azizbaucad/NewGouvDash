import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/api/dispatch/:function*',
    '/dashboard/:function*',
    // Autres routes ici...
  ],
};

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Supprimer ou commenter les vérifications de token et de redirection
  // const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });

  // Désactiver la redirection basée sur le token
  // if (!url.pathname.includes('/auth/login') && !token) {
  //   url.pathname = '/auth/login';
  //   return NextResponse.redirect(url);
  // }

  // Si déjà connecté, rediriger vers dashboard directement
  if (url.pathname.includes('/auth/login')) {
    url.pathname = '/dashboard'; // ou autre route par défaut
    return NextResponse.redirect(url);
  }

  // Suppression de vérifications additionnelles
  // if (url.pathname.includes('dispatch') && !req.headers.get('content-source')) {
  //   url.pathname = '/404';
  //   return NextResponse.redirect(url);
  // }
  
  // Laisser passer toutes les requêtes
  return NextResponse.next();
}
