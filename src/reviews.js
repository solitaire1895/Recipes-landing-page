// Avis clients affichés dans la pile de cartes (avis collectés auprès des acheteurs).
// Tant qu'il reste des [À REMPLACER], la section est masquée en production.

const PH = '[À REMPLACER]'

export const REVIEWS = [
  { name: 'Aminata Mbarga', city: 'Douala, Cameroun', dish: 'Ndolé', text: 'Une excellente recette ! Les étapes sont faciles à suivre et mon ndolé était délicieux. Toute la famille s’est régalée.' },
  { name: 'Chantal Nguema', city: 'Yaoundé, Cameroun', dish: 'Poulet DG', text: 'J’ai enfin réussi un poulet DG digne d’un restaurant ! Les explications sont claires et le résultat est vraiment savoureux.' },
  { name: 'Mireille Tchoumi', city: 'Bafoussam, Cameroun', dish: 'Koki', text: 'J’adore retrouver les saveurs de notre cuisine traditionnelle. La recette est bien expliquée et très pratique.' },
  { name: 'Fatou Diop', city: 'Dakar, Sénégal', dish: 'Thiéboudienne', text: 'Un très beau livre pour découvrir et préparer les spécialités africaines. J’ai pris beaucoup de plaisir à cuisiner cette recette.' },
  { name: 'Ngozi Okafor', city: 'Lagos, Nigeria', dish: 'Jollof Rice', text: 'La recette est simple, les ingrédients sont faciles à trouver et le résultat est plein de saveurs. Je recommande ce livre !' },
  { name: 'Nadia Essomba', city: 'Kribi, Cameroun', dish: 'Salade de fruits exotiques', text: 'Une recette fraîche, colorée et parfaite pour les journées chaudes. Facile à préparer et très appréciée par mes invités.' },
  { name: 'Adwoa Mensah', city: 'Accra, Ghana', dish: 'Beignets africains', text: 'Les instructions m’ont beaucoup aidée à réussir mes beignets. Ils étaient dorés, moelleux et délicieux !' },
  { name: 'Brigitte Ewane', city: 'Limbe, Cameroun', dish: 'Eru et Water Fufu', text: 'J’apprécie particulièrement les recettes traditionnelles camerounaises. Un excellent moyen de préserver nos habitudes culinaires.' },
  { name: 'Sandrine Mballa', city: 'Garoua, Cameroun', dish: 'Salade d’avocat', text: 'Une recette légère, rapide et pleine de fraîcheur. Parfaite pour accompagner mes repas sans passer des heures en cuisine.' },
  { name: 'Mariam Traoré', city: 'Abidjan, Côte d’Ivoire', dish: 'Gâteau au yaourt', text: 'Mon gâteau était moelleux et très réussi ! Les explications sont accessibles même lorsqu’on débute en pâtisserie.' },
]

export const reviewsReady = !JSON.stringify(REVIEWS).includes(PH)
