import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchFacilityDetails } from "../services/api.js";

// Static navigation data (this stays static for navigation)
const facilitiesNavData = [
  { slug: "academic-instructions", navLabel: "Academic Instructions" },
  { slug: "sports-facilities", navLabel: "Sports Facilities" },
  { slug: "medical-facilities", navLabel: "Medical Facilities" },
  { slug: "transport-facilities", navLabel: "Transport Facilities" },
  { slug: "hostel-facilities", navLabel: "Hostel Facilities" },
];

// No fallback data - we want real data from database only
// If API fails, show error message instead of placeholder content

function FacilityNav({ activeSlug }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Facilities</p>
        </div>
        <div className="p-2">
          {facilitiesNavData.map((item) => {
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

function FacilityHero({ facility, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-gray-200 animate-pulse h-[240px] md:h-[360px]"></div>
    );
  }

  if (facility.hero_image) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <img
          src={facility.hero_image}
          alt={facility.title}
          className="h-[240px] w-full object-cover md:h-[360px]"
          onError={(e) => {
            console.log(`⚠️ Hero image failed to load: ${facility.hero_image}`);
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          onLoad={() => {
            console.log(`✅ Hero image loaded: ${facility.hero_image}`);
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/15 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
            {facility.subtitle || "Campus Services"}
          </span>
          <span className="rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-semibold text-white">
            Campus Support
          </span>
        </div>
        {/* Fallback placeholder (hidden by default) */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-50 to-white p-8 hidden items-center justify-center">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">{facility.subtitle}</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{facility.title}</h3>
            <p className="mt-3 max-w-xl text-sm text-slate-600">Image will be updated for this section.</p>
          </div>
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
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">{facility.subtitle}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">{facility.title}</h3>
        <p className="mt-3 max-w-xl text-sm text-slate-600">Image will be updated for this section.</p>
      </div>
    </motion.div>
  );
}

export default function Facilities() {
  const { slug = facilitiesNavData[0].slug } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load facility details from API
  useEffect(() => {
    const loadFacilityDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Loading facility details for slug:', slug);
        console.log('🌐 API URL:', `http://localhost/brahmavalley-main/brahmavalley-main/backend/api/facility-details.php?slug=${slug}`);
        
        const data = await fetchFacilityDetails(slug);
        
        if (data) {
          setFacility(data);
          console.log('✅ Facility details loaded successfully:', data.title);
          console.log('📊 Facility data:', data);
          console.log('📏 Points count:', data.points?.length || 0);
        } else {
          throw new Error('No data returned from API');
        }
      } catch (err) {
        console.error('❌ Failed to load facility details:', err.message);
        console.error('🔍 Error details:', err);
        setError(err.message);
        setFacility(null); // Don't use fallback data - show error instead
      } finally {
        setLoading(false);
      }
    };

    loadFacilityDetails();
  }, [slug]);

  // Check if slug exists in navigation
  const validSlug = facilitiesNavData.some(item => item.slug === slug);
  
  if (!validSlug && !loading) {
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
          {loading ? (
            <div className="mt-2 space-y-3">
              <div className="h-12 bg-gray-200 rounded animate-pulse w-96"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          ) : (
            <>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">{facility?.title}</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">{facility?.subtitle}</p>
            </>
          )}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <FacilityNav activeSlug={slug} />

          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(2,6,23,0.08)] md:p-6">
            <FacilityHero facility={facility || {}} loading={loading} />

            <div className="mt-6 grid gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
                {loading ? (
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                  </div>
                ) : error ? (
                  <p className="mt-3 text-base text-red-600">
                    Unable to load overview: {error}
                  </p>
                ) : (
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    {facility?.overview}
                  </p>
                )}
              </div>
            </div>

            {loading ? (
              // Loading skeleton for points
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Show error message - no fallback content
              <div className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-6 text-center">
                <p className="text-sm font-semibold text-red-700">
                  ❌ Error loading facility details: {error}
                </p>
                <p className="mt-2 text-xs text-red-600">
                  Please check the browser console for more details or try refreshing the page.
                </p>
              </div>
            ) : facility?.points && facility.points.length > 0 ? (
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {facility.points.map((point, index) => (
                  <FacilityPoint key={`${facility.slug}-${index}`} text={point} index={index} />
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  No facility details available
                </p>
              </div>
            )}
          </article>
        </div>

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && !loading && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Facility Slug: {slug}</p>
            <p>Facility Title: {facility?.title}</p>
            <p>Data Source: {error ? 'Fallback' : 'Database'}</p>
            <p>API Status: {error ? `Error: ${error}` : 'Success'}</p>
            <p>Points Count: {facility?.points?.length || 0}</p>
          </div>
        )}
      </div>
    </section>
  );
}
