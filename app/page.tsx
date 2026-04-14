"use client";

import { FormEvent, useMemo, useState } from "react";

type PageKey = "home" | "publications" | "projects" | "opinion" | "contact";
type ProjectItem = { title: string; text: string };
type OpinionItem = { title: string; publication: string; date: string; url: string };
type ContactItem = { title: string; text: string };
type FormStatus = "idle" | "sending" | "success" | "error";

function SiteLogo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={variant === "light" ? "/logo-white.png" : "/logo-black.png"}
      alt="Michael Brown Logo"
      className={`h-full w-full object-contain ${className}`}
    />
  );
}

function SurfaceCard({ children, dark = false, className = "" }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div
      className={`rounded-[1.5rem] border border-white/10 ${dark ? "bg-slate-950/70" : "bg-white/5"} p-6 transition hover:border-white/20 ${className}`}
    >
      {children}
    </div>
  );
}

function PublicationCard({ item, dark = false }: { item: { title: string; url: string }; dark?: boolean }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="block">
      <SurfaceCard dark={dark} className="h-full">
        <p className="text-sm leading-7 text-slate-300">{item.title}</p>
      </SurfaceCard>
    </a>
  );
}

function ProjectCard({ item, dark = false }: { item: ProjectItem; dark?: boolean }) {
  return (
    <SurfaceCard dark={dark}>
      <h3 className="text-lg font-semibold text-stone-100">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
    </SurfaceCard>
  );
}

function OpinionCard({ item, dark = false }: { item: OpinionItem; dark?: boolean }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <SurfaceCard dark={dark} className="h-full">
        <div className="text-xs uppercase tracking-[0.24em] text-sky-200">
          {item.publication} · {item.date}
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-7 text-stone-100">{item.title}</h3>
      </SurfaceCard>
    </a>
  );
}

function ContactInfoCard({ item, dark = false }: { item: ContactItem; dark?: boolean }) {
  return (
    <SurfaceCard dark={dark}>
      <div className="text-sm uppercase tracking-[0.16em] text-slate-400">{item.title}</div>
      <div className="mt-2 text-sm leading-7 text-slate-200">{item.text}</div>
    </SurfaceCard>
  );
}

