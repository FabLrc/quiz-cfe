import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { QUESTIONS } from "@/config/questions";
import type { ContactFormData } from "@/types/quiz";

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true pour port 465, false pour autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const AGENCY_EMAIL = process.env.AGENCY_EMAIL || "contact@cf-evolution.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@cf-evolution.com";
const FROM_NAME = process.env.FROM_NAME || "CF Evolution";

interface QuizAnswers {
  [key: string]: string | string[] | ContactFormData;
}

// Rate limiting simple en mémoire (pour production, utiliser Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

function getOptionLabel(questionId: string, value: string): string {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question?.options) return value;

  const option = question.options.find((o) => o.value === value);
  return option?.label || value;
}

function formatAnswersForEmail(answers: QuizAnswers): string {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FFB3B8, #DC66DB, #5B4FFC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle demande de devis</h1>
      </div>
      <div style="padding: 30px; background: #f9fafb;">
  `;

  for (const question of QUESTIONS) {
    const answer = answers[question.id];
    if (!answer) continue;

    html += `
      <div style="margin-bottom: 20px; background: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb;">
        <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          ${question.title}
        </h3>
    `;

    if (question.type === "contact") {
      const contact = answer as ContactFormData;
      html += `
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 5px 0; color: #6b7280;">Prénom:</td><td style="color: #111827; font-weight: 500;">${contact.firstName || "-"}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;">Nom:</td><td style="color: #111827; font-weight: 500;">${contact.lastName || "-"}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;">Email:</td><td style="color: #111827; font-weight: 500;"><a href="mailto:${contact.email}" style="color: #5B4FFC;">${contact.email || "-"}</a></td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;">Téléphone:</td><td style="color: #111827; font-weight: 500;">${contact.phone || "-"}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;">Entreprise:</td><td style="color: #111827; font-weight: 500;">${contact.company || "-"}</td></tr>
          ${contact.message ? `<tr><td style="padding: 5px 0; color: #6b7280; vertical-align: top;">Message:</td><td style="color: #111827;">${contact.message}</td></tr>` : ""}
        </table>
      `;
    } else if (Array.isArray(answer)) {
      html += `<p style="color: #111827; margin: 0; font-weight: 500;">${answer.map((v) => getOptionLabel(question.id, v)).join(", ")}</p>`;
    } else if (typeof answer === "string") {
      html += `<p style="color: #111827; margin: 0; font-weight: 500;">${getOptionLabel(question.id, answer)}</p>`;
    }

    html += `</div>`;
  }

  html += `
      </div>
      <div style="background: #1f2937; padding: 20px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          Email envoyé automatiquement depuis le formulaire de qualification CF Evolution
        </p>
      </div>
    </div>
  `;

  return html;
}

function generateClientConfirmationEmail(contact: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FFB3B8, #DC66DB, #5B4FFC); padding: 40px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Merci ${contact.firstName} !</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 16px;">
          Votre demande a bien été reçue
        </p>
      </div>
      
      <div style="padding: 40px; background: white;">
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          Bonjour ${contact.firstName},
        </p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          Nous avons bien reçu votre demande de devis et nous vous en remercions !
        </p>
        
        <div style="background: #f3f4f6; border-radius: 10px; padding: 25px; margin: 25px 0;">
          <h3 style="color: #5B4FFC; margin: 0 0 15px 0; font-size: 16px;">🚀 Et maintenant ?</h3>
          <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Notre équipe analyse votre projet</li>
            <li>Nous vous recontactons sous <strong>24 heures</strong></li>
            <li>Un expert vous proposera une solution sur mesure</li>
          </ul>
        </div>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0;">
          En attendant, n'hésitez pas à explorer nos réalisations sur notre site !
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://cf-evolution.com" 
             style="display: inline-block; background: linear-gradient(135deg, #FFB3B8, #DC66DB, #5B4FFC); color: white; text-decoration: none; padding: 15px 30px; border-radius: 10px; font-weight: 600; font-size: 16px;">
            Découvrir CF Evolution
          </a>
        </div>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
          À très bientôt,<br>
          <strong style="color: #5B4FFC;">L'équipe CF Evolution</strong>
        </p>
      </div>
      
      <div style="background: #1f2937; padding: 25px; text-align: center;">
        <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">
          CF Evolution - Votre partenaire numérique
        </p>
        <p style="color: #6b7280; margin: 0; font-size: 12px;">
          © ${new Date().getFullYear()} CF Evolution - Tous droits réservés
        </p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans une minute." },
        { status: 429 }
      );
    }

    const answers: QuizAnswers = await request.json();

    // Validation basique
    const contactData = answers.contact as ContactFormData | undefined;
    if (!contactData?.email || !contactData?.firstName || !contactData?.lastName) {
      return NextResponse.json(
        { error: "Les informations de contact sont incomplètes." },
        { status: 400 }
      );
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return NextResponse.json(
        { error: "L'adresse email est invalide." },
        { status: 400 }
      );
    }

    // Envoi email à l'agence
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: AGENCY_EMAIL,
      subject: `🚀 Nouvelle demande de ${contactData.firstName} ${contactData.lastName}`,
      html: formatAnswersForEmail(answers),
    });

    // Envoi email de confirmation au client
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: contactData.email,
      subject: "Votre demande a bien été reçue - CF Evolution",
      html: generateClientConfirmationEmail(contactData),
    });

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès !",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre demande." },
      { status: 500 }
    );
  }
}
