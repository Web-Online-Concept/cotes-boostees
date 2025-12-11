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

    // Email à l'équipe
    const mailToTeam = {
      from: process.env.EMAIL_USER,
      to: 'cotes.boostees@gmail.com',
      subject: `[Contact Site] ${objet}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Nouveau message de contact</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Objet :</strong> ${objet}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151;">Message :</h3>
            <p style="white-space: pre-wrap; color: #6b7280;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #EEF2FF; border-left: 4px solid #4F46E5; border-radius: 4px;">
            <p style="margin: 0; color: #4F46E5; font-size: 14px;">
              📧 Répondre directement à : <a href="mailto:${email}" style="color: #4F46E5;">${email}</a>
            </p>
          </div>
        </div>
      `,
    };

    // Email de confirmation au client
    const mailToClient = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmation de réception - ${objet}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Message bien reçu ✅</h2>
          
          <p>Bonjour ${nom},</p>
          
          <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
          
          <p>Nous nous engageons à vous répondre dans les <strong>24 heures ouvrées</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Récapitulatif de votre message :</h3>
            <p><strong>Objet :</strong> ${objet}</p>
            <p><strong>Message :</strong></p>
            <p style="white-space: pre-wrap; color: #6b7280;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #EEF2FF; border-radius: 8px;">
            <p style="margin: 0; color: #4F46E5;">
              <strong>Cotes-Boostées.com</strong><br>
              📧 cotes.boostees@gmail.com<br>
              🌐 <a href="https://www.cotes-boostees.com" style="color: #4F46E5;">www.cotes-boostees.com</a>
            </p>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">
            Cet email est un accusé de réception automatique. Merci de ne pas y répondre directement.
          </p>
        </div>
      `,
    };

    // Envoyer les deux emails
    await transporter.sendMail(mailToTeam);
    await transporter.sendMail(mailToClient);

    return res.status(200).json({ message: 'Message envoyé avec succès' });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
}