export default function MKBWebsite() {
  const [page, setPage] = useState<PageKey>("home");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactError, setContactError] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const CONTACT_ENDPOINT = "/api/contact";

  const work: ProjectItem[] = [
    {
      title: "Marine Science & Research",
      text: "PhD-trained marine scientist with published work in biodiversity, conservation biology, taxonomy, and marine ecology.",
    },
    {
      title: "Strategy, Policy & Advisory",
      text: "Consultant with experience across climate policy, conservation, agriculture, monitoring and evaluation, and cross-sector strategy work.",
    },
    {
      title: "Field Operations & Ocean Work",
      text: "Commercial research diver, sailor, and ocean practitioner bringing practical field credibility to analytical and advisory work.",
    },
  ];

  const projects: ProjectItem[] = [
    {
      title: "Seychelles Blue Carbon Policy",
      text: "Led development of a national blue carbon policy, integrating ecosystem evidence, international best practice, and stakeholder input to create a climate-aligned framework for protecting seagrass and mangroves—supporting national emissions targets and coastal conservation commitments.",
    },
    {
      title: "Commonwealth Ocean Action Reporting",
      text: "Delivered a cross-country synthesis of ocean initiatives across the Commonwealth, converting fragmented inputs into a structured report used by policymakers to assess progress and set priorities—informing high-level discussions at Heads of Government level.",
    },
    {
      title: "Agricultural Data Governance & Business Case",
      text: "Built the investment case and governance approach for national agricultural data infrastructure across multiple African countries, linking data systems to productivity gains and private-sector incentives—clarifying pathways to close the investment gap in agricultural transformation.",
    },
  ];

  const experiences: ProjectItem[] = [
    {
      title: "Commonwealth Secretariat – Blue Carbon Policy (Seychelles)",
      text: "Developed a national blue carbon policy through ecosystem analysis, international benchmarking, and stakeholder consultation, supporting climate commitments and coastal ecosystem protection.",
    },
    {
      title: "Commonwealth Secretariat – Ocean Action Reporting",
      text: "Synthesised ocean policy and action data across Commonwealth countries into a structured report for senior policymakers, informing strategic discussions at Heads of Government level.",
    },
    {
      title: "Commonwealth Secretariat – Agricultural Data Infrastructure",
      text: "Built the business case and governance framework for national agricultural data systems across African countries, identifying private sector opportunities and investment pathways.",
    },
    {
      title: "UNICEF / UNDP – Consulting Work",
      text: "Delivered analytical and advisory work across education, climate, and development programmes, including evaluation frameworks, costing models, and strategic inputs aligned to donor standards.",
    },
    {
      title: "Education Sector Analytics & Evaluation",
      text: "Designed and implemented monitoring and evaluation tools, cost analyses, and programme assessments aligned with OECD DAC criteria and donor reporting requirements.",
    },
    {
      title: "Marine Science Research",
      text: "Conducted research in biodiversity, taxonomy, and marine ecology, resulting in peer-reviewed publications and contributions to conservation science.",
    },
    {
      title: "Field Operations & Ocean Work",
      text: "Commercial diver and experienced sailor, supporting marine research and operations with practical offshore and in-water expertise.",
    },
  ];

  const publications: { title: string; url: string }[] = [
    {
      title:
        "Integrative taxonomy reveals the presence of a new species of Cyanea (Scyphozoa: Discomedusae: Semaeostomeae: Cyaneidae) from the West coast of Africa. Zootaxa 5507(3):401–426 (Samsodien et al., 2024) DOI: 10.11646/zootaxa.5507.3.1",
      url: "https://doi.org/10.11646/zootaxa.5507.3.1",
    },
    {
      title:
        "Ecology of Rhizostomeae. Frontiers in Marine Biology (Thibault et al., 2024) DOI: 10.1016/bs.amb.2024.07.008",
      url: "https://doi.org/10.1016/bs.amb.2024.07.008",
    },
    {
      title:
        "Cautioning the Move from Morphology to Molecules in the Taxonomy of Metazoa: Comments on Lawley et al. South African Journal of Science 118(9–10) (Brown & Gibbons, 2022) http://dx.doi.org/10.17159/sajs.2022/12590",
      url: "http://dx.doi.org/10.17159/sajs.2022/12590",
    },
    {
      title:
        "Community and Marine Conservation in South Africa. Are We Still Missing the Mark? Frontiers in Marine Science 9 (Peer et al., 2022) https://doi.org/10.3389/fmars.2022.884442",
      url: "https://doi.org/10.3389/fmars.2022.884442",
    },
    {
      title:
        "Swarms of the Hyperiid Amphipod Themisto gaudichaudii Along the False Bay Coastline. Journal of Natural History 56(5–8) (Brown & Gibbons, 2022) https://doi.org/10.1080/00222933.2022.2089606",
      url: "https://doi.org/10.1080/00222933.2022.2089606",
    },
    {
      title:
        "Null Models for Null Hypotheses in Taxonomy: A Test Using Scyphozoa. Biological Journal of the Linnean Society 134(1) (Brown & Gibbons, 2021) https://doi.org/10.1093/biolinnean/blab070",
      url: "https://doi.org/10.1093/biolinnean/blab070",
    },
    {
      title:
        "A New Macromedusa from the Coast of Mozambique: Aurelia mozambica sp. nov. Zootaxa 4933(2) (Brown et al., 2021) DOI: 10.11646/zootaxa.4933.2.5",
      url: "https://doi.org/10.11646/zootaxa.4933.2.5",
    },
  ];

  const leadPublications = publications.filter((publication) => publication.title.includes("(Brown"));

  const opinionPieces: OpinionItem[] = [
    {
      title: "Small-scale fishers warn of declining catches, big policy gaps",
      publication: "Daily Maverick",
      date: "February 2026",
      url: "https://www.dailymaverick.co.za/opinionista/2026-02-20-smallscale-fishers-warn-of-declining-catches-big-policy-gaps/?dm_source=blocks-grid&dm_medium=card-link&dm_campaign=inform",
    },
    {
      title: "For whom the bell tolls: The alienation of people by private institutions such as Kalk Bay's Brass Bell must end",
      publication: "Daily Maverick",
      date: "April 2022",
      url: "https://www.dailymaverick.co.za/opinionista/2022-04-10-the-alienation-of-people-by-private-institutions-such-as-kalk-bays-brass-bell-must-end/",
    },
    {
      title: "ANC’s support for Shell is a direct breach of the Freedom Charter",
      publication: "Mail & Guardian",
      date: "December 2021",
      url: "https://mg.co.za/thought-leader/opinion/2021-12-24-ancs-support-for-shell-is-a-direct-breach-of-the-freedom-charter/",
    },
    {
      title: "You’ve earned your rest, Arch. Go dance with the angels",
      publication: "Mail & Guardian",
      date: "December 2021",
      url: "https://mg.co.za/thought-leader/opinion/2021-12-26-youve-earned-your-rest-arch-go-dance-with-the-angels/",
    },
    {
      title: "Think global, act local — effective marine conservation must cede ownership of resources to communities",
      publication: "Daily Maverick",
      date: "August 2021",
      url: "https://www.dailymaverick.co.za/opinionista/2021-08-12-think-global-act-local-effective-marine-conservation-must-cede-ownership-of-resources-to-communities/",
    },
  ];

  const contactDetails: ContactItem[] = [
    { title: "Email", text: "mike@michaelbrown.co.za" },
    { title: "Base", text: "Cape Town, South Africa" },
  ];

  const navItems: { key: PageKey; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "publications", label: "Publications" },
    { key: "projects", label: "Projects" },
    { key: "opinion", label: "Opinion Pieces" },
    { key: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/michael-brown-172077131" },
    { label: "ResearchGate", url: "https://www.researchgate.net/profile/Michael-Brown-90?ev=hdr_xprf" },
    { label: "Instagram", url: "https://www.instagram.com/mikeykbrown/" },
  ];

  const contactMailto = useMemo(() => {
    const params = new URLSearchParams({
      subject: contactForm.subject || "Website enquiry",
      body: `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`,
    });
    return `mailto:mike@michaelbrown.co.za?${params.toString()}`;
  }, [contactForm]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactError("Please complete your name, email address, and message.");
      setFormStatus("error");
      return;
    }

    setContactError("");
    setFormStatus("sending");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      setFormStatus("success");
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setFormStatus("error");
      setContactError("There was a problem sending your message. You can use the direct email option below.");
    }
  };

  const renderTopNav = () => (
    <>
      <nav className="hidden items-center gap-5 text-sm text-stone-300 xl:flex">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`whitespace-nowrap transition hover:text-white ${page === item.key ? "text-white" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-4 flex w-full flex-wrap justify-center gap-2 border-b border-white/10 pb-4 xl:hidden">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
              page === item.key
                ? "border-stone-200 bg-stone-100 text-slate-950"
                : "border-white/10 bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );

  const renderLandingPage = () => (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.35),rgba(2,6,23,0.82)),url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-stone-300">
              Cape Town · Ocean Science · Strategy
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-stone-50 md:text-7xl">
              Marine science, environmental strategy, and a life shaped by the sea.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">
              I am Michael Brown, a marine biologist and consultant working across biodiversity,
              conservation, policy, and environmental strategy — bringing together scientific depth,
              strategic judgement, and field-grounded ocean credibility.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setPage("projects")}
                className="rounded-full border border-stone-200 bg-stone-100 px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5"
              >
                View Selected Work
              </button>
              <button
                onClick={() => setPage("contact")}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Get In Touch
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-300">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">About</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                A scientist with strategic range and an ocean-centred identity.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-300">
              <p>
                My background spans marine science, biodiversity and conservation biology,
                scientific writing, data interpretation, and environmental strategy. I completed my
                PhD in Biodiversity and Conservation Biology at the University of the Western Cape
                and have since worked across both academic and consulting environments.
              </p>
              <p>
                Professionally, I have contributed to work on climate policy, blue economy and
                marine issues, agricultural data governance, monitoring and evaluation, and
                international education and humanitarian projects.
              </p>
              <p>
                Outside formal consulting and research, my life is closely tied to the ocean
                through diving, sailing, and surfing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Work</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">What I do</h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {work.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section id="projects" className="border-y border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Selected Work</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Consulting and project experience.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((item) => (
              <ProjectCard key={item.title} item={item} dark />
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Publications</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Research output.</h2>
          </div>
          <div className="grid gap-4">
            {leadPublications.map((item) => (
              <PublicationCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="opinion" className="border-y border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Opinion Pieces</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Writing and commentary.
              </h2>
            </div>
            <div className="grid gap-4">
              {opinionPieces.slice(0, 2).map((item) => (
                <OpinionCard key={item.title} item={item} dark />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Open to relevant work and collaboration.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Available for consulting, research, and ocean-aligned collaborations.
              </p>
            </div>

            <div className="space-y-4">
              {contactDetails.map((item) => (
                <ContactInfoCard key={item.title} item={item} dark />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderSimplePage = (
    title: string,
    eyebrow: string,
    intro: string,
    content: React.ReactNode,
    dark = false,
  ) => (
    <section className={`${dark ? "bg-slate-900/60" : "bg-slate-950"} min-h-[calc(100vh-80px)]`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <button
          onClick={() => setPage("home")}
          className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-300 transition hover:bg-white/10 hover:text-white"
        >
          Back to Home
        </button>
        <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl text-stone-50 md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">{intro}</p>
          </div>
          <div className="grid gap-4">{content}</div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-stone-200/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
            <div className="flex min-w-0 items-center justify-center gap-3 xl:justify-start">
              <button
                onClick={() => setPage("home")}
                className="flex h-16 w-16 items-center justify-center bg-transparent sm:h-20 sm:w-20 lg:h-24 lg:w-24 shrink-0"
                aria-label="Go to home page"
              >
                <SiteLogo variant="light" />
              </button>
              <div>
                <button
                  onClick={() => setPage("home")}
                  className="font-serif text-left text-base tracking-[0.04em] text-stone-100 sm:text-lg"
                >
                  Michael Brown
                </button>
                <div className="text-[10px] uppercase tracking-[0.22em] text-stone-400 sm:text-[11px] sm:tracking-[0.28em]">
                  Marine Biologist · Consultant · Ocean Adventurer
                </div>
              </div>
            </div>
            {renderTopNav()}
          </div>
        </div>
      </header>

      <main>
        {page === "home" && renderLandingPage()}
        {page === "publications" &&
          renderSimplePage(
            "Publications",
            "Research Output",
            "A dedicated space for peer-reviewed work, scientific writing, and formal research output.",
            publications.map((item) => <PublicationCard key={item.title} item={item} />),
          )}
        {page === "projects" &&
          renderSimplePage(
            "Projects",
            "Experience",
            "A full overview of professional and project experience across consulting, research, and ocean work.",
            experiences.map((item) => <ProjectCard key={item.title} item={item} dark />),
            true,
          )}
        {page === "opinion" &&
          renderSimplePage(
            "Opinion Pieces",
            "Writing & Commentary",
            "Essays, commentary, and shorter reflections on marine science, conservation, policy, and ocean life.",
            opinionPieces.map((item) => <OpinionCard key={item.title} item={item} dark />),
            true,
          )}
        {page === "contact" && (
          <section className="min-h-[calc(100vh-80px)] bg-slate-950">
            <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
              <button
                onClick={() => setPage("home")}
                className="mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-300 transition hover:bg-white/10 hover:text-white"
              >
                Back to Home
              </button>

              <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Get in Touch</p>
                  <h1 className="mt-3 font-serif text-4xl text-stone-50 md:text-5xl">Contact</h1>
                  <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
                    Use the form to send a direct enquiry. It is configured for a real form endpoint, with a direct email fallback if needed.
                  </p>

                  <div className="mt-8 space-y-4">
                    {contactDetails.map((item) => (
                      <ContactInfoCard key={item.title} item={item} />
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
                  <form className="grid gap-5" onSubmit={handleContactSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2 text-sm text-stone-300">
                        <span>Name</span>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(event) =>
                            setContactForm((current) => ({ ...current, name: event.target.value }))
                          }
                          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-stone-100 outline-none transition focus:border-sky-300"
                          placeholder="Your name"
                        />
                      </label>

                      <label className="grid gap-2 text-sm text-stone-300">
                        <span>Email</span>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(event) =>
                            setContactForm((current) => ({ ...current, email: event.target.value }))
                          }
                          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-stone-100 outline-none transition focus:border-sky-300"
                          placeholder="you@example.com"
                        />
                      </label>
                    </div>

                    <label className="grid gap-2 text-sm text-stone-300">
                      <span>Subject</span>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(event) =>
                          setContactForm((current) => ({ ...current, subject: event.target.value }))
                        }
                        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-stone-100 outline-none transition focus:border-sky-300"
                        placeholder="How can I help?"
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-stone-300">
                      <span>Message</span>
                      <textarea
                        rows={8}
                        value={contactForm.message}
                        onChange={(event) =>
                          setContactForm((current) => ({ ...current, message: event.target.value }))
                        }
                        className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-stone-100 outline-none transition focus:border-sky-300"
                        placeholder="Tell me a little about your project or enquiry."
                      />
                    </label>

                    {contactError && <p className="text-sm text-rose-300">{contactError}</p>}
                    {formStatus === "success" && (
                      <p className="text-sm text-emerald-300">Your message has been sent successfully.</p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={formStatus === "sending"}
                        className="rounded-full border border-stone-200 bg-stone-100 px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {formStatus === "sending" ? "Sending..." : "Send Message"}
                      </button>
                      <a
                        href={contactMailto}
                        className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                      >
                        Use Direct Email
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
