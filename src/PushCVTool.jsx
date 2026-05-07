import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, Sparkles, Copy, Check, Mail, FileText, Building2, User, Briefcase, Globe, MessageSquare, AlertCircle, Loader2, X, Link2, Edit3, Save, Repeat2, ChevronDown, ChevronUp } from 'lucide-react';
import { callClaude } from './api.js';

// 18 consultants UX-Republic préchargés
const INITIAL_CONSULTANTS = [
  {
    id: 'franck',
    name: 'Franck Kamionka',
    role: 'Lead UX Designer',
    available: true,
    status: 'vivier',
    experience: '15 ans',
    sectors: ['Banque', 'Fintech', 'E-commerce', 'Edtech', 'Industrie', 'Assurance'],
    sectorsStrong: ['Banque', 'Fintech', 'Recouvrement'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (pro)', 'Suédois (pro)'],
    expertises: ['Design Thinking', 'Workshops co-conception', 'Prototypage Figma', 'Design System', 'UX Research', 'Vision UX', 'Wireframing', 'Tests utilisateurs', 'Architecture information', 'Accessibilité WCAG'],
    keyClients: ['Svea Bank', 'Inkassokollen', 'Choose', 'Ornikar', 'Techlove'],
    highlights: [
      '7 ans dans le secteur bancaire (Stockholm, Svea Bank)',
      'Expertise pointue sur les parcours réglementés (recouvrement de créances, conformité UE/nordique)',
      'Refonte complète de portails fintech B2B',
      'Capacité à transformer des processus juridiques complexes en expériences claires',
      'Animation de workshops, vision UX, évangélisation auprès des équipes produit/tech'
    ],
    methodology: 'Discovery > Recherche > User journeys > Workshops > Wireframes > Prototypes > Tests > Itérations',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'verena',
    name: 'Verena',
    role: 'Senior Product Designer',
    available: true,
    status: 'vivier',
    experience: '15+ ans',
    sectors: ['Aéronautique', 'Santé', 'Finance', 'Luxe', 'Transport', 'Secteur public', 'Parfumerie', 'Horlogerie'],
    sectorsStrong: ['Aéronautique', 'Luxe', 'Finance', 'Santé'],
    domains: ['B2B', 'B2C', 'B2B2C'],
    languages: ['Allemand (natif)', 'Français (bilingue)', 'Anglais (C1)'],
    expertises: ['Design System', 'UI/UX Design', 'Direction Artistique', 'Prototypage', 'Design Ops', 'Atomic Design', 'Tokens Figma', 'Double Diamond'],
    keyClients: ['Safran', 'BNP Paribas Leasing', 'Equasens', 'OCDE', 'Van Cleef & Arpels', 'Yves Rocher', 'Ouigo', 'Groupe Colisée'],
    highlights: [
      'Experte Design Systems : unification de 11 portails Safran, refonte BNP Paribas Leasing multi-pays',
      'Trilingue allemand/français/anglais — atout pour clients internationaux et déploiements européens',
      'Forte expertise luxe et premium (Van Cleef, Yves Rocher, Cacharel, Ruinart)',
      'Profil hybride agence (8 ans) + freelance (8 ans) : adaptable, autonome',
      'Direction artistique stratégique + rigueur méthodologique'
    ],
    methodology: 'Double Diamond, Design Thinking, Agile/Scrum, Atomic Design',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'maxence',
    name: 'Maxence',
    role: 'Senior Product Designer',
    available: true,
    status: 'vivier',
    experience: '10+ ans',
    sectors: ['SaaS B2B', 'FinTech', 'InsurTech', 'OTT/Streaming', 'Médias', 'Télécoms', 'Sport'],
    sectorsStrong: ['SaaS B2B', 'InsurTech', 'OTT', 'FinTech'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (C2 - bilingue)'],
    expertises: ['Vision UX', 'Cadrage produit', 'Design System (gouvernance)', 'Wireframing', 'Prototypage', 'Design Tokens', 'UX Research', 'Vibe-coding', 'IA générative'],
    keyClients: ['Coherent.global', 'Channel 4', 'Telstra', 'Les Mills', 'Tata Play', 'Telkomsel', 'YouTrip', 'Astro Go', 'AIA'],
    highlights: [
      'Expérience internationale unique (Hong Kong, Shanghai, Paris) — parfait pour clients globaux',
      'Lead Designer + Lead Design System sur SaaS InsurTech complexe (Coherent.global, marché US)',
      'Expert multi-device et multi-plateforme : TV, consoles, desktop, mobile',
      'Anglais C2 bilingue — interventions internationales sans friction',
      'Certifications récentes Generative AI Leader (Google), PMI, Adobe — profil tech-forward'
    ],
    methodology: 'Agile/Scrum, Design tokens, gouvernance Design System, vibe-coding',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'louisa',
    name: 'Louisa Lemarchand',
    role: 'Senior Product Designer',
    available: true,
    status: 'vivier',
    experience: '10 ans',
    sectors: ['Santé', 'Mobilité électrique', 'Luxe', 'Industrie', 'Banque', 'Secteur public', 'Start-ups'],
    sectorsStrong: ['Santé', 'Luxe', 'Mobilité', 'Start-ups'],
    domains: ['B2B', 'B2C', 'B2B2C'],
    languages: ['Français (bilingue)', 'Anglais (pro)', 'Espagnol (intermédiaire)', 'Japonais (débutant)'],
    expertises: ['Design UX/UI', 'UX Research', 'Design System', 'Prototypage', 'Design Strategy', 'Animation ateliers co-conception', 'UX writing', 'Atomic Design'],
    keyClients: ['Mauboussin', 'Chargeprice', 'Medicamentum', 'Romy Paris', 'RATP', 'Bluenove', 'France Galop', 'Fafiec'],
    highlights: [
      'Full cycle produit : de la stratégie design au pixel, du from-scratch au scale',
      'Mix unique start-ups (Chargeprice 80k téléchargements, Medicamentum) ET grands groupes (Mauboussin, RATP)',
      'Expertise santé reconnue (Medicamentum, le "Yuka du médicament")',
      'Connaissances en développement : collaboration fluide avec les équipes tech',
      'Plateforme de concertation nationale (Bluenove / Grand Débat) — projet d\'envergure secteur public'
    ],
    methodology: 'Design strategy, roadmaps, KPI-driven, Agile/Scrum, ateliers co-conception',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'reinaldo',
    name: 'Reinaldo',
    role: 'Senior Product & UX/UI Designer',
    available: true,
    status: 'vivier',
    experience: '8+ ans',
    sectors: ['Real Estate', 'Banque', 'Médias', 'Industrie', 'Luxe', 'Transport'],
    sectorsStrong: ['Real Estate', 'Banque', 'Luxe', 'Industrie'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Espagnol (natif)', 'Français (bilingue)', 'Anglais (très bon niveau)'],
    expertises: ['UX Research (Atomic Research)', 'Design System', 'DesignOps', 'Accessibilité RGAA', 'Branding', 'Product Strategy', 'Illustration 3D (Blender, Unreal)', 'Motion design', 'Tokens Figma'],
    keyClients: ['BNP Paribas (Echonet)', 'FARECO-FAYAT (LYNX)', 'Cristal & Bronze (MRF)', 'D. Porthault', 'Hermès', 'Toyota', 'Veolia', 'Solyfonte'],
    highlights: [
      'Amélioration RGAA mesurée 35% → 63% sur intranet BNP Paribas (-28% de non-conformités)',
      'Trilingue FR/EN/ES (langue maternelle espagnol) - profil rare pour clients hispanophones',
      'Profil 360° : UX Research + Design System + DesignOps + Direction Artistique + 3D',
      'Master Prospectives Design (ESAD Saint-Étienne) + Master Marketing/Communication',
      'Pilotage d\'écosystèmes complexes (Atomic Research, gouvernance Design System)'
    ],
    methodology: 'Atomic Research, Atomic Design, DesignOps, Agile/Scrum',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'julie',
    name: 'Julie',
    role: 'Product Designer',
    available: true,
    status: 'vivier',
    experience: '5 ans',
    sectors: ['Emploi/Jobboard', 'Assurance', 'Finance', 'Média', 'SaaS RH'],
    sectorsStrong: ['Emploi/Jobboard', 'Assurance', 'SaaS'],
    domains: ['B2B', 'B2C', 'B2E'],
    languages: ['Français (natif)', 'Anglais (bilingue)', 'Espagnol (pro)'],
    expertises: ['UX Design', 'UI Design', 'UX Research', 'Design System (Atomic + ZeroHeight)', 'HTML/CSS', 'Roadmap produit', 'Tests utilisateurs (Maze, Clarity)'],
    keyClients: ['MeilleurTaux', 'LittleBig Connection', 'Flatchr', 'Figaro Classified', 'Groupama'],
    highlights: [
      'Background développeur fullstack (Le Wagon) - collaboration tech extrêmement fluide',
      'Trilingue FR/EN/ES, à l\'aise dans les squads internationales',
      'Expertise refonte de tunnels de conversion (MeilleurTaux Assurance Vie)',
      'Création de Design Systems complets de zéro (Flatchr SaaS multi-plateforme)',
      'Polyvalente : start-up + grands groupes, B2B + B2C, web + mobile'
    ],
    methodology: 'Discovery → Delivery, Agile/Scrum, Design Thinking, Atomic Design',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'sami',
    name: 'Sami',
    role: 'Product Owner / Product Manager',
    available: true,
    status: 'vivier',
    experience: '5+ ans produit / 3+ ans tech',
    sectors: ['Médias', 'Streaming OTT', 'Télécoms', 'Sport', 'Entertainment'],
    sectorsStrong: ['Streaming OTT', 'Médias', 'Mobile'],
    domains: ['B2C', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (courant)', 'Mandarin (intermédiaire)', 'Allemand (notions)'],
    expertises: ['Vision Produit', 'Pilotage Roadmap', 'Priorisation data-driven', 'Backlog (Jira)', 'KPIs produit & techniques', 'Product Discovery', 'Mobile iOS/Android', 'UX accessibilité', 'Amplitude', 'Prompts IA'],
    keyClients: ['TF1+', 'CANAL+', 'Telecom Italia (marque blanche)'],
    highlights: [
      'Expertise rare sur les lecteurs vidéo / produits streaming à très forte audience (TF1+ 35M users mensuels, CANAL+ 5M)',
      'Profil hybride PO + ex-développeur front-end : dialogue technique de qualité',
      'Coordination de squads multi-plateformes (iOS, Android, Web) - 40+ releases pilotées',
      'Quadrilingue (FR/EN/Mandarin/Allemand) - expérience internationale (Wuhan, Tsinghua)',
      'Approche data-driven (Amplitude) et user-centric, attention forte à la QoE et rétention'
    ],
    methodology: 'Agile/Scrum, Product Discovery, data-driven, Mobile-first',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'damien',
    name: 'Damien',
    role: 'Product Designer Senior',
    available: true,
    status: 'vivier',
    experience: '8 ans',
    sectors: ['Real Estate', 'Banque', 'Automobile/Leasing', 'E-commerce', 'Public/OPCO', 'SaaS', 'Conseil'],
    sectorsStrong: ['Service Design', 'Transformation', 'Real Estate', 'SaaS'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (fluent/pro)'],
    expertises: ['Service Design', 'Atomic Research', 'Design Thinking', 'Job-To-Be-Done', 'Service Blueprint', 'Customer Journey Map', 'Facilitation/Sprint Master', 'Design System', 'IA/LLM', 'Lovable (vibe-coding)'],
    keyClients: ['VINCI/Léonard', 'Odaptos', 'BPCE Carlease', 'OPCO Atlas', 'Conseil Constitutionnel', 'ManoMano', 'Société Générale'],
    highlights: [
      'Formation top : ME310 d.school Paris/Stanford University (Innover par le Design)',
      'Étude internationale Real Estate as a Service pour VINCI (Zurich, Amsterdam, Londres, San Francisco)',
      'Founding Product Designer chez Odaptos (SaaS IA) - vision produit complète',
      'Spécialiste Service Design + Service Blueprint - rare et stratégique',
      'À l\'aise sur des contextes de transformation, fusion (OPCO Atlas), refonte stratégique'
    ],
    methodology: 'Design Thinking, Job-To-Be-Done, Service Design, Atomic Research, Agile',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'sonia',
    name: 'Sonia',
    role: 'Experte CRO & Web Analyste',
    available: true,
    status: 'intercontrat',
    experience: '4 ans',
    sectors: ['Telecom B2B', 'Mode/Retail', 'Luxe alimentaire', 'Retail/Jardinerie', 'E-commerce'],
    sectorsStrong: ['Retail/E-commerce', 'CRO', 'Web Analytics'],
    domains: ['B2B', 'B2C'],
    languages: ['Français (natif)', 'Anglais (C1 - certifié EF)'],
    expertises: ['CRO', 'A/B Testing', 'Web analytics', 'Tracking / Plan de marquage', 'Dashboarding', 'Génération d\'hypothèses', 'UX writing', 'Roadmap CRO'],
    keyClients: ['Bouygues Telecom Entreprises', 'Groupe Etam', 'La Maison du Chocolat', 'Jardiland & Gamm Vert (Teract)'],
    highlights: [
      'Profil rare : data + UX + CRO réunis - capacité à rationaliser les décisions design par la data',
      'Certifications expertes : ContentSquare (Expert), AB Tasty, Google Analytics 4, anglais C1',
      'Stack technique solide : Piano Analytics, GA4, Hotjar, Looker Studio, GTM, OneTrust',
      'Maîtrise complète de la chaîne data : collecte, fiabilisation, structuration, analyse',
      'Expérience refontes UX/UI couplées à de l\'A/B testing et de la personnalisation'
    ],
    methodology: 'A/B Testing, génération d\'hypothèses, audit parcours, dashboarding KPI',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'marie',
    name: 'Marie',
    role: 'Lead UX Researcher & Designer',
    available: true,
    status: 'intercontrat',
    experience: '10 ans',
    sectors: ['Luxe', 'Gaming', 'Aéronautique/Défense', 'Énergie', 'Transport', 'Education', 'Industrie', 'Banque', 'Assurance', 'Santé'],
    sectorsStrong: ['Luxe', 'UX Research transverse', 'Grands groupes'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais'],
    expertises: ['UX Research (quali/quanti/data)', 'Atomic UX Research', 'Tests et entretiens utilisateur', 'Études quantitatives', 'Analyse ContentSquare/GA', 'Design Thinking', 'Évangélisation UX'],
    keyClients: ['LVMH', 'Ubisoft', 'L\'Occitane en Provence', 'Airbus', 'Acadomia', 'PSA Groupe', 'Thales', 'Chanel', 'EDF', 'SNCF', 'Getraline'],
    highlights: [
      'Profil UX Research pur, rare et précieux - 10 ans entièrement dédiés à la recherche',
      'Formation académique solide : Master Ergonomie + Licence Psychologie',
      'Lead UX Research au niveau Groupe LVMH (recherche transverse Maisons) et L\'Occitane (création poste)',
      'Expertise Atomic Research et déploiement de bases de données d\'insights',
      'Couverture sectorielle exceptionnellement large : luxe, gaming, aéro/défense, énergie, transport'
    ],
    methodology: 'Atomic UX Research, Design Thinking, méthodes quanti/quali, tests utilisateurs',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'julien',
    name: 'Julien Holtz',
    role: 'Coach UX & Formateur',
    available: true,
    status: 'intercontrat',
    experience: '21 ans',
    sectors: ['Banque', 'Retail', 'Énergie', 'Luxe', 'Assurance', 'Médias', 'Sport', 'Hôtellerie', 'Aéroportuaire', 'Automobile'],
    sectorsStrong: ['Coaching stratégique', 'Design Sprint', 'Formation'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (courant)', 'Espagnol (notions)'],
    expertises: ['Animation Design Sprints', 'Coaching stratégique & méthodologique', 'Design Thinking', 'Service Design', 'Mentorat de consultants', 'Formation et enseignement', 'Masterclasses & conférences', 'Lean UX'],
    keyClients: ['Engie', 'Casino', 'Crédit Agricole', 'La Poste (Go Act)', 'Aéroports de Paris', 'Chanel (PEPS)', 'EDF (tour de contrôle nucléaire)', 'B&B Hotels', 'Evaneos', 'Valeo', 'SPA', 'Je Change'],
    highlights: [
      '21 ans d\'expérience - profil très senior pour des missions stratégiques haut niveau',
      'Diplômé ESC Lille (Skema Business School) - profil management + design',
      'Formateur référent : 50 formations animées, 200+ apprenants formés (Design Thinking, UX, Lean UX, Design Sprint, Figma)',
      'Enseignant à la Web School Factory (Bac+5) - mentorat de projets de fin d\'année',
      'Auteur de 12 livres de sport (Tour de France, 24h du Mans) - bonus storytelling/communication'
    ],
    methodology: 'Design Sprint, Design Thinking, Lean UX, Service Design, coaching/formation',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'yann',
    name: 'Yann',
    role: 'Lead UX & Product Designer / Design System Manager',
    available: true,
    status: 'vivier',
    experience: '17 ans',
    sectors: ['Fintech', 'Banque', 'Assurance', 'Énergie', 'Santé', 'Luxe', 'Real Estate', 'Automobile', 'Logistique', 'Public'],
    sectorsStrong: ['Stratégie UX/UI', 'Design System', 'Transformation digitale'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (courant)', 'Espagnol (bases)'],
    expertises: ['Stratégie UX/UI', 'Management collaboratif', 'Design System', 'UX Research', 'Accessibilité (RGAA certifié)', 'Generative AI (certifié)', 'Architecture de l\'information', 'Accompagnement au changement'],
    keyClients: ['Market Pay (ex-Carrefour)', 'BNP Paribas Real Estate', 'Renault DLPA', 'Malakoff Humanis', 'La Poste', 'Total Energies', 'Groupama', 'Suez', 'Dalkia', 'Engie Home Services', 'Wide Agency', 'Unicef'],
    highlights: [
      'Profil Lead/Manager senior (17 ans) - capable de piloter des équipes design de zéro',
      'Création d\'équipes design from scratch chez Market Pay (fintech ex-Carrefour) : recrutement, process, identité',
      'Expertise Design System scalable et accessible - certification RGAA + Prompt Engineering / Generative AI',
      'Cursus académique original : Sciences du Langage M2 + UX/UI License - vision holistique',
      'Spécialiste de la transformation digitale et de l\'accompagnement au changement'
    ],
    methodology: 'Stratégie UX, OKR/KPI, Design System, accessibilité, accompagnement au changement',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'marine',
    name: 'Marine Lortie',
    role: 'Product Manager & Product Owner',
    available: true,
    status: 'intercontrat',
    experience: '7 ans',
    sectors: ['Banque', 'Santé/Médical', 'Hôtellerie/HCR', 'Luxe', 'Retail', 'Aéronautique', 'Sport', 'Industrie'],
    sectorsStrong: ['IA appliquée', 'Santé', 'Banque mobile', 'Multi-secteurs'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (C1)', 'Mandarin (A2)'],
    expertises: ['Cadrage & Vision Produit', 'Discovery & UX Research', 'Cycle Discovery → Delivery', 'Analyse Data & KPIs', 'Agilité (Scrum, Kanban)', 'Innovation Digitale & IA', 'Leadership Produit', 'Coordination équipes pluridisciplinaires'],
    keyClients: ['Société Générale Maroc (Saham Bank)', 'Clariane (Koala, Phoenix/Alexa)', 'Neolam (Flexcrew, Flexbed)', 'Agence Biggerband (DIOR, Nespresso, Banque Populaire, FFE, Firmenich)'],
    highlights: [
      'Expertise IA appliquée rare : architecture RAG (Koala), skills Alexa B2B avec Amazon (Phoenix)',
      'Pilotage d\'apps déployées à grande échelle : Koala dans 100 établissements de santé, 5k+ users',
      'Refonte complète d\'app mobile bancaire (Saham Bank) : néo-banque, biométrie, chatbot IA, bourse',
      'Habituée aux contextes full remote international (équipes Londres, Algérie, Maroc - en anglais)',
      'Certifications : PSPO 1, UX PM1, Gen AI (2025), AI for Everyone'
    ],
    methodology: 'Discovery → Delivery, Agile/Scrum, Kanban, Design Thinking, Data Driven',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'anaelle',
    name: 'Anaëlle',
    role: 'UX/UI Designer',
    available: true,
    status: 'intercontrat',
    experience: '6 ans',
    sectors: ['Automobile', 'Énergie', 'Luxe', 'Hôtellerie/Sport', 'Associatif', 'Industrie'],
    sectorsStrong: ['Outils métiers B2E', 'Énergie', 'Automobile'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (basique)'],
    expertises: ['UX Design', 'UI Design', 'Analyse de données', 'Accessibilité numérique (OPQUAST)', 'Design Thinking', 'Design Sprint', 'Wireframing', 'Prototypage', 'Tests utilisateurs', 'Évangélisation UX'],
    keyClients: ['Renault Digital (WAP)', 'Engie (Gepo)', 'Sisley (groupe LVMH)', 'GRET', 'Ibis Budget × CYD × Strava', 'Quintess'],
    highlights: [
      'Solide formation : BTS Design Produit (École de Condé) + Bachelor + Master UX (ECV Digital)',
      'Certification OPQUAST (qualité web et accessibilité numérique)',
      'Expertise sur outils métiers B2E complexes : Renault WAP (gestion garantie), Engie Gepo (trading énergie verte)',
      'Capacité d\'évangélisation UX auprès d\'équipes IT non-acculturées',
      'Polyvalente : agence 360° + start-up + grand groupe'
    ],
    methodology: 'Design Thinking, ateliers de co-conception (HMW, six-to-one, carte mentale), Agile',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'muriel',
    name: 'Muriel Robineau',
    role: 'Senior UX Coach',
    available: true,
    status: 'intercontrat',
    experience: '15+ ans',
    sectors: ['Industrie/Automobile', 'Luxe', 'Banque', 'Conseil', 'Innovation'],
    sectorsStrong: ['UX Strategy', 'Design Ops', 'Transformation organisationnelle'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (pro)', 'Allemand (courant)', 'Chinois (HSK3)'],
    expertises: ['UX Strategy', 'UX Research', 'Innovation', 'Design Ops', 'Coaching & Training', 'Design Thinking', 'SAFe (Leading SAFe certifié)', 'Service Design', 'Stakeholder Mapping', 'Service Blueprint', 'Business Model'],
    keyClients: ['Renault Group (Center of Excellence UX)', 'Renault Digital (DISG)', 'Why Innovation! / Wavestone Singapour'],
    highlights: [
      'Profil très haut niveau : UX Strategy + Design Ops + Coaching transformation organisationnelle',
      'Quadrilingue rare : français, anglais pro, allemand courant, chinois HSK3',
      'Formation premium : Ingénieur Génie Mécanique (UTC) + Master 2 Ergonomie/Conception (Paris XI)',
      'Certifié Leading SAFe (2025) - rare pour un profil UX, idéal pour scaling enterprise',
      'Expérience internationale Singapour (Wavestone) - coaching Design Thinking en contexte asiatique'
    ],
    methodology: 'UX Strategy, Design Ops, Operating Models, SAFe, Design Thinking, Lean Startup',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'sylvie',
    name: 'Sylvie Austrui',
    role: 'Product Designer (Discovery & UX)',
    available: true,
    status: 'intercontrat',
    experience: '5 ans',
    sectors: ['Secteur public/B2G', 'Banque', 'Sécurité/Biométrie', 'Mobilité', 'E-commerce', 'Médias'],
    sectorsStrong: ['Secteur public', 'UX Research', 'Éco-conception'],
    domains: ['B2B', 'B2C', 'B2E', 'B2G', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (courant)'],
    expertises: ['Discovery & UX Research', 'Atomic Research', 'Tests utilisateurs', 'Facilitation d\'ateliers', 'Experience Mapping', 'Prototypage Figma', 'UX Writing', 'Éco-conception UX/UI', 'Accessibilité', 'Service Design'],
    keyClients: ['Banque des Territoires (Caisse des Dépôts)', 'Thermor', 'Groupe BPCE', 'INRAE', 'France Travail (La Bonne Boîte)', 'SNCF Connect & Tech', 'Idemia (Gendarmerie, Aéroport Reykjavik)', 'UniversCiné'],
    highlights: [
      'Expertise rare et différenciante : éco-conception UX/UI + accessibilité + secteur public',
      'Issue du journalisme : capacité unique à vulgariser, questionner, et exceller en UX Writing',
      'Forte expertise grands comptes B2G : France Travail, INRAE, Banque des Territoires',
      'Anglais courant (Bachelor à North Carolina State University) - présentations en anglais possibles',
      'Profil tech-forward : utilise Claude.ai dans son workflow d\'analyse et expérimente le vibe coding'
    ],
    methodology: 'Discovery, Atomic Research, Service Design, éco-conception, accessibilité',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'chloe',
    name: 'Chloé Van Driessche',
    role: 'UX/UI Designer',
    available: true,
    status: 'intercontrat',
    experience: '11 ans',
    sectors: ['Luxe', 'E-commerce', 'Culture', 'Sport/Fédération', 'Pharma/Santé', 'Retail bio'],
    sectorsStrong: ['Luxe', 'E-commerce', 'Direction Artistique'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français (natif)', 'Anglais (basique)', 'Espagnol (notions)'],
    expertises: ['UI Design', 'Direction Artistique', 'UX Design', 'Atomic Design', 'Design System', 'Branding/Identité', 'Typographie', 'Accessibilité', 'Éco-conception', 'Print-Édition', 'Prototypage'],
    keyClients: ['Fédération Française de Tennis', 'Biogaran', 'Biocoop', 'Veuve Clicquot'],
    highlights: [
      '11 ans d\'expérience avec une vraie expertise UI/Direction Artistique - rare sur le marché',
      'Domaines de prédilection assumés : Luxe (n°1), E-commerce, Culture',
      'Expérience confirmée sur des projets de fusion/refonte multi-sites (Biogaran 4→1, Biocoop institutionnel + e-commerce)',
      'Expertise Atomic Design et Design System (UI Kit, composants, bibliothèques Figma)',
      'Formation premium : Master ISG Paris + Bachelor Sup\'internet'
    ],
    methodology: 'Atomic Design, Design System, Direction Artistique, éco-conception',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'mboh',
    name: 'M\'boh Assouma',
    role: 'Consultant Web Analytics',
    available: true,
    status: 'intercontrat',
    experience: '9 ans',
    sectors: ['Énergie', 'Telecom', 'Retail', 'E-commerce', 'Pharma', 'Transport', 'Banque', 'Loisirs/Jeux'],
    sectorsStrong: ['Web Analytics', 'Server-side tracking', 'Grands écosystèmes'],
    domains: ['B2B', 'B2C', 'B2B2C'],
    languages: ['Français', 'Anglais'],
    expertises: ['Web Analytics', 'Server-side tracking', 'Tag Management (GTM, Tealium, Commander Act)', 'Plan de marquage', 'Data Visualisation (Looker, Datorama)', 'CMP / RGPD / Consent Mode V2', 'Migration GA4', 'HTML/CSS/Javascript/SQL', 'Piano Analytics', 'Adobe Analytics', 'Amplitude'],
    keyClients: ['Total Energies (400 sites & apps mondial)', 'Awin', 'Club Med', 'PMU', 'Nexity', 'SFR', 'Sephora', 'Coty', 'Oscaro', 'Astrazeneca', 'SNCF-Lyria', 'Nickel'],
    highlights: [
      'Profil rare et très technique : maîtrise du server-side tracking (sujet brûlant 2025-2026)',
      'Parcours 360° : agence média + annonceur + cabinet de conseil - polyvalence rare',
      'Conformité RGPD pointue : déploiement CMP grande échelle (400 sites Total Energies), Consent Mode V2',
      'Stack premium : Piano Analytics, GA4, Eulerian, Adobe Analytics, Amplitude, Tealium, Didomi, OneTrust',
      'Formation hybride : Kedge MSc Digital Marketing + Le Wagon Full-Stack Web Developer / IA (2024)'
    ],
    methodology: 'Plan de mesure, plan de marquage, server-side, dashboarding KPI',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'salma',
    name: 'Salma',
    role: 'Frontend Developer · UI/UX Designer · Design Systems',
    available: true,
    status: 'intercontrat',
    experience: '7 ans',
    sectors: ['Banque', 'Luxe / Beauté', 'Secteur public', 'Génération de leads', 'Édition / Média', 'Formation / Institutionnel'],
    sectorsStrong: ['Design System', 'Frontend craft', 'Performance web', 'Luxe/Beauté'],
    domains: ['B2B', 'B2C', 'B2E', 'B2B2C'],
    languages: ['Français', 'Anglais (basique)'],
    expertises: ['Frontend Development (HTML5, SCSS, JavaScript)', 'React', 'Vue.js', 'WeWeb', 'Salesforce Commerce Cloud (SFCC/SFRA)', 'Page Designer', 'Wordpress', 'Shopify', 'Node.js (backend)', 'UI/UX Design (Figma, Adobe XD)', 'Design System (tokens, composants, variants)', 'Accessibilité WCAG 2.2 AA', 'Performance web (Core Web Vitals, Lighthouse)', 'Architecture CSS modulaire (BEM, ITCSS)'],
    keyClients: ['Crédit Agricole (CAGIP - Factory)', 'LVMH Beauty Tech (Make Up For Ever)', 'EDF', 'Albea', 'Needocs', 'Acteurs Publics', 'Agora Publication', 'Haut Comité de la Défense Civile'],
    highlights: [
      'Profil hybride rare : à la fois Frontend Developer ET UI/UX Designer — fait le pont entre design et tech sans friction',
      'Expertise pointue Design System de bout en bout : tokens, composants Figma → composants code (React, Vue, WeWeb)',
      'Performances mesurées : -35 à -50% de JS initial, LCP < 2.5s, CLS < 0.1 sur LVMH Make Up For Ever',
      'Salesforce Commerce Cloud (SFCC/SFRA) + Page Designer : stack premium e-commerce luxe',
      'Accessibilité native WCAG 2.2 AA + résultats business prouvés (+25 conversion, +30 engagement, +35 trafic SEO)'
    ],
    methodology: 'Design + Dev en parallèle, Design System scalable, Agile/Scrum, mobile-first, data-driven (Hotjar)',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'benjamin',
    name: 'Benjamin',
    role: 'Product Designer',
    available: true,
    status: 'intercontrat',
    experience: '8 ans',
    sectors: ['Luxe', 'Retail', 'Hôtellerie', 'E-commerce', 'Edtech', 'Gaming', 'Industrie', 'Banque'],
    sectorsStrong: ['Luxe', 'Enterprise / Outils métiers', 'iOS / Mobile', 'Multi-marques'],
    domains: ['B2B', 'B2C', 'B2B2C', 'B2E'],
    languages: ['Français (natif)', 'Anglais (professionnel)', 'Espagnol (notions)'],
    expertises: ['Product strategy', 'User Research (terrain, qualitatif)', 'Enterprise Design', 'Scalable Design (multi-marques)', 'iOS Product Design', 'UX cadrage produit', 'Roadmap & priorisation', 'Animation ateliers cross-functional', 'Accessibilité', 'Agentic AI / IA d\'aide à la décision', 'Design Sprint', 'PI Planning / SAFe'],
    keyClients: ['LVMH (Clienteling iOS, Jardin d\'Acclimatation, LVMH Prize, LIVE LVMH)', 'B&B Hotels', 'Pietro Bike', 'Carlin Creative Trend Bureau', 'QuizCoach', 'Ubisoft'],
    highlights: [
      'UX Product Lead sur l\'app iOS Clienteling LVMH "white-label" déployée mondialement (conseillers de vente + Store Managers, multi-Maisons)',
      'Profil "autorité UX" : rôle d\'arbitre sur les Contributions to Core dans un environnement multi-marques complexe',
      'Conception de fonctionnalités IA d\'aide à la décision (Next Best Action, recommandations) — profil moderne avec expertise Agentic AI',
      'Forte expertise enterprise / outils métiers complexes orientés usage terrain (boutiques, conseillers)',
      'Collaboration directe avec Head of Design + parties prenantes exécutives sur initiatives groupe à forte visibilité'
    ],
    methodology: 'Research-driven design, cadrage produit, ateliers cross-functional, PI Planning / SAFe, Design Sprint',
    bookUrl: '',
    photoUrl: '',
    cvUrl: '',
  },
  {
    id: 'arthur',
    name: 'Arthur Jeunechamp',
    role: 'Product Designer / Designer UI-UX',
    available: true,
    status: 'vivier',
    experience: '5+ ans',
    sectors: ['Secteur public/Défense', 'Médical', 'RH', 'Marketing/Communication', 'E-commerce', 'Agence'],
    sectorsStrong: ['Secteur public', 'Outils métiers', 'Agence d\'innovation'],
    domains: ['B2B', 'B2C', 'B2E', 'B2G'],
    languages: ['Français (natif)', 'Anglais (B1)'],
    expertises: ['Conception UX/UI (mobile, desktop)', 'Ateliers de cadrage & idéation', 'User Research & interviews utilisateurs', 'Audits d\'interfaces & recommandations ergonomiques', 'Design System', 'Prototypage Figma', 'Accessibilité & RGAA', 'Design Thinking', 'Review développeurs (interne & externe)', 'Identité graphique & Direction Artistique', 'Modélisation 3D (Spline, Blender)', 'Programmation (Lua, HTML/CSS)'],
    keyClients: ['Ministère des Armées (Kube)', 'Blackfoot - Agence d\'innovation', 'Malice - Agence conseil marketing', 'ThisWay - Agence de Webmarketing', 'Lions de Cannes', 'Agence Dentalespace', 'Serenity'],
    highlights: [
      'Expérience secteur public rare : 6 mois au Ministère des Armées sur outils métiers médicaux et RH',
      'Profil hybride UX/UI + Direction Artistique + compétences dev (HTML/CSS, Lua) — dialogue tech très fluide',
      'Formation premium : Bac+5 e-artsup (Art Direction in Digital Design) + double cursus HEC (e-commerce, data)',
      'Certification Accessibilité Numérique & RGAA (2026) — différenciante sur appels d\'offres publics',
      'Polyvalent agence & grand groupe : 5 ans d\'expérience couvrant mobile, desktop, identité graphique et gamification'
    ],
    methodology: 'Design Thinking, Méthode Scrum, ateliers de cadrage/idéation, user research, prototypage',
    bookUrl: 'https://arthur.jeunechamp.com',
    cvUrl: '',
    photoUrl: '',
  },
];

const STORAGE_KEY = 'uxr-push-cv-consultants-v2';
const HISTORY_KEY = 'uxr-push-cv-history-v2';
const SUIVI_KEY = 'uxr-push-cv-suivi-v1';

// localStorage helpers (remplace window.storage des artifacts claude.ai)
const storage = {
  get: (key) => { try { const v = localStorage.getItem(key); return v ? { value: v } : null; } catch { return null; } },
  set: (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } },
  delete: (key) => { try { localStorage.removeItem(key); return true; } catch { return false; } },
};

export default function PushCVTool({ apiKey }) {
  const [consultants, setConsultants] = useState(INITIAL_CONSULTANTS);
  const [view, setView] = useState('matching');
  const [history, setHistory] = useState([]);
  const [suivi, setSuivi] = useState([]);
  const [photos, setPhotos] = useState({}); // { consultantId: base64 }

  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [sector, setSector] = useState('');
  const [extraContext, setExtraContext] = useState('');
  const [contacts, setContacts] = useState([{ id: 1, name: '', role: '', email: '' }]);
  const addContact = () => setContacts(prev => [...prev, { id: Date.now(), name: '', role: '', email: '' }]);
  const removeContact = (id) => setContacts(prev => prev.filter(c => c.id !== id));
  const updateContact = (id, field, value) => setContacts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [activeResultIdx, setActiveResultIdx] = useState(0);
  const result = results[activeResultIdx] || null;
  const contactEmail = result ? contacts.find(c => c.id === result.contactId)?.email || '' : '';
  const [copiedField, setCopiedField] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newConsultantText, setNewConsultantText] = useState('');
  const [newConsultantName, setNewConsultantName] = useState('');
  const [parsing, setParsing] = useState(false);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  const [editingBookUrl, setEditingBookUrl] = useState(null);
  const [tempBookUrl, setTempBookUrl] = useState('');
  const [editingCvUrl, setEditingCvUrl] = useState(null);
  const [tempCvUrl, setTempCvUrl] = useState('');
  const [editingPhotoUrl, setEditingPhotoUrl] = useState(null);
  const [tempPhotoUrl, setTempPhotoUrl] = useState('');



  const [reverseConsultant, setReverseConsultant] = useState(null);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [reverseResult, setReverseResult] = useState(null);
  const [reverseError, setReverseError] = useState(null);
  const [reverseExpanded, setReverseExpanded] = useState(null);
  const [wishText, setWishText] = useState('');
  const [wishLoading, setWishLoading] = useState(false);
  const [wishResult, setWishResult] = useState(null);
  const [wishError, setWishError] = useState(null);
  const [wishExpanded, setWishExpanded] = useState(null);

  const applyLoaded = (loaded, currentConsultants) => {
    const migrated = loaded.map(c => {
      if (c.status && c.cvUrl !== undefined) return c;
      const initial = INITIAL_CONSULTANTS.find(i => i.id === c.id);
      return { ...c, status: c.status || initial?.status || 'vivier', cvUrl: c.cvUrl !== undefined ? c.cvUrl : '' };
    });
    const loadedIds = new Set(migrated.map(c => c.id));
    const newOnes = INITIAL_CONSULTANTS.filter(i => !loadedIds.has(i.id));
    return [...migrated, ...newOnes];
  };

  // Convertit les entrées d'historique de type matching en fiches suivi
  const migrateHistoryToSuivi = (historyEntries, existingSuivi) => {
    const existingHistoryIds = new Set(existingSuivi.map(s => s.historyId).filter(Boolean));
    const newEntries = [];
    historyEntries
      .filter(h => !h.type || h.type === undefined) // uniquement les matchings (pas reverse/wish)
      .forEach(h => {
        if (existingHistoryIds.has(h.id)) return; // déjà importé
        const contacts = h.contacts || (h.contactName ? [{ name: h.contactName, role: h.contactRole, email: '' }] : []);
        const results = h.results || (h.result ? [h.result] : []);
        contacts.forEach((contact, idx) => {
          const matchResult = results[idx] || results[0];
          const consultantsEnvoyes = (matchResult?.matches || []).map(m => ({ id: m.consultantId, name: m.consultantName, score: m.matchScore }));
          if (consultantsEnvoyes.length === 0) return;
          newEntries.push({
            id: h.id + idx,
            historyId: h.id, // clé de déduplication
            createdAt: h.date || new Date().toISOString(),
            company: h.company || '',
            sector: '',
            contact: { name: contact.name || '', role: contact.role || '', email: contact.email || '' },
            consultants: consultantsEnvoyes,
            statut: 'en_attente',
            notes: '',
            updatedAt: h.date || new Date().toISOString(),
          });
        });
      });
    return newEntries;
  };

  useEffect(() => {
    // Chargement initial depuis localStorage
    let localConsultants = null;
    let localHistory = null;
    let localSuivi = null;

    const storedC = storage.get(STORAGE_KEY);
    if (storedC?.value) localConsultants = applyLoaded(JSON.parse(storedC.value), INITIAL_CONSULTANTS);

    const storedH = storage.get(HISTORY_KEY);
    if (storedH?.value) localHistory = JSON.parse(storedH.value);

    const storedS = storage.get(SUIVI_KEY);
    if (storedS?.value) localSuivi = JSON.parse(storedS.value);

    if (localConsultants) setConsultants(localConsultants);
    if (localHistory) setHistory(localHistory);

    // Photos
    const allConsultants = localConsultants || INITIAL_CONSULTANTS;
    const photoMap = {};
    allConsultants.forEach(c => {
      const p = storage.get(`photo:${c.id}`);
      if (p?.value) photoMap[c.id] = p.value;
    });
    if (Object.keys(photoMap).length > 0) setPhotos(photoMap);

    // Migration historique → suivi
    const baseSuivi = localSuivi || [];
    const migratedFromHistory = localHistory ? migrateHistoryToSuivi(localHistory, baseSuivi) : [];
    const mergedLocalSuivi = [...migratedFromHistory, ...baseSuivi].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (mergedLocalSuivi.length > 0) {
      setSuivi(mergedLocalSuivi);
      storage.set(SUIVI_KEY, JSON.stringify(mergedLocalSuivi));
    } else if (baseSuivi.length > 0) {
      setSuivi(baseSuivi);
    }
    // localStorage chargé
  }, []);

  const saveConsultants = (next) => {
    setConsultants(next);
    storage.set(STORAGE_KEY, JSON.stringify(next));
  };

  const saveHistory = (next) => {
    setHistory(next);
    storage.set(HISTORY_KEY, JSON.stringify(next.slice(0, 50)));
  };

  const saveSuivi = (next) => {
    setSuivi(next);
    storage.set(SUIVI_KEY, JSON.stringify(next));
  };

  const exportJSON = () => {
    setShowExportModal(true);
    setExportCopied(false);
  };

  const handleImportText = async () => {
    setImportError('');
    try {
      const data = JSON.parse(importText);

      // 1. Consultants
      const nextConsultants = data.consultants
        ? applyLoaded(data.consultants, INITIAL_CONSULTANTS)
        : consultants;
      if (data.consultants) await saveConsultants(nextConsultants);

      // 2. Historique — fusionner avec l'existant pour ne pas perdre les entrées récentes
      let nextHistory = history;
      if (data.history) {
        const existingIds = new Set(history.map(h => h.id));
        const incoming = data.history.filter(h => !existingIds.has(h.id));
        nextHistory = [...incoming, ...history].sort((a, b) => new Date(b.date) - new Date(a.date));
        await saveHistory(nextHistory);
      }

      // 3. Suivi — restaurer depuis le backup, fusionner avec l'existant, sinon régénérer depuis l'historique
      const importedSuivi = data.suivi || [];
      const existingSuiviIds = new Set(suivi.map(s => s.id));
      const incomingSuivi = importedSuivi.filter(s => !existingSuiviIds.has(s.id));
      const migratedFromHistory = migrateHistoryToSuivi(nextHistory, [...suivi, ...incomingSuivi]);
      const nextSuivi = [...migratedFromHistory, ...incomingSuivi, ...suivi]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (nextSuivi.length > 0) await saveSuivi(nextSuivi);

      // 4. Recharger les photos depuis le storage (elles sont toujours là, juste le state à rafraîchir)
      const allC = nextConsultants;
      const photoMap = {};
      allC.forEach(c => {
        const p = storage.get(`photo:${c.id}`);
        if (p?.value) photoMap[c.id] = p.value;
      });
      if (Object.keys(photoMap).length > 0) setPhotos(photoMap);

      setShowImportModal(false);
      setImportText('');
    } catch (err) {
      setImportError('JSON invalide : ' + err.message);
    }
  };

  const toggleAvailability = (id) => {
    const next = consultants.map(c => c.id === id ? { ...c, available: !c.available } : c);
    saveConsultants(next);
  };

  const toggleStatus = (id) => {
    const next = consultants.map(c => c.id === id ? { ...c, status: c.status === 'intercontrat' ? 'vivier' : 'intercontrat' } : c);
    saveConsultants(next);
  };

  const removeConsultant = (id) => {
    if (!confirm('Retirer définitivement ce consultant du pool ?')) return;
    saveConsultants(consultants.filter(c => c.id !== id));
  };

  const startEditBookUrl = (consultant) => { setEditingBookUrl(consultant.id); setTempBookUrl(consultant.bookUrl || ''); };
  const saveBookUrl = (id) => { const next = consultants.map(c => c.id === id ? { ...c, bookUrl: tempBookUrl.trim() } : c); saveConsultants(next); setEditingBookUrl(null); setTempBookUrl(''); };
  const startEditCvUrl = (consultant) => { setEditingCvUrl(consultant.id); setTempCvUrl(consultant.cvUrl || ''); };
  const saveCvUrl = (id) => { const next = consultants.map(c => c.id === id ? { ...c, cvUrl: tempCvUrl.trim() } : c); saveConsultants(next); setEditingCvUrl(null); setTempCvUrl(''); };
  const startEditPhotoUrl = (consultant) => { setEditingPhotoUrl(consultant.id); setTempPhotoUrl(consultant.photoUrl || ''); };
  const savePhotoUrl = (id) => { const next = consultants.map(c => c.id === id ? { ...c, photoUrl: tempPhotoUrl.trim() } : c); saveConsultants(next); setEditingPhotoUrl(null); setTempPhotoUrl(''); };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Construit les blocs de message avec prompt caching.
  // Bloc 1 (caché) : rôle + règles business + pool consultants + instructions fixes → identique pour tous les contacts
  // Bloc 2 (non caché) : données du prospect + contact spécifique → varie à chaque appel
  const buildCachedMessages = (contact, availableConsultants, sharedNames) => {
    const sharedNote = sharedNames.length > 0
      ? `\n\nATTENTION — Profils proposés à d'autres contacts de cette entreprise : ${sharedNames.join(', ')}. Si tu retiens l'un d'eux pour ce contact aussi, mentionne-le dans le mail avec une formule naturelle du type "Je vous propose également [Nom], que je recommande à [autre poste] de votre équipe — ce profil étant particulièrement polyvalent pour vos enjeux communs."`
      : '';

    // Partie STATIQUE — mise en cache (même pool, mêmes règles pour tous les contacts d'un même matching)
    const staticBlock = `Tu es l'assistant d'un Business Manager chez UX-Republic, une agence de conseil spécialisée en UX/Product Design basée à Paris.

# CONTEXTE BUSINESS
- **intercontrat** : sous contrat, non staffé. Priorité absolue. Dispo immédiate.
- **vivier** : identifié, pas encore sous contrat. À pousser si le match est vraiment pertinent.

# POOL DE CONSULTANTS DISPONIBLES
${JSON.stringify(availableConsultants.map(c => ({
  id: c.id, name: c.name, role: c.role, status: c.status, available: c.available,
  experience: c.experience, sectors: c.sectors, sectorsStrong: c.sectorsStrong,
  expertises: c.expertises, keyClients: c.keyClients, highlights: c.highlights, bookUrl: c.bookUrl,
})), null, 2)}

# INSTRUCTIONS FIXES
1. Analyse le prospect (secteur réel, enjeux UX/Produit/Data probables selon le poste)
2. Score TOUS les consultants disponibles /100 pour ce prospect ET ce poste précis
3. Sélectionne 2-3 profils (priorise intercontrats ≥ 70, complète avec vivier si score ≥ 85 sur angle non couvert)
4. Justifie chaque sélection de façon détaillée et spécifique
5. Rédige un email personnalisé :
   - Commencer TOUJOURS par "Bonjour [prénom du contact]," si le prénom est connu. Si pas de prénom (contact générique, adresse de service), utiliser simplement "Bonjour," et adapter le ton : s'adresser à l'équipe/service plutôt qu'à une personne (ex: "votre équipe" plutôt que "vous"). JAMAIS de "Madame", "Monsieur", nom de famille seul ou autre formule.
   - Objet accrocheur et ciblé
   - Accroche contextuelle (problématique métier probable)
   - Présentation des profils avec points forts spécifiques
   - Pour les intercontrats : mentionner la disponibilité immédiate
   - Pour les CV : mentionner simplement qu'ils sont en pièce jointe, avec une formulation naturelle et directe (ex: "Je joins leurs CV à ce mail", "Vous trouverez leurs CV en pièce jointe"). JAMAIS de tournures ampoulées comme "Je tiens leurs CV à votre disposition" ou "Je me permets de vous adresser". Pas de lien CV dans le mail.
   - Book : intégrer le lien si bookUrl renseigné, sinon ne pas mentionner
   - Ton direct et simple, sans formules creuses ni langue de bois
   - 150-240 mots
   - Terminer EXACTEMENT par :
     Auriez-vous des disponibilités pour en discuter ?
     
     Excellente journée,
     Mathias

# FORMAT DE RÉPONSE — JSON UNIQUEMENT, sans backticks, sans markdown
Champs requis :
- prospectAnalysis : string (2-3 phrases)
- selectedAngle : "problematique_metier" | "presentation_profils" | "factuel_dispo"
- angleReason : string (1 phrase)
- selectionStrategy : string (1-2 phrases)
- allScores : array of { consultantId, consultantName, status, score (int), shortReason, selected (bool) }
- matches : array of { consultantId, consultantName, status, matchScore (int), whyThisMatch (3-5 phrases), topStrengths (array of 3-4 strings) }
- email : { subject, body } — body avec \\n pour les sauts de ligne`;

    // Partie DYNAMIQUE — spécifique à chaque contact (non cachée)
    const dynamicBlock = `# PROSPECT À TRAITER
- Entreprise : ${company}
- Personne contactée : ${contact.name || 'non précisé'}
- Poste : ${contact.role}
- Secteur : ${sector || 'non précisé'}
- Site web : ${website || 'non précisé'}
- Contexte : ${extraContext || 'aucun'}${sharedNote}

Génère le JSON de résultat pour ce contact.`;

    return [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: staticBlock,
            cache_control: { type: 'ephemeral' }, // ← mis en cache côté Anthropic
          },
          {
            type: 'text',
            text: dynamicBlock, // ← varie à chaque appel, non caché
          },
        ],
      },
    ];
  };

  const handleMatch = async () => {
    const validContacts = contacts.filter(c => c.role.trim());
    if (!company.trim() || validContacts.length === 0) { setError("Renseigne au minimum l'entreprise et le poste d'au moins un contact."); return; }
    const availableConsultants = consultants.filter(c => c.available);
    if (availableConsultants.length === 0) { setError('Aucun consultant disponible dans ton pool. Active au moins un profil.'); return; }

    setLoading(true);
    setLoadingProgress({ done: 0, total: validContacts.length });
    setError(null);
    setResults([]);
    setActiveResultIdx(0);

    try {
      const callWithRetry = async (contact, idx) => {
        if (idx > 0) await new Promise(r => setTimeout(r, idx * 1500));
        const messages = buildCachedMessages(contact, availableConsultants, []);
        for (let attempt = 0; attempt < 3; attempt++) {
          if (attempt > 0) await new Promise(r => setTimeout(r, attempt * 5000));
          const response = await callClaude({ model: 'claude-sonnet-4-20250514', max_tokens: 3000, messages }, apiKey);
          const data = response;
          const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('').replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(text);
          setLoadingProgress(p => ({ ...p, done: p.done + 1 }));
          return { ...parsed, contactId: contact.id, contactName: contact.name, contactRole: contact.role };
        }
      };
      const allResults = await Promise.all(validContacts.map((contact, idx) => callWithRetry(contact, idx)));
      setResults(allResults);
      const entry = { id: Date.now(), date: new Date().toISOString(), company, contacts: validContacts, multiContact: validContacts.length > 1, results: allResults };
      saveHistory([entry, ...history]);

      // Créer automatiquement une fiche suivi par contact
      const newSuiviEntries = validContacts.map((contact, idx) => {
        const matchResult = allResults[idx];
        const consultantsEnvoyes = (matchResult?.matches || []).map(m => ({ id: m.consultantId, name: m.consultantName, score: m.matchScore }));
        return {
          id: Date.now() + idx,
          createdAt: new Date().toISOString(),
          company,
          sector: sector || '',
          contact: { name: contact.name, role: contact.role, email: contact.email },
          consultants: consultantsEnvoyes,
          statut: 'en_attente',
          notes: '',
          updatedAt: new Date().toISOString(),
        };
      });
      saveSuivi([...newSuiviEntries, ...suivi]);
    } catch (e) {
      console.error(e);
      setError("Erreur lors de l'analyse : " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const parseNewConsultant = async () => {
    if (!newConsultantText.trim() || !newConsultantName.trim()) { setError('Indique au moins le nom et colle le contenu du CV.'); return; }
    setParsing(true);
    setError(null);
    const prompt = `Voici le CV d'un consultant UX-Republic. Extrais les informations structurées au format JSON exact suivant. Réponds UNIQUEMENT en JSON valide, sans backticks.\n\nCV :\n${newConsultantText}\n\nNom du consultant : ${newConsultantName}\n\nFormat attendu :\n{\n  "id": "prenom-en-minuscules-sans-accents",\n  "name": "Prénom Nom",\n  "role": "Titre exact du poste",\n  "available": true,\n  "experience": "X ans",\n  "sectors": [],\n  "sectorsStrong": [],\n  "domains": [],\n  "languages": [],\n  "expertises": [],\n  "keyClients": [],\n  "highlights": [],\n  "methodology": "",\n  "bookUrl": ""\n}`;
    try {
      const data = await callClaude({ model: 'claude-sonnet-4-20250514', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }, apiKey);
      const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('').replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      if (consultants.find(c => c.id === parsed.id)) parsed.id = parsed.id + '-' + Date.now();
      if (!parsed.bookUrl) parsed.bookUrl = '';
      saveConsultants([...consultants, parsed]);
      setShowAddModal(false); setNewConsultantText(''); setNewConsultantName('');
    } catch (e) { setError('Erreur lors du parsing : ' + e.message); } finally { setParsing(false); }
  };

  const availableCount = consultants.filter(c => c.available).length;

  const handleReverse = async () => {
    if (!reverseConsultant) return;
    setReverseLoading(true); setReverseError(null); setReverseResult(null); setReverseExpanded(null);
    const c = reverseConsultant;
    const prompt = `Tu es l'assistant d'un Business Manager chez UX-Republic, agence de conseil UX/Product Design à Paris.\n\nUn consultant est disponible (${c.status === 'intercontrat' ? 'intercontrat — priorité business absolue' : 'vivier'}). Identifie 5 entreprises françaises (ou présentes en France) à prospecter en priorité pour ce profil.\n\n# PROFIL DU CONSULTANT\n- Nom : ${c.name}\n- Rôle : ${c.role}\n- Expérience : ${c.experience}\n- Secteurs forts : ${(c.sectorsStrong || []).join(', ')}\n- Secteurs : ${(c.sectors || []).join(', ')}\n- Expertises : ${(c.expertises || []).join(', ')}\n- Clients passés : ${(c.keyClients || []).join(', ')}\n- Points forts : ${(c.highlights || []).join(' | ')}\n\n# CONTRAINTE ABSOLUE — ENTREPRISES CIBLES UNIQUEMENT\nNe JAMAIS proposer : ESN, cabinets de conseil IT, agences digitales, agences UX/design, agences de communication, studios créatifs, ou tout prestataire de services numériques (Sopra Steria, Capgemini, Accenture, SQLI, Publicis Sapient, Wavestone, etc.). UX-Republic est elle-même une agence de conseil UX — ce serait proposer des concurrents directs. Cible UNIQUEMENT des entreprises utilisatrices finales (grands groupes, scale-ups, secteur public, annonceurs) qui ont des équipes produit/design internes et un besoin de renfort.\n\n# LOGIQUE DE SÉLECTION\nRaisonne à partir de : secteurs où il/elle a fait ses preuves, entreprises similaires à ses anciens clients, entreprises en transformation UX/Produit dans ces secteurs, séniorité et expertises spécifiques.\n\nPour chaque entreprise :\n- Le bon interlocuteur à cibler (poste précis)\n- Pourquoi ce profil matche spécifiquement\n- Un mail court et direct (80-120 mots) — commencer par "Bonjour [prénom]," — CV en pièce jointe — terminer EXACTEMENT par "Auriez-vous des disponibilités pour en discuter ?\\n\\nExcellente journée,\\nMathias"\n\n# FORMAT — JSON UNIQUEMENT, sans backticks\n{\n  "consultantSummary": "2 phrases résumant le positionnement idéal",\n  "prospects": [\n    {\n      "company": "Nom",\n      "sector": "Secteur",\n      "targetContact": "Poste précis",\n      "matchReason": "2-3 phrases spécifiques",\n      "email": { "subject": "Objet", "body": "Corps du mail" }\n    }\n  ]\n}`;
    try {
      const data = await callClaude({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, messages: [{ role: 'user', content: prompt }] }, apiKey);
      const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('').replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      setReverseResult(parsed); setReverseExpanded(0);
      const entry = { id: Date.now(), date: new Date().toISOString(), type: 'reverse', consultantName: c.name, consultantRole: c.role, result: parsed };
      saveHistory([entry, ...history]);
    } catch (e) { setReverseError("Erreur : " + e.message); } finally { setReverseLoading(false); }
  };

  const handleWish = async () => {
    if (!reverseConsultant || !wishText.trim()) return;
    setWishLoading(true); setWishError(null); setWishResult(null); setWishExpanded(null);
    const c = reverseConsultant;
    const prompt = `Tu es l'assistant d'un Business Manager chez UX-Republic, agence de conseil UX/Product Design à Paris.\n\nUn consultant exprime des souhaits de secteurs ou d'entreprises où il aimerait travailler. Tu dois identifier 5 entreprises à prospecter en croisant ses souhaits avec son profil réel.\n\n# PROFIL DU CONSULTANT\n- Nom : ${c.name}\n- Rôle : ${c.role}\n- Expérience : ${c.experience}\n- Secteurs forts : ${(c.sectorsStrong || []).join(', ')}\n- Secteurs : ${(c.sectors || []).join(', ')}\n- Expertises : ${(c.expertises || []).join(', ')}\n- Clients passés : ${(c.keyClients || []).join(', ')}\n- Points forts : ${(c.highlights || []).join(' | ')}\n\n# SOUHAITS EXPRIMÉS PAR LE CONSULTANT\n${wishText}\n\n# CONTRAINTE ABSOLUE — ENTREPRISES CIBLES UNIQUEMENT\nNe JAMAIS proposer : ESN, cabinets de conseil IT, agences digitales, agences UX/design, agences de communication, studios créatifs, ou tout prestataire de services numériques (Sopra Steria, Capgemini, Accenture, SQLI, Publicis Sapient, Wavestone, etc.). UX-Republic est elle-même une agence de conseil UX — ce serait proposer des concurrents directs. Cible UNIQUEMENT des entreprises utilisatrices finales (grands groupes, scale-ups, secteur public, annonceurs) qui ont des équipes produit/design internes et un besoin de renfort.\n\n# TA MISSION\n1. Évalue la cohérence entre les souhaits et le profil réel.\n2. Identifie 5 entreprises en tenant compte des souhaits MAIS en restant honnête sur le fit réel.\n3. Pour chaque entreprise : poste à cibler, pourquoi ça matche, mail court (80-120 mots) — "Bonjour [prénom]," — CV en pièce jointe — terminer EXACTEMENT par "Auriez-vous des disponibilités pour en discuter ?\\n\\nExcellente journée,\\nMathias"\n\n# FORMAT — JSON UNIQUEMENT, sans backticks\n{\n  "coherenceWarning": null,\n  "coherenceNote": null,\n  "prospects": [\n    {\n      "company": "Nom",\n      "sector": "Secteur",\n      "targetContact": "Poste précis",\n      "matchReason": "2-3 phrases",\n      "email": { "subject": "Objet", "body": "Corps du mail" }\n    }\n  ]\n}`;
    try {
      const data = await callClaude({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, messages: [{ role: 'user', content: prompt }] }, apiKey);
      const text = data.content.filter(b => b.type === 'text').map(b => b.text).join('').replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      setWishResult(parsed); setWishExpanded(0);
      const entry = { id: Date.now(), date: new Date().toISOString(), type: 'wish', consultantName: c.name, consultantRole: c.role, wishText, result: parsed };
      saveHistory([entry, ...history]);
    } catch (e) { setWishError("Erreur : " + e.message); } finally { setWishLoading(false); }
  };

  return (
    <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", minHeight: '100vh', height: (view === 'matching' && results.length > 0) ? '100vh' : 'auto', overflow: (view === 'matching' && results.length > 0) ? 'hidden' : 'visible', background: '#FAF8F4' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .sans { font-family: 'Inter Tight', sans-serif; }
        .serif { font-family: 'Instrument Serif', Georgia, serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out; }
      `}</style>

      <header style={{ borderBottom: '1px solid #E8E2D5', padding: '24px 40px', background: '#FAF8F4', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1280, margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="sans" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500 }}>UX-Republic · Outil interne</div>
              <div className="sans" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: '#E8F0E2', color: '#4A6440' }}>
                ● Sauvegarde locale active
              </div>
            </div>
            <h1 className="serif" style={{ fontSize: 32, margin: '4px 0 0 0', color: '#1A1A1A', fontWeight: 400, letterSpacing: '-0.02em' }}>
              Push <em style={{ color: '#7A8C6F' }}>CV</em>
            </h1>
          </div>
          <nav style={{ display: 'flex', gap: 4 }} className="sans">
            {[
              { id: 'matching', label: 'Matching', icon: Sparkles },
              { id: 'pool', label: `Pool (${availableCount}/${consultants.length})`, icon: Briefcase },
              { id: 'history', label: `Historique (${history.length})`, icon: FileText },
              { id: 'reverse', label: 'Reverse', icon: Repeat2 },
              { id: 'suivi', label: 'Suivi', icon: (() => { const alerts = suivi.filter(s => s.statut === 'en_attente' && ((Date.now() - new Date(s.createdAt)) / 86400000) >= 7).length; return alerts > 0 ? () => <span style={{ position: 'relative' }}><FileText size={14} /><span style={{ position: 'absolute', top: -4, right: -6, background: '#C97B5C', color: '#fff', borderRadius: '50%', fontSize: 8, fontWeight: 700, width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{alerts}</span></span> : FileText; })() },
            ].map(item => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button key={item.id} onClick={() => setView(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: active ? '#1A1A1A' : 'transparent', color: active ? '#FAF8F4' : '#1A1A1A', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>
                  <Icon size={14} />{item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: (view === 'matching' && results.length > 0) ? '100%' : 1280, margin: '0 auto', padding: (view === 'matching' && results.length > 0) ? '0' : '40px', overflow: (view === 'matching' && results.length > 0) ? 'hidden' : 'visible' }}>
        {view === 'matching' && (
          <div style={results.length > 0 ? { display: 'grid', gridTemplateColumns: '420px 1fr', gap: 0, height: 'calc(100vh - 97px)' } : { maxWidth: 600, margin: '0 auto' }}>
            <section style={results.length > 0 ? { background: '#FFFFFF', borderRight: '1px solid #E8E2D5', padding: 32, overflowY: 'auto', height: '100%', boxSizing: 'border-box' } : { background: '#FFFFFF', borderRadius: 24, border: '1px solid #E8E2D5', padding: 32 }}>
              <div style={{ marginBottom: 24 }}>
                <h2 className="serif" style={{ fontSize: 26, margin: 0, color: '#1A1A1A', fontWeight: 400 }}>Nouveau prospect</h2>
                <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '4px 0 0 0' }}>Renseigne le contexte, je sélectionne les meilleurs profils.</p>
              </div>
              <FormField label="Entreprise" icon={Building2} value={company} onChange={setCompany} placeholder="Ex: BNP Paribas" required />
              <FormField label="Secteur" icon={Building2} value={sector} onChange={setSector} placeholder="Ex: Banque de détail" />
              <FormField label="Site web" icon={Globe} value={website} onChange={setWebsite} placeholder="Ex: bnpparibas.com" />
              <FormField label="Contexte (optionnel)" icon={MessageSquare} value={extraContext} onChange={setExtraContext} placeholder="Levée de fonds récente, refonte annoncée, problématique entendue..." textarea />
              <div style={{ marginBottom: 16 }}>
                <div className="sans" style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 500, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><User size={12} /> Contacts <span style={{ color: '#C97B5C' }}>*</span></span>
                  <button onClick={addContact} className="sans" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: '1px dashed #C9B99A', borderRadius: 999, padding: '4px 10px', fontSize: 11, color: '#7A8C6F', cursor: 'pointer', fontWeight: 500 }}>
                    <Plus size={11} /> Ajouter un contact
                  </button>
                </div>
                {contacts.map((c, idx) => (
                  <div key={c.id} style={{ background: '#FAF8F4', border: '1px solid #E8E2D5', borderRadius: 14, padding: '14px 14px 10px', marginBottom: 10, position: 'relative' }}>
                    {contacts.length > 1 && <button onClick={() => removeContact(c.id)} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#C97B5C', padding: 2 }}><X size={13} /></button>}
                    <div className="sans" style={{ fontSize: 10, letterSpacing: '0.12em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Contact {idx + 1}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                      <input value={c.name} onChange={e => updateContact(c.id, 'name', e.target.value)} placeholder="Prénom Nom" className="sans" style={{ padding: '8px 10px', border: '1px solid #E8E2D5', borderRadius: 10, fontSize: 12, background: '#FFFFFF', outline: 'none', fontFamily: "'Inter Tight', sans-serif" }} />
                      <input value={c.email} onChange={e => updateContact(c.id, 'email', e.target.value)} placeholder="email@entreprise.com" className="sans" style={{ padding: '8px 10px', border: '1px solid #E8E2D5', borderRadius: 10, fontSize: 12, background: '#FFFFFF', outline: 'none', fontFamily: "'Inter Tight', sans-serif" }} />
                    </div>
                    <input value={c.role} onChange={e => updateContact(c.id, 'role', e.target.value)} placeholder="Poste (ex: Head of Product) *" className="sans" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E8E2D5', borderRadius: 10, fontSize: 12, background: '#FFFFFF', outline: 'none', fontFamily: "'Inter Tight', sans-serif", boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
              {error && <div className="sans" style={{ display: 'flex', gap: 8, padding: 12, background: '#FEF2E8', border: '1px solid #F4C9A0', borderRadius: 12, color: '#9A4A1B', fontSize: 13, marginBottom: 16 }}><AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} /><span>{error}</span></div>}
              <button onClick={handleMatch} disabled={loading} className="sans" style={{ width: '100%', padding: '16px 24px', background: loading ? '#8B7E64' : '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: '0.02em', transition: 'all 0.2s' }}>
                {loading ? <><Loader2 size={16} className="spin" /> {loadingProgress.total > 1 ? `${loadingProgress.done}/${loadingProgress.total} contacts analysés…` : 'Analyse en cours…'}</> : <><Sparkles size={16} /> {contacts.filter(c=>c.role.trim()).length > 1 ? `Analyser les ${contacts.filter(c=>c.role.trim()).length} contacts` : 'Trouver les meilleurs profils'}</>}
              </button>
              <p className="sans" style={{ fontSize: 11, color: '#8B7E64', marginTop: 12, textAlign: 'center' }}>{availableCount} consultant{availableCount > 1 ? 's' : ''} disponible{availableCount > 1 ? 's' : ''} dans ton pool</p>
            </section>
            {results.length > 0 && (
              <div className="fade-in" style={{ overflowY: 'auto', height: '100%', padding: 32, boxSizing: 'border-box' }}>
                {results.length > 1 && (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    {results.map((r, i) => (
                      <button key={r.contactId} onClick={() => setActiveResultIdx(i)} className="sans" style={{ padding: '10px 18px', borderRadius: 999, border: activeResultIdx === i ? 'none' : '1px solid #E8E2D5', background: activeResultIdx === i ? '#1A1A1A' : '#FFFFFF', color: activeResultIdx === i ? '#FAF8F4' : '#1A1A1A', fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                        <User size={12} />{r.contactName || r.contactRole || `Contact ${i+1}`}
                        {r.contactRole && r.contactName && <span style={{ opacity: 0.6, fontSize: 11 }}>· {r.contactRole}</span>}
                      </button>
                    ))}
                  </div>
                )}
                <ResultsPanel result={result} consultants={consultants} copyToClipboard={copyToClipboard} copiedField={copiedField} contactEmail={contactEmail} photos={photos} />
              </div>
            )}
          </div>
        )}

        {view === 'pool' && (
          <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <h2 className="serif" style={{ fontSize: 36, margin: 0, fontWeight: 400, color: '#1A1A1A' }}>Pool de <em style={{ color: '#7A8C6F' }}>consultants</em></h2>
                <p className="sans" style={{ fontSize: 14, color: '#8B7E64', margin: '4px 0 0 0' }}>Active ou désactive les profils selon leurs disponibilités. Seuls les actifs sont matchés.</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={exportJSON} className="sans" title="Exporter un backup JSON" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'transparent', color: '#8B7E64', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}><Save size={13} /> Export</button>
                <button onClick={() => { setShowImportModal(true); setImportText(''); setImportError(''); }} className="sans" title="Importer un backup JSON" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'transparent', color: '#8B7E64', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}><FileText size={13} /> Import</button>
                <button onClick={exportJSON} className="sans" title="Export backup JSON" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: 'transparent', color: '#8B7E64', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}><FileText size={13} /> Export</button>
                <button onClick={() => setShowAddModal(true)} className="sans" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}><Plus size={16} /> Ajouter un consultant</button>
              </div>
            </div>
            <PoolStatus consultants={consultants} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
              {[...consultants].sort((a, b) => { if (a.status === 'intercontrat' && b.status !== 'intercontrat') return -1; if (b.status === 'intercontrat' && a.status !== 'intercontrat') return 1; return 0; }).map(c => (
                <ConsultantCard key={c.id} consultant={c} onToggle={() => toggleAvailability(c.id)} onToggleStatus={() => toggleStatus(c.id)} onRemove={() => removeConsultant(c.id)}
                  editingBookUrl={editingBookUrl} tempBookUrl={tempBookUrl} setTempBookUrl={setTempBookUrl} onStartEditBook={() => startEditBookUrl(c)} onSaveBook={() => saveBookUrl(c.id)} onCancelEditBook={() => { setEditingBookUrl(null); setTempBookUrl(''); }}
                  editingCvUrl={editingCvUrl} tempCvUrl={tempCvUrl} setTempCvUrl={setTempCvUrl} onStartEditCv={() => startEditCvUrl(c)} onSaveCv={() => saveCvUrl(c.id)} onCancelEditCv={() => { setEditingCvUrl(null); setTempCvUrl(''); }}
                  onPhotoChange={(id, base64) => {
                    const next = consultants.map(con => con.id === id ? { ...con, photoUrl: base64 } : con);
                    saveConsultants(next);
                    setPhotos(prev => ({ ...prev, [id]: base64 }));
                  }}
                  photoSrc={photos[c.id]} />
              ))}
            </div>
          </div>
        )}

        {view === 'history' && (
          <div className="fade-in">
            <h2 className="serif" style={{ fontSize: 36, margin: '0 0 24px 0', fontWeight: 400, color: '#1A1A1A' }}>Historique <em style={{ color: '#7A8C6F' }}>des prospections</em></h2>
            {history.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', background: '#FFFFFF', borderRadius: 24, border: '1px solid #E8E2D5' }}>
                <p className="sans" style={{ color: '#8B7E64', fontSize: 14 }}>Aucune prospection encore. Lance ton premier matching !</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {history.map(h => (
                  <HistoryEntry key={h.id} entry={h} onClick={() => {
                    if (h.type === 'reverse' || h.type === 'wish') {
                      const consultant = consultants.find(c => c.name === h.consultantName);
                      if (consultant) setReverseConsultant(consultant);
                      if (h.type === 'reverse') { setReverseResult(h.result); setReverseExpanded(0); }
                      if (h.type === 'wish') { setWishText(h.wishText || ''); setWishResult(h.result); setWishExpanded(0); }
                      setView('reverse');
                    } else {
                      if (h.results) { setResults(h.results); setActiveResultIdx(0); }
                      else if (h.result) { setResults([{ ...h.result, contactId: 0, contactName: h.contactName, contactRole: h.contactRole }]); setActiveResultIdx(0); }
                      setView('matching');
                    }
                  }} />
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'reverse' && (
          <div className="fade-in">
            <h2 className="serif" style={{ fontSize: 36, margin: '0 0 8px 0', fontWeight: 400, color: '#1A1A1A' }}>Reverse <em style={{ color: '#7A8C6F' }}>match</em></h2>
            <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '0 0 28px 0' }}>Sélectionne un consultant — l'IA identifie 5 entreprises à prospecter pour son profil.</p>
            <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E2D5', padding: 24, marginBottom: 24 }}>
              <div className="sans" style={{ fontSize: 12, fontWeight: 500, color: '#8B7E64', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Consultant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {consultants.map(c => (
                  <button key={c.id} onClick={() => { setReverseConsultant(c); setReverseResult(null); setReverseError(null); }} className="sans"
                    style={{ padding: '8px 14px', borderRadius: 999, border: reverseConsultant?.id === c.id ? 'none' : '1px solid #E8E2D5', background: reverseConsultant?.id === c.id ? '#1A1A1A' : '#FAF8F4', color: reverseConsultant?.id === c.id ? '#FAF8F4' : '#1A1A1A', fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {c.name.split(' ')[0]}
                    <span style={{ opacity: 0.5, fontSize: 10, background: c.status === 'intercontrat' ? '#C8DFC0' : '#E8E2D5', color: c.status === 'intercontrat' ? '#2A4A22' : '#6B5E4C', padding: '2px 6px', borderRadius: 999 }}>{c.status === 'intercontrat' ? 'IC' : 'V'}</span>
                  </button>
                ))}
              </div>
              {reverseConsultant && (
                <div style={{ marginTop: 16, padding: '12px 16px', background: '#FAF8F4', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="sans" style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{reverseConsultant.name}</div>
                    <div className="sans" style={{ fontSize: 12, color: '#8B7E64' }}>{reverseConsultant.role} · {reverseConsultant.experience}</div>
                  </div>
                  <button onClick={handleReverse} disabled={reverseLoading} className="sans" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: reverseLoading ? '#E8E2D5' : '#1A1A1A', color: reverseLoading ? '#8B7E64' : '#FAF8F4', border: 'none', borderRadius: 999, cursor: reverseLoading ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 500 }}>
                    {reverseLoading ? <><Loader2 size={15} className="spin" /> Analyse en cours…</> : <><Repeat2 size={15} /> Trouver des prospects</>}
                  </button>
                </div>
              )}
            </div>
            {reverseError && <div style={{ padding: 16, background: '#FEF2E8', borderRadius: 14, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}><AlertCircle size={16} color="#C97B5C" /><span className="sans" style={{ fontSize: 13, color: '#C97B5C' }}>{reverseError}</span></div>}
            {reverseResult && (
              <div className="fade-in">
                <div style={{ padding: '14px 20px', background: '#E8F0E2', borderRadius: 14, marginBottom: 24 }}>
                  <p className="sans" style={{ fontSize: 13, color: '#2A4A22', margin: 0 }}>{reverseResult.consultantSummary}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(reverseResult.prospects || []).map((p, i) => (
                    <div key={i} style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E2D5', overflow: 'hidden' }}>
                      <button onClick={() => setReverseExpanded(reverseExpanded === i ? null : i)} style={{ width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div className="sans" style={{ width: 28, height: 28, borderRadius: '50%', background: '#F4F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#8B7E64', flexShrink: 0 }}>{i+1}</div>
                          <div>
                            <div className="sans" style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{p.company}</div>
                            <div className="sans" style={{ fontSize: 12, color: '#8B7E64' }}>{p.sector} · À contacter : {p.targetContact}</div>
                          </div>
                        </div>
                        {reverseExpanded === i ? <ChevronUp size={16} color="#8B7E64" /> : <ChevronDown size={16} color="#8B7E64" />}
                      </button>
                      {reverseExpanded === i && (
                        <div style={{ padding: '0 24px 24px', borderTop: '1px solid #F4F1E8' }}>
                          <p className="sans" style={{ fontSize: 13, color: '#4A3F30', margin: '16px 0 16px', lineHeight: 1.6 }}>{p.matchReason}</p>
                          <ProspectSearchLinks company={p.company} targetContact={p.targetContact} />
                          <div style={{ background: '#FAF8F4', borderRadius: 14, padding: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                              <div className="sans" style={{ fontSize: 11, fontWeight: 600, color: '#8B7E64', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mail prêt à envoyer</div>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => { navigator.clipboard.writeText(`Objet : ${p.email.subject}\n\n${p.email.body}`); setCopiedField(`rev-${i}`); setTimeout(() => setCopiedField(null), 2000); }} className="sans" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: copiedField === `rev-${i}` ? '#E8F0E2' : '#FFFFFF', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 11, fontWeight: 500, color: copiedField === `rev-${i}` ? '#4A6440' : '#1A1A1A' }}>{copiedField === `rev-${i}` ? <><Check size={11} /> Copié</> : <><Copy size={11} /> Copier</>}</button>
                                <a href={`https://mail.google.com/mail/?view=cm&to=&su=${encodeURIComponent(p.email.subject)}&body=${encodeURIComponent(p.email.body)}`} target="_blank" rel="noreferrer" className="sans" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#1A1A1A', color: '#FAF8F4', borderRadius: 999, textDecoration: 'none', fontSize: 11, fontWeight: 500 }}><Mail size={11} /> Gmail</a>
                              </div>
                            </div>
                            <div className="sans" style={{ fontSize: 12, color: '#8B7E64', marginBottom: 6 }}>Objet : <strong style={{ color: '#1A1A1A' }}>{p.email.subject}</strong></div>
                            <div className="sans" style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{p.email.body}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reverseConsultant && (
              <div style={{ marginTop: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, margin: 0, color: '#1A1A1A' }}>Souhaits <em style={{ color: '#C97B5C' }}>du consultant</em></h3>
                </div>
                <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '0 0 16px 0' }}>Secteurs visés, entreprises citées, envies exprimées… Claude croise avec son profil réel.</p>
                <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E2D5', padding: 24, marginBottom: 20 }}>
                  <textarea value={wishText} onChange={e => setWishText(e.target.value)} placeholder={'Ex : "Il aimerait travailler dans le luxe, il a mentionné LVMH et Kering. Intéressé aussi par les scale-ups tech B2B."'} className="sans" rows={4} style={{ width: '100%', padding: '12px 14px', border: '1px solid #E8E2D5', borderRadius: 14, fontSize: 13, resize: 'vertical', outline: 'none', fontFamily: "'Inter Tight', sans-serif", lineHeight: 1.6, background: '#FAF8F4', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <button onClick={handleWish} disabled={wishLoading || !wishText.trim()} className="sans" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: (wishLoading || !wishText.trim()) ? '#E8E2D5' : '#C97B5C', color: (wishLoading || !wishText.trim()) ? '#8B7E64' : '#FFFFFF', border: 'none', borderRadius: 999, cursor: (wishLoading || !wishText.trim()) ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 500 }}>
                      {wishLoading ? <><Loader2 size={15} className="spin" /> Analyse en cours…</> : <><Sparkles size={15} /> Analyser les souhaits</>}
                    </button>
                  </div>
                </div>
                {wishError && <div style={{ padding: 16, background: '#FEF2E8', borderRadius: 14, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}><AlertCircle size={16} color="#C97B5C" /><span className="sans" style={{ fontSize: 13, color: '#C97B5C' }}>{wishError}</span></div>}
                {wishResult && (
                  <div className="fade-in">
                    {wishResult.coherenceNote && <div style={{ padding: '14px 18px', background: '#FFF8EC', border: '1px solid #F0D9A8', borderRadius: 14, marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}><AlertCircle size={15} color="#B8860B" style={{ marginTop: 1, flexShrink: 0 }} /><span className="sans" style={{ fontSize: 13, color: '#7A5C00', lineHeight: 1.6 }}>{wishResult.coherenceNote}</span></div>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {(wishResult.prospects || []).map((p, i) => (
                        <div key={i} style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E2D5', overflow: 'hidden' }}>
                          <button onClick={() => setWishExpanded(wishExpanded === i ? null : i)} style={{ width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                              <div className="sans" style={{ width: 28, height: 28, borderRadius: '50%', background: '#FEF2E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#C97B5C', flexShrink: 0 }}>{i+1}</div>
                              <div>
                                <div className="sans" style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{p.company}</div>
                                <div className="sans" style={{ fontSize: 12, color: '#8B7E64' }}>{p.sector} · À contacter : {p.targetContact}</div>
                              </div>
                            </div>
                            {wishExpanded === i ? <ChevronUp size={16} color="#8B7E64" /> : <ChevronDown size={16} color="#8B7E64" />}
                          </button>
                          {wishExpanded === i && (
                            <div style={{ padding: '0 24px 24px', borderTop: '1px solid #F4F1E8' }}>
                              <p className="sans" style={{ fontSize: 13, color: '#4A3F30', margin: '16px 0 16px', lineHeight: 1.6 }}>{p.matchReason}</p>
                              <ProspectSearchLinks company={p.company} targetContact={p.targetContact} />
                              <div style={{ background: '#FAF8F4', borderRadius: 14, padding: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                  <div className="sans" style={{ fontSize: 11, fontWeight: 600, color: '#8B7E64', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mail prêt à envoyer</div>
                                  <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => { navigator.clipboard.writeText(`Objet : ${p.email.subject}\n\n${p.email.body}`); setCopiedField(`wish-${i}`); setTimeout(() => setCopiedField(null), 2000); }} className="sans" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: copiedField === `wish-${i}` ? '#E8F0E2' : '#FFFFFF', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 11, fontWeight: 500, color: copiedField === `wish-${i}` ? '#4A6440' : '#1A1A1A' }}>{copiedField === `wish-${i}` ? <><Check size={11} /> Copié</> : <><Copy size={11} /> Copier</>}</button>
                                    <a href={`https://mail.google.com/mail/?view=cm&to=&su=${encodeURIComponent(p.email.subject)}&body=${encodeURIComponent(p.email.body)}`} target="_blank" rel="noreferrer" className="sans" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#1A1A1A', color: '#FAF8F4', borderRadius: 999, textDecoration: 'none', fontSize: 11, fontWeight: 500 }}><Mail size={11} /> Gmail</a>
                                  </div>
                                </div>
                                <div className="sans" style={{ fontSize: 12, color: '#8B7E64', marginBottom: 6 }}>Objet : <strong style={{ color: '#1A1A1A' }}>{p.email.subject}</strong></div>
                                <div className="sans" style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{p.email.body}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {view === 'suivi' && (
          <SuiviView suivi={suivi} consultants={consultants} saveSuivi={saveSuivi} photos={photos} />
        )}
      </main>

      {/* Export modal */}
      {showExportModal && (
        <div onClick={() => setShowExportModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: 24, padding: 32, maxWidth: 640, width: '90%', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 400 }}>Export backup</h3>
              <button onClick={() => setShowExportModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7E64' }}><X size={20} /></button>
            </div>
            <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '0 0 16px 0' }}>Copie ce JSON et colle-le dans un fichier <code style={{ background: '#F4F1E8', padding: '1px 5px', borderRadius: 4 }}>push-cv-backup.json</code> sur ton ordi.</p>
            <textarea
              readOnly
              value={JSON.stringify({ consultants, history, savedAt: new Date().toISOString() }, null, 2)}
              className="sans"
              style={{ flex: 1, minHeight: 300, padding: 12, border: '1px solid #E8E2D5', borderRadius: 12, fontSize: 11, fontFamily: 'monospace', background: '#FAF8F4', resize: 'none', outline: 'none', color: '#3A3A3A' }}
            />
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button onClick={() => setShowExportModal(false)} className="sans" style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 13 }}>Fermer</button>
              <button onClick={() => { navigator.clipboard.writeText(JSON.stringify({ consultants, history, savedAt: new Date().toISOString() }, null, 2)); setExportCopied(true); setTimeout(() => setExportCopied(false), 2000); }} className="sans" style={{ flex: 2, padding: '12px', background: exportCopied ? '#7A8C6F' : '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {exportCopied ? <><Check size={14} /> Copié !</> : <><Copy size={14} /> Copier le JSON</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import modal */}
      {showImportModal && (
        <div onClick={() => setShowImportModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: 24, padding: 32, maxWidth: 640, width: '90%', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 400 }}>Import backup</h3>
              <button onClick={() => setShowImportModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7E64' }}><X size={20} /></button>
            </div>
            <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '0 0 16px 0' }}>Colle ici le contenu de ton fichier <code style={{ background: '#F4F1E8', padding: '1px 5px', borderRadius: 4 }}>push-cv-backup.json</code>.</p>
            <textarea
              value={importText}
              onChange={e => { setImportText(e.target.value); setImportError(''); }}
              placeholder='{ "consultants": [...], "history": [...] }'
              className="sans"
              style={{ flex: 1, minHeight: 260, padding: 12, border: '1px solid #E8E2D5', borderRadius: 12, fontSize: 11, fontFamily: 'monospace', background: '#FAF8F4', resize: 'none', outline: 'none', color: '#3A3A3A' }}
            />
            {importError && <div className="sans" style={{ marginTop: 10, padding: '10px 12px', background: '#FEF2E8', border: '1px solid #F4C9A0', borderRadius: 10, color: '#9A4A1B', fontSize: 12 }}>{importError}</div>}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button onClick={() => setShowImportModal(false)} className="sans" style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 13 }}>Annuler</button>
              <button onClick={handleImportText} disabled={!importText.trim()} className="sans" style={{ flex: 2, padding: '12px', background: !importText.trim() ? '#E8E2D5' : '#1A1A1A', color: !importText.trim() ? '#8B7E64' : '#FAF8F4', border: 'none', borderRadius: 999, cursor: !importText.trim() ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <FileText size={14} /> Importer
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div onClick={() => !parsing && setShowAddModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: 24, padding: 32, maxWidth: 600, width: '90%', maxHeight: '85vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400 }}>Ajouter un consultant</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7E64' }}><X size={20} /></button>
            </div>
            <p className="sans" style={{ fontSize: 13, color: '#8B7E64', marginBottom: 20 }}>Colle le contenu du CV (texte brut depuis le PDF). L'IA extrait automatiquement les infos clés.</p>
            <FormField label="Nom du consultant" icon={User} value={newConsultantName} onChange={setNewConsultantName} placeholder="Ex: Sophie Martin" required />
            <label className="sans" style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 500, marginBottom: 6, display: 'block', letterSpacing: '0.02em' }}>Contenu du CV</label>
            <textarea value={newConsultantText} onChange={e => setNewConsultantText(e.target.value)} placeholder="Colle ici le texte du CV..." className="sans" style={{ width: '100%', minHeight: 240, padding: 12, border: '1px solid #E8E2D5', borderRadius: 12, fontSize: 13, fontFamily: "'Inter Tight', sans-serif", marginBottom: 20, resize: 'vertical', background: '#FAF8F4' }} />
            {error && <div className="sans" style={{ padding: 12, background: '#FEF2E8', border: '1px solid #F4C9A0', borderRadius: 12, color: '#9A4A1B', fontSize: 13, marginBottom: 16 }}>{error}</div>}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowAddModal(false)} disabled={parsing} className="sans" style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 13 }}>Annuler</button>
              <button onClick={parseNewConsultant} disabled={parsing} className="sans" style={{ flex: 2, padding: '12px', background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {parsing ? <><Loader2 size={14} className="spin" /> Analyse du CV...</> : <><Sparkles size={14} /> Ajouter au pool</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const STATUTS = [
  { id: 'en_attente', label: 'En attente', color: '#8B7E64', bg: '#F4F1E8', emoji: '📤' },
  { id: 'entretien', label: 'Entretien client', color: '#2A6455', bg: '#E8F4F0', emoji: '🤝' },
  { id: 'closing', label: 'Closing', color: '#9A6E1B', bg: '#FFF8EC', emoji: '⏳' },
  { id: 'place', label: 'Placé · Mission démarrée', color: '#4A6440', bg: '#E8F0E2', emoji: '✅' },
];

function SuiviView({ suivi, consultants, saveSuivi, photos }) {
  const [viewMode, setViewMode] = useState('envois'); // 'envois' | 'consultants'
  const [editingId, setEditingId] = useState(null);
  const [editStatut, setEditStatut] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const ALERT_DAYS = 7;

  const now = Date.now();
  const daysSince = (dateStr) => Math.floor((now - new Date(dateStr)) / 86400000);
  const isAlert = (s) => s.statut === 'en_attente' && daysSince(s.createdAt) >= ALERT_DAYS;

  const startEdit = (s) => { setEditingId(s.id); setEditStatut(s.statut); setEditNotes(s.notes || ''); };
  const saveEdit = (id) => {
    saveSuivi(suivi.map(s => s.id === id ? { ...s, statut: editStatut, notes: editNotes, updatedAt: new Date().toISOString() } : s));
    setEditingId(null);
  };
  const deleteSuivi = (id) => { if (confirm('Supprimer cette fiche de suivi ?')) saveSuivi(suivi.filter(s => s.id !== id)); };

  // Vue par consultant — agréger les envois
  const byConsultant = {};
  suivi.forEach(s => {
    (s.consultants || []).forEach(c => {
      if (!byConsultant[c.id]) byConsultant[c.id] = { consultantId: c.id, consultantName: c.name, envois: [] };
      byConsultant[c.id].envois.push({ ...s, matchScore: c.score });
    });
  });
  const consultantsList = Object.values(byConsultant).sort((a, b) => a.consultantName.localeCompare(b.consultantName));

  const alertCount = suivi.filter(isAlert).length;

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h2 className="serif" style={{ fontSize: 36, margin: 0, fontWeight: 400, color: '#1A1A1A' }}>
            Suivi <em style={{ color: '#7A8C6F' }}>des envois</em>
          </h2>
          <p className="sans" style={{ fontSize: 14, color: '#8B7E64', margin: '4px 0 0 0' }}>
            {suivi.length} fiche{suivi.length > 1 ? 's' : ''} · {suivi.filter(s => s.statut === 'place').length} placé{suivi.filter(s => s.statut === 'place').length > 1 ? 's' : ''}
            {alertCount > 0 && <span style={{ marginLeft: 10, padding: '2px 10px', background: '#FEF2E8', border: '1px solid #F4C9A0', color: '#C97B5C', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>⚠ {alertCount} en attente +{ALERT_DAYS}j</span>}
          </p>
        </div>
        {/* Toggle vue */}
        <div style={{ display: 'flex', background: '#F4F1E8', borderRadius: 999, padding: 4, gap: 4 }}>
          {[{ id: 'envois', label: 'Par envoi' }, { id: 'consultants', label: 'Par consultant' }].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)} className="sans" style={{ padding: '8px 16px', borderRadius: 999, border: 'none', background: viewMode === v.id ? '#1A1A1A' : 'transparent', color: viewMode === v.id ? '#FAF8F4' : '#8B7E64', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{v.label}</button>
          ))}
        </div>
      </div>

      {/* Kanban statuts summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        {STATUTS.map(st => {
          const count = suivi.filter(s => s.statut === st.id).length;
          return (
            <div key={st.id} style={{ background: st.bg, borderRadius: 16, padding: '16px 20px', border: `1px solid ${st.color}22` }}>
              <div className="sans" style={{ fontSize: 20, marginBottom: 4 }}>{st.emoji}</div>
              <div className="sans" style={{ fontSize: 24, fontWeight: 700, color: st.color }}>{count}</div>
              <div className="sans" style={{ fontSize: 12, color: st.color, fontWeight: 500 }}>{st.label}</div>
            </div>
          );
        })}
      </div>

      {suivi.length === 0 ? (
        <div style={{ padding: 60, textAlign: 'center', background: '#FFFFFF', borderRadius: 24, border: '1px solid #E8E2D5' }}>
          <p className="sans" style={{ color: '#8B7E64', fontSize: 14 }}>Aucun suivi encore. Lance un matching — les fiches sont créées automatiquement.</p>
        </div>
      ) : viewMode === 'envois' ? (
        // Vue par envoi
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {suivi.map(s => {
            const statut = STATUTS.find(st => st.id === s.statut) || STATUTS[0];
            const alert = isAlert(s);
            const isExpanded = expandedId === s.id;
            const isEditing = editingId === s.id;
            return (
              <div key={s.id} style={{ background: '#FFFFFF', borderRadius: 20, border: alert ? '2px solid #F4C9A0' : '1px solid #E8E2D5', overflow: 'hidden' }}>
                {/* Header carte */}
                <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }} onClick={() => !isEditing && setExpandedId(isExpanded ? null : s.id)}>
                  {/* Statut badge */}
                  <span style={{ padding: '4px 12px', background: statut.bg, color: statut.color, borderRadius: 999, fontSize: 11, fontWeight: 600, fontFamily: "'Inter Tight', sans-serif", flexShrink: 0, whiteSpace: 'nowrap' }}>{statut.emoji} {statut.label}</span>
                  {/* Infos */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="sans" style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{s.company}{s.contact?.name ? <span style={{ fontWeight: 400, color: '#8B7E64' }}> · {s.contact.name}</span> : ''}</div>
                    <div className="sans" style={{ fontSize: 12, color: '#8B7E64', marginTop: 2 }}>
                      {s.contact?.role && <span>{s.contact.role} · </span>}
                      {(s.consultants || []).map(c => c.name.split(' ')[0]).join(', ')}
                      <span style={{ marginLeft: 8 }}>· {new Date(s.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                      {alert && <span style={{ marginLeft: 8, color: '#C97B5C', fontWeight: 600 }}>⚠ +{daysSince(s.createdAt)}j sans réponse</span>}
                    </div>
                  </div>
                  {/* Avatars consultants */}
                  <div style={{ display: 'flex', gap: -4 }}>
                    {(s.consultants || []).map(c => {
                      const fullC = consultants.find(fc => fc.id === c.id) || { name: c.name, photoUrl: '' };
                      return <div key={c.id} style={{ marginLeft: -6 }}><ConsultantAvatar consultant={fullC} size={28} photoSrc={photos?.[fullC.id]} /></div>;
                    })}
                  </div>
                  {isExpanded ? <ChevronUp size={16} color="#8B7E64" style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="#8B7E64" style={{ flexShrink: 0 }} />}
                </div>

                {/* Corps déplié */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid #F4F1E8' }}>
                    {isEditing ? (
                      <div style={{ marginTop: 16 }}>
                        {/* Sélecteur statut */}
                        <div className="sans" style={{ fontSize: 11, fontWeight: 600, color: '#8B7E64', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Statut</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                          {STATUTS.map(st => (
                            <button key={st.id} onClick={() => setEditStatut(st.id)} className="sans" style={{ padding: '8px 14px', borderRadius: 999, border: editStatut === st.id ? 'none' : '1px solid #E8E2D5', background: editStatut === st.id ? st.color : '#FAF8F4', color: editStatut === st.id ? '#FFFFFF' : '#3A3A3A', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{st.emoji} {st.label}</button>
                          ))}
                        </div>
                        <div className="sans" style={{ fontSize: 11, fontWeight: 600, color: '#8B7E64', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Notes</div>
                        <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Retour du client, date d'entretien, conditions du closing..." className="sans" rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E8E2D5', borderRadius: 12, fontSize: 13, resize: 'vertical', outline: 'none', fontFamily: "'Inter Tight', sans-serif", background: '#FAF8F4', boxSizing: 'border-box' }} />
                        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                          <button onClick={() => setEditingId(null)} className="sans" style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', fontSize: 13 }}>Annuler</button>
                          <button onClick={() => saveEdit(s.id)} className="sans" style={{ flex: 2, padding: '10px', background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Enregistrer</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginTop: 16 }}>
                        {/* Consultants envoyés */}
                        <div className="sans" style={{ fontSize: 11, fontWeight: 600, color: '#8B7E64', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Consultants envoyés</div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                          {(s.consultants || []).map(c => {
                            const fullC = consultants.find(fc => fc.id === c.id) || { name: c.name, photoUrl: '' };
                            return (
                              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#F4F1E8', borderRadius: 999, border: '1px solid #E8E2D5' }}>
                                <ConsultantAvatar consultant={fullC} size={20} photoSrc={photos?.[fullC.id]} />
                                <span className="sans" style={{ fontSize: 12, fontWeight: 500, color: '#1A1A1A' }}>{c.name}</span>
                                {c.score && <span className="sans" style={{ fontSize: 11, color: '#8B7E64' }}>{c.score}%</span>}
                              </div>
                            );
                          })}
                        </div>
                        {/* Contact */}
                        {s.contact?.email && <div className="sans" style={{ fontSize: 12, color: '#8B7E64', marginBottom: 12 }}>✉ <a href={`mailto:${s.contact.email}`} style={{ color: '#7A8C6F' }}>{s.contact.email}</a></div>}
                        {/* Notes */}
                        {s.notes && <div style={{ padding: '10px 14px', background: '#FFF8EC', border: '1px solid #F0D9A8', borderRadius: 10, marginBottom: 12 }}><p className="sans" style={{ fontSize: 13, color: '#3A3A3A', margin: 0, lineHeight: 1.6 }}>{s.notes}</p></div>}
                        <div className="sans" style={{ fontSize: 11, color: '#B5A990', marginBottom: 12 }}>Mis à jour le {new Date(s.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={(e) => { e.stopPropagation(); startEdit(s); }} className="sans" style={{ flex: 2, padding: '10px', background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Edit3 size={13} /> Modifier le statut</button>
                          <button onClick={(e) => { e.stopPropagation(); deleteSuivi(s.id); }} className="sans" style={{ padding: '10px 14px', background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 999, cursor: 'pointer', color: '#C97B5C' }}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Vue par consultant
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {consultantsList.map(({ consultantId, consultantName, envois }) => {
            const fullC = consultants.find(c => c.id === consultantId) || { name: consultantName, photoUrl: '', role: '', experience: '' };
            const statutCounts = STATUTS.map(st => ({ ...st, count: envois.filter(e => e.statut === st.id).length })).filter(st => st.count > 0);
            const hasAlert = envois.some(isAlert);
            return (
              <div key={consultantId} style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: hasAlert ? '2px solid #F4C9A0' : '1px solid #E8E2D5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <ConsultantAvatar consultant={fullC} size={44} photoSrc={photos?.[fullC.id]} />
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 20, fontWeight: 400, color: '#1A1A1A' }}>{consultantName}</div>
                    <div className="sans" style={{ fontSize: 12, color: '#8B7E64' }}>{fullC.role} · {envois.length} envoi{envois.length > 1 ? 's' : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {statutCounts.map(st => (
                      <span key={st.id} className="sans" style={{ padding: '4px 10px', background: st.bg, color: st.color, borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{st.emoji} {st.count}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {envois.map(e => {
                    const st = STATUTS.find(s => s.id === e.statut) || STATUTS[0];
                    const alert = isAlert(e);
                    return (
                      <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#FAF8F4', borderRadius: 12, border: alert ? '1px solid #F4C9A0' : '1px solid #F0EDE3' }}>
                        <span style={{ padding: '3px 10px', background: st.bg, color: st.color, borderRadius: 999, fontSize: 10, fontWeight: 600, fontFamily: "'Inter Tight', sans-serif", flexShrink: 0 }}>{st.emoji} {st.label}</span>
                        <div style={{ flex: 1 }}>
                          <span className="sans" style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{e.company}</span>
                          {e.contact?.role && <span className="sans" style={{ fontSize: 12, color: '#8B7E64' }}> · {e.contact.role}</span>}
                        </div>
                        <span className="sans" style={{ fontSize: 11, color: '#8B7E64', flexShrink: 0 }}>{new Date(e.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                        {alert && <span className="sans" style={{ fontSize: 11, color: '#C97B5C', fontWeight: 600 }}>+{daysSince(e.createdAt)}j</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ConsultantAvatar({ consultant, size = 48, onPhotoChange, photoSrc }) {
  const [hovering, setHovering] = useState(false);
  const inputRef = React.useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX = 200;
        const ratio = Math.min(MAX / img.width, MAX / img.height);
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        try { storage.set(`photo:${consultant.id}`, base64); } catch (err) { console.error('Photo save error:', err); }
        if (onPhotoChange) onPhotoChange(consultant.id, base64);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const initials = consultant.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = [
    ['#E8F0E2', '#4A6440'], ['#FFF8EC', '#9A6E1B'], ['#F0EDE3', '#6B5E4C'],
    ['#FEF2E8', '#C97B5C'], ['#E8F4F0', '#2A6455'], ['#F4F0E8', '#7A6040'],
    ['#EDF0F8', '#3A4A7A'], ['#F8EDF0', '#7A3A4A'],
  ];
  const [bg, fg] = colors[consultant.name.charCodeAt(0) % colors.length];

  return (
    <div
      style={{ position: 'relative', width: size, height: size, flexShrink: 0, cursor: onPhotoChange ? 'pointer' : 'default' }}
      onMouseEnter={() => onPhotoChange && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => onPhotoChange && inputRef.current?.click()}
      title={onPhotoChange ? 'Cliquer pour changer la photo' : ''}
    >
      {photoSrc ? (
        <img src={photoSrc} alt={consultant.name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '2px solid #F0EDE3', display: 'block' }} />
      ) : (
        <div style={{ width: size, height: size, borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, fontFamily: "'Inter Tight', sans-serif", border: `2px solid ${bg}`, letterSpacing: '0.02em' }}>
          {initials}
        </div>
      )}
      {onPhotoChange && hovering && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={size * 0.35} height={size * 0.35} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
      )}
      {onPhotoChange && <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />}
    </div>
  );
}

function FormField({ label, icon: Icon, value, onChange, placeholder, required, textarea }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label className="sans" style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 500, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.02em' }}>
        <Icon size={12} />{label}{required && <span style={{ color: '#C97B5C' }}>*</span>}
      </label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="sans" rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E8E2D5', borderRadius: 12, fontSize: 13, fontFamily: "'Inter Tight', sans-serif", background: '#FAF8F4', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#7A8C6F'} onBlur={e => e.target.style.borderColor = '#E8E2D5'} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="sans" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E8E2D5', borderRadius: 12, fontSize: 13, fontFamily: "'Inter Tight', sans-serif", background: '#FAF8F4', outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#7A8C6F'} onBlur={e => e.target.style.borderColor = '#E8E2D5'} />
      )}
    </div>
  );
}

function ResultsPanel({ result, consultants, copyToClipboard, copiedField, contactEmail, photos }) {
  const allScores = result.allScores || [];
  const intercontratScores = allScores.filter(s => s.status === 'intercontrat');
  const vivierScores = allScores.filter(s => s.status === 'vivier');
  const recipient = contactEmail || '';
  const encodedSubject = encodeURIComponent(result.email.subject);
  const encodedBody = encodeURIComponent(result.email.body);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodedSubject}&body=${encodedBody}`;
  const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodedSubject}&body=${encodedBody}`;
  const selectedConsultantsWithCv = result.matches.map(m => consultants.find(c => c.id === m.consultantId)).filter(c => c && c.cvUrl);
  const selectedWithoutCv = result.matches.map(m => consultants.find(c => c.id === m.consultantId)).filter(c => c && !c.cvUrl);
  const openAllCvTabs = () => { selectedConsultantsWithCv.forEach((c, i) => { setTimeout(() => window.open(c.cvUrl, '_blank', 'noopener,noreferrer'), i * 100); }); };

  return (
    <section className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 28, border: '1px solid #E8E2D5' }}>
        <div className="sans" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Analyse du prospect</div>
        <p className="serif" style={{ fontSize: 19, lineHeight: 1.5, margin: 0, color: '#1A1A1A', fontStyle: 'italic' }}>« {result.prospectAnalysis} »</p>
        <div className="sans" style={{ fontSize: 12, color: '#8B7E64', marginTop: 12, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ padding: '4px 10px', background: '#F0EDE3', borderRadius: 999, fontWeight: 500, color: '#1A1A1A' }}>Angle : {result.selectedAngle.replace('_', ' ')}</span>
          <span>— {result.angleReason}</span>
        </div>
        {result.selectionStrategy && (
          <div className="sans" style={{ fontSize: 13, color: '#3A3A3A', marginTop: 14, padding: '12px 14px', background: '#FFF8EC', border: '1px solid #F4D9A6', borderRadius: 12, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14 }}>🎯</span>
            <div><div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A6E1B', fontWeight: 600, marginBottom: 2 }}>Stratégie de sélection</div>{result.selectionStrategy}</div>
          </div>
        )}
      </div>

      <div>
        <h3 className="serif" style={{ fontSize: 24, margin: '0 0 16px 0', fontWeight: 400, color: '#1A1A1A' }}>Profils <em style={{ color: '#7A8C6F' }}>recommandés</em></h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {result.matches.map((match, i) => {
            const consultant = consultants.find(c => c.id === match.consultantId);
            const isInter = (match.status || consultant?.status) === 'intercontrat';
            return (
              <div key={match.consultantId} style={{ background: '#FFFFFF', borderRadius: 24, padding: 28, border: isInter ? '2px solid #E89B4E' : '1px solid #E8E2D5', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14, flex: 1 }}>
                    {consultant && <ConsultantAvatar consultant={consultant} size={56} photoSrc={photos?.[consultant?.id]} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                        <div className="sans" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#7A8C6F', textTransform: 'uppercase', fontWeight: 600 }}>Match #{i + 1}</div>
                        <span className="sans" style={{ padding: '3px 8px', background: isInter ? '#E89B4E' : '#8B7E64', color: '#FFFFFF', borderRadius: 999, fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{isInter ? '🔥 Intercontrat · Dispo immédiate' : '🌱 Vivier'}</span>
                      </div>
                      <h4 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 400, color: '#1A1A1A' }}>{match.consultantName}</h4>
                      <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '2px 0 0 0' }}>{consultant?.role} · {consultant?.experience}</p>
                      {consultant?.bookUrl && <a href={consultant.bookUrl} target="_blank" rel="noopener noreferrer" className="sans" style={{ fontSize: 12, color: '#7A8C6F', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, textDecoration: 'none' }}><Link2 size={11} /> Voir le book</a>}
                    </div>
                  </div>
                  <div style={{ background: '#1A1A1A', color: '#FAF8F4', padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, fontFamily: "'Inter Tight', sans-serif", flexShrink: 0 }}>{match.matchScore}% match</div>
                </div>
                <p className="sans" style={{ fontSize: 14, lineHeight: 1.6, color: '#3A3A3A', marginBottom: 16 }}>{match.whyThisMatch}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {match.topStrengths.map((s, j) => <span key={j} className="sans" style={{ padding: '6px 12px', background: '#F4F1E8', color: '#1A1A1A', borderRadius: 999, fontSize: 12, fontWeight: 500, border: '1px solid #E8E2D5' }}>{s}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {allScores.length > 0 && <ScoreTransparency intercontratScores={intercontratScores} vivierScores={vivierScores} />}

      <div style={{ background: '#1A1A1A', borderRadius: 24, padding: 32, color: '#FAF8F4' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mail size={16} style={{ color: '#A8B89C' }} />
            <span className="sans" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#A8B89C', textTransform: 'uppercase', fontWeight: 500 }}>Email de prospection</span>
          </div>
          <button onClick={() => copyToClipboard(`Objet: ${result.email.subject}\n\n${result.email.body}`, 'full-email')} className="sans" style={{ background: 'transparent', color: '#A8B89C', border: '1px solid rgba(168,184,156,0.3)', padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
            {copiedField === 'full-email' ? <><Check size={11} /> Copié</> : <><Copy size={11} /> Copier</>}
          </button>
        </div>
        {result.matches.length > 0 && (
          <div style={{ marginBottom: 16, padding: '14px 16px', background: 'rgba(168,184,156,0.08)', border: '1px solid rgba(168,184,156,0.25)', borderRadius: 12 }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: '0.12em', color: '#A8B89C', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>📎 Étape 1 — Récupérer les CV à joindre</div>
            {selectedConsultantsWithCv.length > 0 ? (
              <>
                <p className="sans" style={{ fontSize: 12, color: '#E8E2D5', margin: '0 0 10px 0', lineHeight: 1.5 }}>{selectedConsultantsWithCv.length === result.matches.length ? `Ouvre les ${selectedConsultantsWithCv.length} CV en onglets, télécharge depuis Drive, puis joint-les au mail.` : `${selectedConsultantsWithCv.length} CV disponibles${selectedWithoutCv.length > 0 ? ` (${selectedWithoutCv.length} manquant${selectedWithoutCv.length > 1 ? 's' : ''} : ${selectedWithoutCv.map(c => c.name).join(', ')})` : ''}.`}</p>
                <button onClick={openAllCvTabs} className="sans" style={{ background: '#A8B89C', color: '#1A1A1A', border: 'none', padding: '10px 16px', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}><FileText size={13} /> Ouvrir les {selectedConsultantsWithCv.length} CV en onglets</button>
              </>
            ) : <p className="sans" style={{ fontSize: 12, color: '#E89B4E', margin: 0, lineHeight: 1.5 }}>⚠️ Aucun CV n'est renseigné pour les profils sélectionnés. Va dans le Pool pour ajouter les liens Drive.</p>}
          </div>
        )}
        <div className="sans" style={{ fontSize: 10, letterSpacing: '0.12em', color: '#A8B89C', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>✉️ Étape 2 — Ouvrir le mail pré-rempli</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="sans" style={{ flex: '1 1 auto', minWidth: 200, background: '#FAF8F4', color: '#1A1A1A', border: 'none', padding: '14px 20px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
            Ouvrir dans Gmail
          </a>
          <a href={mailtoUrl} className="sans" style={{ flex: '0 0 auto', background: 'transparent', color: '#FAF8F4', border: '1px solid rgba(250,248,244,0.3)', padding: '14px 20px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}><Mail size={14} /> Mail par défaut</a>
        </div>
        {!recipient && <div className="sans" style={{ fontSize: 11, color: '#E89B4E', marginBottom: 16, padding: '8px 12px', background: 'rgba(232,155,78,0.1)', border: '1px solid rgba(232,155,78,0.3)', borderRadius: 8 }}>💡 Renseigne l'email du contact pour qu'il soit pré-rempli automatiquement</div>}
        <div style={{ marginBottom: 20, padding: '14px 16px', background: 'rgba(250,248,244,0.06)', borderRadius: 12 }}>
          <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#A8B89C', textTransform: 'uppercase', marginBottom: 4 }}>Objet</div>
          <div className="serif" style={{ fontSize: 19, fontStyle: 'italic' }}>{result.email.subject}</div>
        </div>
        <div className="sans" style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: '#E8E2D5' }}>{result.email.body}</div>
      </div>
    </section>
  );
}

function ScoreTransparency({ intercontratScores, vivierScores }) {
  const [expanded, setExpanded] = useState(false);
  const sortedInter = [...intercontratScores].sort((a, b) => b.score - a.score);
  const sortedVivier = [...vivierScores].sort((a, b) => b.score - a.score);
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 24, border: '1px solid #E8E2D5' }}>
      <button onClick={() => setExpanded(!expanded)} className="sans" style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500 }}>Transparence totale</div>
          <h3 className="serif" style={{ fontSize: 22, margin: '4px 0 0 0', fontWeight: 400, color: '#1A1A1A' }}>Tous les scores ({sortedInter.length} intercontrats · {sortedVivier.length} vivier)</h3>
        </div>
        <span className="sans" style={{ fontSize: 13, color: '#7A8C6F', fontWeight: 500 }}>{expanded ? '— Masquer' : '+ Afficher'}</span>
      </button>
      {expanded && (
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="fade-in">
          <ScoreColumn title="🔥 Intercontrats" subtitle="Priorité business" scores={sortedInter} accent="#E89B4E" />
          <ScoreColumn title="🌱 Vivier" subtitle="Hors contrat" scores={sortedVivier} accent="#8B7E64" />
        </div>
      )}
    </div>
  );
}

function ScoreColumn({ title, subtitle, scores, accent }) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div className="serif" style={{ fontSize: 18, color: '#1A1A1A', fontWeight: 400 }}>{title}</div>
        <div className="sans" style={{ fontSize: 11, color: '#8B7E64', letterSpacing: '0.05em' }}>{subtitle}</div>
      </div>
      {scores.length === 0 ? <p className="sans" style={{ fontSize: 12, color: '#8B7E64', fontStyle: 'italic' }}>Aucun</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {scores.map((s) => (
            <div key={s.consultantId} style={{ padding: '10px 12px', background: s.selected ? '#F4F1E8' : '#FAF8F4', border: s.selected ? `1.5px solid ${accent}` : '1px solid #E8E2D5', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                <span className="sans" style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{s.consultantName}{s.selected && <span style={{ marginLeft: 6, fontSize: 10, color: accent, fontWeight: 700 }}>★ Retenu</span>}</span>
                <span className="sans" style={{ fontSize: 12, fontWeight: 700, color: s.score >= 80 ? '#5C7A4A' : s.score >= 60 ? '#9A6E1B' : '#8B7E64', flexShrink: 0 }}>{s.score}</span>
              </div>
              <p className="sans" style={{ fontSize: 11, color: '#5A5A5A', margin: 0, lineHeight: 1.4 }}>{s.shortReason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PoolStatus({ consultants }) {
  const inter = consultants.filter(c => c.status === 'intercontrat');
  const vivier = consultants.filter(c => c.status === 'vivier');
  const interStats = { cv: inter.filter(c => c.cvUrl).length, book: inter.filter(c => c.bookUrl).length, total: inter.length };
  const vivierStats = { cv: vivier.filter(c => c.cvUrl).length, book: vivier.filter(c => c.bookUrl).length, total: vivier.length };
  const interMissingCv = inter.filter(c => !c.cvUrl).map(c => c.name);
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: '1px solid #E8E2D5', marginBottom: 24 }}>
      <div className="sans" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500, marginBottom: 12 }}>État du pool</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <PoolStatusColumn title="🔥 Intercontrats" stats={interStats} accent="#E89B4E" />
        <PoolStatusColumn title="🌱 Vivier" stats={vivierStats} accent="#8B7E64" />
      </div>
      {interMissingCv.length > 0 && (
        <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(232,155,78,0.08)', border: '1px solid rgba(232,155,78,0.25)', borderRadius: 10 }}>
          <div className="sans" style={{ fontSize: 12, color: '#9A6E1B', fontWeight: 500, marginBottom: 4 }}>⚡ {interMissingCv.length} intercontrat{interMissingCv.length > 1 ? 's' : ''} sans CV (priorité à compléter)</div>
          <div className="sans" style={{ fontSize: 11, color: '#8B7E64' }}>{interMissingCv.join(' · ')}</div>
        </div>
      )}
    </div>
  );
}

function PoolStatusColumn({ title, stats, accent }) {
  const cvPct = stats.total > 0 ? Math.round((stats.cv / stats.total) * 100) : 0;
  const bookPct = stats.total > 0 ? Math.round((stats.book / stats.total) * 100) : 0;
  return (
    <div>
      <div className="serif" style={{ fontSize: 18, color: '#1A1A1A', fontWeight: 400, marginBottom: 10 }}>{title} <span className="sans" style={{ fontSize: 12, color: '#8B7E64', fontWeight: 400 }}>({stats.total})</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ProgressRow label="CV" current={stats.cv} total={stats.total} pct={cvPct} accent={accent} />
        <ProgressRow label="Book" current={stats.book} total={stats.total} pct={bookPct} accent={accent} />
      </div>
    </div>
  );
}

function ProgressRow({ label, current, total, pct, accent }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="sans" style={{ fontSize: 12, color: '#3A3A3A', fontWeight: 500 }}>{label}</span>
        <span className="sans" style={{ fontSize: 12, color: '#8B7E64' }}>{current}/{total}</span>
      </div>
      <div style={{ height: 6, background: '#F0EDE3', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: accent, borderRadius: 999, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

function ConsultantCard({ consultant, onToggle, onToggleStatus, onRemove, editingBookUrl, tempBookUrl, setTempBookUrl, onStartEditBook, onSaveBook, onCancelEditBook, editingCvUrl, tempCvUrl, setTempCvUrl, onStartEditCv, onSaveCv, onCancelEditCv, onPhotoChange, photoSrc }) {
  const isEditing = editingBookUrl === consultant.id;
  const isEditingCv = editingCvUrl === consultant.id;
  const isIntercontrat = consultant.status === 'intercontrat';
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: isIntercontrat ? '2px solid #E89B4E' : '1px solid #E8E2D5', opacity: consultant.available ? 1 : 0.55, transition: 'opacity 0.2s', position: 'relative' }}>
      <button onClick={onToggleStatus} title={isIntercontrat ? 'Cliquer pour passer en vivier' : 'Cliquer pour passer en intercontrat'} className="sans" style={{ position: 'absolute', top: -10, left: 20, padding: '4px 10px', background: isIntercontrat ? '#E89B4E' : '#8B7E64', color: '#FFFFFF', border: 'none', borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
        {isIntercontrat ? '🔥 Intercontrat' : '🌱 Vivier'}
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ConsultantAvatar consultant={consultant} size={48} onPhotoChange={onPhotoChange} photoSrc={photoSrc} />
          <div>
            <h3 className="serif" style={{ fontSize: 22, margin: 0, fontWeight: 400, color: '#1A1A1A' }}>{consultant.name}</h3>
            <p className="sans" style={{ fontSize: 12, color: '#8B7E64', margin: '2px 0 0 0' }}>{consultant.role} · {consultant.experience}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={onToggle} title={consultant.available ? 'Marquer comme non disponible' : 'Marquer comme disponible'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: consultant.available ? '#7A8C6F' : '#8B7E64', padding: 4 }}>{consultant.available ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}</button>
          <button onClick={onRemove} title="Supprimer du pool" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C97B5C', padding: 4 }}><Trash2 size={16} /></button>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>Secteurs forts</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{consultant.sectorsStrong.map(s => <span key={s} className="sans" style={{ padding: '3px 10px', background: '#F4F1E8', borderRadius: 999, fontSize: 11, fontWeight: 500 }}>{s}</span>)}</div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>Clients clés</div>
        <p className="sans" style={{ fontSize: 12, color: '#3A3A3A', margin: 0, lineHeight: 1.5 }}>{consultant.keyClients.slice(0, 5).join(' · ')}</p>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>Langues</div>
        <p className="sans" style={{ fontSize: 12, color: '#3A3A3A', margin: 0 }}>{consultant.languages.join(' · ')}</p>
      </div>
      <div style={{ marginBottom: 12, paddingTop: 12, borderTop: '1px solid #F0EDE3', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}><FileText size={10} /> CV (lien Drive){consultant.cvUrl && <span style={{ color: '#7A8C6F', fontSize: 12 }}>✓</span>}</div>
            {!isEditingCv && <button onClick={onStartEditCv} className="sans" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A8C6F', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3, padding: 0 }}><Edit3 size={11} /> {consultant.cvUrl ? 'Modifier' : 'Ajouter'}</button>}
          </div>
          {isEditingCv ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <input type="url" value={tempCvUrl} onChange={e => setTempCvUrl(e.target.value)} placeholder="https://drive.google.com/..." className="sans" style={{ flex: 1, padding: '6px 10px', border: '1px solid #E8E2D5', borderRadius: 8, fontSize: 12, fontFamily: "'Inter Tight', sans-serif", background: '#FAF8F4', outline: 'none' }} autoFocus />
              <button onClick={onSaveCv} className="sans" style={{ background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Save size={12} /></button>
              <button onClick={onCancelEditCv} className="sans" style={{ background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={12} /></button>
            </div>
          ) : consultant.cvUrl ? <a href={consultant.cvUrl} target="_blank" rel="noopener noreferrer" className="sans" style={{ fontSize: 12, color: '#7A8C6F', textDecoration: 'none', wordBreak: 'break-all' }}>{consultant.cvUrl}</a>
            : <p className="sans" style={{ fontSize: 11, color: '#B5A990', margin: 0, fontStyle: 'italic' }}>Aucun lien — pas d'ouverture en onglet possible</p>}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}><Link2 size={10} /> Book / Portfolio{consultant.bookUrl && <span style={{ color: '#7A8C6F', fontSize: 12 }}>✓</span>}</div>
            {!isEditing && <button onClick={onStartEditBook} className="sans" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A8C6F', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3, padding: 0 }}><Edit3 size={11} /> {consultant.bookUrl ? 'Modifier' : 'Ajouter'}</button>}
          </div>
          {isEditing ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <input type="url" value={tempBookUrl} onChange={e => setTempBookUrl(e.target.value)} placeholder="https://..." className="sans" style={{ flex: 1, padding: '6px 10px', border: '1px solid #E8E2D5', borderRadius: 8, fontSize: 12, fontFamily: "'Inter Tight', sans-serif", background: '#FAF8F4', outline: 'none' }} autoFocus />
              <button onClick={onSaveBook} className="sans" style={{ background: '#1A1A1A', color: '#FAF8F4', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Save size={12} /></button>
              <button onClick={onCancelEditBook} className="sans" style={{ background: 'transparent', border: '1px solid #E8E2D5', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={12} /></button>
            </div>
          ) : consultant.bookUrl ? <a href={consultant.bookUrl} target="_blank" rel="noopener noreferrer" className="sans" style={{ fontSize: 12, color: '#7A8C6F', textDecoration: 'none', wordBreak: 'break-all' }}>{consultant.bookUrl}</a>
            : <p className="sans" style={{ fontSize: 11, color: '#B5A990', margin: 0, fontStyle: 'italic' }}>Aucun lien — non mentionné dans le mail</p>}
        </div>

        {/* Photo */}
        <div>
          <div className="sans" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#8B7E64', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>📷 Photo</div>
          <p className="sans" style={{ fontSize: 11, color: '#B5A990', margin: 0, fontStyle: 'italic' }}>Clique sur l'avatar pour uploader une photo</p>
        </div>
      </div>
      <div style={{ paddingTop: 12, borderTop: '1px solid #F0EDE3' }}>
        <span className="sans" style={{ fontSize: 11, padding: '4px 10px', background: consultant.available ? '#E8F0E2' : '#F0EDE3', color: consultant.available ? '#4A6440' : '#8B7E64', borderRadius: 999, fontWeight: 500 }}>● {consultant.available ? 'Disponible' : 'Non disponible'}</span>
      </div>
    </div>
  );
}

function ProspectSearchLinks({ company, targetContact }) {
  const liQuery = encodeURIComponent(`${targetContact} ${company}`);
  const liUrl = `https://www.linkedin.com/search/results/people/?keywords=${liQuery}`;
  const googleQuery = encodeURIComponent(`"${targetContact}" "${company}" site:linkedin.com`);
  const googleUrl = `https://www.google.com/search?q=${googleQuery}`;
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      <div className="sans" style={{ fontSize: 11, color: '#8B7E64', fontWeight: 500, display: 'flex', alignItems: 'center', marginRight: 4 }}>🔍 Trouver le contact :</div>
      <a href={liUrl} target="_blank" rel="noreferrer" className="sans" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#EBF3FB', color: '#0A66C2', border: '1px solid #C8DFF5', borderRadius: 999, textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href={googleUrl} target="_blank" rel="noreferrer" className="sans" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#F4F1E8', color: '#1A1A1A', border: '1px solid #E8E2D5', borderRadius: 999, textDecoration: 'none', fontSize: 11, fontWeight: 600 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </a>
    </div>
  );
}

function HistoryEntry({ entry, onClick }) {
  const isReverse = entry.type === 'reverse';
  const isWish = entry.type === 'wish';
  const isReverseType = isReverse || isWish;

  if (isReverseType) {
    const prospects = entry.result?.prospects || [];
    return (
      <div onClick={onClick} style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: '1px solid #E8E2D5', cursor: 'pointer', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#7A8C6F'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E2D5'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="sans" style={{ fontSize: 10, padding: '3px 8px', background: isWish ? '#FEF2E8' : '#F0EDE3', color: isWish ? '#C97B5C' : '#8B7E64', borderRadius: 999, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{isWish ? '✦ Souhaits' : '↩ Reverse'}</span>
            </div>
            <h4 className="serif" style={{ fontSize: 22, margin: 0, fontWeight: 400 }}>{entry.consultantName}</h4>
            <p className="sans" style={{ fontSize: 12, color: '#8B7E64', margin: '4px 0 0 0' }}>
              {entry.consultantRole} — {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              {isWish && entry.wishText && <span style={{ fontStyle: 'italic' }}> · «&nbsp;{entry.wishText.slice(0, 60)}{entry.wishText.length > 60 ? '…' : ''}&nbsp;»</span>}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {prospects.slice(0, 5).map((p, i) => (
              <span key={i} className="sans" style={{ fontSize: 11, padding: '4px 10px', background: '#F4F1E8', borderRadius: 999, fontWeight: 500 }}>{p.company}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: '1px solid #E8E2D5', cursor: 'pointer', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#7A8C6F'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E2D5'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ marginBottom: 4 }}>
            <span className="sans" style={{ fontSize: 10, padding: '3px 8px', background: '#E8F0E2', color: '#4A6440', borderRadius: 999, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>✦ Matching</span>
          </div>
          <h4 className="serif" style={{ fontSize: 22, margin: 0, fontWeight: 400 }}>
            {entry.company}
            {entry.contacts ? <span className="sans" style={{ fontSize: 13, color: '#8B7E64', fontStyle: 'normal' }}> · {entry.contacts.filter(c=>c.role).map(c => c.name || c.role).join(', ')}</span> : entry.contactName ? <span className="sans" style={{ fontSize: 13, color: '#8B7E64', fontStyle: 'normal' }}> · {entry.contactName}</span> : null}
          </h4>
          <p className="sans" style={{ fontSize: 12, color: '#8B7E64', margin: '4px 0 0 0' }}>
            {entry.contacts ? entry.contacts.filter(c=>c.role).map(c=>c.role).join(' · ') : entry.contactRole} — {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {(entry.results ? entry.results.flatMap(r => r.matches || []) : (entry.result?.matches || [])).filter((m, i, arr) => arr.findIndex(x => x.consultantId === m.consultantId) === i).map(m => (
            <span key={m.consultantId} className="sans" style={{ fontSize: 11, padding: '4px 10px', background: '#F4F1E8', borderRadius: 999, fontWeight: 500 }}>{m.consultantName.split(' ')[0]}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
  );
}
