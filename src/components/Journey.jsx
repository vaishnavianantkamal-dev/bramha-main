import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { journeyBySlug, journeyLeaders } from "../data/Journey";

function MessageNav({ activeSlug }) {
    return (
        <div className="mb-8 flex flex-wrap gap-2">
            {journeyLeaders.map((item) => (
                <Link
                    key={item.slug}
                    to={`/journey/${item.slug}`}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${activeSlug === item.slug
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-600"
                        }`}
                >
                    {item.navLabel}
                </Link>
            ))}
        </div>
    );
}

function ProfileMedia({ person }) {
    if (person.image) {
        return (
            <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <img
                    src={person.image}
                    alt={person.pageTitle}
                    className="h-80 w-full object-cover lg:h-95"
                />
                <figcaption className="space-y-1 p-4 text-center">
                    <p className="text-lg font-bold text-gray-900">{person.name}</p>
                    <p className="font-semibold text-orange-600">{person.designation}</p>
                    <p className="text-sm text-gray-500">{person.organization}</p>
                </figcaption>
            </figure>
        );
    }

    return (
        <figure className="rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-6 shadow-sm">
            <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white lg:h-[380px]">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Image Coming Soon</span>
            </div>
            <figcaption className="space-y-1 p-4 text-center">
                <p className="text-lg font-bold text-gray-900">{person.name}</p>
                <p className="font-semibold text-orange-600">{person.designation}</p>
                <p className="text-sm text-gray-500">{person.organization}</p>
            </figcaption>
        </figure>
    );
}

export default function Journey() {
    const { slug = "president" } = useParams();
    const person = journeyBySlug[slug];

    if (!person) {
        return (
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-5xl px-6 md:px-12">
                    <h1 className="text-3xl font-bold text-gray-900">Message Not Found</h1>
                    <p className="mt-2 text-gray-600">Please choose one of the available leadership messages.</p>
                    <div className="mt-6">
                        <MessageNav activeSlug="" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-linear-to-b from-slate-50 via-white to-white py-14 md:py-20">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-8"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">Leadership</p>
                    <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">{person.pageTitle}</h1>
                    <p className="mt-2 max-w-2xl text-gray-600">
                        A message from campus leadership reflecting our academic vision and institutional values.
                    </p>
                </motion.div>

                {/* <MessageNav activeSlug={slug} /> */}

                <motion.article
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    className="rounded-3xl border border-gray-200 bg-white p-5 md:p-8"
                >
                    <div className="md:float-left md:mr-8 md:mb-6 md:w-[44%] lg:w-[40%]">
                        <ProfileMedia person={person} />
                    </div>

                    <div className="space-y-5">
                        <h2 className="text-2xl font-bold text-gray-900">{person.introTitle}</h2>
                        {person.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="text-base leading-relaxed text-gray-700">
                                {paragraph}
                            </p>
                        ))}
                        <p className="pt-1 text-lg font-bold text-gray-900">Best Regards,</p>
                        <p className="text-lg font-extrabold text-gray-900">{person.name}</p>
                    </div>

                    <div className="clear-both" />
                </motion.article>
            </div>
        </section>
    );
}
