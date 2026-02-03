import {
  Globe,
  ShoppingCart,
  Smartphone,
  Palette,
  Megaphone,
  Printer,
  Cog,
  Server,
  Building2,
  User,
  Briefcase,
  Rocket,
  PiggyBank,
  Clock,
  Calendar,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "text"
  | "contact";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  fields?: ContactField[];
  required: boolean;
}

export interface ContactField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: "service",
    title: "Quel type de projet avez-vous en tête ?",
    subtitle: "Sélectionnez le service qui correspond le mieux à votre besoin",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "website",
        label: "Site Web",
        description: "Vitrine, e-commerce, blog...",
        icon: Globe,
        value: "website",
      },
      {
        id: "ecommerce",
        label: "E-Commerce",
        description: "Boutique en ligne complète",
        icon: ShoppingCart,
        value: "ecommerce",
      },
      {
        id: "mobile-app",
        label: "Application Mobile",
        description: "iOS, Android ou les deux",
        icon: Smartphone,
        value: "mobile-app",
      },
      {
        id: "design",
        label: "Design & Identité",
        description: "Logo, charte graphique, UI/UX",
        icon: Palette,
        value: "design",
      },
      {
        id: "marketing",
        label: "Marketing Digital",
        description: "SEO, publicité, réseaux sociaux",
        icon: Megaphone,
        value: "marketing",
      },
      {
        id: "print",
        label: "Impressions",
        description: "Cartes, flyers, affiches...",
        icon: Printer,
        value: "print",
      },
      {
        id: "automation",
        label: "Automatisation",
        description: "Workflows, intégrations, bots",
        icon: Cog,
        value: "automation",
      },
      {
        id: "hosting",
        label: "Hébergement",
        description: "Serveurs, maintenance, sécurité",
        icon: Server,
        value: "hosting",
      },
    ],
  },
  {
    id: "business-type",
    title: "Quelle est la nature de votre activité ?",
    subtitle: "Cela nous aide à mieux comprendre votre contexte",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "individual",
        label: "Auto-entrepreneur",
        description: "Je travaille seul",
        icon: User,
        value: "individual",
      },
      {
        id: "tpe",
        label: "TPE / Startup",
        description: "Moins de 10 salariés",
        icon: Rocket,
        value: "tpe",
      },
      {
        id: "pme",
        label: "PME",
        description: "10 à 250 salariés",
        icon: Briefcase,
        value: "pme",
      },
      {
        id: "large",
        label: "Grande entreprise",
        description: "Plus de 250 salariés",
        icon: Building2,
        value: "large",
      },
    ],
  },
  {
    id: "budget",
    title: "Quel est votre budget approximatif ?",
    subtitle: "Donnez-nous une idée de votre enveloppe budgétaire",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "budget-small",
        label: "Moins de 1 500€",
        description: "Projet simple et rapide",
        icon: PiggyBank,
        value: "small",
      },
      {
        id: "budget-medium",
        label: "1 500€ - 3 000€",
        description: "Projet standard",
        icon: PiggyBank,
        value: "medium",
      },
      {
        id: "budget-large",
        label: "3 000€ - 10 000€",
        description: "Projet complexe",
        icon: PiggyBank,
        value: "large",
      },
      {
        id: "budget-enterprise",
        label: "Plus de 10 000€",
        description: "Projet d'envergure",
        icon: PiggyBank,
        value: "enterprise",
      },
    ],
  },
  {
    id: "timeline",
    title: "Quel est votre délai idéal ?",
    subtitle: "Quand souhaitez-vous lancer votre projet ?",
    type: "single-choice",
    required: true,
    options: [
      {
        id: "urgent",
        label: "Urgent",
        description: "Dans les 2 semaines",
        icon: Zap,
        value: "urgent",
      },
      {
        id: "short",
        label: "Court terme",
        description: "1 à 2 mois",
        icon: Clock,
        value: "short",
      },
      {
        id: "medium-term",
        label: "Moyen terme",
        description: "2 à 4 mois",
        icon: Calendar,
        value: "medium",
      },
      {
        id: "flexible",
        label: "Flexible",
        description: "Pas de contrainte",
        icon: Calendar,
        value: "flexible",
      },
    ],
  },
  {
    id: "contact",
    title: "Parfait ! Comment pouvons-nous vous contacter ?",
    subtitle: "Nous reviendrons vers vous sous 24h",
    type: "contact",
    required: true,
    fields: [
      {
        id: "firstName",
        label: "Prénom",
        type: "text",
        placeholder: "Votre prénom",
        required: true,
      },
      {
        id: "lastName",
        label: "Nom",
        type: "text",
        placeholder: "Votre nom",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "votre@email.com",
        required: true,
      },
      {
        id: "phone",
        label: "Téléphone",
        type: "tel",
        placeholder: "06 12 34 56 78",
        required: false,
      },
      {
        id: "company",
        label: "Entreprise",
        type: "text",
        placeholder: "Nom de votre entreprise",
        required: false,
      },
      {
        id: "message",
        label: "Message (optionnel)",
        type: "textarea",
        placeholder: "Décrivez brièvement votre projet...",
        required: false,
      },
    ],
  },
];

export const TOTAL_STEPS = QUESTIONS.length;
