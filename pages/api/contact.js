export default async function handler(req, res) {
  // Import dynamique pour éviter les problèmes de build
  const nodemailer = await import('nodemailer');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { nom, email, objet, message } = req.body;

  // Validation
  if (!nom || !email || !objet || !message) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  if (message.length < 10) {
    return res.status(400).json({ message: 'Le message doit contenir au moins 10 caractères' });
  }

  try {
    // Configuration du transporteur email
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // ... (le reste du code reste identique)
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
}