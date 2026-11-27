/**
 * Single-Source Brand & Institutional Corporate Dataset
 * Swap `brandName` (e.g., 'VOSS & PARTNERS' or 'NORTHSTAR DIGITAL') to update globally.
 */
export const STUDIO_CONFIG = {
  brandName: 'NORTHSTAR DIGITAL',
  brandLegal: 'Northstar Digital Advisory LLC',
  brandPractice: 'Executive Digital Platforms & AI Workflow Advisory',
  offices: 'Atlanta · Spartanburg · New York',
  contactEmail: 'partners@northstardigital.co',
  heroMetrics: [
    { value: '4–7 Wks', label: 'Typical Executive Platform Delivery' },
    { value: '68%', label: 'Reduction in Manual Reporting & Bid Prep' },
    { value: '100%', label: 'Client IP & Source Ownership at Closeout' },
  ],
};

/**
 * Zone 1 — Executive Hero Interactive Preview Dataset
 * Switches seamlessly between Client Experience View & Internal Operations View
 */
export const HERO_PREVIEW_VIEWS = {
  client: {
    id: 'client',
    toggleLabel: 'Client Experience View',
    windowTitle: 'Southeast Commercial Portfolio IV — LP Capital Portal',
    badge: 'External Stakeholder Experience',
    summaryKpis: [
      { label: 'Total Capitalization', value: '$168.4M', delta: 'Fully Subscribed' },
      { label: 'Net Target IRR', value: '20.8%', delta: '+190 bps vs. Benchmark' },
      { label: 'Portfolio Leased', value: '88.4%', delta: '3 Anchor Covenants' },
    ],
    subHeading: 'Select Portfolio Asset to Inspect Live Investor View',
    assets: [
      {
        id: 'roswell',
        name: 'Roswell Crossing Mixed-Use',
        location: 'Roswell, GA · 418,500 GSF',
        status: 'Stabilizing Q4',
        irr: '21.4%',
        multiple: '2.18x',
        leased: '89%',
        allocations: [
          { label: 'Senior Construction Facility', pct: 60, amount: '$58.8M' },
          { label: 'Institutional LP Equity', pct: 30, amount: '$29.4M' },
          { label: 'Sponsor Co-Investment', pct: 10, amount: '$9.8M' },
        ],
      },
      {
        id: 'spartanburg',
        name: 'Spartanburg Industrial & Logistics Park',
        location: 'Spartanburg, SC · 610,000 GSF',
        status: 'Cash-Flowing',
        irr: '19.6%',
        multiple: '2.04x',
        leased: '96%',
        allocations: [
          { label: 'Fixed-Rate Permanent Debt', pct: 56, amount: '$26.9M' },
          { label: 'Institutional LP Equity', pct: 34, amount: '$16.3M' },
          { label: 'Sponsor Co-Investment', pct: 10, amount: '$4.8M' },
        ],
      },
      {
        id: 'buckhead',
        name: 'Peachtree Executive Pavilion',
        location: 'Atlanta, GA · 195,000 GSF',
        status: 'Preconstruction GMP',
        irr: '22.1%',
        multiple: '2.26x',
        leased: '74%',
        allocations: [
          { label: 'Committed Senior Facility', pct: 58, amount: '$13.0M' },
          { label: 'Institutional LP Equity', pct: 32, amount: '$7.2M' },
          { label: 'Sponsor Co-Investment', pct: 10, amount: '$2.2M' },
        ],
      },
    ],
    footnote: 'Replaces static PDF pitch decks with live, permissioned portfolio rooms tailored for capital partners and anchor tenants.',
  },
  operations: {
    id: 'operations',
    toggleLabel: 'Internal Operations View',
    windowTitle: 'Executive Preconstruction & Operations Command',
    badge: 'Internal Leadership Suite',
    summaryKpis: [
      { label: 'Active GMP Pipeline', value: '$142.5M', delta: '-0.8% Under Budget' },
      { label: 'Bid-Leveling Cycle', value: '38 Mins', delta: 'Down from 14 Days' },
      { label: 'Automated Briefs', value: '94.2%', delta: 'Zero Manual Re-Entry' },
    ],
    subHeading: 'Active Preconstruction & Executive Approval Queue',
    packages: [
      {
        id: 'pkg-01',
        code: 'DIV 08',
        title: 'Unitized Glazing & Curtain Wall — 4 Subcontractor Bids Leveled',
        savings: '$312,000 Variance Identified',
        status: 'AI Scope Matrix Verified',
        action: 'Ready for Principal Sign-Off',
      },
      {
        id: 'pkg-02',
        code: 'DIV 23',
        title: 'Central MEP & Chilled-Water Plant — Long-Lead Equipment Lock',
        savings: '6.5 Weeks Schedule Protected',
        status: 'Zero Exclusion Gaps',
        action: 'GMP Exhibit Generated',
      },
      {
        id: 'pkg-03',
        code: 'LP Q3',
        title: 'Q3 Limited Partner Distribution & Construction Draw Memo',
        savings: '19 Hours Controller Time Saved',
        status: 'Reconciled with Yardi / Procore',
        action: 'Scheduled for Release',
      },
    ],
    footnote: 'Eliminates spreadsheet bottlenecks across preconstruction, closeout, and quarterly board reporting without disrupting existing ERPs.',
  },
};

