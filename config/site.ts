export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  details: string[];
  metaTitle?: string;
  metaDescription?: string;
};

export type TeamMember = { name: string; role: string; bio: string; image?: string };
export type Metric = { value: string; label: string };
export type FaqItem = { question: string; answer: string };

type SiteConfig = {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroIntro: string;
  serviceIntro: string;
  teamIntro: string;
  contactIntro: string;
  services: Service[];
  team: TeamMember[];
  metrics: Metric[];
  faq: FaqItem[];
  serviceAreas: string[];
  seo: { title: string; description: string; targetPhrase: string };
};

/** Unique client file: update this configuration to clone the corporate site. */
const site: SiteConfig = {
  businessName: "Votre société",
  phone: "",
  email: "",
  address: "",
  city: "Montpellier",
  primaryColor: "#123B6D",
  accentColor: "#2F80ED",
  backgroundColor: "#F5F8FC",
  tagline: "Nettoyage & gardiennage",
  description: "Des services de propreté et de présence adaptés aux entreprises et aux sites professionnels.",
  heroTitle: "Société de nettoyage à Montpellier",
  heroIntro: "Un partenaire de proximité pour l’entretien, l’accueil et la surveillance de vos espaces professionnels à Montpellier.",
  serviceIntro: "Des interventions organisées selon la nature de vos locaux, vos horaires et vos exigences opérationnelles.",
  teamIntro: "Des interlocuteurs identifiés et des équipes organisées pour assurer le suivi de vos prestations.",
  contactIntro: "Présentez-nous votre site et vos besoins. Notre équipe vous recontactera pour étudier votre demande.",
  services: [
    { slug: "nettoyage-bureaux", title: "Nettoyage de bureaux", summary: "Entretien régulier de vos espaces de travail.", description: "Des prestations d’entretien pensées pour les bureaux, salles de réunion et espaces partagés. Le périmètre et la fréquence sont définis selon votre organisation.", details: ["Entretien des espaces de travail et salles communes", "Nettoyage des sols et surfaces accessibles", "Organisation des passages selon les horaires convenus"] },
    { slug: "entretien-coproprietes", title: "Entretien de copropriétés", summary: "Des parties communes propres et accueillantes.", description: "L’entretien des espaces communs contribue au confort quotidien des occupants. Les zones, fréquences et consignes sont établies avec le gestionnaire de l’immeuble.", details: ["Entretien des halls, escaliers et circulations", "Nettoyage des surfaces vitrées accessibles", "Suivi des interventions selon le cahier des charges"] },
    { slug: "nettoyage-apres-travaux", title: "Nettoyage après travaux", summary: "Préparation de vos espaces après chantier.", description: "Une intervention de remise en état après des travaux ou un déménagement, adaptée aux surfaces et aux contraintes du site.", details: ["Dépoussiérage et nettoyage des surfaces", "Remise en état des sols selon leur nature", "Préparation des locaux avant leur réouverture"] },
    { slug: "gardiennage-sites", title: "Gardiennage de sites", summary: "Présence et vigilance sur vos sites professionnels.", description: "Des prestations de présence, d’accueil et de contrôle définies selon les accès, les horaires et les consignes du site.", details: ["Accueil et orientation des visiteurs", "Contrôle des accès selon les consignes établies", "Rondes et remontée des informations au responsable du site"] }
  ],
  team: [],
  metrics: [],
  faq: [
    { question: "Quels types de sites pouvez-vous accompagner ?", answer: "Nous étudions les demandes des entreprises, des gestionnaires immobiliers et des responsables de sites professionnels. Décrivez vos locaux et vos contraintes dans le formulaire de contact." },
    { question: "Comment obtenir une proposition adaptée à notre site ?", answer: "Transmettez-nous les informations sur vos espaces, vos horaires et la fréquence souhaitée. Nous pourrons ensuite échanger sur le périmètre de votre demande." },
    { question: "Intervenez-vous à Montpellier ?", answer: "Cette page présente une société de nettoyage à Montpellier. Indiquez l’adresse du site concerné dans votre demande afin de confirmer le secteur d’intervention." },
    { question: "Comment planifier un échange téléphonique ?", answer: "Appelez-nous au numéro indiqué sur le site pour convenir directement d’un échange. Vous pouvez aussi laisser vos coordonnées dans le formulaire de contact." }
  ],
  serviceAreas: ["Montpellier"],
  seo: {
    title: "Société de nettoyage à Montpellier | Entretien & gardiennage",
    description: "Société de nettoyage à Montpellier pour l’entretien des bureaux, copropriétés, remises en état et prestations de gardiennage. Contact professionnel.",
    targetPhrase: "société nettoyage Montpellier"
  }
};

export default site;
