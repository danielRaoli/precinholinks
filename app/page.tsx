import Image from "next/image";

type Group = {
  id: string;
  name: string;
  description: string;
  vacancies: number;
  totalSlots: number;
  href: string;
  imageSrc: string;
  emoji: string;
  featured?: boolean;
};

/** Quantos % das vagas já foram preenchidas */
function filledPercent(group: Group) {
  return Math.round(((group.totalSlots - group.vacancies) / group.totalSlots) * 100);
}

function ProgressBar({ group }: { group: Group }) {
  const pct = filledPercent(group);
  const isUrgent = group.vacancies <= 5;

  return (
    <div className="mb-3 w-full">
      <div className="mb-1 flex justify-between text-[9px] font-bold text-white/50">
        <span>{isUrgent ? "Encerrando rápido" : "Quase lotado"}</span>
        <span>{pct}% cheio</span>
      </div>
      <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#f5c400] to-orange-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function UrgencyBadge({ group }: { group: Group }) {
  const isUrgent = group.vacancies <= 5;
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black tracking-wide",
        isUrgent
          ? "bg-[#f5c400] text-[#004C0B]"
          : "border border-[#f5c400]/40 bg-white/10 text-[#f5c400]",
      ].join(" ")}
    >
      {isUrgent ? "🔥 Poucas vagas" : "Vagas restantes"}
    </span>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <a
      href={group.href}
      data-meta-event="Lead"
      data-meta-id={group.id}
      data-meta-name={group.name}
      className={[
        "group relative flex w-full flex-col overflow-hidden rounded-[20px] p-4",
        "bg-gradient-to-br from-[#004C0B] to-[#145C00]",
        "shadow-[0_8px_28px_rgba(8,82,7,0.35)]",
        "transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_50px_rgba(8,82,7,0.5)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30",
        group.featured ? "border-2 border-[#f5c400]" : "",
      ].join(" ")}
    >
      {/* Decorative blob */}
      <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-white/[0.03]" />

      {/* Ribbon "Mais popular" */}
      {group.featured && (
        <div className="absolute z-10 left-0 top-20 rounded-r-md bg-red-500 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-white">
          Mais popular
        </div>
      )}

      {/* Top row */}
      <div className="mb-3 flex items-start gap-3">
        {/* Icon */}
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-[#f5c400]/60 bg-white">
          <Image
            src={group.imageSrc}
            alt={group.name}
            fill
            sizes="48px"
            className="object-cover"
            priority={Boolean(group.featured)}
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-xl"
            aria-hidden
          >
            {group.emoji}
          </span>
        </div>

        {/* Name + desc */}
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="truncate text-[13px] font-black leading-tight text-white">
            {group.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-white/70">
            {group.description}
          </p>
        </div>

        {/* Vacancies */}
        <div className="shrink-0 text-right">
          <UrgencyBadge group={group} />
          <div className="mt-1 text-[28px] font-black leading-none tabular-nums text-[#f5c400]">
            {group.vacancies}
          </div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-white/50">
            Vagas
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar group={group} />

      {/* CTA */}
      <div
        className={[
          "flex w-full items-center justify-center gap-2 rounded-full py-3 text-[13px] font-black",
          "transition-transform duration-150 motion-safe:group-hover:scale-[1.02]",
          group.featured
            ? "bg-[#f5c400] text-[#004C0B] shadow-sm"
            : "border border-[#f5c400]/50 bg-[#f5c400]/15 text-[#f5c400]",
        ].join(" ")}
      >
        {group.featured ? "Garantir minha vaga agora" : "Entrar no grupo"}
        <span aria-hidden className="opacity-90">→</span>
      </div>
    </a>
  );
}

function firstSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;

  const groups: Group[] = [
    {
      id: "eletronicos",
      name: "Eletrônicos em Oferta",
      description: "Gadgets, acessórios e promoções relâmpago",
      vacancies: 4,
      totalSlots: 100,
      href: "https://chat.whatsapp.com/Fo3dPruf8VN0ZriMwmeHER?mode=hqctcli",
      imageSrc: "/profile.png",
      emoji: "📱",
    },
    {
      id: "ofertas",
      name: "Ofertas",
      description: "Promoções e ofertas de todas as categorias",
      vacancies: 9,
      totalSlots: 100,
      href: "https://chat.whatsapp.com/CuH2fPghQcVD46W3R5fFxB?mode=gi_t",
      imageSrc: "/profile.png",
      emoji: "🛍️",
    },
    {
      id: "beleza",
      name: "Beleza e Cuidado",
      description: "Cuidados, skincare e combos especiais",
      vacancies: 2,
      totalSlots: 100,
      href: "https://chat.whatsapp.com/L2yYusgJAop1rkIhNBh20z?mode=gi_t",
      imageSrc: "/profile.png",
      emoji: "💄",
    },
    {
      id: "academia",
      name: "Academia",
      description: "Suplementos, roupas e acessórios para treino",
      vacancies: 8,
      totalSlots: 100,
      href: "https://chat.whatsapp.com/HmYrCVvCD1SFym14rIGjvt?mode=gi_t",
      imageSrc: "/profile.png",
      emoji: "💪",
    },
  ];

  const requestedGroupId = firstSearchParam(
    resolvedSearchParams?.grupo ??
      resolvedSearchParams?.group ??
      resolvedSearchParams?.id,
  );

  const baseFeaturedGroup =
    (requestedGroupId
      ? groups.find((g) => g.id === requestedGroupId)
      : undefined) ??
    groups.find((g) => g.featured) ??
    groups[0]!;

  const featuredGroup: Group = { ...baseFeaturedGroup, featured: true };
  const otherGroups = groups
    .filter((g) => g.id !== baseFeaturedGroup.id)
    .map((g) => ({ ...g, featured: false }));

  return (
    <div className="relative min-h-dvh bg-[color:var(--brand-yellow)] bg-[image:url('/background-imagem.png')] bg-cover bg-center bg-no-repeat text-[#071c07]">
      <div className="absolute inset-0 bg-[#cfd21a]/45" />

      <main className="relative mx-auto flex w-full max-w-md flex-col items-center px-5 pb-14 pt-10">

        {/* ── HEADER ── */}
        <header className="flex w-full flex-col items-center text-center">
          {/* Avatar com live dot */}
          <div className="relative size-20">
            <div className="relative size-20 overflow-hidden rounded-full bg-white/90 ring-2 ring-[#085207]/15 shadow-[0_10px_30px_rgba(8,82,7,0.18)]">
              <Image
                src="/profile.png"
                alt="Tudo no Precinho"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
            {/* Live dot */}
            <span className="absolute bottom-0.5 right-0.5 flex size-4 items-center justify-center rounded-full border-2 border-white bg-green-500">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            </span>
          </div>

          <h1 className="mt-4 text-xl font-extrabold leading-tight tracking-tight text-white">
            Tudo no Precinho
          </h1>
          <p className="mt-1 text-2xl font-bold text-[#085207]">
            Seu Grupo de Ofertas
          </p>

          {/* Trust badges */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[10px] font-black text-[#085207]">
              ✓ Grupo Verificado
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[10px] font-black text-[#085207]">
              🔒 100% Gratuito
            </span>
          </div>
        </header>

        {/* ── SOCIAL PROOF STRIP ── */}
        <div className="mt-5 flex w-full items-center justify-between rounded-2xl bg-[#004C0B]/90 px-4 py-3">
          <div className="flex items-center gap-2.5">
            {/* Stacked avatars */}
            <div className="flex">
              {["M", "R", "A"].map((letter, i) => (
                <div
                  key={letter}
                  className="flex size-6 items-center justify-center rounded-full border-2 border-[#004C0B] bg-green-500 text-[9px] font-black text-white"
                  style={{ marginLeft: i === 0 ? 0 : -6 }}
                >
                  {letter}
                </div>
              ))}
              <div
                className="flex size-6 items-center justify-center rounded-full border-2 border-[#004C0B] bg-[#f5c400] text-[9px] font-black text-[#004C0B]"
                style={{ marginLeft: -6 }}
              >
                +
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white">+2.400 membros</p>
              <p className="text-[9px] text-white/55">economizando todo dia</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-[10px] font-black text-green-400">Ativo agora</span>
          </div>
        </div>

        {/* ── FEATURED GROUP ── */}
        <section className="mt-6 w-full">
          <p className="mb-3 text-center text-[11px] font-black uppercase tracking-widest text-white">
            ⚡ Melhor escolha pra você
          </p>
          <GroupCard group={featuredGroup} />
        </section>

        {/* ── OTHER GROUPS ── */}
        <section className="mt-8 w-full">
          <p className="mb-3 text-center text-[11px] font-black uppercase tracking-widest text-white">
            Você também pode gostar
          </p>
          <div className="flex flex-col gap-4">
            {otherGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