/**
 * Zone 2 — Scroll-Scrubbed 2.5D Layer Teardown ("Anatomy of a Modern Digital Asset")
 */
export const ARCHITECTURE_LAYERS = [
  {
    id: 'interface',
    index: '01',
    shortName: 'Brand & Editorial UI',
    name: 'Brand & Editorial Interface',
    role: 'Client-Facing Presentation & Market Positioning',
    summary:
      'An authoritative, fast-loading web presence crafted with institutional typography, interactive portfolio views, and tactile motion that commands immediate trust from capital partners and enterprise buyers.',
    metrics: [
      { label: 'First Contentful Paint', value: '< 0.6s' },
      { label: 'Mobile & Desktop Parity', value: '60 FPS' },
    ],
    deliverables: [
      'Bespoke editorial design system calibrated for C-suite and institutional audiences',
      'Interactive portfolio, property, and case-study explorers with live filtering',
      'Weighted motion choreography engineered for zero layout shift on mobile and desktop',
    ],
    cardPreview: {
      eyebrow: 'LAYER 01 · PUBLIC & PARTNER FRONTEND',
      headline: 'Institutional Portfolio Showcase',
      statLabel: 'Qualified Partner Engagement',
      statValue: '+3.1x Session Depth',
      pills: ['Editorial Typography', '60 FPS Motion', 'WCAG AA Contrast'],
    },
  },
  {
    id: 'portal',
    index: '02',
    shortName: 'Real-Time Client Portal',
    name: 'Real-Time Client & Stakeholder Portal',
    role: 'Permissioned Investor, Tenant & Executive Dashboards',
    summary:
      'Dedicated self-serve portals where limited partners, clients, and project executives inspect live capital waterfalls, leasing velocity, milestone schedules, and closeout documentation on demand.',
    metrics: [
      { label: 'Ad-Hoc Status Inquiries', value: '-84%' },
      { label: 'Deal Room Turnaround', value: 'Instant' },
    ],
    deliverables: [
      'Role-based views tailored separately for LPs, lenders, prospective tenants, and leadership',
      'Interactive financial waterfalls, suite availability matrices, and draw schedules',
      'One-click board packet, executive memo, and calendar briefing exports',
    ],
    cardPreview: {
      eyebrow: 'LAYER 02 · STAKEHOLDER DATA ROOM',
      headline: 'Capital Waterfall & Leasing Matrix',
      statLabel: 'LP Reporting Cadence',
      statValue: 'Live Self-Serve Sync',
      pills: ['Role Permissions', 'Waterfall Tables', '1-Click Board Exports'],
    },
  },
  {
    id: 'ai-engine',
    index: '03',
    shortName: 'Automated AI Engine',
    name: 'Automated AI Data & Workflow Engine',
    role: 'Document Intelligence, Bid Leveling & Intake Routing',
    summary:
      'Private, domain-tuned AI pipelines that read incoming bid packages, RFPs, leases, and field reports—flagging scope exclusions, leveling pricing, and drafting executive summaries automatically.',
    metrics: [
      { label: 'Document Triage Speed', value: '24x Faster' },
      { label: 'Citation Traceability', value: '100% Line-Linked' },
    ],
    deliverables: [
      'Automated preconstruction bid leveling and scope-gap detection across PDF proposals',
      'Intelligent client intake & scoping engines that qualify leads and draft custom briefs',
      'Source-cited executive digests delivered directly to Slack, email, or partner dashboards',
    ],
    cardPreview: {
      eyebrow: 'LAYER 03 · APPLIED AI WORKFLOWS',
      headline: 'Automated Bid & Document Synthesis',
      statLabel: 'Average Review Cycle',
      statValue: '14 Days → 38 Mins',
      pills: ['Exclusion Detection', 'Line-Item Citations', 'Zero Model Training Leakage'],
    },
  },
  {
    id: 'security',
    index: '04',
    shortName: 'Security & Cloud Core',
    name: 'Enterprise Security, Integrations & Hosting',
    role: 'Zero-Maintenance Infrastructure & Legacy System Sync',
    summary:
      'Hardened cloud deployment with enterprise SSO, immutable audit trails, and clean API connectors into the systems your team already runs—delivered with full source ownership and zero vendor lock-in.',
    metrics: [
      { label: 'Edge Availability', value: '99.99%' },
      { label: 'IT Overhead Required', value: 'Zero Internal Lift' },
    ],
    deliverables: [
      'SOC-2 aligned encryption in transit and at rest with SSO (Okta, Microsoft Entra, Google)',
      'Direct bi-directional sync with Procore, Yardi, Juniper Square, HubSpot, and Salesforce',
      'Global edge CDN deployment with automated backups and full repository handoff',
    ],
    cardPreview: {
      eyebrow: 'LAYER 04 · GOVERNANCE & INTEGRATIONS',
      headline: 'Hardened Edge & ERP Connectors',
      statLabel: 'Enterprise Connectors',
      statValue: 'Procore · Yardi · SSO',
      pills: ['AES-256 & TLS 1.3', 'Audit Logging', '100% Code Ownership'],
    },
  },
];

