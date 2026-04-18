import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Brizillas",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-[#1a1625] px-6 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-xl font-bold text-white tracking-wide">✈️ Brizillas</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Mentions légales</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Éditeur du site</h2>
          <p className="text-stone-600 leading-relaxed">
            Brizillas est édité par un entrepreneur individuel exerçant sous le régime de la micro-entreprise, immatriculé au Registre du Commerce et des Sociétés.
          </p>
          <p className="text-stone-600 leading-relaxed mt-2">
            Contact : <strong>contact@brizillas.com</strong>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Hébergement</h2>
          <p className="text-stone-600 leading-relaxed">
            Ce site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Propriété intellectuelle</h2>
          <p className="text-stone-600 leading-relaxed">
            L'ensemble du contenu de ce site (textes générés, design, code) est la propriété de Brizillas. Les photos sont fournies par Unsplash sous licence libre. Toute reproduction sans autorisation est interdite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Liens affiliés</h2>
          <p className="text-stone-600 leading-relaxed">
            Certains liens présents sur ce site sont des liens affiliés. Brizillas peut percevoir une commission sur les réservations effectuées via ces liens, sans surcoût pour l'utilisateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Responsabilité</h2>
          <p className="text-stone-600 leading-relaxed">
            Les itinéraires générés par Brizillas sont fournis à titre indicatif. Les prix des vols et hôtels sont des estimations et peuvent varier. Brizillas ne peut être tenu responsable des informations fournies par les sites partenaires.
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-stone-200">
          <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">← Retour à l'accueil</Link>
        </div>
      </main>
    </div>
  );
}
