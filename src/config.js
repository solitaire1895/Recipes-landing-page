// Fichier unique à modifier : prix, lien de paiement, contacts.
export const CONFIG = {
  brand: 'Yummy Chefs',
  product: 'Les délices de Yummy Chefs',
  // Lien de la page de paiement de ta plateforme (Chariow, Maketou, Selar…)
  checkoutUrl: 'https://yummy-delice.mymaketou.shop/en/products/lesdelicesdeyummychefs/checkout',
  price: '1 500 FCFA',
  oldPrice: '3 000 FCFA',
  phone: '+237 673 77 85 95',
  whatsapp: 'https://wa.me/qr/ENY5A72JU76YN1',
  email: 'yummydelice@gmail.com',
  pages: 284,
  recipes: '160+',
}

// Ajoute UTM / paramètres de la page vers le checkout
export function checkoutHref() {
  if (typeof window === 'undefined') return CONFIG.checkoutUrl
  try {
    const url = new URL(CONFIG.checkoutUrl)
    new URLSearchParams(window.location.search).forEach((v, k) => url.searchParams.set(k, v))
    return url.toString()
  } catch {
    return CONFIG.checkoutUrl
  }
}