/**
 * Zone 3 — Interactive Executive Workflow & Case-Study Explorer
 * Includes live "Before (Legacy)" vs. "After (Studio Platform)" state comparisons
 */
export const EXECUTIVE_WORKFLOWS = [
  {
    id: 'investor-portal',
    number: '01',
    tabTitle: 'Investor & Stakeholder Portal',
    sector: 'Commercial Real Estate & Private Equity',
    headline: 'Replace static quarterly PDFs with an institutional capital portal.',
    description:
      'Built for development sponsors and managing partners raising and deploying $50M–$500M+ across mixed-use, industrial, and hospitality assets.',
    before: {
      label: 'Legacy Manual Reporting',
      cycleTime: '11 Business Days / Quarter',
      errorRisk: '6 Disconnected Spreadsheets',
      adoption: 'Static PDF Attachments',
      steps: [
        { step: '01', title: 'Manual Data Export', detail: 'Analysts pull CSVs from property accounting, construction trackers, and leasing logs.' },
        { step: '02', title: 'Spreadsheet Reconciliation', detail: '4–5 days formatting waterfall tabs and triple-checking version mismatches.' },
        { step: '03', title: 'Static Deck Formatting', detail: 'Manual slide layout followed by 30+ individual LP email attachments.' },
      ],
      tableTitle: 'Q3 Reporting Bottleneck Audit',
      rows: [
        { item: 'Capital Call & Distribution Notices', metric: '3.5 Days Manual Prep', tone: 'muted' },
        { item: 'Construction Draw & GMP Backup', metric: 'Email Thread Silos', tone: 'muted' },
        { item: 'Ad-Hoc LP Performance Inquiries', metric: '14+ Hours / Month', tone: 'muted' },
      ],
    },
    after: {
      label: 'Northstar Capital Portal',
      cycleTime: 'Real-Time · 1-Click Release',
      errorRisk: 'Single Audited Data Ledger',
      adoption: '96% LP Self-Serve Login',
      steps: [
        { step: '01', title: 'Automated Ledger Sync', detail: 'Direct read-only connectors ingest accounting, GMP draw, and leasing updates nightly.' },
        { step: '02', title: 'Principal Review Gate', detail: 'Managing partners preview variance commentary and approve quarterly release in 10 minutes.' },
        { step: '03', title: 'Permissioned LP Access', detail: 'Investors explore live IRR waterfalls, asset photos, and K-1 vaults from phone or desktop.' },
      ],
      tableTitle: 'Verified Client Impact — Mixed-Use Sponsor ($310M AUM)',
      rows: [
        { item: 'Quarterly Investor Packet Assembly', metric: '11 Days → 25 Minutes', tone: 'positive' },
        { item: 'Subsequent Fund Re-Up Velocity', metric: '+34% Faster Commitments', tone: 'positive' },
        { item: 'Inbound Controller Inquiry Load', metric: '-88% Ad-Hoc Emails', tone: 'positive' },
      ],
    },
  },
  {
    id: 'precon-briefings',
    number: '02',
    tabTitle: 'Preconstruction & Bid Briefings',
    sector: 'Development & General Contracting',
    headline: 'Turn 200-page subcontractor bid PDFs into leveled executive matrices.',
    description:
      'Engineered for preconstruction VPs and development principals managing complex GMP buyouts across tight schedule windows.',
    before: {
      label: 'Manual Bid Leveling',
      cycleTime: '14–18 Business Days',
      errorRisk: 'Buried Scope Exclusions',
      adoption: 'Manual Line-by-Line Entry',
      steps: [
        { step: '01', title: 'Unstructured PDF Intake', detail: 'Estimators receive dozens of non-standard subcontractor PDFs on bid day.' },
        { step: '02', title: 'Manual Scope Transcription', detail: 'Days spent re-keying inclusions, exclusions, alternates, and unit prices into Excel.' },
        { step: '03', title: 'Late Change-Order Exposure', detail: 'Missed exclusions surface months later as costly field change orders.' },
      ],
      tableTitle: 'Legacy Preconstruction Friction',
      rows: [
        { item: 'MEP & Glazing Scope Comparison', metric: '28+ Hours per Division', tone: 'muted' },
        { item: 'Exclusion & Alternate Cross-Check', metric: 'Prone to Human Fatigue', tone: 'muted' },
        { item: 'Owner / Lender GMP Sign-Off', metric: 'Delayed by 2–3 Weeks', tone: 'muted' },
      ],
    },
    after: {
      label: 'Automated AI Bid Matrix',
      cycleTime: '38 Minutes End-to-End',
      errorRisk: '100% Page-Cited Flags',
      adoption: 'Adopted Across 16 CSI Divisions',
      steps: [
        { step: '01', title: 'Drag-and-Drop Bid Ingestion', detail: 'Upload raw subcontractor proposals, drawings addenda, and baseline CSI budgets.' },
        { step: '02', title: 'AI Exclusion & Variance Flagging', detail: 'Automatically normalizes line items and highlights missing allowances with exact PDF page links.' },
        { step: '03', title: 'Board-Ready Buyout Brief', detail: 'Outputs a clean executive recommendation memo ready for owner & lender sign-off.' },
      ],
      tableTitle: 'Verified Client Impact — Regional Commercial Builder',
      rows: [
        { item: 'Division Buyout Leveling Time', metric: '16 Days → 38 Minutes', tone: 'positive' },
        { item: 'Missed Scope Exclusions Caught Pre-GMP', metric: '$410K Avg Saved / Project', tone: 'positive' },
        { item: 'Estimator Capacity Per Quarter', metric: '+2.4x More Bids Pursued', tone: 'positive' },
      ],
    },
  },
  {
    id: 'client-concierge',
    number: '03',
    tabTitle: 'Client Intake & Scoping Concierge',
    sector: 'Enterprise & Multi-Site Advisory',
    headline: 'Qualify high-value engagements and issue custom scope briefs instantly.',
    description:
      'Replaces generic "Contact Us" forms with an intelligent executive scoping experience that educates buyers and routes pre-qualified deals directly to senior partners.',
    before: {
      label: 'Generic Contact Forms',
      cycleTime: '5.4 Days to First Scope',
      errorRisk: 'Unqualified Discovery Calls',
      adoption: 'Low Executive Conversion',
      steps: [
        { step: '01', title: 'Static Web Inquiry', detail: 'Prospect submits a vague 4-field contact form with zero budget or timeline context.' },
        { step: '02', title: 'Calendar Tag & Triage', detail: 'Partners spend 3–4 emails and an introductory call just gathering baseline parameters.' },
        { step: '03', title: 'Delayed Proposal Drafting', detail: 'Custom ballpark scope arrives a week later—after buyer momentum has cooled.' },
      ],
      tableTitle: 'Traditional B2B Intake Drop-Off',
      rows: [
        { item: 'Speed to Initial Ballpark & ROI', metric: '5–7 Business Days', tone: 'muted' },
        { item: 'Partner Time on Unqualified Leads', metric: '9.5 Hours / Week', tone: 'muted' },
        { item: 'Website Visitor-to-Brief Conversion', metric: '1.4% Industry Average', tone: 'muted' },
      ],
    },
    after: {
      label: 'Interactive Scope & Routing',
      cycleTime: 'Instant (< 90 Seconds)',
      errorRisk: 'Pre-Validated Deal Parameters',
      adoption: '4.2x Qualified Pipeline',
      steps: [
        { step: '01', title: 'Self-Serve Scope Configuration', detail: 'Prospects configure sector, scale, and timeline directly on your site to view instant ROI.' },
        { step: '02', title: 'Automated Executive Dossier', detail: 'System generates a branded PDF/Markdown scope brief for the buyer and CRM deal record for your team.' },
        { step: '03', title: 'Direct Partner Calendar Lock', detail: 'Qualified decision-makers book directly onto the appropriate managing partner’s calendar.' },
      ],
      tableTitle: 'Verified Client Impact — B2B Advisory Practice',
      rows: [
        { item: 'Qualified Executive Briefs Generated', metric: '+310% Within 60 Days', tone: 'positive' },
        { item: 'Discovery-to-Close Sales Cycle', metric: 'Shortened by 3.2 Weeks', tone: 'positive' },
        { item: 'Senior Partner Prep Time', metric: 'Zero — Full Brief Attached', tone: 'positive' },
      ],
    },
  },
];

