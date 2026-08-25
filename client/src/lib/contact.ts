/**
 * How to reach The Story Shapers. One place, because the address appears on the
 * homepage's close, in the footer, and in the prerendered JSON-LD, and three
 * copies of a phone number is three chances for one of them to go stale.
 *
 * `whatsapp` is the wa.me format — digits only, no plus, no spaces, country code
 * included. `whatsappLabel` is what a reader sees, spaced the way an Indian
 * mobile is normally written. Two fields because the link format and the human
 * format are genuinely different problems, and writing the pretty one into a
 * wa.me URL produces a link that silently does nothing.
 *
 * Blank `whatsapp` and the route disappears wherever it is rendered, rather than
 * leaving a dead link on an element whose whole job is to be tapped.
 */
export const CONTACT = {
  email: "hello@storyshaperscollective.com",
  whatsapp: "919147740521",
  whatsappLabel: "WhatsApp +91 91477 40521",
  /** the form — for people who would rather be asked the right questions */
  form: "/contact",
} as const;

export const mailto = `mailto:${CONTACT.email}`;
export const whatsappHref = CONTACT.whatsapp
  ? `https://wa.me/${CONTACT.whatsapp}`
  : null;
