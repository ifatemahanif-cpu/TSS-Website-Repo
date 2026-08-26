import { Fragment } from "react";

/**
 * The one piece of markup the case copy is allowed: <i>…</i>, for quoting what
 * somebody said. "The brand's own positioning said <i>friendly, always super
 * nice</i>. Customers said the opposite."
 *
 * Parsed rather than handed to dangerouslySetInnerHTML on purpose. Today these
 * strings are ours, checked into the repo; the whole point of shaping them like
 * CMS records is that one day they will not be, and the difference between this
 * and innerHTML is the difference between an italic and a script tag.
 *
 * Anything that is not <i> or </i> is text, including a stray angle bracket.
 */
export function RichText({ children }: { children: string }) {
  const parts = children.split(/(<i>|<\/i>)/);
  let italic = false;

  return (
    <>
      {parts.map((part, i) => {
        if (part === "<i>") {
          italic = true;
          return null;
        }
        if (part === "</i>") {
          italic = false;
          return null;
        }
        if (!part) return null;
        return italic ? (
          <em key={i}>{part}</em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
