import { db } from "./db";
import { storage } from "./storage";
import { siteSettings, teamMembers, services, problems, whatWeDoBlocks } from "@shared/schema";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  const existingSettings = await storage.getAllSettings();
  if (existingSettings.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  console.log("Seeding database with initial content...");

  const existingAdmin = await storage.getUserByUsername("admin");
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("storyshapers2024", 10);
    await storage.createUser({ username: "admin", password: hashedPassword });
    console.log("Created default admin user");
  }

  await storage.upsertSetting("hero", {
    label: "The Story Shapers",
    heading: "Finally. Marketing people who <em>get it.</em>",
    subheading: "Not an agency. Not a roster of freelancers. A collective of senior marketers who bring clarity and direction to brands that have outgrown tactics and guesswork.",
    ctaText: "How we work →",
    tickerLabel: "Brands we've worked with →",
    brands: ["Art Fervour", "LBB", "Headout", "SOCIAL", "Singapore Tourism Board", "Coca-Cola", "Cadbury's", "Heinz", "Google Pixel"],
  });

  await storage.upsertSetting("problem", {
    label: "THE PROBLEM",
    heading: "Your product is clear.<br />Your marketing isn't.",
    subheading: "These are the patterns we see again and again.",
  });

  await storage.upsertSetting("origin", {
    label: "WHAT WE DO",
    heading: "Here's how we solve it.",
    subtitle: "We fix positioning, messaging, content, and campaigns. And build the systems to keep them running.",
  });

  await storage.upsertSetting("team", {
    label: "The Shapers",
    headingLine1: "Three senior marketers.",
    headingLine2: "45+ years of combined experience.",
    intro: "We've owned revenue targets, built teams, and fixed broken brand systems inside fast-scaling companies. We know what it takes to execute — not just advise.",
  });

  await storage.upsertSetting("services", {
    label: "Services",
    heading: "How we work with you.",
    subheading: "Every brand arrives with different questions. The starting point is always the same.",
  });

  await storage.upsertSetting("cta", {
    label: "Let's Talk",
    heading: "Not sure where to start?",
    paragraph: "Tell us where things feel off. We'll tell you what we see and where to begin.",
    buttonText: "Get our recommendation →",
    buttonLink: "/contact#talk",
  });

  await db.insert(problems).values([
    { displayId: "01", text: "You're doing marketing. You just can't explain why any of it's working.", sortOrder: 0 },
    { displayId: "02", text: "Your website says one thing. Your pitch deck says another. Your team says a third.", sortOrder: 1 },
    { displayId: "03", text: "Content goes out every week. You couldn't point to a single lead it brought in.", sortOrder: 2 },
    { displayId: "04", text: "You have a strategy doc somewhere. Nobody's opened it since the offsite.", sortOrder: 3 },
  ]);

  await db.insert(whatWeDoBlocks).values([
    {
      title: "We start by figuring out what the brand actually stands for.",
      description: "Before campaigns or content, we establish what the brand should say and how.",
      teaser: "SOCIAL had 55+ outlets and no consistent answer for what held them together. We found it. Everything else followed.",
      expanded: "At SOCIAL (Impresario Entertainment & Hospitality) — the brand had scaled to 55+ outlets but couldn't explain what held it together. We mapped 10 years of evolution to find what stayed true versus what drifted. That became the spine for every decision that followed.",
      sortOrder: 0,
    },
    {
      title: "You work with us directly. Not someone we've briefed.",
      description: "The person you speak to is the person working on your brand. No handoffs.",
      teaser: "Art Fervour — 90 days embedded. Founder's decision load dropped from 70% to 25%.",
      expanded: "At Art Fervour, we didn't advise from the sidelines. We embedded 20–25 hours a week for 90 days. Restructured the team. Rebuilt social strategy. The founder's decision load dropped from 70% to 25%. The story got structure, so it could unfold without constant authorship.",
      sortOrder: 1,
    },
    {
      title: "We build what your team runs after we leave.",
      description: "Playbooks, workflows, editorial systems — not a deck.",
      teaser: "LBB — content infrastructure across multiple cities. Still running.",
      expanded: "At LBB, we built content infrastructure for lean editorial teams across multiple cities. Repeatable formats. Clear calendars. An editorial backbone that didn't collapse after two busy weeks.",
      sortOrder: 2,
    },
    {
      title: "We make what you're already doing work harder.",
      description: "Before adding anything new, we look at what exists and fix that first.",
      teaser: "Headout — 50 to 1,000+ creator collaborations per quarter. Same team. Three months.",
      expanded: "At Headout, we scaled the creator program from under 50 to 1,000+ collaborations per quarter. In three months. Not by adding more people — by designing a smarter narrative system.",
      sortOrder: 3,
    },
  ]);

  await db.insert(teamMembers).values([
    {
      name: "Fatema Hanif",
      image: "/assets/54b8c761-3071-4f74-8057-1840518e15a6_1772266999973.jpg",
      decisionsLed: "Positioning · Go-to-market · Creator programs · Multi-market expansion",
      brands: "Headout · Singapore Tourism Board · Coca-Cola · LBB · Art Fervour · SOCIAL",
      brandsLabel: "Brands",
      whatSheBrings: [
        "Specialises in making sure brand strategy and business reality point in the same direction. She has built marketing functions from scratch, scaled creator programs across markets, and driven brand transformations for startups and global companies.",
      ],
      sortOrder: 0,
    },
    {
      name: "Shaili Contractor",
      image: "/assets/Shaili-brand-deck_1772267064740.jpeg",
      decisionsLed: "Content strategy · Brand narrative · Editorial systems",
      brands: "Heinz · Google Pixel · Bajaj · General Mills · LBB · Headout",
      brandsLabel: "Brands",
      whatSheBrings: [
        "Builds content systems that create compounding brand equity — not just output. She moves teams from scattered, ad-hoc content to structured storytelling that builds recall and credibility over time.",
      ],
      sortOrder: 1,
    },
    {
      name: "Aakanksha Singh Devi",
      image: "/assets/IMG_20260302_230326_1772542685201.jpg",
      decisionsLed: "Brand narrative · Voice · Editorial positioning",
      brands: "LBB · Headout · Cadbury's · Singapore Tourism Board · Columbia Asia",
      brandsLabel: "Brands",
      whatSheBrings: [
        "Makes brands sound like themselves — clearly, consistently, at every stage of growth. She moves teams from inconsistent messaging to a coherent voice that holds across every channel.",
      ],
      sortOrder: 2,
    },
  ]);

  await db.insert(services).values([
    {
      serviceId: "clarity",
      title: "Clarity & Direction",
      subtitle: "When your team can't agree on what the brand stands for.",
      items: ["Brand audits", "Positioning", "Messaging architecture", "Go-to-market frameworks"],
      sortOrder: 0,
    },
    {
      serviceId: "website",
      title: "Website, Messaging & Discoverability",
      subtitle: "When the product has evolved but the website hasn't — and good work isn't showing up where it should.",
      items: ["Core messaging", "Conversion copy", "Landing pages", "SEO"],
      sortOrder: 1,
    },
    {
      serviceId: "content",
      title: "Content Systems",
      subtitle: "When content exists but nothing compounds.",
      items: ["Content strategy", "Editorial calendars", "Storytelling frameworks", "Repurposing systems"],
      sortOrder: 2,
    },
    {
      serviceId: "campaigns",
      title: "Brand & Campaign Strategy",
      subtitle: "When launches spike and fade instead of building on each other.",
      items: ["Campaign architecture", "Integrated planning", "Launch messaging", "Always-on systems"],
      sortOrder: 3,
    },
    {
      serviceId: "leadership",
      title: "Senior Marketing Leadership",
      subtitle: "When you need experienced judgment without a full-time hire.",
      items: ["Strategic planning", "Quarterly reviews", "Decision support", "Team playbooks"],
      sortOrder: 4,
    },
    {
      serviceId: "ai",
      title: "AI-Assisted Systems",
      subtitle: "When AI is making you faster at producing the wrong things.",
      items: ["Content workflows", "Insight automation", "Monitoring systems", "Operational efficiency"],
      sortOrder: 5,
    },
  ]);

  console.log("Database seeded successfully!");
}
