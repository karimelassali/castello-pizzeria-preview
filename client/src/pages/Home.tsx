/**
 * Style reminder — La Pizza Viva: immersive food storytelling with ticket-like menu controls.
 * Castello red denotes decisive actions; flour tones and editorial whitespace hold the atmosphere.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Category = "Pizze" | "Focacce" | "Sfizi" | "Bibite";
type MenuItem = {
  id: number;
  category: Category;
  name: string;
  description: string;
  price: number;
  highlight?: string;
  imageUrl?: string;
  imageLabel?: string;
};

const menuItems: MenuItem[] = [
  { id: 1, category: "Pizze", name: "Margherita", description: "Pomodoro, fiordilatte, basilico, olio evo.", price: 7.5, highlight: "Classica", imageUrl: "/manus-storage/castello-hero-pizza_48aeba63.jpg", imageLabel: "Appena sfornata" },
  { id: 2, category: "Pizze", name: "Diavola", description: "Pomodoro, fiordilatte, salame piccante, miele al peperoncino.", price: 9, highlight: "Piccante" },
  { id: 3, category: "Pizze", name: "Ortolana", description: "Fiordilatte, verdure di stagione, olive, origano.", price: 9 },
  { id: 4, category: "Pizze", name: "Castello", description: "Crema di zucca, salsiccia, provola affumicata, rosmarino.", price: 10.5, highlight: "Della casa" },
  { id: 5, category: "Focacce", name: "Rosmarino", description: "Olio evo, rosmarino fresco, sale croccante.", price: 4.5 },
  { id: 6, category: "Focacce", name: "Mortadella & Stracciatella", description: "Focaccia calda, mortadella, stracciatella, pistacchio.", price: 8.5, highlight: "Favorita", imageUrl: "/manus-storage/castello-focaccia_dd5c4744.jpg", imageLabel: "Calda & croccante" },
  { id: 7, category: "Sfizi", name: "Patate al forno", description: "Patate rustiche, paprika dolce, maionese al limone.", price: 4.5 },
  { id: 8, category: "Sfizi", name: "Supplì al ragù", description: "Riso al ragù, cuore filante, crosta dorata.", price: 3.5 },
  { id: 9, category: "Bibite", name: "Limonata del giorno", description: "Limoni, acqua frizzante, menta.", price: 3.5 },
  { id: 10, category: "Bibite", name: "Birra artigianale", description: "Chiedi al banco la selezione disponibile.", price: 5 },
];

const categories: (Category | "Tutto")[] = ["Tutto", "Pizze", "Focacce", "Sfizi", "Bibite"];

const formatPrice = (price: number) => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(price);

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "Tutto">("Tutto");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => activeCategory === "Tutto" || item.category === activeCategory),
    [activeCategory],
  );
  const cartItems = useMemo(() => menuItems.filter((item) => cart[item.id]), [cart]);
  const quantity = useMemo(() => Object.values(cart).reduce((sum, itemQuantity) => sum + itemQuantity, 0), [cart]);
  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0), [cart, cartItems]);

  const updateItem = (id: number, delta: number) => {
    setCart((currentCart) => {
      const next = Math.max(0, (currentCart[id] ?? 0) + delta);
      const result = { ...currentCart };
      if (next === 0) delete result[id];
      else result[id] = next;
      return result;
    });
  };

  const beginWhatsAppOrder = () => {
    if (!quantity) {
      toast.message("Aggiungi qualcosa al tuo ordine", { description: "Scegli una pizza, focaccia o sfizio dal menu." });
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const orderLines = cartItems.map((item) => `${cart[item.id]}× ${item.name}`).join("%0A");
    const message = `Ciao Castello! Vorrei ordinare:%0A${orderLines}%0A%0ATotale anteprima: ${formatPrice(total)}`;
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
    toast.success("Ordine pronto per WhatsApp", { description: "Scegli il contatto Castello nella schermata WhatsApp." });
  };

  return (
    <div className="min-h-screen overflow-x-hidden pb-24 lg:pb-0">
      <div className="bg-[#231f1b] text-[#f4f0e7]">
        <div className="container flex h-9 items-center justify-between gap-4 text-[0.67rem] font-semibold tracking-[0.12em] uppercase">
          <span className="flex items-center gap-2"><Sparkles className="size-3 text-[#f5a91e]" /> Fatto sul momento, nel cuore di Castel San Giovanni</span>
          <a className="hidden transition-colors hover:text-white sm:inline" href="tel:+390523881445">0523 881445</a>
        </div>
      </div>

      <header className="container relative z-30 flex h-[88px] items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-3" aria-label="Torna all'inizio">
          <img src="/manus-storage/castello-mark_969454a8.png" alt="Segno Castello" className="size-12 object-contain transition-transform duration-200 group-hover:rotate-3" />
          <span className="leading-none">
            <strong className="display block text-[1.5rem] leading-[0.75] tracking-[-0.07em]">Castello</strong>
            <em className="mt-1.5 block text-[0.57rem] font-bold tracking-[0.15em] uppercase not-italic text-[#746d63]">Pizzeria & Focacceria</em>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          <a href="#menu" className="transition-colors hover:text-[#d53a22]">Menu</a>
          <a href="#storia" className="transition-colors hover:text-[#d53a22]">La nostra pizza</a>
          <a href="#dove" className="transition-colors hover:text-[#d53a22]">Dove siamo</a>
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href="#menu" className="relative inline-flex items-center gap-2 border border-[#d53a22] bg-[#d53a22] px-4 py-2.5 text-xs font-bold tracking-[0.1em] text-white uppercase transition-all hover:border-[#231f1b] hover:bg-[#231f1b] active:scale-[0.97]">
            <ShoppingBag className="size-4" /> Il tuo ordine {quantity > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-[#d53a22] text-[0.65rem] text-white">{quantity}</span>}
          </a>
        </div>
        <button className="flex size-11 items-center justify-center border border-[#231f1b] lg:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Apri menu di navigazione"><MenuIcon className="size-5" /></button>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#231f1b]/45 backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex h-full w-[min(88vw,380px)] flex-col bg-[#f4f0e7] p-6 shadow-2xl rise-in">
            <div className="mb-14 flex items-center justify-between"><span className="eyebrow text-[#d53a22]">Navigazione</span><button onClick={() => setMobileMenuOpen(false)} className="flex size-10 items-center justify-center border border-[#231f1b]" aria-label="Chiudi menu"><X className="size-5" /></button></div>
            <div className="flex flex-col gap-7"><a onClick={() => setMobileMenuOpen(false)} href="#menu" className="display text-4xl">Menu</a><a onClick={() => setMobileMenuOpen(false)} href="#storia" className="display text-4xl">La nostra pizza</a><a onClick={() => setMobileMenuOpen(false)} href="#dove" className="display text-4xl">Dove siamo</a></div>
            <a href="tel:+390523881445" className="mt-auto flex items-center gap-3 border-t border-[#231f1b]/20 pt-6 text-sm font-bold"><Phone className="size-4 text-[#d53a22]" /> 0523 881445</a>
          </div>
        </div>
      )}

      <main id="top">
        <section className="container pb-10 pt-3 lg:pb-24 lg:pt-9">
          <div className="grid overflow-hidden bg-[#231f1b] lg:min-h-[650px] lg:grid-cols-[0.91fr_1.09fr]">
            <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden px-6 pb-7 pt-8 text-[#fffaf2] sm:px-10 sm:pb-10 sm:pt-12 lg:px-[clamp(2.5rem,5vw,6rem)] lg:py-[clamp(3rem,5vw,5rem)]">
              <div className="absolute -left-24 -top-24 size-56 rounded-full bg-[#d53a22] opacity-95 ember-drift" />
              <div className="relative"><p className="eyebrow mb-6 flex items-center gap-2 text-[#d53a22]"><Flame className="size-3.5" /> Pizza, focaccia, fuoco</p><h1 className="display max-w-xl text-[clamp(3.7rem,7.1vw,7.3rem)] leading-[0.84] tracking-[-0.07em]">Il tuo prossimo morso <em className="font-normal text-[#d53a22]">inizia qui.</em></h1></div>
              <div className="relative mt-10 max-w-md"><p className="text-base leading-relaxed text-[#e5ded2] sm:text-lg">Una pizza che parla semplice: impasto, forno, ingredienti scelti e il tempo giusto.</p><a href="#menu" className="mt-7 inline-flex items-center gap-3 border-b border-[#d53a22] pb-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors hover:text-[#d53a22]">Scopri il menu <ArrowDownRight className="size-4" /></a></div>
            </div>
            <div className="relative min-h-[400px] overflow-hidden bg-[#7c392d] lg:min-h-0"><img src="/manus-storage/castello-hero-pizza_48aeba63.jpg" alt="Pizza appena sfornata con pomodoro, fiordilatte e basilico" className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-[#231f1b]/60 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 text-[#fffaf2] sm:p-8"><span className="eyebrow">Il forno è acceso</span><span className="display text-4xl leading-none">01</span></div></div>
          </div>
        </section>

        <section id="menu" className="scroll-mt-8 bg-[#fffdf8] py-16 lg:py-24">
          <div className="container">
            <div className="mb-10 flex flex-col justify-between gap-8 border-b border-[#231f1b] pb-7 lg:mb-14 lg:flex-row lg:items-end">
              <div className="rise-in"><p className="eyebrow mb-4 text-[#d53a22]">Menu anteprima</p><h2 className="display max-w-xl text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">Scegli quello che ti <em className="font-normal">chiama.</em></h2></div>
              <p className="max-w-xs text-sm leading-relaxed text-[#6e675d]">Ordina da qui, poi invia la richiesta su WhatsApp in pochi tocchi.</p>
            </div>
            <div className="hide-scrollbar mb-10 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap border px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase transition-all active:scale-[0.97] ${activeCategory === category ? "border-[#d53a22] bg-[#d53a22] text-[#fffaf2]" : "border-[#d8cfc0] bg-transparent hover:border-[#231f1b]"}`}>{category}</button>)}
            </div>
            <div className="grid gap-x-10 xl:grid-cols-[minmax(0,1fr)_310px]">
              <div className="grid gap-x-12 md:grid-cols-2">
                {filteredItems.map((item, index) => {
                  const itemQuantity = cart[item.id] ?? 0;
                  return <article key={item.id} className={`menu-ticket-item group relative py-6 ${index === 0 ? "md:border-t-0 md:pt-0" : ""}`}>
                    {item.imageUrl && <div className="relative mb-4 h-28 overflow-hidden bg-[#231f1b]"><img src={item.imageUrl} alt={item.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /><span className="absolute bottom-0 left-0 bg-[#d53a22] px-2.5 py-1.5 text-[0.59rem] font-bold tracking-[0.13em] text-white uppercase">{item.imageLabel}</span></div>}
                    <div className="mb-3 flex items-start justify-between gap-4"><div><div className="mb-2 flex items-center gap-2">{item.highlight && <span className="rounded-full bg-[#dfe2d4] px-2 py-1 text-[0.58rem] font-bold tracking-[0.1em] uppercase text-[#24342c]">{item.highlight}</span>}<span className="text-[0.62rem] font-bold tracking-[0.13em] uppercase text-[#887f74]">{item.category}</span></div><h3 className="display text-[1.75rem] leading-[0.95] tracking-[-0.04em]">{item.name}</h3></div><span className="receipt-price font-mono text-sm font-bold tabular-nums">{formatPrice(item.price)}</span></div>
                    <p className="max-w-[26rem] pr-8 text-sm leading-relaxed text-[#6e675d]">{item.description}</p>
                    <div className="mt-5 flex items-center justify-between"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase text-[#d53a22]">Scelto per te</span>{itemQuantity > 0 ? <div className="flex items-center border border-[#231f1b]"><button onClick={() => updateItem(item.id, -1)} className="flex size-8 items-center justify-center hover:bg-[#ebe4d7]" aria-label={`Rimuovi ${item.name}`}><Minus className="size-3" /></button><span className="flex w-7 justify-center text-xs font-bold tabular-nums">{itemQuantity}</span><button onClick={() => updateItem(item.id, 1)} className="flex size-8 items-center justify-center bg-[#231f1b] text-white transition-colors hover:bg-[#d53a22]" aria-label={`Aggiungi un'altra ${item.name}`}><Plus className="size-3" /></button></div> : <button onClick={() => updateItem(item.id, 1)} className="flex size-8 items-center justify-center border border-[#231f1b] transition-all hover:border-[#d53a22] hover:bg-[#d53a22] hover:text-white active:scale-[0.95]" aria-label={`Aggiungi ${item.name}`}><Plus className="size-4" /></button>}</div>
                  </article>;
                })}
              </div>
              <aside className="order-ticket mt-12 self-start p-5 xl:sticky xl:top-5 xl:mt-0 xl:p-6">
                <div className="flex items-start justify-between"><div><p className="eyebrow text-[#d53a22]">Il tuo ordine</p><h3 className="display mt-2 text-3xl tracking-[-0.05em]">Tutto qui.</h3></div><span className="flex size-9 items-center justify-center rounded-full bg-[#231f1b] text-xs font-bold text-white">{quantity}</span></div>
                <div className="ticket-rule my-5 space-y-3 pt-4">{cartItems.length ? cartItems.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 text-sm"><span className="min-w-0 truncate"><strong className="mr-1 text-[#d53a22]">{cart[item.id]}×</strong>{item.name}</span><span className="font-mono text-xs tabular-nums">{formatPrice(item.price * cart[item.id])}</span></div>) : <p className="text-sm leading-relaxed text-[#6e675d]">Il tuo ordine è vuoto. Aggiungi dal menu i tuoi preferiti.</p>}</div>
                <div className="ticket-rule flex items-end justify-between pt-4"><span className="eyebrow text-[#6e675d]">Totale</span><strong className="display receipt-price text-3xl tracking-[-0.04em]">{formatPrice(total)}</strong></div>
                <button onClick={beginWhatsAppOrder} className="mt-6 flex w-full items-center justify-between bg-[#d53a22] px-4 py-4 text-left text-xs font-bold tracking-[0.12em] text-white uppercase transition-all hover:bg-[#b82f1d] active:scale-[0.98]"><span>Invia su WhatsApp</span><ArrowUpRight className="size-4" /></button>
                <p className="mt-3 text-[0.66rem] leading-relaxed text-[#746d63]">Anteprima: prima della pubblicazione collega il numero WhatsApp verificato del locale.</p>
              </aside>
            </div>
          </div>
        </section>

        <section id="storia" className="scroll-mt-8 bg-[#dfe2d4] py-16 lg:py-24"><div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div className="relative"><div className="absolute -left-4 -top-4 size-20 rounded-full bg-[#d53a22]" /><img src="/manus-storage/castello-focaccia_dd5c4744.jpg" alt="Focaccia calda con rosmarino e pomodorini" className="relative aspect-[4/5] w-full max-w-md object-cover shadow-[14px_14px_0_#231f1b]" /></div><div className="lg:pb-4"><p className="eyebrow mb-5 text-[#d53a22]">Una cosa alla volta, bene</p><h2 className="display max-w-2xl text-5xl leading-[0.9] tracking-[-0.065em] sm:text-7xl">Non è fast food.<br /><em className="font-normal">È buon ritmo.</em></h2><div className="mt-8 grid max-w-xl gap-6 border-t border-[#231f1b] pt-6 sm:grid-cols-2"><p className="text-sm leading-relaxed text-[#4b5046]">L’impasto ha il suo tempo. Il forno fa il resto. Noi aggiungiamo soltanto gli ingredienti giusti.</p><p className="text-sm leading-relaxed text-[#4b5046]">Scegli con calma dal menu, salva l’ordine, e invialo quando sei pronto.</p></div></div></div></section>

        <section className="overflow-hidden bg-[#fffdf8] py-16 lg:py-24">
          <div className="container">
            <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#231f1b] pb-7 lg:mb-14 lg:flex-row lg:items-end"><div className="flex items-start gap-4"><img src="/manus-storage/castello-mark_969454a8.png" alt="" className="mt-1 size-12 shrink-0 object-contain" /><div><p className="eyebrow mb-4 text-[#d53a22]">Dentro Castello</p><h2 className="display max-w-2xl text-5xl leading-[0.9] tracking-[-0.06em] sm:text-6xl">La focaccia vera,<br /><em className="font-normal">quella del banco.</em></h2></div></div><a href="https://www.facebook.com/p/Pizzeria-Focacceria-Castello-Castel-san-giovanni-100063768901533/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start border-b border-[#d53a22] pb-2 text-xs font-bold tracking-[0.12em] text-[#d53a22] uppercase transition-colors hover:text-[#231f1b]">Vedi le foto del locale <ArrowUpRight className="size-4" /></a></div>
            <p className="eyebrow mb-6 text-[#746d63]">Focaccia di Recco · Farinata · Pizza · Corso Matteotti 77</p>
            <div className="grid gap-5 lg:grid-cols-[1.13fr_0.87fr]">
              <figure className="relative overflow-hidden bg-[#231f1b]"><img src="/manus-storage/castello-real-focaccia-collage_b1f006b2.jpg" alt="Focaccia di Recco appena preparata da Pizzeria & Focacceria Castello" className="absolute inset-0 size-full origin-top-left scale-[1.72] object-cover object-left-top transition-transform duration-700 hover:scale-[1.78]" /><div className="absolute inset-0 bg-gradient-to-t from-[#231f1b]/65 via-transparent to-transparent" /><figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-white"><span className="text-[0.62rem] font-bold tracking-[0.13em] uppercase">Scatto reale · focaccia del locale</span><span className="display text-3xl leading-none">01</span></figcaption><div className="h-[295px] sm:h-[380px]" /></figure>
              <figure className="relative overflow-hidden bg-[#231f1b]"><img src="/manus-storage/castello-real-counter_98a536f9.jpg" alt="Bancone con focacce e pizze di Pizzeria & Focacceria Castello" className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-[1.05]" /><div className="absolute inset-0 bg-gradient-to-t from-[#231f1b]/75 via-transparent to-transparent" /><figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-white"><span className="text-[0.62rem] font-bold tracking-[0.13em] uppercase">Scatto reale · il banco</span><span className="display text-3xl leading-none">02</span></figcaption><div className="h-[295px] sm:h-[380px]" /></figure>
            </div>
            <p className="mt-5 max-w-xl text-xs leading-relaxed text-[#746d63]">Immagini pubbliche del locale, curate per questa anteprima. Confermare l’autorizzazione del proprietario prima della pubblicazione definitiva.</p>
          </div>
        </section>

        <section id="dove" className="scroll-mt-8 bg-[#231f1b] text-[#fffaf2]"><div className="container grid lg:grid-cols-2"><div className="relative flex min-h-[430px] flex-col justify-between py-14 lg:py-20"><div className="absolute right-6 top-10 rotate-90 text-[0.59rem] font-bold tracking-[0.18em] text-[#d53a22] uppercase">Corso Matteotti / 77</div><div><p className="eyebrow mb-5 text-[#d53a22]">Passa a trovarci</p><h2 className="display max-w-lg text-5xl leading-[0.9] tracking-[-0.06em] sm:text-6xl">Ci trovi al centro.<br />Il forno pure.</h2></div><div className="mt-12 grid gap-6 sm:grid-cols-2"><div className="border-l border-[#d53a22] pl-4"><MapPin className="mb-3 size-4 text-[#d53a22]" /><p className="text-sm leading-relaxed text-[#e5ded2]">Corso Giacomo Matteotti 77<br />Castel San Giovanni, PC</p></div><div className="border-l border-[#d53a22] pl-4"><Phone className="mb-3 size-4 text-[#d53a22]" /><a href="tel:+390523881445" className="text-sm font-bold tracking-wide transition-colors hover:text-[#d53a22]">0523 881445</a><p className="mt-1 text-xs text-[#bcb2a6]">Per ordini e informazioni</p></div></div></div><div className="relative -mx-5 min-h-[370px] overflow-hidden sm:-mx-8 lg:-mr-12 lg:-ml-12"><img src="/manus-storage/castello-oven-evening_b6b090a9.jpg" alt="Forno a legna illuminato nella cucina" className="absolute inset-0 size-full object-cover opacity-90" /><div className="absolute inset-0 bg-gradient-to-r from-[#231f1b]/60 to-transparent" /><div className="absolute -right-12 -top-12 size-40 rounded-full border-[18px] border-[#d53a22]" /><div className="absolute bottom-7 left-7 flex items-center gap-3 text-xs font-bold tracking-[0.13em] uppercase"><span className="flex size-9 items-center justify-center rounded-full border border-white/35"><Flame className="size-4 text-[#d53a22]" /></span> Forno acceso</div></div></div></section>
      </main>

      <footer className="bg-[#231f1b] pb-7 text-[#bcb2a6]"><div className="container flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.65rem] font-semibold tracking-[0.09em] uppercase sm:flex-row sm:items-center sm:justify-between"><span>Castello · Pizzeria & Focacceria</span><span>Preview concept · Menu e disponibilità da verificare con il locale</span></div></footer>

      <button onClick={beginWhatsAppOrder} className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-between bg-[#d53a22] px-5 py-4 text-left text-xs font-bold tracking-[0.12em] text-white shadow-[0_14px_35px_rgb(35_31_27/0.25)] uppercase transition-transform active:scale-[0.98] lg:hidden"><span className="flex items-center gap-3"><ShoppingBag className="size-4" /> Ordina su WhatsApp</span><span className="flex size-6 items-center justify-center rounded-full bg-white text-[#d53a22]">{quantity || <ChevronRight className="size-4" />}</span></button>
    </div>
  );
}
