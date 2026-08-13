import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Info, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { CALENDLY_URL, WHATSAPP_URL } from "@/lib/offer-config";
import { Choices, Field, TextArea, TextInput } from "../field";
import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

const YES_NO_UNSURE = ["Yes", "No", "Not sure"] as const;

/* The form only has to answer one question: is this a brand we want to be on a
   call with? Stage, assets in 48h, timeline, decision-maker and what's broken
   about the current site were all cut. They scope the project, and there is a
   30-minute call for that. */
type FormState = {
  name: string;
  brand: string;
  email: string;
  whatsapp: string;
  website: string;
  whatYouDo: string;
  needsStore: string;
  priceAcknowledged: boolean;
};

const EMPTY: FormState = {
  name: "",
  brand: "",
  email: "",
  whatsapp: "",
  website: "",
  whatYouDo: "",
  needsStore: "",
  priceAcknowledged: false,
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Your name, please.";
  if (!form.brand.trim()) errors.brand = "What’s the brand called?";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = "That email doesn’t look right.";
  if (form.whatsapp.replace(/\D/g, "").length < 8)
    errors.whatsapp = "Include the country code — we WhatsApp, we don’t call.";
  if (!form.website.trim())
    errors.website = "A link, a handle, or “nothing yet”.";
  if (form.whatYouDo.trim().length < 20)
    errors.whatYouDo = "Two or three lines. This is the one we actually read.";
  if (!form.needsStore) errors.needsStore = "Pick one.";
  if (!form.priceAcknowledged)
    errors.priceAcknowledged = "Please tick this before you send the form.";
  return errors;
}

function Success() {
  return (
    <div className="rounded-2xl border border-magenta-lift/30 bg-magenta/10 p-8 sm:p-12">
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-magenta">
        <Check aria-hidden className="size-5 text-white" />
      </span>
      <h3 className="o-display mt-7 text-[28px] sm:text-[34px]">Got it.</h3>
      <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.8] text-white/80">
        We read every application ourselves — expect a reply within two working
        days, either a time for the call or an honest no. If you’d rather not
        wait, pick a slot yourself.
      </p>

      {/* Calendly is the primary action — booking a slot is the qualified
          signal. WhatsApp sits quieter underneath for the ones who won't book. */}
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-magenta-lift"
      >
        Book your 30-minute call
        <ArrowRight aria-hidden className="size-4" />
      </a>

      {WHATSAPP_URL ? (
        <p className="mt-5 text-[13.5px] leading-[1.7] text-white/55">
          Prefer to type?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="text-white/85 underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-magenta-lift"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
      ) : null}

      <p className="mt-7 max-w-[52ch] text-[13px] leading-[1.7] text-white/45">
        Nothing to do until then. If you want to get ahead of it, start pulling
        together photos, product information and anything you’ve already
        written — the 10 working days begin the day those land.
      </p>
    </div>
  );
}

