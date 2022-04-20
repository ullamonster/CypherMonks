// Add clesses to contact form
const kiyonoElems = document.querySelectorAll('.comment-metadata');
kiyonoElems.forEach(( kiyonoElem, index) => {
  kiyonoElem.classList.add( "small" );
});

const kiyonoReps = document.querySelectorAll('.reply');
kiyonoReps.forEach(( kiyonoRep, index) => {
  kiyonoRep.classList.add( "button" );
});

// Add clesses to consent text
const kiyonoChecks = document.querySelectorAll('.comment-form-cookies-consent');
kiyonoChecks.forEach(( kiyonoCheck, index) => {
  kiyonoCheck.classList.add( "small" );
});

// Removing "says" in the comment box
const kiyonoSays = document.querySelectorAll('.says');
kiyonoSays.forEach(( kiyonoSay, index ) => {
  kiyonoSay.remove();
});

// Animation on scroll
// Intersection Observer API by MDN Web Docs content
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// License under CC-BY-SA 2.5
// https://developer.mozilla.org/en-US/docs/MDN/About#copyrights_and_licenses

const kiyonoAnimeBoxes = document.querySelectorAll( '.fadeUp' );

const kiyonoAnimeOptions = {
  threshold: 1,
  rootMargin: '100px 0 40px 0',
}

let kiyonoAnimeOnScroll = new IntersectionObserver ( ( entries, animeOnScroll ) => {
  entries.forEach( entry => {
    if (entry.isIntersecting ) {
      entry.target.classList.add( 'reveal' )
    } else {
      entry.target.classList.remove( 'reveal' );
    }
  }), kiyonoAnimeOptions });

  kiyonoAnimeBoxes.forEach( kiyonoAnimeBox => {
    kiyonoAnimeOnScroll.observe( kiyonoAnimeBox );
  });