/**
 * Zone 4 — Universal B2B App: Interactive Project Scope & ROI Estimator
 */
export const ESTIMATOR_SECTORS = [
  {
    id: 'cre',
    label: 'Commercial Real Estate & Construction',
    shortLabel: 'Real Estate & Construction',
    scaleUnitLabel: 'Active Portfolio / Construction Volume',
    scaleFormat: 'millions', // 25 -> $25M, 500 -> $500M
    baseInvestment: 38000,
    scaleCostFactor: 42,
    baseWeeks: 5.5,
    annualValuePerUnit: 1450,
    hoursSavedBase: 460,
    recommendedArchitecture:
      'Institutional portfolio showcase, permissioned LP/lender deal room, and automated preconstruction/GMP reporting pipeline.',
  },
  {
    id: 'hospitality',
    label: 'Hospitality & Multi-Site Portfolios',
    shortLabel: 'Hospitality & Multi-Site',
    scaleUnitLabel: 'Managed Properties & Asset Scale',
    scaleFormat: 'millions',
    baseInvestment: 35000,
    scaleCostFactor: 38,
    baseWeeks: 5.0,
    annualValuePerUnit: 1320,
    hoursSavedBase: 390,
    recommendedArchitecture:
      'Editorial property collection platform, capital partner portal, and automated multi-property KPI & occupancy consolidation.',
  },
  {
    id: 'advisory',
    label: 'Professional & Financial Services',
    shortLabel: 'Professional Services',
    scaleUnitLabel: 'Annual Advisory / Practice Volume',
    scaleFormat: 'millions',
    baseInvestment: 32000,
    scaleCostFactor: 34,
    baseWeeks: 4.5,
    annualValuePerUnit: 1280,
    hoursSavedBase: 520,
    recommendedArchitecture:
      'Partner-grade digital flagship, interactive client scoping & ROI calculator, and AI proposal/engagement brief automation.',
  },
  {
    id: 'enterprise',
    label: 'Enterprise Operations & Industrial',
    shortLabel: 'Enterprise Operations',
    scaleUnitLabel: 'Operational Division Scale',
    scaleFormat: 'millions',
    baseInvestment: 44000,
    scaleCostFactor: 48,
    baseWeeks: 6.5,
    annualValuePerUnit: 1620,
    hoursSavedBase: 680,
    recommendedArchitecture:
      'Executive command dashboard, automated vendor/RFP ingestion engine, and bi-directional ERP/CRM integration layer.',
  },
];

