import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Brizillas",
  description: "Politique de confidentialité et gestion des cookies de Brizillas.",
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-[#1a1625] px-6 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-xl font-bold text-white tracking-wide">✈️ Brizillas</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 prose prose-stone">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Politique de confidentialité</h1>
        <p className="text-stone-500 text-sm mb-8">Dernière mise à jour : avril 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">1. Qui sommes-nous ?</h2>
          <p className="text-stone-600 leading-relaxed">
            Brizillas est un service de génération d'itinéraires de voyage par intelligence artificielle, accessible à l'adresse <strong>brizillas.com</strong>. Ce service est édité par un entrepreneur individuel (micro-entreprise française).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">2. Données collectées</h2>
          <p className="text-stone-600 leading-relaxed mb-3">Brizillas collecte les données suivantes :</p>
          <ul className="list-disc pl-6 text-stone-600 space-y-2">
            <li><strong>Données de navigation</strong> : adresse IP (anonymisée), pages visitées, durée de visite — via des outils d'analyse anonymes.</li>
            <li><strong>Données saisies dans le formulaire</strong> : destination, dates, budget, style de voyage — utilisées uniquement pour générer votre itinéraire. Elles ne sont pas stockées après la génération.</li>
            <li><strong>Cookies</strong> : voir section 4 ci-dessous.</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-3">
            Brizillas ne collecte <strong>aucune donnée personnelle identifiable</strong> (nom, email, téléphone) et ne nécessite aucune création de compte.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">3. Liens affiliés</h2>
          <p className="text-stone-600 leading-relaxed">
            Brizillas contient des liens vers des partenaires commerciaux (hôtels, vols, activités). Ces liens sont des <strong>liens affiliés</strong> : si vous effectuez une réservation via ces liens, Brizillas peut percevoir une commission, sans coût supplémentaire pour vous. Les partenaires concernés incluent notamment Booking.com, GetYourGuide et Jetradar/Travelpayouts. Ces partenaires peuvent déposer leurs propres cookies de suivi lors de votre visite sur leurs sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">4. Cookies</h2>
          <p className="text-stone-600 leading-relaxed mb-3">Nous utilisons deux types de cookies :</p>
          <ul className="list-disc pl-6 text-stone-600 space-y-2">
            <li><strong>Cookies essentiels</strong> : nécessaires au bon fonctionnement du site (ex: mémorisation de votre choix concernant les cookies). Ils ne peuvent pas être refusés.</li>
            <li><strong>Cookies de suivi affiliés</strong> : déposés par nos partenaires (Booking.com, GetYourGuide, Travelpayouts) uniquement si vous cliquez sur un lien affilié. Ces cookies permettent d'attribuer une éventuelle commission à Brizillas.</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-3">
            Vous pouvez gérer vos préférences cookies via le bandeau affiché lors de votre première visite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">5. Partage des données</h2>
          <p className="text-stone-600 leading-relaxed">
            Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :
          </p>
          <ul className="list-disc pl-6 text-stone-600 space-y-2 mt-3">
            <li><strong>Anthropic</strong> (fournisseur de l'IA) : les données du formulaire de voyage sont transmises pour générer l'itinéraire, conformément à leur politique de confidentialité.</li>
            <li><strong>Unsplash</strong> : pour l'affichage de photos de voyage (données anonymes).</li>
            <li><strong>Partenaires affiliés</strong> : uniquement via les liens de suivi standards, si vous cliquez sur un lien.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">6. Vos droits (RGPD)</h2>
          <p className="text-stone-600 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : accès, rectification, suppression, limitation du traitement et portabilité de vos données. Pour exercer ces droits, contactez-nous à <strong>contact@brizillas.com</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">7. Durée de conservation</h2>
          <p className="text-stone-600 leading-relaxed">
            Les données de navigation anonymisées sont conservées 13 mois maximum. Les données saisies dans le formulaire ne sont pas stockées au-delà de la session de génération.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-3">8. Contact</h2>
          <p className="text-stone-600 leading-relaxed">
            Pour toute question relative à cette politique : <strong>contact@brizillas.com</strong>
          </p>
        </section>

        <div className="mt-10 pt-6 border-t border-stone-200">
          <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">← Retour à l'accueil</Link>
        </div>
      </main>
    </div>
  );
}