export function ApplyForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (submitted) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document
        .querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setFailed(false);
    setSending(true);
    try {
      /* The site's generic submissions endpoint. `data` is a jsonb bag on the
         form_submissions table, so every value has to be a plain string —
         booleans go in as "Yes"/"No" or the admin viewer renders nothing.
         Keys have to stay on this exact list: the notification email renders
         `OFFER_FIELDS.filter(key in data)`, so a key it doesn't know is
         silently dropped from the email. Sending fewer of them is fine. */
      await apiRequest("POST", "/api/forms/submit", {
        formType: "offer",
        data: {
          name: form.name.trim(),
          brand: form.brand.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
          website: form.website.trim(),
          whatYouDo: form.whatYouDo.trim(),
          needsStore: form.needsStore,
          priceAcknowledged: form.priceAcknowledged ? "Yes" : "No",
          referrer: document.referrer || "direct",
        },
      });
      setDone(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="apply" eyebrow="APPLY" className="bg-navy-lift">
      <Reveal>
        <MixedHeading display="Book" light="me in." />
      </Reveal>

      <div className="mt-12 max-w-[760px]">
        {done ? (
          <Success />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Your name" required htmlFor="name" error={errors.name}>
                <TextInput
                  id="name"
                  autoComplete="name"
                  placeholder="Meera Nair"
                  value={form.name}
                  invalid={Boolean(errors.name)}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>

              <Field label="Brand name" required htmlFor="brand" error={errors.brand}>
                <TextInput
                  id="brand"
                  placeholder="The one on the logo"
                  value={form.brand}
                  invalid={Boolean(errors.brand)}
                  onChange={(e) => set("brand", e.target.value)}
                />
              </Field>

              <Field label="Email" required htmlFor="email" error={errors.email}>
                <TextInput
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@brand.com"
                  value={form.email}
                  invalid={Boolean(errors.email)}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>

              <Field
                label="WhatsApp number"
                required
                htmlFor="whatsapp"
                error={errors.whatsapp}
              >
                <TextInput
                  id="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  value={form.whatsapp}
                  invalid={Boolean(errors.whatsapp)}
                  onChange={(e) => set("whatsapp", e.target.value)}
                />
              </Field>

              {/* Spans the grid: it's the field we look at first, and it
                  leaves the two-up rows above even. */}
              <Field
                label="Where can we see the brand?"
                hint="We look at this before we reply."
                required
                htmlFor="website"
                error={errors.website}
                className="sm:col-span-2"
              >
                <TextInput
                  id="website"
                  placeholder="yourbrand.com, @yourbrand, or “nothing yet”"
                  value={form.website}
                  invalid={Boolean(errors.website)}
                  onChange={(e) => set("website", e.target.value)}
                />
              </Field>
            </div>

            <Field
              label="What does the brand do, and what do you sell?"
              hint="Two or three lines is plenty. This is the one we actually read."
              required
              htmlFor="whatYouDo"
              error={errors.whatYouDo}
            >
              <TextArea
                id="whatYouDo"
                placeholder="Plain language beats a positioning statement here."
                value={form.whatYouDo}
                invalid={Boolean(errors.whatYouDo)}
                onChange={(e) => set("whatYouDo", e.target.value)}
              />
            </Field>

            <Field
              label="Do you need to sell products directly on the site?"
              required
              htmlFor="needsStore"
              error={errors.needsStore}
            >
              <Choices
                name="needsStore"
                options={YES_NO_UNSURE}
                value={form.needsStore}
                invalid={Boolean(errors.needsStore)}
                onChange={(v) => set("needsStore", v)}
              />
              {form.needsStore === "Yes" && (
                <p className="mt-2 flex gap-3 rounded-lg border border-white/10 bg-white/4 p-4 text-[13.5px] leading-[1.7] text-white/70">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-magenta-lift" />
                  <span>
                    Then this particular offer isn’t it — this is a brand site, not
                    a store. Send the form anyway and we’ll come back to you about
                    what a commerce build actually takes.
                  </span>
                </p>
              )}
            </Field>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
              <label
                htmlFor="priceAcknowledged"
                className="flex cursor-pointer gap-4"
              >
                <input
                  id="priceAcknowledged"
                  type="checkbox"
                  checked={form.priceAcknowledged}
                  aria-invalid={Boolean(errors.priceAcknowledged)}
                  onChange={(e) => set("priceAcknowledged", e.target.checked)}
                  className="mt-0.5 size-[18px] shrink-0 accent-magenta-lift"
                />
                <span className="text-[14px] leading-[1.7] text-white/80">
                  I agree to the{" "}
                  <Link
                    href="/offer/terms"
                    className="font-semibold text-white underline decoration-magenta-lift decoration-2 underline-offset-4"
                  >
                    terms and conditions
                  </Link>
                  .
                </span>
              </label>
              <p className="mt-3 pl-[34px] text-[13px] leading-[1.7] text-white/45">
                Nothing to pay today. If we both say yes on the call, ₹25,000
                books your slot and the ₹54,000 balance is due the day the site
                is ready to go live.
              </p>
              {errors.priceAcknowledged && (
                <p role="alert" className="mt-3 pl-[34px] text-[12.5px] text-[#ff9bd0]">
                  {errors.priceAcknowledged}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2.5 rounded-lg bg-magenta px-7 py-3.5 text-sm font-medium tracking-[0.28px] text-white transition-colors hover:bg-magenta-lift disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Book me in
                    <ArrowRight aria-hidden className="size-4" />
                  </>
                )}
              </button>
              {failed && (
                <p role="alert" className="text-[13px] text-[#ff9bd0]">
                  That didn’t go through. Try once more, or WhatsApp us and we’ll
                  take the details by hand.
                </p>
              )}
              {submitted && Object.keys(errors).length > 0 && !failed && (
                <p className="text-[13px] text-white/50">
                  A few fields still need you — they’re marked above.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