export const ESTIMATOR_TIMELINES = [
  { id: 'accelerated', label: 'Accelerated (4–6 Wks)', multiplier: 1.2, weekFactor: 0.78, note: 'Dedicated Principal Sprint Team' },
  { id: 'standard', label: 'Standard (7–10 Wks)', multiplier: 1.0, weekFactor: 1.0, note: 'Balanced Phased Delivery' },
  { id: 'enterprise', label: 'Multi-Phase (12–16 Wks)', multiplier: 1.32, weekFactor: 1.48, note: 'Multi-Division Rollout & Training' },
];

export const ESTIMATOR_CAPABILITIES = [
  {
    id: 'flagshipWeb',
    label: 'Executive Flagship Web & Motion Showcase',
    costAdd: 10000,
    weeksAdd: 1.0,
    hoursAdd: 120,
    roiBoost: 1.16,
    defaultOn: true,
  },
  {
    id: 'clientPortal',
    label: 'Permissioned Investor / Client Data Portal',
    costAdd: 9500,
    weeksAdd: 1.0,
    hoursAdd: 210,
    roiBoost: 1.2,
    defaultOn: true,
  },
  {
    id: 'aiWorkflow',
    label: 'Automated AI Document & Bid-Leveling Engine',
    costAdd: 11500,
    weeksAdd: 1.2,
    hoursAdd: 340,
    roiBoost: 1.24,
    defaultOn: false,
  },
  {
    id: 'erpSync',
    label: 'CRM / ERP Integration (Procore, Yardi, Salesforce)',
    costAdd: 8000,
    weeksAdd: 0.8,
    hoursAdd: 180,
    roiBoost: 1.12,
    defaultOn: false,
  },
];

