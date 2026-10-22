// Avis clients affichés dans la pile de cartes.
// Remplace chaque [À REMPLACER] par un vrai avis (capture WhatsApp, commentaire, email…).
// Tant qu'il reste des [À REMPLACER], la section est masquée en production.

const PH = '[À REMPLACER]'

export const REVIEWS = [
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'N’Dolé', text: `${PH} avis client n°1` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Poulet DG', text: `${PH} avis client n°2` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Beignets', text: `${PH} avis client n°3` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Foléré', text: `${PH} avis client n°4` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Eru', text: `${PH} avis client n°5` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Salade d’Avocat', text: `${PH} avis client n°6` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Koki', text: `${PH} avis client n°7` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Gâteau au Yaourt', text: `${PH} avis client n°8` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Jus de Gingembre', text: `${PH} avis client n°9` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Miondos', text: `${PH} avis client n°10` },
]

export const reviewsReady = !JSON.stringify(REVIEWS).includes(PH)
