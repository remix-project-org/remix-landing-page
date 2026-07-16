/**
 * FormBuilder Embed SDK
 * Drop-in script that fetches a form definition and renders it.
 *
 * Usage:
 *   FormBuilder.render({ host: 'https://forms.example.com', formCode: 'a1b2c3', container: '#my-form' })
 */
(function () {
  "use strict";

  var FormBuilder = (window.FormBuilder = window.FormBuilder || {});

  /* SVG path data for social platform icons */
  var EMBED_SOCIAL_PLATFORMS = {
    website:   { label: "Website",     icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
    discord:   { label: "Discord",     icon: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" },
    twitter:   { label: "X / Twitter",  icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    github:    { label: "GitHub",      icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
    linkedin:  { label: "LinkedIn",    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    youtube:   { label: "YouTube",     icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    instagram: { label: "Instagram",   icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z" },
    tiktok:    { label: "TikTok",      icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
    twitch:    { label: "Twitch",      icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" },
    telegram:  { label: "Telegram",    icon: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
    facebook:  { label: "Facebook",    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    reddit:    { label: "Reddit",      icon: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" },
    email:     { label: "Email",       icon: "M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67ZM22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" }
  };

  FormBuilder.render = function (opts) {
    var host = opts.host || "";
    var formCode = opts.formCode || opts.slug; /* backward compat */
    var container =
      typeof opts.container === "string"
        ? document.querySelector(opts.container)
        : opts.container;

    if (!container) {
      console.error("[FormBuilder] Container not found:", opts.container);
      return;
    }
    if (!formCode) {
      console.error("[FormBuilder] formCode is required");
      return;
    }

    container.innerHTML = '<div class="fb-loading">Loading form…</div>';

    fetch(host + "/api/public/forms/" + formCode)
      .then(function (r) {
        if (!r.ok) throw new Error("Form not found");
        return r.json();
      })
      .then(function (form) {
        renderForm(container, form, host, opts);
      })
      .catch(function (err) {
        container.innerHTML =
          '<div class="fb-error">Could not load form.</div>';
        console.error("[FormBuilder]", err);
      });
  };

  /* ── Build the form DOM ── */
  function renderForm(container, form, host, opts) {
    var theme = form.theme || {};
    var settings = form.settings || {};
    var fields = form.fields || [];

    console.log("Rendering form with theme:", theme);

    // Set page title if this is a standalone page
    var pageTitle = settings.pageTitle || form.name;
    if (pageTitle && !opts.skipTitle) {
      document.title = pageTitle;
    }

    // inject scoped CSS
    var styleId = "fb-style-" + (form.share_code || form.slug);
    if (!document.getElementById(styleId)) {
      console.log("Injecting CSS for form with theme:", theme);
      var style = document.createElement("style");
      style.id = styleId;
      style.textContent = generateCSS(theme);
      console.log("Generated CSS:", style.textContent);
      if (theme.customCss) style.textContent += "\n" + theme.customCss;
      document.head.appendChild(style);
    }

    container.innerHTML = "";
    container.className = (container.className || "") + " fb-form";

    // Background image — applied to the page body (behind the form card)
    if (theme.backgroundImage) {
      document.body.style.backgroundImage = "url(" + theme.backgroundImage + ")";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    }

    // Logo
    if (theme.logoUrl) {
      var logo = document.createElement("img");
      logo.src = theme.logoUrl;
      logo.className = "fb-logo";
      container.appendChild(logo);
    }

    if (form.description) {
      var desc = document.createElement("p");
      desc.className = "fb-description";
      desc.textContent = form.description;
      container.appendChild(desc);
    }

    var formEl = document.createElement("form");
    formEl.className = "fb-fields";
    formEl.noValidate = true;

    // Honeypot
    if (settings.honeypot) {
      var hp = document.createElement("input");
      hp.type = "text";
      hp.name = "_hp";
      hp.tabIndex = -1;
      hp.autocomplete = "off";
      hp.style.cssText =
        "position:absolute;left:-9999px;top:-9999px;opacity:0;height:0;width:0";
      formEl.appendChild(hp);
    }

    // Render each field
    fields.forEach(function (field) {
      var wrap = buildField(field, theme);
      if (wrap) formEl.appendChild(wrap);
    });

    // Submit button
    var btnWrap = document.createElement("div");
    btnWrap.className = "fb-button-wrap";
    var btn = document.createElement("button");
    btn.type = "submit";
    btn.className = "fb-button";
    btn.textContent = settings.submitButtonText || "Submit";
    btnWrap.appendChild(btn);
    formEl.appendChild(btnWrap);

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handleSubmit(formEl, form, host, container, settings, opts);
    });

    container.appendChild(formEl);

    // Conditional logic
    applyConditions(formEl, fields);
    formEl.addEventListener("input", function () {
      applyConditions(formEl, fields);
    });
    formEl.addEventListener("change", function () {
      applyConditions(formEl, fields);
    });
  }

  /* ── Build a single field ── */
  function buildField(field, theme) {
    var wrap = document.createElement("div");
    wrap.className =
      "fb-field fb-field-" +
      field.type +
      (field.width === "half" ? " fb-half" : "") +
      (field.cssClass ? " " + field.cssClass : "");
    wrap.dataset.fieldId = field.id;

    // Layout types
    if (field.type === "divider") {
      wrap.innerHTML = "<hr class='fb-divider'/>";
      return wrap;
    }
    if (field.type === "heading") {
      var tag = field.level || "h2";
      var h = document.createElement(tag);
      h.className = "fb-heading";
      h.textContent = field.content || "";
      if (field.align) h.style.textAlign = field.align;
      wrap.appendChild(h);
      return wrap;
    }
    if (field.type === "paragraph") {
      var p = document.createElement("p");
      p.className = "fb-paragraph";
      p.textContent = field.content || "";
      if (field.align) p.style.textAlign = field.align;
      wrap.appendChild(p);
      return wrap;
    }
    if (field.type === "rich_text") {
      var rt = document.createElement("div");
      rt.className = "fb-rich-text";
      rt.innerHTML = field.richContent || "";
      if (field.align) rt.style.textAlign = field.align;
      wrap.appendChild(rt);
      return wrap;
    }
    if (field.type === "image") {
      var imgWrap = document.createElement("div");
      imgWrap.className = "fb-image";
      if (field.align) imgWrap.style.textAlign = field.align;
      if (field.imageUrl) {
        var img = document.createElement("img");
        img.src = field.imageUrl;
        img.alt = field.imageAlt || "";
        img.className = "fb-image-el";
        imgWrap.appendChild(img);
      }
      wrap.appendChild(imgWrap);
      return wrap;
    }
    if (field.type === "section") {
      var sec = document.createElement("div");
      sec.className = "fb-section";
      sec.textContent = field.content || "";
      wrap.appendChild(sec);
      return wrap;
    }
    if (field.type === "social_links") {
      if (field.label) {
        var slLabel = document.createElement("label");
        slLabel.className = "fb-label";
        slLabel.textContent = field.label;
        wrap.appendChild(slLabel);
      }
      var linksWrap = document.createElement("div");
      linksWrap.className = "fb-social-links";
      if (field.align) linksWrap.style.justifyContent = field.align === "right" ? "flex-end" : field.align === "left" ? "flex-start" : "center";
      (field.socialLinks || []).forEach(function (link) {
        if (!link.url) return;
        var plat = EMBED_SOCIAL_PLATFORMS[link.platform];
        if (!plat) return;
        var a = document.createElement("a");
        a.href = link.platform === "email" ? "mailto:" + link.url : link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.title = link.label || plat.label;
        a.className = "fb-social-btn";
        a.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="' + plat.icon + '"/></svg>';
        linksWrap.appendChild(a);
      });
      wrap.appendChild(linksWrap);
      return wrap;
    }
    if (field.type === "hidden") {
      var hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = field.id;
      hidden.value = field.defaultValue || "";
      wrap.appendChild(hidden);
      wrap.style.display = "none";
      return wrap;
    }

    // Label
    if (theme.labelStyle !== "hidden") {
      var label = document.createElement("label");
      label.className = "fb-label";
      label.setAttribute("for", "fb-" + field.id);
      label.textContent = field.label || "";
      if (field.required) {
        var star = document.createElement("span");
        star.className = "fb-required";
        star.textContent = " *";
        label.appendChild(star);
      }
      wrap.appendChild(label);
    }

    // Description
    if (field.description) {
      var descEl = document.createElement("p");
      descEl.className = "fb-field-desc";
      descEl.textContent = field.description;
      wrap.appendChild(descEl);
    }

    // Build input element
    var input;

    switch (field.type) {
      case "short_text":
      case "email":
      case "phone":
      case "url":
        input = document.createElement("input");
        input.type =
          field.type === "short_text"
            ? "text"
            : field.type === "phone"
            ? "tel"
            : field.type;
        input.className = "fb-input";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.placeholder = field.placeholder || "";
        input.required = !!field.required;
        if (field.defaultValue) input.value = field.defaultValue;
        if (field.minLength) input.minLength = field.minLength;
        if (field.maxLength) input.maxLength = field.maxLength;
        if (field.pattern) input.pattern = field.pattern;
        wrap.appendChild(input);
        break;

      case "long_text":
        input = document.createElement("textarea");
        input.className = "fb-input fb-textarea";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.placeholder = field.placeholder || "";
        input.required = !!field.required;
        input.rows = field.rows || 4;
        if (field.defaultValue) input.value = field.defaultValue;
        wrap.appendChild(input);
        break;

      case "number":
        var numWrap = document.createElement("div");
        numWrap.className = "fb-number-wrap";
        if (field.prefix) {
          var pre = document.createElement("span");
          pre.className = "fb-prefix";
          pre.textContent = field.prefix;
          numWrap.appendChild(pre);
        }
        input = document.createElement("input");
        input.type = "number";
        input.className = "fb-input";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.placeholder = field.placeholder || "";
        input.required = !!field.required;
        if (field.min !== undefined && field.min !== "") input.min = String(field.min);
        if (field.max !== undefined && field.max !== "") input.max = String(field.max);
        if (field.step) input.step = String(field.step);
        if (field.defaultValue) input.value = field.defaultValue;
        numWrap.appendChild(input);
        if (field.suffix) {
          var suf = document.createElement("span");
          suf.className = "fb-suffix";
          suf.textContent = field.suffix;
          numWrap.appendChild(suf);
        }
        wrap.appendChild(numWrap);
        break;

      case "date":
        input = document.createElement("input");
        input.type = "date";
        input.className = "fb-input";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.required = !!field.required;
        if (field.defaultValue) input.value = field.defaultValue;
        if (field.minDate) input.min = field.minDate;
        if (field.maxDate) input.max = field.maxDate;
        wrap.appendChild(input);
        break;

      case "time":
        input = document.createElement("input");
        input.type = "time";
        input.className = "fb-input";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.required = !!field.required;
        if (field.defaultValue) input.value = field.defaultValue;
        wrap.appendChild(input);
        break;

      case "select":
        input = document.createElement("select");
        input.className = "fb-input fb-select";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.required = !!field.required;
        var emptyOpt = document.createElement("option");
        emptyOpt.value = "";
        emptyOpt.textContent = "Select…";
        input.appendChild(emptyOpt);
        (field.options || []).forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o.value;
          opt.textContent = o.label;
          input.appendChild(opt);
        });
        wrap.appendChild(input);
        break;

      case "multi_select":
        input = document.createElement("select");
        input.className = "fb-input fb-select";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.multiple = true;
        input.required = !!field.required;
        (field.options || []).forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o.value;
          opt.textContent = o.label;
          input.appendChild(opt);
        });
        wrap.appendChild(input);
        break;

      case "radio":
        var radioGroup = document.createElement("div");
        radioGroup.className = "fb-options" + (field.layout === "horizontal" ? " fb-horizontal" : "");
        (field.options || []).forEach(function (o) {
          var lbl = document.createElement("label");
          lbl.className = "fb-option-label";
          var r = document.createElement("input");
          r.type = "radio";
          r.name = field.id;
          r.value = o.value;
          r.required = !!field.required;
          lbl.appendChild(r);
          lbl.append(" " + o.label);
          radioGroup.appendChild(lbl);
        });
        if (field.allowOther) {
          var otherLbl = document.createElement("label");
          otherLbl.className = "fb-option-label";
          var otherR = document.createElement("input");
          otherR.type = "radio";
          otherR.name = field.id;
          otherR.value = "__other__";
          otherLbl.appendChild(otherR);
          otherLbl.append(" Other: ");
          var otherIn = document.createElement("input");
          otherIn.type = "text";
          otherIn.className = "fb-input fb-other-input";
          otherIn.name = field.id + "__other";
          otherLbl.appendChild(otherIn);
          radioGroup.appendChild(otherLbl);
        }
        wrap.appendChild(radioGroup);
        break;

      case "checkbox":
        var cbGroup = document.createElement("div");
        cbGroup.className = "fb-options" + (field.layout === "horizontal" ? " fb-horizontal" : "");
        (field.options || []).forEach(function (o) {
          var lbl = document.createElement("label");
          lbl.className = "fb-option-label";
          var cb = document.createElement("input");
          cb.type = "checkbox";
          cb.name = field.id;
          cb.value = o.value;
          lbl.appendChild(cb);
          lbl.append(" " + o.label);
          cbGroup.appendChild(lbl);
        });
        wrap.appendChild(cbGroup);
        break;

      case "yes_no":
        var ynGroup = document.createElement("div");
        ynGroup.className = "fb-yesno";
        var yesBtn = document.createElement("button");
        yesBtn.type = "button";
        yesBtn.className = "fb-yn-btn";
        yesBtn.textContent = field.trueLabel || "Yes";
        yesBtn.dataset.value = "true";
        var noBtn = document.createElement("button");
        noBtn.type = "button";
        noBtn.className = "fb-yn-btn";
        noBtn.textContent = field.falseLabel || "No";
        noBtn.dataset.value = "false";
        var ynInput = document.createElement("input");
        ynInput.type = "hidden";
        ynInput.name = field.id;
        ynInput.required = !!field.required;
        ynGroup.appendChild(yesBtn);
        ynGroup.appendChild(noBtn);
        ynGroup.appendChild(ynInput);
        yesBtn.addEventListener("click", function () {
          ynInput.value = "true";
          yesBtn.classList.add("selected");
          noBtn.classList.remove("selected");
          ynInput.dispatchEvent(new Event("change", { bubbles: true }));
        });
        noBtn.addEventListener("click", function () {
          ynInput.value = "false";
          noBtn.classList.add("selected");
          yesBtn.classList.remove("selected");
          ynInput.dispatchEvent(new Event("change", { bubbles: true }));
        });
        wrap.appendChild(ynGroup);
        break;

      case "rating":
        var ratingWrap = document.createElement("div");
        ratingWrap.className = "fb-rating";
        var ratingInput = document.createElement("input");
        ratingInput.type = "hidden";
        ratingInput.name = field.id;
        ratingInput.required = !!field.required;
        ratingWrap.appendChild(ratingInput);
        var maxR = field.maxRating || 5;
        for (var ri = 1; ri <= maxR; ri++) {
          (function (val) {
            var star = document.createElement("span");
            star.className = "fb-star";
            star.textContent = field.icon === "heart" ? "♥" : field.icon === "thumb" ? "👍" : "★";
            star.dataset.value = String(val);
            star.addEventListener("click", function () {
              ratingInput.value = String(val);
              ratingInput.dispatchEvent(new Event("input", { bubbles: true }));
              ratingWrap.querySelectorAll(".fb-star").forEach(function (s) {
                s.classList.toggle("active", parseInt(s.dataset.value) <= val);
              });
            });
            ratingWrap.appendChild(star);
          })(ri);
        }
        wrap.appendChild(ratingWrap);
        break;

      case "scale":
        var scaleWrap = document.createElement("div");
        scaleWrap.className = "fb-scale";
        if (field.minLabel) {
          var minLbl = document.createElement("span");
          minLbl.className = "fb-scale-label";
          minLbl.textContent = field.minLabel;
          scaleWrap.appendChild(minLbl);
        }
        var range = document.createElement("input");
        range.type = "range";
        range.className = "fb-range";
        range.name = field.id;
        range.min = String(field.scaleMin || 1);
        range.max = String(field.scaleMax || 10);
        range.step = String(field.scaleStep || 1);
        range.value = String(Math.round(((field.scaleMin || 1) + (field.scaleMax || 10)) / 2));
        var scaleVal = document.createElement("span");
        scaleVal.className = "fb-scale-value";
        scaleVal.textContent = range.value;
        range.addEventListener("input", function () {
          scaleVal.textContent = range.value;
        });
        scaleWrap.appendChild(range);
        scaleWrap.appendChild(scaleVal);
        if (field.maxLabel) {
          var maxLbl = document.createElement("span");
          maxLbl.className = "fb-scale-label";
          maxLbl.textContent = field.maxLabel;
          scaleWrap.appendChild(maxLbl);
        }
        wrap.appendChild(scaleWrap);
        break;

      case "file":
        input = document.createElement("input");
        input.type = "file";
        input.className = "fb-input fb-file";
        input.name = field.id;
        input.id = "fb-" + field.id;
        input.required = !!field.required;
        if (field.accept) input.accept = field.accept;
        if (field.multiple) input.multiple = true;
        wrap.appendChild(input);
        break;
    }

    // Error container
    var errDiv = document.createElement("div");
    errDiv.className = "fb-field-error";
    wrap.appendChild(errDiv);

    return wrap;
  }

  /* ── Gather form data ── */
  function gatherData(formEl) {
    var data = {};
    var elements = formEl.elements;
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (!el.name || el.name === "_hp" || el.name.endsWith("__other")) continue;
      if (el.type === "checkbox") {
        if (!data[el.name]) data[el.name] = [];
        if (el.checked) data[el.name].push(el.value);
      } else if (el.type === "radio") {
        if (el.checked) {
          data[el.name] = el.value;
          if (el.value === "__other__") {
            var otherIn = formEl.querySelector('[name="' + el.name + '__other"]');
            if (otherIn) data[el.name] = otherIn.value;
          }
        }
      } else if (el.type === "select-multiple") {
        data[el.name] = Array.from(el.selectedOptions).map(function (o) {
          return o.value;
        });
      } else if (el.type === "file") {
        // handled separately with FormData
      } else {
        data[el.name] = el.value;
      }
    }
    return data;
  }

  /* ── Submit ── */
  function handleSubmit(formEl, form, host, container, settings, opts) {
    // honeypot check
    var hp = formEl.querySelector('[name="_hp"]');
    if (hp && hp.value) return;

    var btn = formEl.querySelector(".fb-button");
    btn.disabled = true;
    btn.textContent = "Submitting…";

    // Clear errors
    formEl.querySelectorAll(".fb-field-error").forEach(function (e) {
      e.textContent = "";
    });

    var hasFiles = formEl.querySelector('input[type="file"]');
    var fetchOpts;

    if (hasFiles) {
      var fd = new FormData(formEl);
      var data = gatherData(formEl);
      fd.append("data", JSON.stringify(data));
      fetchOpts = { method: "POST", body: fd };
    } else {
      var data = gatherData(formEl);
      fetchOpts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    }

    fetch(host + "/api/public/forms/" + (form.share_code || form.slug) + "/submit", fetchOpts)
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok && res.data.errors) {
          res.data.errors.forEach(function (err) {
            var fieldWrap = formEl.querySelector('[data-field-id="' + err.field + '"]');
            if (fieldWrap) {
              var errDiv = fieldWrap.querySelector(".fb-field-error");
              if (errDiv) errDiv.textContent = err.message;
            }
          });
          btn.disabled = false;
          btn.textContent = settings.submitButtonText || "Submit";
          return;
        }

        if (res.data.redirectUrl) {
          window.location.href = res.data.redirectUrl;
          return;
        }

        // Show success message
        container.innerHTML = "";
        var successDiv = document.createElement("div");
        successDiv.className = "fb-success";
        successDiv.innerHTML =
          '<div class="fb-success-icon">✓</div>' +
          '<p>' + (res.data.successMessage || "Thank you!") + "</p>";
        container.appendChild(successDiv);

        if (opts.onSubmit) opts.onSubmit(res.data);
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = settings.submitButtonText || "Submit";
        alert("Submission failed. Please try again.");
      });
  }

  /* ── Conditional visibility ── */
  function getFieldValue(formEl, fieldId) {
    var input = formEl.querySelector('[name="' + fieldId + '"]');
    if (!input) return "";
    // Hidden input (yes_no, rating) or regular text/select
    if (input.type === "hidden" || input.tagName === "SELECT" || input.tagName === "TEXTAREA" ||
        input.type === "text" || input.type === "email" || input.type === "tel" ||
        input.type === "url" || input.type === "number" || input.type === "date" || input.type === "time" ||
        input.type === "range") {
      return input.value;
    }
    // Radio: get checked value
    if (input.type === "radio") {
      var checked = formEl.querySelector('[name="' + fieldId + '"]:checked');
      return checked ? checked.value : "";
    }
    // Checkbox: collect all checked values as comma-separated
    if (input.type === "checkbox") {
      var vals = [];
      formEl.querySelectorAll('[name="' + fieldId + '"]:checked').forEach(function (el) {
        vals.push(el.value);
      });
      return vals.join(",");
    }
    return input.value;
  }

  function applyConditions(formEl, fields) {
    fields.forEach(function (field) {
      if (!field.conditions || !field.conditions.length) return;
      var wrap = formEl.querySelector('[data-field-id="' + field.id + '"]');
      if (!wrap) return;

      var show = field.conditions.every(function (cond) {
        if (!cond.fieldId) return true;
        var val = getFieldValue(formEl, cond.fieldId);

        switch (cond.operator) {
          case "equals":
            // For checkboxes: check if the value is among the checked values
            if (val.indexOf(",") !== -1) return val.split(",").indexOf(cond.value) !== -1;
            return val === cond.value;
          case "not_equals":
            if (val.indexOf(",") !== -1) return val.split(",").indexOf(cond.value) === -1;
            return val !== cond.value;
          case "contains": return val.indexOf(cond.value || "") !== -1;
          case "not_empty": return val !== "";
          case "is_empty": return val === "";
          default: return true;
        }
      });

      wrap.style.display = show ? "" : "none";

      // Toggle required on inputs inside hidden fields
      var inputs = wrap.querySelectorAll("input,select,textarea");
      for (var i = 0; i < inputs.length; i++) {
        if (!show) {
          // Store original required state and disable it
          if (inputs[i].required) {
            inputs[i].setAttribute("data-was-required", "true");
            inputs[i].required = false;
          }
        } else {
          // Restore required state
          if (inputs[i].getAttribute("data-was-required") === "true") {
            inputs[i].required = true;
          }
        }
      }
    });
  }

  /* ── Generate CSS ── */
  function generateCSS(theme) {
    console.log("Generating CSS with theme:", theme);
    var p = theme.primaryColor || "#64c4ff";
    var bg = theme.backgroundColor || "#333446";
    var text = theme.textColor || "#a2a3bd";
    var ff = theme.fontFamily || "'Nunito Sans', sans-serif";
    var fs = theme.fontSize || "16px";
    var br = theme.borderRadius || "6px";
    var spacing = theme.fieldSpacing || "20px";
    var fbc = theme.fieldBorderColor || "#3f4455";
    var fbg = theme.fieldBgColor || "#434454";
    var bbg = theme.buttonBgColor || p;
    var btc = theme.buttonTextColor || "#222336";
    var bbr = theme.buttonBorderRadius || br;
    var bw = theme.buttonWidth || "auto";
    var mw = theme.containerMaxWidth || "640px";
    var cp = theme.containerPadding || "32px";
    var sa = theme.starActiveColor || "#fbbf24";
    var sh = theme.starHoverColor || "#f59e0b";
    var si = theme.starInactiveColor || "#d1d5db";
    var req = theme.requiredColor || "#ef4444";
    var err = theme.errorColor || "#ef4444";
    var mut = theme.mutedColor || "#6b7280";
    var mutl = theme.mutedLightColor || "#9ca3af";
    var stxt = theme.successTextColor || "#babfc6";
    var fring = theme.focusRingColor || (p + "22");

    return (
      /* CSS custom properties on .fb-form — override any color via customCss */
      ".fb-form{" +
      "--fb-primary:" + p + ";" +
      "--fb-bg:" + bg + ";" +
      "--fb-text:" + text + ";" +
      "--fb-field-border:" + fbc + ";" +
      "--fb-field-bg:" + fbg + ";" +
      "--fb-button-bg:" + bbg + ";" +
      "--fb-button-text:" + btc + ";" +
      "--fb-star-active:" + sa + ";" +
      "--fb-star-hover:" + sh + ";" +
      "--fb-star-inactive:" + si + ";" +
      "--fb-required:" + req + ";" +
      "--fb-error:" + err + ";" +
      "--fb-muted:" + mut + ";" +
      "--fb-muted-light:" + mutl + ";" +
      "--fb-success-text:" + stxt + ";" +
      "--fb-focus-ring:" + fring + ";" +
      "font-family:" + ff + ";font-size:" + fs + ";color:var(--fb-text);background:var(--fb-bg)" +
      ";max-width:" + mw + ";padding:" + cp + ";border-radius:12px;box-sizing:border-box}" +
      ".fb-form *{box-sizing:border-box}" +
      ".fb-logo{max-height:48px;margin-bottom:16px}" +

      ".fb-description{color:var(--fb-muted);margin:0 0 20px}" +
      ".fb-fields{display:flex;flex-wrap:wrap;gap:" + spacing + "}" +
      ".fb-field{width:100%;flex-shrink:0}" +
      ".fb-half{width:calc(50% - " + parseInt(spacing) / 2 + "px)}" +
      ".fb-label{display:block;margin-bottom:6px;font-weight:500;font-size:0.9em}" +
      ".fb-required{color:var(--fb-required)}" +
      ".fb-field-desc{font-size:0.85em;color:var(--fb-muted-light);margin:0 0 6px}" +
      ".fb-input{width:100%;padding:10px 14px;border:1px solid var(--fb-field-border);border-radius:" + br +
      ";background:var(--fb-field-bg);font-size:inherit;font-family:inherit;color:inherit;outline:none;transition:border-color .15s}" +
      ".fb-input:focus{border-color:var(--fb-primary);box-shadow:0 0 0 3px var(--fb-focus-ring)}" +
      ".fb-textarea{min-height:96px;resize:vertical}" +
      ".fb-select{appearance:auto}" +
      ".fb-number-wrap{display:flex;align-items:center;gap:8px}" +
      ".fb-prefix,.fb-suffix{color:var(--fb-muted);font-size:0.9em;white-space:nowrap}" +
      ".fb-options{display:flex;flex-direction:column;gap:8px}" +
      ".fb-horizontal{flex-direction:row;flex-wrap:wrap}" +
      ".fb-option-label{display:flex;align-items:center;gap:6px;cursor:pointer}" +
      ".fb-option-label input{accent-color:var(--fb-primary)}" +
      ".fb-other-input{flex:1;padding:4px 8px;border:1px solid var(--fb-field-border);border-radius:" + br + ";font-size:inherit}" +
      ".fb-yesno{display:flex;gap:12px}" +
      ".fb-yn-btn{color:var(--fb-text);flex:1;padding:12px;border:1px solid var(--fb-field-border);border-radius:" + br +
      ";background:var(--fb-field-bg);cursor:pointer;font-size:inherit;font-family:inherit;transition:all .15s}" +
      ".fb-yn-btn.selected{background:var(--fb-primary);color:var(--fb-text);border-color:var(--fb-primary)}" +
      ".fb-rating{display:flex;gap:4px;font-size:1.8em;cursor:pointer}" +
      ".fb-star{color:var(--fb-star-inactive);transition:color .15s}" +
      ".fb-star.active{color:var(--fb-star-active)}" +
      ".fb-star:hover{color:var(--fb-star-hover)}" +
      ".fb-scale{display:flex;align-items:center;gap:12px}" +
      ".fb-scale-label{font-size:0.85em;color:var(--fb-muted);white-space:nowrap}" +
      ".fb-scale-value{font-weight:600;min-width:2em;text-align:center}" +
      ".fb-range{flex:1;accent-color:var(--fb-primary)}" +
      ".fb-file{padding:10px}" +
      ".fb-divider{border:none;border-top:1px solid var(--fb-field-border);margin:8px 0}" +
      ".fb-heading{margin:0}" +
      ".fb-paragraph{color:var(--fb-muted);margin:0}" +
      ".fb-rich-text{color:var(--fb-muted);margin:0;line-height:1.6}" +
      ".fb-rich-text a{color:var(--fb-primary);text-decoration:underline}" +
      ".fb-rich-text ul,.fb-rich-text ol{margin:8px 0;padding-left:24px}" +
      ".fb-rich-text li{margin:2px 0}" +
      ".fb-rich-text p{margin:4px 0}" +
      ".fb-image{margin:0}" +
      ".fb-image-el{max-width:100%;height:auto;border-radius:" + br + "}" +
      ".fb-section{padding:12px 0;border-top:2px solid var(--fb-primary);font-weight:600}" +
      ".fb-social-links{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}" +
      ".fb-social-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--fb-primary);color:#fff;text-decoration:none;transition:opacity .15s}" +
      ".fb-social-btn:hover{opacity:0.8}" +
      ".fb-button-wrap{width:100%;padding-top:8px}" +
      ".fb-button{padding:12px 32px;background:var(--fb-button-bg);color:var(--fb-button-text);border:none;border-radius:" + bbr +
      ";cursor:pointer;font-size:inherit;font-weight:600;font-family:inherit;transition:opacity .15s;width:" +
      (bw === "full" ? "100%" : "auto") + "}" +
      ".fb-button:hover{opacity:0.9}" +
      ".fb-button:disabled{opacity:0.6;cursor:not-allowed}" +
      ".fb-field-error{color:var(--fb-error);font-size:0.85em;margin-top:4px;min-height:0}" +
      ".fb-success{text-align:center;padding:48px 24px}" +
      ".fb-success-icon{font-size:3em;color:var(--fb-primary);margin-bottom:12px}" +
      ".fb-success p{font-size:1.1em;color:var(--fb-success-text)}" +
      ".fb-loading,.fb-error{text-align:center;padding:32px;color:var(--fb-muted)}" +
      "@media(max-width:640px){.fb-half{width:100%}}"
    );
  }
})();