/**
 * Zone 5 — Magnetic System Assembly Modules & Studio Engagement Tiers
 */
export const ASSEMBLY_MODULES = [
  {
    id: 'mod-ui',
    code: '01',
    title: 'Editorial Web Flagship',
    metric: '< 0.6s Load · 60 FPS',
    detail: 'Institutional brand authority & interactive deal storytelling',
    scatter: { x: -88, y: -64, z: 70, rx: 14, ry: -16, rz: -4 },
  },
  {
    id: 'mod-portal',
    code: '02',
    title: 'Stakeholder & LP Portal',
    metric: 'Role-Gated Live Data',
    detail: 'Self-serve waterfalls, leasing matrices & board exports',
    scatter: { x: 92, y: -58, z: 45, rx: 12, ry: 18, rz: 4 },
  },
  {
    id: 'mod-ai',
    code: '03',
    title: 'Applied AI Automation',
    metric: '100% Source-Cited',
    detail: 'Automated bid leveling, intake qualification & brief drafting',
    scatter: { x: -82, y: 68, z: 35, rx: -12, ry: -14, rz: 3 },
  },
  {
    id: 'mod-gov',
    code: '04',
    title: 'Enterprise Governance',
    metric: '100% IP Ownership',
    detail: 'SOC-2 aligned hosting, SSO & clean repository handoff',
    scatter: { x: 86, y: 64, z: 60, rx: -14, ry: 15, rz: -3 },
  },
];

