import { Code, Server, Smartphone, Megaphone, Palette, Printer, Zap, type LucideIcon } from "lucide-react";

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "text"
  | "contact"
  | "range";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  value: string;
}

export interface RangeConfig {
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  fields?: ContactField[];
  rangeConfig?: RangeConfig;
  /**
   * Optionally show this question only when one of the specified values
   * is present for the referenced questionId. Useful to express branching.
   */
  dependsOn?: { questionId: string; values: string[] }[];
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
    id: "needs",
    title: "Quels sont vos besoins ?",
    subtitle: "Sélectionnez toutes les options qui correspondent",
    type: "multiple-choice",
    required: true,
    options: [
      {
        id: "development",
        label: "Développement (web, mobile, métier, ...)",
        icon: Code,
        value: "development",
      },
      {
        id: "hosting",
        label: "Hébergement (web, fichier, mails, ...)",
        icon: Server,
        value: "hosting",
      },
      {
        id: "marketing",
        label: "Marketing (Google, Meta, Tiktok, influenceurs, ...)",
        icon: Megaphone,
        value: "marketing",
      },
      {
        id: "design",
        label: "Design (Logo, charte graphique, créations, ...)",
        icon: Palette,
        value: "design",
      },
      {
        id: "print",
        label: "Impression (Flyers, Catalogue, affiche publicitaire, ...)",
        icon: Printer,
        value: "print",
      },
      {
        id: "automation",
        label: "Automatisations (Scripts, IA, ...)",
        icon: Zap,
        value: "automation",
      },
    ],
  },
  {
    id: "storage-size",
    title: "À combien estimez-vous la taille du stockage dont vous avez besoin ?",
    subtitle: "(si vous avez choisi 'Stockage de fichiers')",
    type: "single-choice",
    required: false,
    dependsOn: [
      {
        questionId: "hosting-type",
        values: ["hosting-storage"],
      },
    ],
    options: [
      {
        id: "lt-500",
        label: "<500Go",
        icon: Server,
        value: "lt-500",
      },
      {
        id: "500-2tb",
        label: "500Go à 2To",
        icon: Server,
        value: "500-2tb",
      },
      {
        id: "2-10tb",
        label: "2To à 10To",
        icon: Server,
        value: "2-10tb",
      },
      {
        id: "gt-10tb",
        label: ">10To",
        icon: Server,
        value: "gt-10tb",
      },
    ],
  },
  {
    id: "development-type",
    title: "Que voulez-vous développer ?",
    subtitle: "(si vous avez choisi 'Développement')",
    type: "multiple-choice",
    required: true,
    dependsOn: [
      {
        questionId: "needs",
        values: ["development"],
      },
    ],
    options: [
      {
        id: "site-vitrine",
        label: "Un site web vitrine",
        icon: Code,
        value: "site-vitrine",
      },
      {
        id: "site-ecommerce",
        label: "Un site web e-commerce",
        icon: Code,
        value: "site-ecommerce",
      },
      {
        id: "mobile-app",
        label: "Une application mobile",
        icon: Code,
        value: "mobile-app",
      },
      {
        id: "application-metier",
        label: "Une application métier",
        icon: Code,
        value: "application-metier",
      },
    ],
  },
  {
    id: "mobile-platforms",
    title: "Pour quelle(s) plateforme(s) ?",
    subtitle: "(si vous avez choisi 'Application mobile')",
    type: "multiple-choice",
    required: true,
    dependsOn: [
      {
        questionId: "development-type",
        values: ["mobile-app"],
      },
    ],
    options: [
      {
        id: "android",
        label: "Android",
        icon: Smartphone,
        value: "android",
      },
      {
        id: "ios",
        label: "iOS",
        icon: Smartphone,
        value: "ios",
      },
      {
        id: "other-platform",
        label: "Autre",
        icon: Smartphone,
        value: "other",
      },
    ],
  },
  {
    id: "mobile-backend",
    title: "Votre application aura-t-elle un backend ?",
    subtitle: "(si vous avez choisi 'Application mobile')",
    type: "single-choice",
    required: true,
    dependsOn: [
      {
        questionId: "development-type",
        values: ["mobile-app"],
      },
    ],
    options: [
      {
        id: "backend-yes",
        label: "Oui",
        icon: Server,
        value: "yes",
      },
      {
        id: "backend-no",
        label: "Non",
        icon: Server,
        value: "no",
      },
      {
        id: "backend-unknown",
        label: "Je ne sais pas",
        icon: Server,
        value: "unknown",
      },
    ],
  },
  {
    id: "hosting-type",
    title: "Quel type d’hébergement ?",
    subtitle: "Sélectionnez toutes les options qui correspondent",
    type: "multiple-choice",
    required: true,
    dependsOn: [
      {
        questionId: "needs",
        values: ["hosting"],
      },
    ],
    options: [
      {
        id: "hosting-web",
        label: "Hébergement web classique",
        icon: Server,
        value: "hosting-web",
      },
      {
        id: "hosting-app",
        label: "Hébergement d’application (web lourd, mobile, api, scripts, ...)",
        icon: Server,
        value: "hosting-app",
      },
      {
        id: "hosting-storage",
        label: "Stockage de fichiers",
        icon: Server,
        value: "hosting-storage",
      },
    ],
  },
  {
    id: "hosting-site-type",
    title: "Quel type de site web ?",
    subtitle: "(si vous avez choisi 'Hébergement web classique')",
    type: "multiple-choice",
    required: false,
    dependsOn: [
      {
        questionId: "hosting-type",
        values: ["hosting-web"],
      },
    ],
    options: [
      {
        id: "site-vitrine",
        label: "Un site web vitrine",
        icon: Code,
        value: "site-vitrine",
      },
      {
        id: "site-ecommerce",
        label: "Un site web e-commerce",
        icon: Code,
        value: "site-ecommerce",
      },
    ],
  },
  {
    id: "hosting-app-containerized",
    title: "Votre application est-elle conteneurisée ?",
    subtitle: "(si vous avez choisi 'Hébergement d’application')",
    type: "single-choice",
    required: true,
    dependsOn: [
      {
        questionId: "hosting-type",
        values: ["hosting-app"],
      },
    ],
    options: [
      {
        id: "container-yes",
        label: "Oui",
        icon: Server,
        value: "yes",
      },
      {
        id: "container-no",
        label: "Non",
        icon: Server,
        value: "no",
      },
      {
        id: "container-unknown",
        label: "Je ne sais pas",
        icon: Server,
        value: "unknown",
      },
    ],
  },
  {
    id: "hosting-app-deploy-git",
    title: "Voulez-vous déployer votre application via un gestionnaire de version ?",
    subtitle: "(Git, GitHub, GitLab...)",
    type: "single-choice",
    required: true,
    dependsOn: [
      {
        questionId: "hosting-app-containerized",
        values: ["yes", "no", "unknown"],
      },
    ],
    options: [
      {
        id: "deploy-git-yes",
        label: "Oui",
        icon: Server,
        value: "yes",
      },
      {
        id: "deploy-git-no",
        label: "Non",
        icon: Server,
        value: "no",
      },
      {
        id: "deploy-git-unknown",
        label: "Je ne sais pas",
        icon: Server,
        value: "unknown",
      },
    ],
  },
  {
    id: "features",
    title: "Quelles fonctionnalités vous intéressent ?",
    subtitle: "(pour site vitrine ou e-commerce)",
    type: "multiple-choice",
    required: false,
    dependsOn: [
      {
        questionId: "development-type",
        values: ["site-vitrine", "site-ecommerce"],
      },
    ],
    options: [
      {
        id: "blog",
        label: "Un blog d’actualité",
        icon: Megaphone,
        value: "blog",
      },
      {
        id: "chatbot",
        label: "Chatbot IA",
        icon: Zap,
        value: "chatbot",
      },
      {
        id: "seo",
        label: "Optimisation SEO",
        icon: Megaphone,
        value: "seo",
      },
      {
        id: "questionnaire",
        label: "Questionnaire de qualification",
        icon: Megaphone,
        value: "questionnaire",
      },
      {
        id: "other-features",
        label: "Autre(s)",
        icon: Megaphone,
        value: "other",
      },
    ],
  },
  {
    id: "marketing-services",
    title: "Quels sont les services qui vous intéressent ?",
    subtitle: "Sélectionnez toutes les options qui correspondent",
    type: "multiple-choice",
    required: true,
    dependsOn: [
      {
        questionId: "needs",
        values: ["marketing"],
      },
    ],
    options: [
      {
        id: "seo",
        label: "SEO (Référencement naturel)",
        icon: Megaphone,
        value: "seo",
      },
      {
        id: "sea",
        label: "Publicité en ligne (SEA, Réseaux sociaux)",
        icon: Megaphone,
        value: "sea",
      },
      {
        id: "email-marketing",
        label: "E-Mail marketing",
        icon: Megaphone,
        value: "email-marketing",
      },
      {
        id: "influencers",
        label: "Influenceurs",
        icon: Megaphone,
        value: "influencers",
      },
      {
        id: "strategy",
        label: "Conseils & Stratégies",
        icon: Megaphone,
        value: "strategy",
      },
    ],
  },
  {
    id: "marketing-budget",
    title: "Quel est votre budget mensuel ?",
    subtitle: "(estimation en euros)",
    type: "range",
    required: true,
    dependsOn: [
      {
        questionId: "needs",
        values: ["marketing"],
      },
    ],
    rangeConfig: {
      min: 500,
      max: 50000,
      step: 500,
      minLabel: "< 500€",
      maxLabel: "> 50 000€",
    },
  },
  {
    id: "design-services",
    title: "De quel service avez-vous besoin en design ?",
    subtitle: "(si vous avez choisi 'Design')",
    type: "multiple-choice",
    required: true,
    dependsOn: [
      {
        questionId: "needs",
        values: ["design"],
      },
    ],
    options: [
      {
        id: "charte",
        label: "Charte graphique",
        icon: Palette,
        value: "charte",
      },
      {
        id: "logo",
        label: "Logo",
        icon: Palette,
        value: "logo",
      },
      {
        id: "business-card",
        label: "Carte de visite",
        icon: Palette,
        value: "business-card",
      },
      {
        id: "catalogue",
        label: "Catalogue",
        icon: Palette,
        value: "catalogue",
      },
      {
        id: "other-design",
        label: "Autre",
        icon: Palette,
        value: "other",
      },
    ],
  },
  {
    id: "automation-tech",
    title: "Voulez-vous utiliser l'une de ces technologies d'automatisation en particulier ?",
    subtitle: "(si vous avez choisi 'Automatisations')",
    type: "multiple-choice",
    required: false,
    dependsOn: [
      {
        questionId: "needs",
        values: ["automation"],
      },
    ],
    options: [
      {
        id: "python-scripts",
        label: "Scripts Python",
        icon: Code,
        value: "python",
      },
      {
        id: "n8n",
        label: "n8n",
        icon: Code,
        value: "n8n",
      },
      {
        id: "make",
        label: "Make",
        icon: Code,
        value: "make",
      },
      {
        id: "automation-other",
        label: "Non / Autre",
        icon: Code,
        value: "other",
      },
    ],
  },
  {
    id: "monthly-traffic",
    title: "À combien estimez-vous le trafic mensuel ?",
    subtitle: "Estimation du nombre de visites par mois",
    type: "single-choice",
    required: false,
    dependsOn: [
      {
        questionId: "needs",
        values: ["development", "hosting"],
      },
    ],
    options: [
      {
        id: "launch",
        label: "Phase de lancement (<1000)",
        icon: Megaphone,
        value: "launch",
      },
      {
        id: "growth",
        label: "Croissance (1000 - 10 000)",
        icon: Megaphone,
        value: "growth",
      },
      {
        id: "established",
        label: "Établi (10 000 - 100 000)",
        icon: Megaphone,
        value: "established",
      },
      {
        id: "critical",
        label: "Critique (+ 100 000)",
        icon: Megaphone,
        value: "critical",
      },
    ],
  },
  {
    id: "contact",
    title: "Vos coordonnées",
    subtitle: "Nous vous recontacterons concernant votre projet",
    type: "contact",
    required: true,
    fields: [
      {
        id: "lastName",
        label: "Nom",
        type: "text",
        placeholder: "Votre nom",
        required: true,
      },
      {
        id: "firstName",
        label: "Prénom",
        type: "text",
        placeholder: "Votre prénom",
        required: true,
      },
      {
        id: "email",
        label: "Mail",
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
        id: "message",
        label: "Message (précisions du projet)",
        type: "textarea",
        placeholder: "Précisez votre projet...",
        required: false,
      },
    ],
  },
];

export const TOTAL_STEPS = QUESTIONS.length;
