import { storage } from "./storage";
import type { InsertTeamMemberPortfolio } from "@shared/schema";

const FATEMA: InsertTeamMemberPortfolio = {
  slug: "fatema",
  name: "Fatema Hanif",
  sortOrder: 0,
  metaTitle: "Fatema Hanif — Brand Strategy & Content Architecture | The Story Shapers",
  metaDescription: "Brand strategy, content architecture, and AI-powered workflows. 20 years of building marketing infrastructure that actually works.",
  hero: {
    eyebrow: "",
    headlineLine1: "I find the method in the madness.",
    headlineLine2: "Then I build the system to keep it running.",
    headlineLine2Italic: true,
    subtext: "Brand strategy, content architecture, AI-powered workflows. 20 years of building the infrastructure that makes marketing actually work, now with AI at the center of it.",
    portrait: "/assets/54b8c761-3071-4f74-8057-1840518e15a6_1772266999973.jpg",
    ctas: [
      { label: "See my work", href: "#work" },
      { label: "Book a call", href: "/contact" },
      { label: "More about me", href: "#about" },
    ],
  },
  brands: {
    title: "Brands I've worked with",
    items: [
      { name: "Cadbury India", logo: "https://www.google.com/s2/favicons?domain=cadbury.co.uk&sz=64" },
      { name: "Coca-Cola India", logo: "https://www.google.com/s2/favicons?domain=coca-cola.com&sz=64" },
      { name: "Little Black Book", logo: "https://www.google.com/s2/favicons?domain=lbb.in&sz=64" },
      { name: "Headout", logo: "https://www.google.com/s2/favicons?domain=headout.com&sz=64" },
      { name: "Singapore Tourism Board", logo: "https://www.google.com/s2/favicons?domain=stb.gov.sg&sz=64" },
      { name: "Disney Broadway", logo: "https://www.google.com/s2/favicons?domain=disney.com&sz=64" },
      { name: "Universal Studios", logo: "https://www.google.com/s2/favicons?domain=universalstudios.com&sz=64" },
      { name: "Mandai Wildlife", logo: "https://www.google.com/s2/favicons?domain=mandai.com&sz=64" },
      { name: "Art Fervour", logo: "https://www.google.com/s2/favicons?domain=artfervour.com&sz=64" },
      { name: "Social", logo: "https://www.google.com/s2/favicons?domain=socialoffline.in&sz=64" },
      { name: "Impresario", logo: "https://www.google.com/s2/favicons?domain=impresario.in&sz=64" },
    ],
  },
  stats: {
    label: "Proof of work",
    title: "The numbers behind the systems.",
    items: [
      { value: "10+ IPs", label: "Created across online and offline", context: "Content IPs, community activation formats, branded engagement properties, festival IPs" },
      { value: "5,000+", label: "Creator community built from scratch", context: "Self-serve ecosystem across 188+ destinations globally" },
      { value: "70% → 25%", label: "Founder decision load reduced", context: "Single 90-day engagement. Team restructured across 8 pods" },
      { value: "+85%", label: "Sponsor partnership value", context: "After IPs were repackaged as commercial products with tiered pricing" },
      { value: "2.1% → 4.8%", label: "Social engagement doubled", context: "While posting 40% less content" },
      { value: "20% MoM", label: "Readership growth", context: "Across 3-city editorial operations" },
    ],
  },
  caseStudies: {
    label: "Selected work",
    title: "Where the work happened.",
    items: [
      {
        tag: "Headout · Creator Ecosystems",
        cardTitle: "Designed a self-serve creator ecosystem that scaled itself.",
        modalTitle: "Designed a self-serve creator ecosystem that scaled itself.",
        situation: "Headout's creator program was entirely manual, under 50 collaborations a quarter.",
        whatIBuilt: "Redesigned it as a self-serve ecosystem across 40,000+ experiences in 188+ cities. Creators apply, get vetted, book, create, and re-enter the loop without anyone touching it.",
        whatChanged: "Went from under 50 to 700+ collabs per quarter at sub-$1 CPM.",
        metrics: [
          { value: "700+", label: "Creator collabs per quarter" },
          { value: "sub-$1", label: "CPM achieved" },
          { value: "10x", label: "Content output increase" },
        ],
      },
      {
        tag: "Art Fervour · 90-Day Fractional Engagement",
        cardTitle: "Turned parallel motion into compounding momentum.",
        modalTitle: "Turned parallel motion into compounding momentum.",
        situation: "Art Fervour had cultural credibility but no operating clarity.",
        whatIBuilt: "In 90 days: restructured the team across 8 pods, repositioned the brand as a South Asian cultural engine, packaged IPs as commercial products.",
        whatChanged: "Cut founder decision load from 70% to 25%. Sponsor pitch success more than tripled.",
        metrics: [
          { value: "70% → 25%", label: "Founder decision load" },
          { value: "12% → 34%", label: "Sponsor pitch success" },
          { value: "+85%", label: "Average partnership value" },
        ],
      },
      {
        tag: "Social (Impresario) · Brand Retrospective",
        cardTitle: "A 10-year brand reckoning for one of India's most iconic restaurant brands.",
        modalTitle: "A 10-year brand reckoning for Social.",
        situation: "Social, ranked alongside Netflix and Nike as India's coolest brand. After a decade and 55+ outlets, the founding identity was drifting.",
        whatIBuilt: "Led a full brand retrospective across four eras, surfaced contradictions between promise and reality.",
        whatChanged: "Delivered the strategic framework for the next decade.",
        metrics: [
          { value: "10 years", label: "Of brand evolution mapped" },
          { value: "55+", label: "Outlets audited" },
          { value: "4 eras", label: "Of identity analyzed" },
        ],
      },
      {
        tag: "Little Black Book (Nykaa) · Editorial Operations",
        cardTitle: "Built the editorial machine across three cities.",
        modalTitle: "Built the editorial machine across three cities.",
        situation: "LBB needed hyper-local content across multiple markets without losing its voice.",
        whatIBuilt: "Built the editorial workflows, standards, and city-specific strategies across Kolkata, Hyderabad, and Pune.",
        whatChanged: "1,000+ features, 20% MoM readership growth, 2.5x regional engagement.",
        metrics: [
          { value: "1,000+", label: "Features published" },
          { value: "2.5x", label: "Regional engagement growth" },
          { value: "20%", label: "MoM local readership growth" },
        ],
      },
      {
        tag: "Derek O'Brien & Associates · Quiz & Content IP",
        cardTitle: "Built the content engine behind India's longest-running quiz show.",
        modalTitle: "Built the content engine behind India's longest-running quiz show.",
        situation: "Six years. 2,000+ quiz programs across India and the Middle East.",
        whatIBuilt: "Managed research and content for Bournvita Quiz Contest on national television. Designed branded quiz formats for Coca-Cola, ITC, Penguin, and Max Life Insurance.",
        whatChanged: "Turned knowledge into engagement at national scale.",
        metrics: [
          { value: "2,000+", label: "Programs designed & delivered" },
          { value: "6 years", label: "As Content Strategist" },
          { value: "30M+", label: "TV viewers reached" },
        ],
      },
    ],
  },
  testimonials: [
    {
      quote: "Immensely grateful to have Fatema with us, whose meticulous planning and structured way of dissecting and analysing the problem has given us the edge. Personally for me, this has been a huge learning experience, just to see how she's been able to build frameworks, systems and processes to map the brand trajectories has been immensely valuable.",
      name: "Nitesh Mohanty",
      role: "Founder, PLORK School of Thought",
      avatar: "",
    },
    {
      quote: "We worked with Fatema during a restructuring and growth phase, and her strategic input helped us bring much-needed structure and clarity to our marketing efforts as well as for our marketing clients. She has a strong ability to quickly understand a business and new industry, identify gaps, and design systems and frameworks that are both practical, which is especially valuable for a growing startup. What stood out was her adaptability, particularly during our KAW event in Calcutta where she adjusted quickly to changing needs.",
      name: "Nivedita Poddar",
      role: "Founder, Art Fervour",
      avatar: "",
    },
  ],
  about: {
    label: "About",
    title: "Beyond the work.",
    paragraphs: [
      "I make zines on weekends, parent two humans who are far more opinionated than my clients, and will absolutely corner you at a party to ask how you built your business. I'm the person who reads the footnotes, notices when a brand's voice drifts between its website and its Instagram, and genuinely cannot stop thinking about why some things compound and others just... repeat.",
      "That's what I do professionally, too. I work with founders to find the story their brand is actually telling, not the one in the deck, and build the system that makes it run. Content architecture, team structure, brand strategy, creator ecosystems. Twenty years across entertainment, travel, culture, and consumer brands. The through-line: I care about how things are built, not just what gets shipped.",
      "I run The Story Shapers Collective out of Kolkata. Senior strategists, fractional model, no agency layers. When you work with us, I'm the one in the room. Probably with chai, definitely with opinions.",
      "When I'm not doing any of this, I'm taking long walks humming questionable tunes, folding a zine, or scribbling in my journal. Perpetually curious about everything.",
    ],
    photo: "/assets/54b8c761-3071-4f74-8057-1840518e15a6_1772266999973.jpg",
    secondaryPhoto: "",
    pullQuote: "",
    tags: [],
  },
  workWithMe: {
    title: "Work with me.",
    subtitle: "Four ways in. Pick the one that fits.",
    cards: [
      { eyebrow: "Start here", title: "Coffee Chat", price: "Free / 15 min", description: "A quick, casual conversation to see if there's a fit. No prep needed, no commitment. Just a hello and an honest take on whether I can help.", ctaLabel: "Grab a slot →", ctaHref: "https://topmate.io/fatema_hanif05/2020030" },
      { eyebrow: "Deep dive", title: "Brand Audit Call", price: "₹5,000 / 45 min", description: "A focused diagnostic. Share your brand deck and key materials in advance. I come prepared. You leave with a clear read on what's working, what's not, and what to fix first. Written report included.", ctaLabel: "Book this call →", ctaHref: "https://topmate.io/fatema_hanif05/2020029" },
      { eyebrow: "Project-based", title: "Strategy Sprint", price: "Scoped / 2–4 weeks", description: "A 2-4 week engagement to solve one specific problem: content strategy, team structure, campaign planning, or brand positioning. We scope it together. You get a framework you can run with.", ctaLabel: "Tell me the problem →", ctaHref: "https://docs.google.com/forms/d/e/1FAIpQLSd5x6mtChDhccDSxBQqgpk6RgvM01eHBO6xadM9eQJvTFw6Dg/viewform" },
      { eyebrow: "Ongoing", title: "Fractional Partnership", price: "Custom / monthly", description: "For founders who need a senior strategist in the room, not a one-off. Ongoing brand and marketing leadership. We scope it based on what you actually need: brand, content, team, growth.", ctaLabel: "Start a conversation →", ctaHref: "https://docs.google.com/forms/d/e/1FAIpQLSd5x6mtChDhccDSxBQqgpk6RgvM01eHBO6xadM9eQJvTFw6Dg/viewform" },
    ],
  },
  footer: {
    tagline: "Or just say hello.",
    email: "fatema.hanif@storyshaperscollective.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fatemarfatia/" },
      { label: "Instagram", href: "https://www.instagram.com/bookofcuriouser/" },
    ],
  },
};

