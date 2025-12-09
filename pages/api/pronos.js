import { getPronos, createProno, updateProno, deleteProno, cbNumberExists } from '../../lib/db';

// Middleware pour vérifier l'authentification
function isAuthenticated(req) {
  const { admin_token } = req.cookies || {};
  return !!admin_token;
}

export default async function handler(req, res) {
  
  // GET - Récupérer tous les pronos (public)
  if (req.method === 'GET') {
    try {
      const pronos = await getPronos();
      return res.status(200).json(pronos);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des pronos' });
    }
  }
  
  // POST - Créer un prono (authentification requise)
  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    
    try {
      const { cb_number, date, bookmaker, event, mise, cote, statut } = req.body;
      
      // Vérifier que tous les champs sont présents
      if (!cb_number || !date || !bookmaker || !event || !mise || !cote || !statut) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
      }
      
      // Vérifier si le numéro CB existe déjà
      const exists = await cbNumberExists(cb_number);
      if (exists) {
        return res.status(400).json({ message: 'Ce numéro CB existe déjà' });
      }
      
      const prono = await createProno(req.body);
      return res.status(201).json(prono);
    } catch (error) {
      console.error('Erreur POST:', error);
      return res.status(500).json({ message: 'Erreur lors de la création du prono' });
    }
  }
  
  // PUT - Mettre à jour un prono (authentification requise)
  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    
    try {
      const { id, cb_number, date, bookmaker, event, mise, cote, statut } = req.body;
      
      if (!id) {
        return res.status(400).json({ message: 'ID requis' });
      }
      
      // Vérifier si le numéro CB existe déjà (sauf pour ce prono)
      const exists = await cbNumberExists(cb_number, id);
      if (exists) {
        return res.status(400).json({ message: 'Ce numéro CB existe déjà' });
      }
      
      const prono = await updateProno(id, { cb_number, date, bookmaker, event, mise, cote, statut });
      return res.status(200).json(prono);
    } catch (error) {
      console.error('Erreur PUT:', error);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du prono' });
    }
  }
  
  // DELETE - Supprimer un prono (authentification requise)
  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ message: 'ID requis' });
      }
      
      await deleteProno(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Erreur DELETE:', error);
      return res.status(500).json({ message: 'Erreur lors de la suppression du prono' });
    }
  }
  
  return res.status(405).json({ message: 'Méthode non autorisée' });
}