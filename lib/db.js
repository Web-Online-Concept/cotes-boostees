import { sql } from '@vercel/postgres';

export async function getPronos() {
  try {
    const { rows } = await sql`SELECT * FROM pronos ORDER BY date DESC, cb_number DESC`;
    return rows;
  } catch (error) {
    console.error('Erreur getPronos:', error.message, error.stack);
    throw new Error(`Erreur lors de la recuperation des pronos: ${error.message}`);
  }
}

export async function createProno(data) {
  try {
    const { cb_number, date, bookmaker, event, mise, cote, statut } = data;
    
    // Conversion explicite en nombres
    const miseNum = Number(mise);
    const coteNum = Number(cote);
    
    console.log('Creation prono avec data:', { 
      cb_number, 
      date, 
      bookmaker, 
      event: event || '-', 
      mise: miseNum, 
      cote: coteNum, 
      statut 
    });
    
    const { rows } = await sql`
      INSERT INTO pronos (cb_number, date, bookmaker, event, mise, cote, statut)
      VALUES (${cb_number}, ${date}, ${bookmaker}, ${event || '-'}, ${miseNum}, ${coteNum}, ${statut})
      RETURNING *
    `;
    
    console.log('Prono cree:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Erreur createProno:', error.message, error.stack);
    console.error('Data recu:', data);
    throw new Error(`Erreur lors de la creation du prono: ${error.message}`);
  }
}

export async function updateProno(id, data) {
  try {
    const { cb_number, date, bookmaker, event, mise, cote, statut } = data;
    
    // Conversion explicite en nombres
    const miseNum = Number(mise);
    const coteNum = Number(cote);
    
    console.log('Update prono', id, 'avec data:', { 
      cb_number, 
      date, 
      bookmaker, 
      event: event || '-', 
      mise: miseNum, 
      cote: coteNum, 
      statut 
    });
    
    const { rows } = await sql`
      UPDATE pronos 
      SET cb_number = ${cb_number}, 
          date = ${date}, 
          bookmaker = ${bookmaker}, 
          event = ${event || '-'}, 
          mise = ${miseNum}, 
          cote = ${coteNum}, 
          statut = ${statut}
      WHERE id = ${id}
      RETURNING *
    `;
    
    console.log('Prono modifie:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Erreur updateProno:', error.message, error.stack);
    throw new Error(`Erreur lors de la modification du prono: ${error.message}`);
  }
}

export async function deleteProno(id) {
  try {
    console.log('Suppression prono id:', id);
    await sql`DELETE FROM pronos WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Erreur deleteProno:', error.message, error.stack);
    throw new Error(`Erreur lors de la suppression du prono: ${error.message}`);
  }
}

export async function cbNumberExists(cb_number, excludeId = null) {
  try {
    let query;
    if (excludeId) {
      query = await sql`SELECT id FROM pronos WHERE cb_number = ${cb_number} AND id != ${excludeId}`;
    } else {
      query = await sql`SELECT id FROM pronos WHERE cb_number = ${cb_number}`;
    }
    return query.rows.length > 0;
  } catch (error) {
    console.error('Erreur cbNumberExists:', error.message, error.stack);
    throw new Error(`Erreur lors de la verification du numero CB: ${error.message}`);
  }
}