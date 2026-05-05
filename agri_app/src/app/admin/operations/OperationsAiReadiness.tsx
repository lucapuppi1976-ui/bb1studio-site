import Link from "next/link";

const aiPrinciples = [
  {
    title: "Foto prima di tutto",
    text: "La futura esperienza partirà dall’immagine: riconoscimento visivo, contesto pianta e segnali di stress.",
  },
  {
    title: "Diagnosi assistita",
    text: "L’AI dovrà proporre ipotesi di problema, livello di confidenza, gravità e dati mancanti da verificare.",
  },
  {
    title: "Soluzioni operative",
    text: "Ogni diagnosi dovrà generare azioni consigliate, priorità, tempi e avvertenze pratiche.",
  },
  {
    title: "Revisione umana",
    text: "Le proposte AI saranno assistive: l’utente o l’operatore mantiene il controllo finale.",
  },
];

const readinessChecks = [
  "Nessuna chiave AI nella UI",
  "Nessun endpoint AI live attivo in questa release",
  "Nessuna mutazione DB o Prisma schema",
  "Nessun valore sensibile nei comandi visualizzati",
  "Checkpoint live pulito prima delle feature premium",
];

const aiRoadmap = [
  {
    phase: "Fase 1",
    title: "Acquisizione immagine sicura",
    text: "Upload/preview, limiti dimensione, validazione tipo file, privacy e tracciabilità.",
  },
  {
    phase: "Fase 2",
    title: "Analisi visiva AI",
    text: "Identificazione pianta, sintomi visibili, possibili patologie, carenze e stress ambientali.",
  },
  {
    phase: "Fase 3",
    title: "Raccomandazioni operative",
    text: "Azioni consigliate, urgenza, materiali, trattamenti, controlli successivi e note di rischio.",
  },
  {
    phase: "Fase 4",
    title: "Workflow premium",
    text: "Storico diagnosi, confronto foto nel tempo, reminder, report e assistente agronomico avanzato.",
  },
];

export default function OperationsAiReadiness() {
  return (
    <section className="grid gap-5" data-ai-premium-readiness="true">
      <article className="rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              AI Premium Readiness
            </p>
            <h2 className="text-xl font-semibold">Checkpoint per diagnosi fotografica assistita</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Base operativa per introdurre riconoscimento foto, identificazione problemi e proposte
              di soluzione generate da AI. Questa release prepara il terreno senza attivare chiamate AI.
            </p>
          </div>
          <Link
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            href="/admin"
          >
            Torna ad Admin Hub
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {aiPrinciples.map((item) => (
            <div key={item.title} className="rounded-xl border p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Stato sicurezza AI</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Prima di introdurre funzioni super-premium, la base live deve restare pulita, controllabile
          e senza attivazioni premature.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {readinessChecks.map((item) => (
            <div key={item} className="rounded-xl border p-4 text-sm font-medium">
              {item}
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Roadmap funzionale AI</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Direzione tecnica e prodotto per costruire un’app agricola premium centrata sulla diagnosi
          fotografica e sull’assistenza operativa.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {aiRoadmap.map((item) => (
            <div key={item.title} className="rounded-xl border p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {item.phase}
              </p>
              <h3 className="mt-1 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </article>
    
      <article className="rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Intake diagnosi foto</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Primo flusso controllato per caricare una foto, raccogliere contesto e preparare
              il brief che alimenterà la futura analisi AI premium.
            </p>
          </div>
          <Link
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            href="/ai/photo-diagnosis"
          >
            Apri intake diagnosi foto
          </Link>
        </div>
      </article>
</section>
  );
}
