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
    // The dot mask is spelled out as stepped keyframes rather than a var():
    // engines resolve var() in animated keyframes once, not per frame. Mask
    // images animate discretely, so 16 steps on the expo curve read as a
    // smooth assembly, and the mask exists only while the photo resolves.
    var DOT_STEPS = [];
    for (var s = 0; s <= 16; s++) {
      var r = (-1 + (s / 16) * 8).toFixed(2) + "px";
      var g = "radial-gradient(circle, #000 " + r + ", transparent calc(" + r + " + 0.6px))";
      DOT_STEPS.push({ offset: s / 16, maskImage: g, webkitMaskImage: g, maskSize: "7px 7px", webkitMaskSize: "7px 7px" });
    }
    var FX = {
      rise: { t: 900, k: [
        { translate: "0 100%", clipPath: "inset(-0.25em -0.25em 100% -0.25em)" },
        { translate: "0 0", clipPath: "inset(-0.25em -0.25em -0.35em -0.25em)" }
      ] },
      fade: { t: 600, k: [{ opacity: 0, translate: "0 16px", offset: 0 }] },
      resolve: { t: 1100, k: DOT_STEPS },
      line: { t: 900, k: [{ scale: "0 1", offset: 0 }] }
    };
    var armed = new WeakMap();
    var done = new WeakSet();
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
        var hold = armed.get(el);
        io.unobserve(el);
        armed.delete(el);
        done.add(el);
        if (!hold) continue;
        waiting.delete(hold);
        var fx = FX[el.getAttribute("data-reveal")];
        // This element is the landing point of a shared-element morph: the
        // morph is its entrance, so show it in place instead of revealing.
        var host = el.closest("[data-vt]");
        if (!fx || (host && (" " + morphing + " ").indexOf(" " + host.getAttribute("data-vt") + " ") >= 0)) {
          hold.cancel();
          continue;
        }
        var extra = parseInt(el.getAttribute("data-reveal-delay") || "0", 10) || 0;
        // Swap the hold for the real reveal in the same frame. Every variant's
        // first frame is invisible (clipped, transparent, dot-less or zero
        // width), so the swap never flashes.
        var a = el.animate(fx.k, { duration: fx.t, easing: EXPO, fill: "both", delay: Math.min(j, 8) * 80 + extra });
        a.onfinish = cancelSelf;
        hold.cancel();
      }
    }
    function cancelSelf() { this.cancel(); }
    // Waiting elements are held at opacity 0 rather than at their reveal's
    // first frame: a clip-path or zero scale would hide them from the
    // IntersectionObserver itself, and they would never be seen entering.
    var HOLD = [{ opacity: 0 }, { opacity: 0 }];
    function arm(el) {
      if (armed.has(el) || done.has(el) || !FX[el.getAttribute("data-reveal")]) return;
      var hold = el.animate(HOLD, { duration: 1, fill: "both" });
      hold.pause();
      armed.set(el, hold);
      waiting.add(hold);
      io.observe(el);
    }
    function disarm(el) {
      var hold = armed.get(el);
      if (!hold) return;
      // Cancel, do not just forget: React sometimes moves a node (remove then
      // re-insert the same element), and a forgotten hold would keep it at
      // opacity 0 forever. Re-insertion arms it again from scratch.
      hold.cancel();
      waiting.delete(hold);
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
