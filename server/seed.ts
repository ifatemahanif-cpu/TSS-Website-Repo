import { db } from "./db";
import { storage } from "./storage";
import { siteSettings, teamMembers, services, problems, whatWeDoBlocks, blogCategories, blogPosts, authors } from "@shared/schema";
import bcrypt from "bcryptjs";
import { HERO_VERSION, HERO_CONTENT } from "@shared/hero";

export async function seedDatabase() {
  const existingSettings = await storage.getAllSettings();
  const existingKeys = new Set(existingSettings.map((s) => s.key));
  const isFullySeeded = existingSettings.length > 0;

  const existingHero = existingSettings.find((setting) => setting.key === "hero");
  const existingHeroValue = existingHero?.value as Record<string, unknown> | undefined;

  // Replace, don't merge — see the note in shared/hero.ts. Spreading the old
  // value forward is what kept retired hero fields alive across rewrites.
  if (existingHeroValue && existingHeroValue.version !== HERO_VERSION) {
    await storage.upsertSetting("hero", HERO_CONTENT);
    console.log(`Migrated the homepage hero to v${HERO_VERSION}`);
  }

  const existingCategories = await storage.getBlogCategories();
  const needsBlogSeed = existingCategories.length === 0;

  const existingAuthors = await storage.getAuthors();
  const needsAuthorSeed = existingAuthors.length === 0;

  const { seedPortfolios } = await import("./seedPortfolios");
  await seedPortfolios();

  if (isFullySeeded) {
    const subpageKeys = ["ourStory", "join", "contact"];
    const missingKeys = subpageKeys.filter((k) => !existingKeys.has(k));
    if (missingKeys.length === 0 && !needsBlogSeed && !needsAuthorSeed) {
      console.log("Database already seeded, skipping...");
      return;
    }
    if (missingKeys.length > 0) {
      console.log(`Backfilling missing settings: ${missingKeys.join(", ")}...`);
    }
  } else {
    console.log("Seeding database with initial content...");
  }

  const existingAdmin = await storage.getUserByUsername("admin");
  if (!existingAdmin) {
    // This repo is public, so the seed password can only come from the
    // environment. Without it we skip the admin user rather than create one
    // with a password anyone can read.
    const seedPassword = process.env.ADMIN_SEED_PASSWORD;
    if (!seedPassword) {
      console.warn(
        "[seed] ADMIN_SEED_PASSWORD is not set — skipping admin user creation. " +
          "Set it and re-run to create the admin login.",
      );
    } else {
      const hashedPassword = await bcrypt.hash(seedPassword, 10);
      await storage.createUser({ username: "admin", password: hashedPassword });
      console.log("Created default admin user");
    }
  }

  if (!isFullySeeded) {
  await storage.upsertSetting("hero", HERO_CONTENT);

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
  } // end !isFullySeeded

  if (!existingKeys.has("ourStory")) {
  await storage.upsertSetting("ourStory", {
    label: "Our Story",
    headingMain: "The Story Shapers:",
    headingItalic: "An Origin",
    opening: "Once upon a time, which is how all good stories begin, there were three marketers. Not musketeers, though they'd later discover they shared the same battle scars.",
    misplacedVoice: "They'd built careers helping others find their voice. And somewhere along the way, they'd misplaced their own.",
    photocopy: "They worked in different corners of the industry. Agencies. Corporates. Startups. Strategy rooms with too much air conditioning and not enough oxygen. They were good at what they did. Sometimes great. But the work had started to feel like a photocopy of a photocopy, each version a little more faded than the last.",
    person1: "One had spent years writing for others. Brand voices. Campaign manifestos. Thought pieces with neat conclusions. Her own words lived elsewhere, half-formed, sitting in drafts she never sent.",
    person2: "Another had mastered the art of the perfect pitch deck. She could sell a vision in her sleep, and had long stopped counting how many times she'd stood in a room presenting someone else's thinking as if it were her own.",
    person3: "And the third had simply grown tired of being the smartest person in rooms that didn't want to listen.",
    notBoardroom: "They didn't meet in a boardroom. Or a conference. Or one of those networking events where everyone talks and no one says anything.",
    slowlyThenAtOnce: "They met the way most meaningful things happen, slowly, then all at once. A late-night message that said: \"Is it just me, or does this feel broken?\"",
    notJustHer: "It wasn't just her.",
    sameWeight: "What they discovered was that they'd all been carrying the same quiet weight: knowing exactly what a brand needed, and watching it do the opposite. Being senior enough to see the problem, but not free enough to fix it.",
    stoppedWaiting: "And then one day, they stopped waiting for permission.",
    noAgency: "No agency. No corporate ladder. No one else's rules about what work should look like or who gets to shape it.",
    threeHumans: "Just three humans, a writer, a thinker, a doer (all three of each, really), asking a precarious question:",
    bigQuestion: "What if we actually did this the way we've always known it should be done?",
    notBornFromBusiness: "The Story Shapers wasn't born from any grand business idea.",
    collectiveExhale: "It was born from a collective exhale.",
    interdisciplinary: "Interdisciplinary by design. Flexible by intention. Built on the radical idea that the best work doesn't ask you to shrink — into a role, a title, a lane, a niche. It asks you to show up whole.",
    nowTheyDo: "Now they do for others what they finally did for themselves. They help businesses find the story that's been there all along, buried under decks and campaigns and \"we've always done it this way.\"",
    dontClaimAnswers: "They don't claim to have all the answers. But they've learned, the hard way, the only way, that the story you're afraid to tell is usually the one that matters most.",
    closing: "This is us. The Story Shapers.",
  });
  }

  if (!existingKeys.has("join")) {
  await storage.upsertSetting("join", {
    label: "Join the Collective",
    headingMain: "This isn't a job.",
    headingItalic: "It's not a gig platform either.",
    introParagraphs: [
      "The Story Shapers is a collective — a small, intentional group of senior strategists who've chosen to work together instead of alone.",
      "We built this because we were tired of the two options the industry offers: agencies that drown good work in process, or solo freelancing that trades depth for freedom.",
      "We wanted both. Autonomy and collaboration. Independence and support. Big thinking and small teams.",
    ],
    thirdSpace: "So we created a third space.",
    principles: ["Clarity", "Integrity", "Collaboration", "Creativity", "Impact"],
    collectiveAdvantages: [
      { title: "Combined Expertise", body: "Together we offer a wider range of skills and experiences than any one person alone. This means we can tackle larger, more complex projects as a team, without giving up the agility of independent work." },
      { title: "Agility and Flexibility", body: "We aren't bound by rigid agency structures or long chain-of-command approvals. The collective stays nimble and can adapt to project needs quickly – adjusting team size, skills, and approach as needed without the bureaucracy." },
      { title: "Quality & Consistency", body: "Clients get senior-level thinking with personal ownership. By working as a close-knit team of veterans, we maintain consistency and depth in our work that lone freelancers might struggle with. Each project benefits from peer review and shared standards, so quality never falls through the cracks." },
      { title: "Support & Community", body: "Going solo can be isolating. In our model, members have a support network of peers to bounce ideas off, get feedback, or share resources. We celebrate each other's wins and learn from each other's expertise, which makes us all better." },
      { title: "Shared Reputation", body: "Under The Story Shapers banner, we collectively build a brand that stands for clarity and credibility. This shared reputation can open bigger opportunities than an individual might secure alone – while still keeping our individual brands and independence intact." },
    ],
    benefitsIntro: "Being a Story Shapers collaborator comes with tangible benefits, beyond what solo consulting or a traditional job can offer:",
    memberBenefits: [
      { title: "Bigger, Better Projects", body: "As a team, we can pursue more ambitious projects and high-profile clients that would be hard to win or execute solo. Members can tap into projects that match their \"zone of genius,\" without having to be an expert in everything – the collective fills in the gaps." },
      { title: "Autonomy with Backup", body: "You maintain the freedom of a freelancer (choosing projects, setting your schedule) with the backup of a team. When you need a second set of eyes on a strategy or someone to cover a skill you don't have, the collective has your back. You're independent, but never alone." },
      { title: "Shared Learning", body: "Each member brings decades of experience across domains (brand, content, SEO, social, community, etc.). We regularly share insights, frameworks, and feedback. This pooled intelligence means continuous learning – you grow faster by collaborating with other senior strategists than you would in isolation." },
      { title: "Reduced Overhead and Hassle", body: "The collective structure takes care of a lot of administrative overhead that solo consultants face. We develop common tools, templates, and processes (from proposal decks to contracts) so you don't reinvent the wheel each time. We also handle things like invoicing systems, knowledge libraries, and marketing under one umbrella (more on the 20% contribution later), so you can focus more on your craft." },
    ],
    levelsIntro: "Not everyone participates the same way. That's by design.",
    levels: [
      { label: "CORE", title: "Core Members", body: "The backbone. Deeply involved in shaping direction, leading projects, mentoring others. Available most of the time. First in line for new opportunities — and first to step up when things get hard." },
      { label: "CONTRIBUTING", title: "Contributing Members", body: "Active, but project-based. You join when the right work comes. You step back when it doesn't. Flexibility without obligation." },
      { label: "AFFILIATE", title: "Affiliates", body: "On the roster for specific expertise. Called in when needed. Light commitment, occasional collaboration." },
    ],
    levelsFooter: "You can move between levels as your life changes. The only ask: communicate clearly so we can plan accordingly.",
    howToJoinIntro: "Fill the form thoughtfully. Tell us what you're good at, what you want to do more of, and how you like to work.",
    howToJoinButton: "FILL THE FORM",
  });
  }

  if (!existingKeys.has("contact")) {
  await storage.upsertSetting("contact", {
    joinHeadingMain: "Join the",
    joinHeadingItalic: "Collective",
    joinIntro: "Fill the form thoughtfully. Tell us what you're good at, what you want to do more of, and how you like to work.",
    joinSuccessTitle: "Thank you for reaching out.",
    joinSuccessBody: "We'll review your submission and get back to you shortly.",
    talkHeadingMain: "Let's",
    talkHeadingItalic: "Talk",
    talkIntro: "Got a challenge that needs clarity? Tell us what you're working on and we'll figure out how we can help.",
    talkSuccessTitle: "Message received.",
    talkSuccessBody: "We'll be in touch soon to start the conversation.",
  });
  }

  if (needsBlogSeed) {
    console.log("Seeding blog categories and posts...");

    const insertedCategories = await db.insert(blogCategories).values([
      { name: "Strategy", slug: "strategy", description: "Brand strategy and positioning insights", sortOrder: 0 },
      { name: "Content", slug: "content", description: "Content systems and storytelling", sortOrder: 1 },
      { name: "Growth", slug: "growth", description: "Scaling and growth marketing", sortOrder: 2 },
    ]).returning();

    const strategyCategory = insertedCategories[0];
    const contentCategory = insertedCategories[1];

    await db.insert(blogPosts).values([
      {
        title: "Why Most Brand Strategies Fail Before They Start",
        slug: "why-most-brand-strategies-fail",
        content: `<p>Every quarter, another brand publishes a strategy document that nobody reads. It gets presented once, filed away, and forgotten by the time the next campaign brief lands.</p><p>The problem isn't the thinking. It's that the strategy lives in a deck instead of in the decisions your team makes every day.</p><h2>The Gap Between Strategy and Execution</h2><p>We've seen it dozens of times: brilliant positioning work that never makes it past the boardroom. The messaging framework that marketing wrote but sales never adopted. The brand guidelines that design follows but content ignores.</p><p>Strategy fails when it's treated as a document rather than a practice. When it's something you reference occasionally rather than something that shapes every decision.</p><h2>What Actually Works</h2><p>The brands that get this right don't have better strategies. They have better systems for keeping strategy alive in daily work.</p><p>At SOCIAL, we didn't just define what the brand stood for — we built it into the briefing process, the content calendar, and the way teams talked about their work. The strategy wasn't a reference document. It was the operating system.</p><p>This is what we mean when we say we build what your team runs after we leave. Not a deck. A practice.</p><h2>Three Signs Your Strategy Isn't Working</h2><p><strong>1. Your team can't explain the brand in one sentence.</strong> If five people give five different answers about what you stand for, the strategy hasn't landed.</p><p><strong>2. Your content doesn't compound.</strong> If every piece of content starts from scratch rather than building on what came before, your editorial system is missing a spine.</p><p><strong>3. Your campaigns spike and fade.</strong> If launches create momentary buzz but don't build lasting equity, your campaign architecture needs restructuring.</p><p>The fix isn't more strategy. It's making the strategy you have actually work.</p>`,
        excerpt: "Every quarter, another brand publishes a strategy document that nobody reads. The problem isn't the thinking — it's that the strategy lives in a deck instead of in the decisions your team makes every day.",
        featuredImage: "",
        authorName: "Fatema Hanif",
        categoryId: strategyCategory.id,
        status: "published",
        publishedAt: new Date("2026-04-28"),
        metaTitle: "Why Most Brand Strategies Fail Before They Start | The Story Shapers",
        metaDescription: "The problem isn't the thinking. It's that the strategy lives in a deck instead of in decisions. Here's how to fix it.",
        readingTime: 3,
        featured: true,
        sortOrder: 0,
      },
      {
        title: "Content Systems That Actually Compound",
        slug: "content-systems-that-compound",
        content: `<p>Most brands treat content like a to-do list. Post three times a week. Hit the SEO keywords. Fill the calendar. Check the box.</p><p>But content that compounds — content that builds brand equity over time — doesn't come from output. It comes from architecture.</p><h2>The Difference Between Output and Architecture</h2><p>Output is volume. Architecture is structure. The difference matters because one creates noise and the other creates recognition.</p><p>When we worked with LBB, the challenge wasn't creating more content. The editorial teams across multiple cities were already producing plenty. The challenge was making that content work together instead of in isolation.</p><h2>Building an Editorial Backbone</h2><p>An editorial backbone is the structural framework that connects every piece of content to a larger narrative. It answers three questions:</p><p><strong>What do we believe?</strong> This is your editorial position — the perspective that makes your content distinctly yours.</p><p><strong>What do we repeat?</strong> These are your recurring formats and themes — the patterns that create recognition over time.</p><p><strong>What do we build on?</strong> This is your content architecture — how each piece connects to and strengthens what came before.</p><h2>Why This Matters Now</h2><p>In the age of AI-generated content, the brands that win won't be the ones producing the most. They'll be the ones with the clearest editorial identity. The ones whose content you'd recognize without seeing the logo.</p><p>That comes from architecture, not output. And it's what separates content that compounds from content that just fills space.</p>`,
        excerpt: "Most brands treat content like a to-do list. But content that compounds — content that builds brand equity over time — doesn't come from output. It comes from architecture.",
        featuredImage: "",
        authorName: "Shaili Contractor",
        categoryId: contentCategory.id,
        status: "published",
        publishedAt: new Date("2026-04-15"),
        metaTitle: "Content Systems That Actually Compound | The Story Shapers",
        metaDescription: "Content that builds brand equity doesn't come from output. It comes from architecture. Here's how to build systems that compound.",
        readingTime: 3,
        sortOrder: 1,
      },
    ]);

    console.log("Blog seed data created.");
  }

  if (needsAuthorSeed) {
    console.log("Seeding authors...");

    const insertedAuthors = await db.insert(authors).values([
      {
        name: "Fatema Hanif",
        slug: "fatema-hanif",
        bio: "Specialises in making sure brand strategy and business reality point in the same direction. She has built marketing functions from scratch, scaled creator programs across markets, and driven brand transformations for startups and global companies.",
        photo: "/assets/54b8c761-3071-4f74-8057-1840518e15a6_1772266999973.jpg",
        linkedin: "https://www.linkedin.com/in/fatemahanif/",
        sortOrder: 0,
      },
      {
        name: "Shaili Contractor",
        slug: "shaili-contractor",
        bio: "Builds content systems that create compounding brand equity — not just output. She moves teams from scattered, ad-hoc content to structured storytelling that builds recall and credibility over time.",
        photo: "/assets/Shaili-brand-deck_1772267064740.jpeg",
        linkedin: "https://www.linkedin.com/in/shailicontractor/",
        sortOrder: 1,
      },
    ]).returning();

    const fatema = insertedAuthors[0];
    const shaili = insertedAuthors[1];

    // Link existing posts to authors
    const { posts: existingPosts } = await storage.getBlogPosts({ limit: 100, offset: 0 });
    for (const post of existingPosts) {
      if (post.authorName === "Fatema Hanif" && fatema) {
        await storage.updateBlogPost(post.id, { authorId: fatema.id });
      } else if (post.authorName === "Shaili Contractor" && shaili) {
        await storage.updateBlogPost(post.id, { authorId: shaili.id });
      }
    }

    console.log("Authors seeded and linked to posts.");
  }

  console.log("Database seeded successfully!");
}
