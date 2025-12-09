import { sql } from '@vercel/postgres';

// Fonction pour récupérer tous les pronos
export async function getPronos() {
  try {
    const { rows } = await sql`
      SELECT * FROM pronos 
      ORDER BY date DESC, cb_number DESC
    `;
    return rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des pronos:', error);
    throw error;
  }
}

// Fonction pour créer un prono
export async function createProno(data) {
  try {
    const { cb_number, date, bookmaker, event, mise, cote, statut } = data;
    
    const { rows } = await sql`
      INSERT INTO pronos (cb_number, date, bookmaker, event, mise, cote, statut)
      VALUES (${cb_number}, ${date}, ${bookmaker}, ${event}, ${mise}, ${cote}, ${statut})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Erreur lors de la création du prono:', error);
    throw error;
  }
}

// Fonction pour mettre à jour un prono
export async function updateProno(id, data) {
  try {
    const { cb_number, date, bookmaker, event, mise, cote, statut } = data;
    
    const { rows } = await sql`
      UPDATE pronos 
      SET cb_number = ${cb_number},
          date = ${date},
          bookmaker = ${bookmaker},
          event = ${event},
          mise = ${mise},
          cote = ${cote},
          statut = ${statut},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prono:', error);
    throw error;
  }
}

// Fonction pour supprimer un prono
export async function deleteProno(id) {
  try {
    await sql`DELETE FROM pronos WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la suppression du prono:', error);
    throw error;
  }
}

// Fonction pour vérifier si un numéro CB existe déjà
export async function cbNumberExists(cb_number, excludeId = null) {
  try {
    let query;
    if (excludeId) {
      query = await sql`
        SELECT COUNT(*) as count 
        FROM pronos 
        WHERE cb_number = ${cb_number} AND id != ${excludeId}
      `;
    } else {
      query = await sql`
        SELECT COUNT(*) as count 
        FROM pronos 
        WHERE cb_number = ${cb_number}
      `;
    }
    return query.rows[0].count > 0;
  } catch (error) {
    console.error('Erreur lors de la vérification du numéro CB:', error);
    throw error;
  }
}