const SHAILI: InsertTeamMemberPortfolio = {
  slug: "shaili",
  name: "Shaili Contractor",
  sortOrder: 1,
  metaTitle: "Shaili Contractor — Brand & Content Strategy | The Story Shapers",
  metaDescription: "18 years of brand strategy, content strategy, and editorial leadership. Trained journalist. Instinctive editor.",
  hero: {
    eyebrow: "Shaili Contractor",
    headlineLine1: "I find the story. I build the strategy.",
    headlineLine2: "I make it work.",
    headlineLine2Italic: true,
    subtext: "18 years of brand strategy, content strategy, and editorial leadership. I help brands understand what they're actually saying — and then build the systems, content, and narratives to say it better. Trained journalist. Instinctive editor. Your first call when the brief needs both rigour and a genuine point of view.",
    portrait: "/assets/Shaili-brand-deck_1772267064740.jpeg",
    ctas: [
      { label: "See my work", href: "#work" },
      { label: "Book a call", href: "/contact" },
      { label: "More about me", href: "#about" },
    ],
  },
  brands: {
    title: "Brands I've worked with",
    items: [
      { name: "Headout", logo: "" },
      { name: "FirstCry", logo: "" },
      { name: "Little Black Book", logo: "" },
      { name: "Leo Burnett", logo: "" },
      { name: "VML India", logo: "" },
      { name: "Hindustan Times", logo: "" },
      { name: "General Mills", logo: "" },
      { name: "Axis Bank", logo: "" },
      { name: "Google Pixel", logo: "" },
      { name: "Heinz", logo: "" },
      { name: "Bharti AXA", logo: "" },
      { name: "India Podcasts", logo: "" },
      { name: "STEM Learning", logo: "" },
      { name: "Network18", logo: "" },
    ],
  },
  stats: {
    label: "Proof of work",
    title: "The numbers behind 18 years of doing this.",
    items: [
      { value: "2,000+", label: "Content pages built", context: "Headout — ranked, revenue-linked, built to convert across France, Italy, Switzerland and global markets" },
      { value: "3 months", label: "Zero to Page 1", context: "A new France content domain, built from scratch — Paris and surrounding regions" },
      { value: "4", label: "Sub-brands architected", context: "IntelliBaby · IntelliKits · Intelliskills · Intellitots within FirstCry IntelliEducation" },
      { value: "130+", label: "Products developed", context: "50+ subscription kits and 80+ educational tools and toys at FirstCry IntelliEducation" },
      { value: "15", label: "Content IPs developed", context: "Across Leo Burnett, FirstCry, and LBB — formats and franchises built to scale" },
      { value: "15x", label: "Content output growth", context: "As Editor for LBB Mumbai, alongside a 40% increase in page traffic" },
      { value: "50+", label: "School magazines edited", context: "Grades 5–8, plus AI and technology learning manuals at STEM Learning" },
      { value: "5.5M", label: "Views in 30 days", context: "India Podcasts' Instagram, with individual reels hitting 2.6M–3.5M. 600 new followers in a month." },
    ],
  },
  caseStudies: {
    label: "Selected work",
    title: "Where the work actually happened.",
    items: [
      {
        tag: "Headout · Content Leadership",
        cardTitle: "Leading two European markets to the top of search — and the top of mind.",
        modalTitle: "Leading two European markets to the top of search.",
        situation: "Led the content teams for Headout's France and Italy-Switzerland markets — building not just pages, but an entire content infrastructure that did two jobs at once: rank on Google and turn readers into bookers.",
        whatIBuilt: "The France market started from zero. A new domain, new city micro-brands, new editorial standards. Italy and Switzerland followed the same model: consistent Page 1 presence, content built to answer real questions, revenue-linked pages.",
        whatChanged: "Page 1 rankings across key cities within three months of launch. Every piece of content earned its place twice over.",
        metrics: [
          { value: "2,000+", label: "Content pages across 3 markets" },
          { value: "3 months", label: "To Page 1, France domain" },
        ],
      },
      {
        tag: "FirstCry · IntelliEducation · Brand Architecture",
        cardTitle: "Building an entire early learning brand — from the first page to four verticals.",
        modalTitle: "Building an entire early learning brand from scratch.",
        situation: "IntelliEducation didn't exist yet. I was there before the first page was written.",
        whatIBuilt: "Helped shape the structure, the voice, and the content strategy that would branch into four sub-brands: IntelliBaby (50 products for India's youngest learners), IntelliKits (Montessori-inspired monthly subscription kits, 50+ developed), Intelliskills (educational toys, puzzles, books — 80+ products), and the IntelliEducation editorial blog.",
        whatChanged: "Four sub-brands built from scratch, 130+ products developed, 50+ subscription kits produced.",
        metrics: [
          { value: "4", label: "Sub-brands built from scratch" },
          { value: "130+", label: "Products developed" },
          { value: "50+", label: "Subscription kits produced" },
        ],
      },
      {
        tag: "Little Black Book · Editorial Leadership",
        cardTitle: "Growing a city's content output 15x — without losing the voice that made it matter.",
        modalTitle: "15x content growth at LBB Mumbai.",
        situation: "As AGM and Editor for LBB Mumbai, I led a team of 7 across content, strategy, and operations. The challenge was never just volume — it was editorial quality at scale.",
        whatIBuilt: "Managed LBB Delhi for a stint. Worked directly with the founder to keep the homepage and app content fresh and relevant daily — using data to shape what surfaced, when, and why. Built content IPs that gave the platform repeatable formats with longevity.",
        whatChanged: "Grew content output 15x and page traffic 40%. Managed push notifications and India-wide content strategy.",
        metrics: [
          { value: "15x", label: "Content output growth" },
          { value: "40%", label: "Increase in page traffic" },
        ],
      },
      {
        tag: "STEM Learning · Editorial",
        cardTitle: "Making learning content worth reading — for school kids and for donors.",
        modalTitle: "Editorial across school magazines and donor stories.",
        situation: "Two distinct briefs. The Save for Change fundraiser website to move donors. And editorial across school magazines for grades 5–8, plus manuals on AI and technology.",
        whatIBuilt: "Built the donor website alongside UX and UI designers — every section earning its place with clarity and emotion. Served as the voice layer across school magazines and tech manuals.",
        whatChanged: "Over 50 magazines and publications shaped across the programme. Complex ideas made genuinely engaging for young readers.",
        metrics: [
          { value: "50+", label: "Magazines and publications" },
          { value: "Grades 5–8", label: "Primary editorial audience" },
        ],
      },
      {
        tag: "India Podcasts · Content Strategy",
        cardTitle: "Building a content engine that grew an audience with intent.",
        modalTitle: "Building a content engine for India Podcasts.",
        situation: "Brought in for content strategy and planning to move India Podcasts from reactive publishing to an intentional editorial model.",
        whatIBuilt: "An editorial model with structure, cadence, and a clear voice. The work was as much about how to think about content as it was about the content itself.",
        whatChanged: "Measurable growth in both following and engagement. 5.5M views in 30 days, peak reels at 3.5M, 600 new followers in a month.",
        metrics: [
          { value: "5.5M", label: "Views in 30 days" },
          { value: "3.5M", label: "Peak reel reach" },
          { value: "600", label: "New followers, one month" },
        ],
      },
    ],
  },
  testimonials: [
    {
      quote: "Working with Shaili on the France market at Headout was genuinely one of the highlights of my time as GM. She brought a rare combination of creativity and strategic thinking to content — always finding the right angle to make an experience come alive for travellers. Her deep understanding of what makes French destinations special, from Paris to the regions, translated into content that didn't just inform but truly inspired and triggered the purchase. She was collaborative, reliable, and brought great energy to every brief we worked on together. Anyone lucky enough to work with her will feel the difference immediately.",
      name: "Jean Peltier",
      role: "GM France · Italy · Switzerland, Headout · ex-Uber · ex-Amazon",
      avatar: "",
    },
    {
      quote: "I worked with Shaili for over a year at LBB, where she was the AGM. In addition to being a terrific writer, she is exceptionally hardworking and one of the most supportive managers I've had the pleasure of working with. She knows how to lead a team — she deftly shaped our work and guided us to always think deeper and write with clarity. She has been an invaluable mentor to me.",
      name: "[Name to confirm]",
      role: "Former colleague, LBB",
      avatar: "",
    },
  ],
  about: {
    label: "About me",
    title: "Beyond the work.",
    paragraphs: [
      "I'm a trained journalist who has spent 18 years working at the intersection of brand strategy, content strategy, and editorial leadership. Three things most people treat as separate disciplines — and that I've always seen as the same conversation.",
      "Words are never just words. They're the strategy made visible. I've spent my career helping brands understand the difference between saying something and meaning it.",
      "I started in advertising — writing for General Mills, Axis Bank, Google Pixel, Heinz, and Bharti AXA, among others. Moved into editorial, then spent years building early learning brands from scratch, then led content teams across travel, media, and education. The industries changed. The questions didn't: What is this brand actually saying? Is the content doing the work it needs to do? And does it earn the trust it's asking for?",
      "Outside work, I garden obsessively, write stories for children, and collect graphic novels with the seriousness of someone building an archive. Bone by Jeff Smith is my favourite. Middlesex by Jeffrey Eugenides is one of the finest novels written. I also give time to cleaning up my city — because some things need more than a good narrative to fix them.",
    ],
    photo: "/assets/Shaili-brand-deck_1772267064740.jpeg",
    secondaryPhoto: "",
    pullQuote: "",
    tags: ["Brand Strategy", "Content Strategy", "Editorial Leadership", "SEO Content", "Brand Architecture", "Team Building", "Early Learning", "AI-Driven Tools"],
  },
  workWithMe: {
    title: "Work with me.",
    subtitle: "Four ways in. Pick the one that fits. Whether you need someone to think through a brief, audit what's not landing, sprint on a specific challenge, or lead your content function over the long term — here's how we work together.",
    cards: [
      { eyebrow: "Start here", title: "Coffee and a Conversation", price: "Free / 30 min", description: "No agenda, no deck, no commitment. Just an honest conversation about what your brand is trying to say — and whether I can help you say it better. Bring your biggest content headache. I'll bring sharp questions and a genuine point of view.", ctaLabel: "Grab a slot →", ctaHref: "https://topmate.io/shaili_contractor/2108835?utm_source=public_profile&utm_campaign=shaili_contractor" },
      { eyebrow: "Diagnostic", title: "Brand & Content Audit", price: "Scoped / project", description: "A focused diagnostic of your brand narrative and content ecosystem. Share your key materials beforehand — I come prepared. You leave with a clear read on what's working, what's quietly losing trust, and exactly what to fix first. Delivered as a written report.", ctaLabel: "Book this →", ctaHref: "https://topmate.io/shaili_contractor/2108836?utm_source=public_profile&utm_campaign=shaili_contractor" },
      { eyebrow: "Project", title: "Strategy Sprint", price: "Scoped / 2–6 weeks", description: "A concentrated engagement on one real problem — brand narrative, SEO content architecture, editorial overhaul, new vertical launch, or content team structure. We define the scope together. You leave with a strategy and a system you can run independently.", ctaLabel: "Tell me the problem →", ctaHref: "https://topmate.io/shaili_contractor/2108837?utm_source=public_profile&utm_campaign=shaili_contractor" },
      { eyebrow: "Ongoing", title: "Fractional Partnership", price: "Custom / monthly", description: "For founders and organisations who need a senior brand and content strategist in the room on an ongoing basis — not just for one sprint. Strategy, editorial direction, team mentoring, and execution oversight, scoped to what you actually need.", ctaLabel: "Start a conversation →", ctaHref: "https://topmate.io/shaili_contractor/2108838?utm_source=public_profile&utm_campaign=shaili_contractor" },
    ],
  },
  footer: {
    tagline: "Shaili Contractor · The Story Shapers Collective",
    email: "shaili@storyshaperscollective.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/shailicontractor/" },
    ],
  },
};

