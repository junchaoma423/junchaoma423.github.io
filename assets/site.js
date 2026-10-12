// Replaces the Hostinger builder's JavaScript, which the static copy no longer loads.
(function () {
  var CONTACT_EMAIL = "junchaom@usc.edu";

  // Scroll-in animations: elements stay hidden until marked active.
  var animated = document.querySelectorAll(".transition, [data-animation-role]");
  var activate = function (el) {
    el.setAttribute("data-animation-state", "active");
    if (el.tagName === "IMG" || el.querySelector("img")) {
      var img = el.tagName === "IMG" ? el : el.querySelector("img");
      if (img.complete) el.classList.add("loaded");
      else img.addEventListener("load", function () { el.classList.add("loaded"); });
    }
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { activate(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -5% 0px" });
    animated.forEach(function (el) { io.observe(el); });
  } else {
    animated.forEach(activate);
  }

  // Mobile menu: toggle the burger icon and the dropdown.
  document.querySelectorAll(".burger").forEach(function (burger) {
    burger.addEventListener("click", function () {
      var open = burger.classList.toggle("burger--open");
      burger.setAttribute("aria-expanded", open);
      document.querySelectorAll(".block-header-layout-mobile__dropdown").forEach(function (d) {
        d.classList.toggle("block-header-layout-mobile__dropdown--open", open);
      });
    });
  });

  // YouTube placeholders: swap the thumbnail for the real player on click.
  document.querySelectorAll("img.video__placeholder[data-yt]").forEach(function (img) {
    var box = img.closest(".video") || img.parentElement.parentElement;
    box.style.cursor = "pointer";
    box.addEventListener("click", function () {
      var id = img.getAttribute("data-yt");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&playsinline=1&rel=0";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
      box.style.position = box.style.position || "relative";
      box.innerHTML = "";
      box.appendChild(iframe);
    }, { once: true });
  });

  // Forms had a Hostinger backend; open the visitor's mail app instead.
  document.querySelectorAll("form.form__control").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = [];
      form.querySelectorAll("input, textarea").forEach(function (field) {
        var label = form.querySelector('label[for="' + field.id + '"]');
        if (field.value) lines.push((label ? label.textContent.replace("*", "") : field.id) + ": " + field.value);
      });
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Message from website") +
        "&body=" + encodeURIComponent(lines.join("\n\n"));
    });
  });
})();
