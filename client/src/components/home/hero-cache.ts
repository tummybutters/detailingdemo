let heroReady = false;

export function getHeroCache() {
  return { heroReady };
}

export function setHeroReady() {
  heroReady = true;
}

export function resetHeroCache() {
  heroReady = false;
}
