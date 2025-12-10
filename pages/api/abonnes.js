import pool from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Récupérer tous les abonnés
        const { rows } = await pool.query(
          'SELECT * FROM abonnes ORDER BY date_inscription DESC'
        );
        return res.status(200).json(rows);

      case 'POST':
        // Ajouter un nouvel abonné
        const { nom, email, statut_paiement = 'en_attente', notes = '' } = req.body;
        
        if (!nom || !email) {
          return res.status(400).json({ message: 'Nom et email requis' });
        }

        const insertResult = await pool.query(
          'INSERT INTO abonnes (nom, email, statut_paiement, notes) VALUES ($1, $2, $3, $4) RETURNING *',
          [nom, email, statut_paiement, notes]
        );
        
        return res.status(201).json(insertResult.rows[0]);

      case 'PUT':
        // Modifier un abonné existant
        const { id, nom: updatedNom, email: updatedEmail, statut_paiement: updatedStatut, notes: updatedNotes } = req.body;
        
        if (!id) {
          return res.status(400).json({ message: 'ID requis' });
        }

        const updateResult = await pool.query(
          'UPDATE abonnes SET nom = $1, email = $2, statut_paiement = $3, notes = $4 WHERE id = $5 RETURNING *',
          [updatedNom, updatedEmail, updatedStatut, updatedNotes || '', id]
        );

        if (updateResult.rows.length === 0) {
          return res.status(404).json({ message: 'Abonné non trouvé' });
        }

        return res.status(200).json(updateResult.rows[0]);

      case 'DELETE':
        // Supprimer un abonné
        const { id: deleteId } = req.body;
        
        if (!deleteId) {
          return res.status(400).json({ message: 'ID requis' });
        }

        const deleteResult = await pool.query(
          'DELETE FROM abonnes WHERE id = $1 RETURNING *',
          [deleteId]
        );

        if (deleteResult.rows.length === 0) {
          return res.status(404).json({ message: 'Abonné non trouvé' });
        }

        return res.status(200).json({ message: 'Abonné supprimé', abonne: deleteResult.rows[0] });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Méthode ${method} non autorisée` });
    }
  } catch (error) {
    console.error('Erreur API abonnes:', error);
    
    // Gestion des erreurs de contrainte unique (email en double)
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Cet email est déjà enregistré' });
    }
    
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}