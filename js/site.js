// Small enhancements; the site works without JavaScript except video playback.
(function () {
  var CONTACT_EMAIL = "junchaom@usc.edu";

  // Animated GIFs are large: show a still poster, swap in the animation once it is on screen.
  var anims = document.querySelectorAll("img[data-anim]");
  var play = function (img) { img.src = img.getAttribute("data-anim"); img.removeAttribute("data-anim"); };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: "200px 0px" });
    anims.forEach(function (img) { io.observe(img); });
  } else {
    anims.forEach(play);
  }

  // YouTube: thumbnail until clicked, then the real player (keeps pages fast and cookie-free).
  document.querySelectorAll("button.yt[data-yt]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + btn.getAttribute("data-yt") + "?autoplay=1&rel=0&playsinline=1";
      iframe.title = btn.getAttribute("aria-label") || "YouTube video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      var box = document.createElement("div");
      box.className = "yt playing";
      box.appendChild(iframe);
      btn.replaceWith(box);
      iframe.focus();
    }, { once: true });
  });

  // Contact form: no backend on GitHub Pages yet, so hand the message to the visitor's mail app.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = d.get("message") + "\n\n— " + d.get("name") + (d.get("email") ? " (" + d.get("email") + ")" : "");
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Website message from " + d.get("name")) +
        "&body=" + encodeURIComponent(body);
    });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