const AAKANKSHA: InsertTeamMemberPortfolio = {
  slug: "aakanksha",
  name: "Aakanksha Singh Devi",
  sortOrder: 2,
  metaTitle: "Aakanksha Singh Devi — Content Strategy & Editorial Operations | The Story Shapers",
  metaDescription: "Content strategy, editorial operations, and brand positioning. 17 years of building systems that scale across journalism, discovery platforms, and product content.",
  hero: {
    eyebrow: "",
    headlineLine1: "I build how content works.",
    headlineLine2: "Then I make it scale.",
    headlineLine2Italic: true,
    subtext: "Content strategy, editorial operations, and brand positioning. 17 years of experience across journalism, discovery platforms, travel, e-commerce, SEO, product content and building systems — from early ambiguity to product–market fit, and into sustained momentum across cities.",
    portrait: "/assets/IMG_20260302_230326_1772542685201.jpg",
    ctas: [
      { label: "See my work", href: "#work" },
      { label: "Book a call", href: "/contact" },
      { label: "More about me", href: "#about" },
    ],
  },
  brands: {
    title: "Brands I've built with",
    items: [
      { name: "Headout", logo: "" },
      { name: "Little Black Book", logo: "" },
      { name: "Nestle", logo: "" },
      { name: "Cadbury's", logo: "" },
      { name: "The New Indian Express (Indulge)", logo: "" },
      { name: "Rediffusion Y&R", logo: "" },
      { name: "Aarunya", logo: "" },
      { name: "Postcard Travel", logo: "" },
      { name: "Singapore Tourism Board", logo: "" },
      { name: "Mantri Square", logo: "" },
      { name: "Columbia Asia Hospitals", logo: "" },
      { name: "ESPN", logo: "" },
      { name: "Star Sports", logo: "" },
    ],
  },
  stats: {
    label: "Numbers",
    title: "The numbers behind the systems.",
    items: [
      { value: "100M+", label: "SEO impressions / month", context: "Across large-scale organic discovery engines" },
      { value: "5M+", label: "Monthly readers", context: "Across multi-city content ecosystems" },
      { value: "20M+", label: "Audience reach", context: "Across discovery, commerce, and content platforms" },
      { value: "30–60+", label: "Teams led", context: "Writers, editors, designers, and leads" },
      { value: "150–180/month", label: "Articles scaled", context: "Alongside video and platform-native formats" },
    ],
  },
  caseStudies: {
    label: "Selected work",
    title: "Selected work.",
    items: [
      {
        tag: "LBB · Content + Commerce",
        cardTitle: "Built a hyperlocal content engine that scaled across India.",
        modalTitle: "Built a hyperlocal content engine that scaled across India.",
        situation: "LBB started as a Delhi-first discovery platform. Bangalore was the first test case with no audience, no brand recall, and no playbook. The challenge wasn't growth — it was scaling across cities without losing local voice, trust, or relevance.",
        whatIBuilt: "A city-first, system-led content engine. Built Bangalore from scratch, after the launch in New Delhi, and scaled to Mumbai, Pune, Goa, Hyderabad, Chennai, and Kolkata. Hired and led city teams, created tone of voice and editorial systems, and introduced scalable formats. Built travel as a new category and expanded across discovery, shopping, video, and SEO.",
        whatChanged: "LBB scaled from a single-city platform to a multi-city network. 5M+ monthly readers, 20M+ audience reach, and ~85% organic traffic. Content moved from discovery to action, supporting commerce and real user decisions.",
        metrics: [
          { value: "5M+", label: "Monthly readers" },
          { value: "20M+", label: "Audience reach" },
          { value: "100M+", label: "SEO impressions/month" },
        ],
      },
      {
        tag: "Headout · Global Systems",
        cardTitle: "Built global content systems that actually scaled.",
        modalTitle: "Built global content systems that actually scaled.",
        situation: "Headout had content across markets but no unified system. No tone of voice, no editorial structure, no standardisation, and slow turnaround (~12 days for batches). Content existed, but nothing scaled.",
        whatIBuilt: "Built tone of voice, style guide, and editorial systems from scratch. Standardised formats across product and SEO pages. Introduced editorial layers and worked with tech and AI teams to build structured, AI-assisted workflows.",
        whatChanged: "Faster production cycles, global consistency across markets, and stronger alignment between content, product, and business goals. Content became predictable, scalable, and revenue-aligned.",
        metrics: [
          { value: "60+", label: "Content org" },
          { value: "Global", label: "Markets covered" },
          { value: "Faster", label: "Reduced turnaround time" },
        ],
      },
      {
        tag: "Postcard Travel · Editorial + Curation",
        cardTitle: "Built a city-led content model for discovery at scale.",
        modalTitle: "Built a city-led content model for discovery.",
        situation: "Postcard Travel needed a structured way to scale city content – without losing the editorial sharpness that makes discovery platforms worth reading. The challenge was balancing volume, consistency, and local relevance across cities.",
        whatIBuilt: "Designed a repeatable city content model. Defined formats for food, shopping, and events. Built a curation-first approach (not list dumping). Structured content into 25 food spots, 25 shopping spots, 20 event listings. Set editorial guidelines for tone, depth, and usefulness. Acted as central POC for quality and consistency.",
        whatChanged: "Created a scalable model for launching and maintaining city guides. Balanced editorial quality with operational efficiency. Built a system where discovery feels curated, not aggregated. Content stayed intentional — even at scale.",
        metrics: [
          { value: "50+", label: "Listings per city" },
          { value: "20", label: "Events tracked per cycle" },
          { value: "Scalable", label: "City format" },
        ],
      },
      {
        tag: "Schmancy · Website + Content",
        cardTitle: "Built a distinct voice and new look for a modern lifestyle brand.",
        modalTitle: "Built a distinct website for a modern lifestyle brand.",
        situation: "Schmancy needed a clear voice and identity online. Something that felt contemporary, distinctive, and consistent across content and brand touchpoints.",
        whatIBuilt: "Defined tone of voice and brand personality. Built content across brand storytelling, product narratives, and social and digital formats. Ensured consistency across platforms.",
        whatChanged: "Established a recognisable, cohesive brand voice. Created content that felt intentional, not generic. Built a foundation for consistent brand storytelling. From scattered messaging to a clear, ownable voice.",
        metrics: [
          { value: "Voice", label: "Defined" },
          { value: "System", label: "Content built" },
          { value: "Consistent", label: "Brand achieved" },
        ],
      },
    ],
  },
  testimonials: [
    {
      quote: "Aakanksha brings the rare mix of editorial judgment, strategic clarity, and operational systems thinking. She can zoom into a sentence and zoom out to build the structure that makes an entire content engine run better.",
      name: "[Name to confirm]",
      role: "Former leader",
      avatar: "",
    },
    {
      quote: "Aakanksha doesn't just create content; she builds the operating system behind it. She turns ambiguity into structure and content into something that scales without losing quality.",
      name: "[Name to confirm]",
      role: "Former colleague",
      avatar: "",
    },
  ],
  about: {
    label: "About",
    title: "Beyond the work.",
    paragraphs: [
      "I climb mountains. I run. I try (with varying success) to stay fit – mostly so I can justify demolishing a family pack of momos meant for five people. I travel often, hoard sunglasses and shoes like it's a personality trait, and take my coffee very seriously. Desserts won't win me over. Spicy hot chips absolutely will.",
      "I'm deeply invested in sport – football, Formula One, tennis, basketball, anything competitive – with the full and slightly delusional confidence that I could coach better on most days.",
      "I rewatch Peaky Blinders, binge crime shows, read fantasy fiction, and, if given the option, would quite happily be Doctor Who.",
    ],
    photo: "/assets/IMG_20260302_230326_1772542685201.jpg",
    secondaryPhoto: "",
    pullQuote: "",
    tags: [],
  },
  workWithMe: {
    title: "Work with me.",
    subtitle: "Four ways in. Pick the one that fits.",
    cards: [
      { eyebrow: "Start here", title: "Coffee Chat", price: "Free / 30 mins", description: "A quick conversation to discuss your content, brand, or challenge.", ctaLabel: "Start here →", ctaHref: "https://topmate.io/aakanksha_singh_devi/2107926?utm_source=public_profile&utm_campaign=aakanksha_singh_devi" },
      { eyebrow: "Diagnostic", title: "Brand Audit Call", price: "₹5,000 / 45 mins", description: "Review your content, positioning, and gaps with clear next steps.", ctaLabel: "Book this call →", ctaHref: "https://topmate.io/aakanksha_singh_devi/2123230?utm_source=public_profile&utm_campaign=aakanksha_singh_devi" },
      { eyebrow: "Project", title: "Strategy Sprint", price: "Scoped / 2–4 weeks", description: "Solve a specific content or brand problem in a structured sprint.", ctaLabel: "Tell me the problem →", ctaHref: "https://topmate.io/aakanksha_singh_devi/2123243?utm_source=public_profile&utm_campaign=aakanksha_singh_devi" },
      { eyebrow: "Ongoing", title: "Fractional Partnership", price: "Custom / monthly", description: "Ongoing strategic content and brand support.", ctaLabel: "Start a conversation →", ctaHref: "https://topmate.io/aakanksha_singh_devi/2123248?utm_source=public_profile&utm_campaign=aakanksha_singh_devi" },
    ],
  },
  footer: {
    tagline: "Or just say hello",
    email: "aakanksha@storyshaperscollective.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Instagram", href: "https://www.instagram.com/" },
    ],
  },
};

export async function seedPortfolios() {
  const existing = await storage.getTeamMemberPortfolios();
  const bySlug = new Map(existing.map((p) => [p.slug, p]));

  for (const data of [FATEMA, SHAILI, AAKANKSHA]) {
    if (!bySlug.has(data.slug)) {
      console.log(`Seeding portfolio: ${data.slug}`);
      await storage.createTeamMemberPortfolio(data);
    }
  }
}
