import { SplitText } from "./split-text";

/**
 * Full-screen intro: the name rises, a counter runs to 100%, then the panel lifts away.
 * Plays once per browser session, never for people who prefer reduced motion, and never
 * without JavaScript (the inline script below decides before the first paint and marks
 * <html> with data-intro, which is the only thing that makes the panel visible).
 */
const decide = `try{var d=document.documentElement;if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){}else{sessionStorage.setItem("intro","1");d.setAttribute("data-intro","");setTimeout(function(){d.removeAttribute("data-intro")},4500)}}catch(e){}`;

export function Intro({ name, role }: { name: string; role: string }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: decide }} />
      <div className="intro" aria-hidden>
        <div className="w-full max-w-5xl px-6">
          <p className="text-5xl font-semibold tracking-tighter sm:text-8xl">
            <SplitText text={name} />
          </p>
          <div className="mt-8 flex items-end justify-between gap-6 font-mono text-xs tracking-wider text-paper/60 uppercase">
            <span>{role}</span>
            <span className="intro-count text-2xl tracking-tight text-paper sm:text-4xl" />
          </div>
          <div className="mt-4 h-px bg-paper/15">
            <div className="intro-bar h-px origin-left bg-gradient-to-r from-accent to-accent-2" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </>
  );
}
