import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { password } = req.body;
      
      // Vérifier le mot de passe
      if (password === process.env.ADMIN_PASSWORD) {
        // Créer un token simple (session)
        const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
        
        // Définir le cookie de session
        const cookie = serialize('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 7 jours
          path: '/',
        });
        
        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ success: true, message: 'Connecté' });
      } else {
        return res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
      }
    } catch (error) {
      console.error('Erreur auth:', error);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  }
  
  if (req.method === 'DELETE') {
    // Déconnexion
    const cookie = serialize('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true, message: 'Déconnecté' });
  }
  
  if (req.method === 'GET') {
    // Vérifier si l'utilisateur est connecté
    const { admin_token } = req.cookies || {};
    
    if (admin_token) {
      return res.status(200).json({ authenticated: true });
    } else {
      return res.status(200).json({ authenticated: false });
    }
  }
  
  return res.status(405).json({ message: 'Méthode non autorisée' });
}