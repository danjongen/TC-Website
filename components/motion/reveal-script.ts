/**
 * Site-wide reveal engine, inlined into <head> by app/layout.tsx.
 *
 * Mark any element with data-reveal="rise" | "fade" | "resolve" | "line".
 * The script arms it with a paused Web Animation (so the hidden "from" state
 * is applied before first paint), plays it when the element crosses into
 * view, then cancels the animation so the element returns to its own CSS
 * (hover transforms, opacity classes and so on keep working).
 *
 * Why vanilla and not React: it runs before hydration, so reveals work while
 * the JS bundle is still downloading, and it never touches DOM attributes,
 * so there are no hydration mismatches. With JS off, reduced motion, or an
 * old browser it does nothing and every element renders in its final state.
 *
 * Variants:
 *   rise     mask-rise for headings (the hero's line reveal, for any block)
 *   fade     opacity + 16px lift for copy, cards, rows
 *   resolve  photos assemble from a dot grid (echoes the point-cloud hero)
 *   line     dividers draw left to right (give the element origin-left)
 *
 * Optional data-reveal-delay="120" adds ms on top of the automatic stagger.
 * Elements must be block or inline-block (transforms skip inline boxes).
 * Do not put data-reveal on very tall containers; mark their children.
 */
export const REVEAL_SCRIPT = `(function () {
  var waiting = null;
  function release() {
    if (!waiting) return;
    waiting.forEach(function (a) { try { a.cancel(); } catch (e) {} });
    waiting.clear();
  }
  try {
    if (!window.IntersectionObserver || !window.MutationObserver || !Element.prototype.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
    var FX = {
      rise: { t: 900, k: [
        { translate: "0 100%", clipPath: "inset(-0.25em -0.25em 100% -0.25em)" },
        { translate: "0 0", clipPath: "inset(-0.25em -0.25em -0.35em -0.25em)" }
      ] },
      fade: { t: 600, k: [{ opacity: 0, translate: "0 16px", offset: 0 }] },
      resolve: { t: 1100, k: [{ "--tc-dot": "-1px", offset: 0 }] },
      line: { t: 900, k: [{ scale: "0 1", offset: 0 }] }
    };
    var armed = new WeakMap();
    waiting = new Set();
    var io = new IntersectionObserver(function (entries) {
      try { play(entries); } catch (err) { release(); }
    }, { threshold: [0, 0.15, 0.3, 0.6, 1] });
    function play(entries) {
      var hits = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (!e.isIntersecting) continue;
        var vh = (e.rootBounds && e.rootBounds.height) || window.innerHeight;
        if (e.intersectionRatio >= 0.15 || e.intersectionRect.height >= vh * 0.25) hits.push(e.target);
      }
      hits.sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });
      var morphing = document.documentElement.getAttribute("data-vt-static") || "";
      for (var j = 0; j < hits.length; j++) {
        var el = hits[j];
        var a = armed.get(el);
        io.unobserve(el);
        if (!a) continue;
        waiting.delete(a);
        // This element is the landing point of a shared-element morph: the
        // morph is its entrance, so show it in place instead of revealing.
        var host = el.closest("[data-vt]");
        if (host && (" " + morphing + " ").indexOf(" " + host.getAttribute("data-vt") + " ") >= 0) {
          a.cancel();
          continue;
        }
        var extra = parseInt(el.getAttribute("data-reveal-delay") || "0", 10) || 0;
        a.effect.updateTiming({ delay: Math.min(j, 8) * 80 + extra });
        a.play();
      }
    }
    function arm(el) {
      if (armed.has(el)) return;
      var fx = FX[el.getAttribute("data-reveal")];
      if (!fx) return;
      var a = el.animate(fx.k, { duration: fx.t, easing: EXPO, fill: "both" });
      a.pause();
      a.onfinish = function () { a.cancel(); };
      armed.set(el, a);
      waiting.add(a);
      io.observe(el);
    }
    function disarm(el) {
      var a = armed.get(el);
      if (!a) return;
      waiting.delete(a);
      io.unobserve(el);
      armed.delete(el);
    }
    function each(node, fn) {
      if (node.nodeType !== 1) return;
      if (node.hasAttribute("data-reveal")) fn(node);
      var list = node.querySelectorAll("[data-reveal]");
      for (var i = 0; i < list.length; i++) fn(list[i]);
    }
    new MutationObserver(function (records) {
      try {
        for (var i = 0; i < records.length; i++) {
          var r = records[i];
          for (var j = 0; j < r.removedNodes.length; j++) each(r.removedNodes[j], disarm);
          for (var k = 0; k < r.addedNodes.length; k++) each(r.addedNodes[k], arm);
        }
      } catch (err) { release(); }
    }).observe(document.documentElement, { childList: true, subtree: true });
    each(document.documentElement, arm);
    window.addEventListener("beforeprint", release);
  } catch (err) { release(); }
})();`
