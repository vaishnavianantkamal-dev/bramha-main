import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import facilitiesData, { facilitiesBySlug } from "../data/facilitiesData";

function FacilityNav({ activeSlug }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Facilities</p>
        </div>
        <div className="p-2">
          {facilitiesData.map((item) => {
            const active = item.slug === activeSlug;
            return (
              <Link
                key={item.slug}
                to={`/facilities/${item.slug}`}
                className={`mb-1 block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                {item.navLabel}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function FacilityPoint({ text, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
          {index + 1}
        </span>
        <p className="text-sm leading-relaxed text-slate-700">{text}</p>
      </div>
    </motion.li>
  );
}

function FacilityHero({ facility }) {
  if (facility.image) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <img
          src={facility.image}
          alt={facility.title}
          className="h-[240px] w-full object-cover md:h-[360px]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/15 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
            {facility.kicker}
          </span>
          <span className="rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-semibold text-white">
            Campus Support
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="rounded-2xl border border-dashed border-cyan-200 bg-linear-to-br from-cyan-50 to-white p-8"
    >
      <div className="flex min-h-[220px] flex-col items-center justify-center text-center md:min-h-[300px]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">{facility.kicker}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">{facility.title}</h3>
        <p className="mt-3 max-w-xl text-sm text-slate-600">Image will be updated for this section.</p>
      </div>
    </motion.div>
  );
}

export default function Facilities() {
  const { slug = facilitiesData[0].slug } = useParams();
  const facility = facilitiesBySlug[slug];

  if (!facility) {
    return (
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <h1 className="text-3xl font-bold text-slate-900">Facility Not Found</h1>
          <p className="mt-2 text-slate-600">Choose an available facility section.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
            <FacilityNav activeSlug="" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-b from-cyan-50/50 via-white to-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">Campus Services</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">{facility.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">{facility.kicker}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <FacilityNav activeSlug={slug} />

          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(2,6,23,0.08)] md:p-6">
            <FacilityHero facility={facility} />

            <div className="mt-6 grid gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{facility.description}</p>
              </div>
              {/* <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Quick Snapshot</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Total Key Services: {facility.points.length}</li>
                  <li>Coverage: Students and Staff</li>
                  <li>Support Type: On-Campus and Linked Services</li>
                </ul>
              </div> */}
            </div>

            {facility.points.length > 0 ? (
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {facility.points.map((point, index) => (
                  <FacilityPoint key={`${facility.slug}-${index}`} text={point} index={index} />
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-sm font-semibold text-slate-700">Detailed points will be published soon.</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
