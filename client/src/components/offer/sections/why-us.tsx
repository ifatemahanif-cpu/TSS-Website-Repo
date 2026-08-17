import { BrandsTicker } from "../brands-ticker";
import { Highlight } from "../highlight";
import { Reveal } from "../reveal";
import { MixedHeading, Section } from "../section";

export function WhyUs() {
  return (
    <Section eyebrow="WHY US">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
        <Reveal>
          <MixedHeading
            display="We’re storytellers"
            light="who also happen to build."
          />
        </Reveal>

        <div className="max-w-[62ch]">
          <Reveal delay={1}>
            <p className="text-[16px] leading-[1.8] text-white/80">
              You have a logo. A deck. A snazzy Instagram page. Maybe even some
              passable images and text. But when someone asks,{" "}
              <em className="font-display not-italic text-white">
                “Send me something about what you do,”
              </em>{" "}
              you still find yourself typing out a three-paragraph WhatsApp
              message.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-[16px] leading-[1.8] text-white/80">
              The website is the easy part. Figuring out what it should say
              isn’t. Between us, The Story Shapers has{" "}
              <Highlight>
                <strong className="font-semibold text-white">45+ years</strong>
              </Highlight>{" "}
              of writing, editing and building experience — spent finding the story,
              cutting the fluff, asking the annoying questions and making
              complicated things easy to understand.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <Reveal>
          <p className="o-eyebrow mb-6 text-white/60">BRANDS WE’VE WORKED WITH</p>
        </Reveal>
        <BrandsTicker />
      </div>
    </Section>
  );
}
