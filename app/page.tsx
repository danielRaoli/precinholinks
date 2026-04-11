import Image from "next/image";

type Group = {
  id: string;
  name: string;
  description: string;
  vacancies: number;
  href: string;
  imageSrc: string;
  featured?: boolean;
};

function GroupCard({ group }: { group: Group }) {
  const isUrgent = group.vacancies <= 5;

  return (
    <a
      href={group.href}
      className={[
        "group flex w-full flex-col gap-4 rounded-3xl p-5 shadow-[0_16px_40px_rgba(8,82,7,0.3)]",
        "bg-gradient-to-r from-[#004C0B] to-[#145C00]",
        "transition-transform transition-shadow motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_60px_rgba(8,82,7,0.4)]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30",
        group.featured ? "ring-2 ring-[color:var(--brand-gold)]" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-[color:var(--brand-gold)]/50">
            <Image
              src={group.imageSrc}
              alt={group.name}
              fill
              sizes="56px"
              className="object-cover"
              priority={Boolean(group.featured)}
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold tracking-tight text-white">
              {group.name}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-white/80">
              {group.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 text-right">
          <span
            className={[
              "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wide",
              isUrgent
                ? "bg-[color:var(--brand-gold)] text-[#004C0B]"
                : "bg-white/10 text-[color:var(--brand-gold)]",
            ].join(" ")}
          >
            {isUrgent ? "Poucas vagas" : "Vagas restantes"}
          </span>

          <div className="leading-none">
            <div className="text-[11px] font-medium text-white/70">
              Vagas
            </div>
            <div className="tabular-nums text-3xl font-extrabold tracking-tight text-[color:var(--brand-gold)]">
              {group.vacancies}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex w-full items-center justify-center rounded-full bg-[color:var(--brand-gold)] py-3 text-sm font-extrabold text-[#004C0B] shadow-sm transition-transform motion-safe:group-hover:scale-[1.02]">
        Entrar no Grupo
        <span aria-hidden className="ml-2 opacity-90">
          →
        </span>
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
      id: "roupas",
      name: "Roupas no precinho",
      description: "Kits, roupas e sapatos originais",
      vacancies: 12,
      href: "https://chat.whatsapp.com/DBJ3YRCTFyKJriJ8SqFUaT?mode=gi_t",
      imageSrc: "/profile.png",
      featured: true,
    },
    {
      id: "eletronicos",
      name: "Eletrônicos em oferta",
      description: "Gadgets, acessórios e promoções relâmpago",
      vacancies: 4,
      href: "https://chat.whatsapp.com/Fo3dPruf8VN0ZriMwmeHER?mode=hqctcli",
      imageSrc: "/profile.png",
    },
    {
      id: "ofertas",
      name: "Ofertas",
      description: "Promoções e ofertas de todas categorias",
      vacancies: 9,
      href: "https://chat.whatsapp.com/CuH2fPghQcVD46W3R5fFxB?mode=gi_t",
      imageSrc: "/profile.png",
    },
    {
      id: "beleza",
      name: "Beleza e cuidado",
      description: "Cuidados, skincare e combos",
      vacancies: 2,
      href: "https://chat.whatsapp.com/L2yYusgJAop1rkIhNBh20z?mode=gi_t",
      imageSrc: "/profile.png",
    },
    {
      id: "eletrodomestico",
      name: "Eletrodomésticos",
      description: "Geladeira, micro-ondas, TV e mais",
      vacancies: 2,
      href: "https://chat.whatsapp.com/FIepVl6dB0aG3mDaqf0aCx?mode=gi_t",
      imageSrc: "/profile.png",
    },
    {
      id: "academia",
      name: "Academia",
      description: "Suplementos, roupas e acessórios para treino",
      vacancies: 8,
      href: "https://chat.whatsapp.com/HmYrCVvCD1SFym14rIGjvt?mode=gi_t",
      imageSrc: "/profile.png",
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
        <header className="flex w-full flex-col items-center text-center">
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

          <h1 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-white">Tudo no Precinho </h1>
          <p className="mt-2 text-2xl font-bold text-[#085207]">
            Seu Grupo de Oferta
          </p>
        </header>

        <section className="mt-8 w-full">
          <GroupCard group={featuredGroup} />
        </section>

        <section className="mt-10 w-full">
          <p className="text-center text-sm font-medium tracking-wide text-white">
            Você pode se interessar
          </p>

          <div className="mt-4 flex w-full flex-col gap-4">
            {otherGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
