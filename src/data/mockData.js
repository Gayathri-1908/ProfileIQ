export const mockAnalysis = {
  scores: {
    overall: 82,
    ats: 76,
    readability: 88,
    professionalism: 85,
    keywordMatch: 71,
  },
  strengths: [
    'Strong action verbs used throughout (Led, Architected, Delivered).',
    'Quantified achievements with measurable business impact.',
    'Clear chronological structure with consistent formatting.',
    'Relevant technical stack aligned with industry standards.',
    'Professional summary is concise and value-driven.',
  ],
  weaknesses: [
    'Some bullet points exceed 2 lines and reduce readability.',
    'Missing a dedicated "Projects" or "Portfolio" section.',
    'Overuse of passive voice in early career roles.',
    'No links to GitHub, LinkedIn, or personal website.',
    'Education section lacks relevant coursework or honors.',
  ],
  missingKeywords: [
    'Cloud Architecture',
    'CI/CD Pipelines',
    'Microservices',
    'Agile Methodology',
    'Stakeholder Management',
    'System Design',
    'Kubernetes',
    'Data Modeling',
  ],
  suggestedSkills: [
    'AWS / GCP / Azure',
    'Docker & Kubernetes',
    'GraphQL',
    'TypeScript',
    'Terraform',
    'Observability (Datadog, Grafana)',
  ],
  grammar: [
    { issue: 'Inconsistent tense usage', fix: 'Use past tense for previous roles, present for current.' },
    { issue: 'Missing article', fix: '"Led team" → "Led a cross-functional team of 8 engineers".' },
    { issue: 'Redundant phrasing', fix: '"Very unique experience" → "Unique experience".' },
    { issue: 'Passive voice', fix: '"Was responsible for" → "Owned".' },
  ],
  originalSummary:
    'Experienced software engineer with 5+ years building web apps. Worked on various projects using React, Node.js and databases. Passionate about clean code and teamwork. Looking for new opportunities to grow.',
  improvedSummary:
    'Senior Full-Stack Engineer with 5+ years of experience architecting scalable SaaS platforms serving 200K+ users. Expert in React, Node.js, and cloud-native architectures on AWS. Delivered 30% performance gains and led a team of 6 engineers through 12+ successful product launches. Passionate about clean code, mentorship, and shipping products that move business metrics.',
  match: {
    targetRole: 'Senior Full-Stack Engineer',
    matchPercentage: 74,
    missingSkills: ['System Design', 'Kubernetes', 'GraphQL', 'Terraform'],
    recommendedSkills: ['AWS Certified Solutions Architect', 'Docker', 'Microservices Patterns', 'Observability'],
  },
};