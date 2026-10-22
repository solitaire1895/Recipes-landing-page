// Avis clients affichés dans la pile de cartes.
// Remplace chaque [À REMPLACER] par un vrai avis (capture WhatsApp, commentaire, email…).
// Tant qu'il reste des [À REMPLACER], la section est masquée en production.
// photo : image du plat (dans /public/media) — ou la vraie photo envoyée par le client.
const PH = '[À REMPLACER]'

export const REVIEWS = [
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'N’Dolé', photo: 'main-course-1', text: `${PH} avis client n°1` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Poulet DG', photo: 'main-course-2', text: `${PH} avis client n°2` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Beignets', photo: 'dessert', text: `${PH} avis client n°3` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Foléré', photo: 'jus-2', text: `${PH} avis client n°4` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Eru', photo: 'main-course-3', text: `${PH} avis client n°5` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Salade d’Avocat', photo: 'salade-2', text: `${PH} avis client n°6` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Koki', photo: 'main-course-4', text: `${PH} avis client n°7` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Gâteau au Yaourt', photo: 'dessert-3', text: `${PH} avis client n°8` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Jus de Gingembre', photo: 'jus-3', text: `${PH} avis client n°9` },
  { name: `${PH} Prénom`, city: `${PH} Ville`, dish: 'Miondos', photo: 'main-course-5', text: `${PH} avis client n°10` },
]

export const reviewsReady = !JSON.stringify(REVIEWS).includes(PH)