export const ENGAGEMENT_TIERS = [
  {
    id: 'prototype',
    code: 'OPTION 01',
    name: 'Rapid 48-Hour Prototype',
    priceLow: 6500,
    priceHigh: 6500,
    priceDisplay: '$6,500 Fixed',
    turnaroundDays: 2,
    turnaroundLabel: '48 Hours',
    idealFor: 'Validate an upcoming capital raise, board pitch, or internal tool with a working interactive build before committing to a full engagement.',
    deliverables: [
      'Working interactive web prototype built around your actual portfolio or workflow data',
      'Deployed on a private executive link ready for partner, lender, or board review',
      '100% of prototype fee credited toward a full platform build within 30 days',
    ],
  },
  {
    id: 'flagship',
    code: 'OPTION 02 · RECOMMENDED',
    name: 'Flagship Interactive Web Platform',
    priceLow: 35000,
    priceHigh: 60000,
    priceDisplay: '$35K – $60K',
    turnaroundDays: 42,
    turnaroundLabel: '5–7 Weeks',
    recommended: true,
    idealFor: 'Commercial developers, investment firms, and operating companies upgrading to an institutional digital presence and client portal.',
    deliverables: [
      'Custom multi-zone corporate platform with 60 FPS scroll choreography & mobile parity',
      'Interactive portfolio/case-study explorer + embedded B2B Scope & ROI calculator',
      'Permissioned stakeholder portal views, analytics instrumentation & full IP handoff',
    ],
  },
  {
    id: 'ai-suite',
    code: 'OPTION 03',
    name: 'Custom AI Workflow Suite',
    priceLow: 28000,
    priceHigh: 52000,
    priceDisplay: '$28K – $52K',
    turnaroundDays: 38,
    turnaroundLabel: '4–8 Weeks',
    idealFor: 'Leadership teams eliminating manual preconstruction bid leveling, quarterly reporting, and client intake bottlenecks.',
    deliverables: [
      'Bespoke internal operations web app with source-cited AI document & bid analysis',
      'Direct API integrations with Procore, Yardi, HubSpot, Salesforce, or internal data stores',
      'Role-based access controls, executive audit logging & hands-on team onboarding',
    ],
  },
];

export const ENGAGEMENT_ADDONS = [
  { id: 'boardDeck', label: 'Board & LP Pitch Deck Alignment', costAdd: 4500, daysAdd: 3 },
  { id: 'erpBridge', label: 'Legacy ERP / Procore Data Connector', costAdd: 6000, daysAdd: 5 },
  { id: 'advisorySla', label: '90-Day Principal Advisory Retainer', costAdd: 5500, daysAdd: 0 },
];
