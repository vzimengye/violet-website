(() => {
  const root = document.documentElement;
  const STORAGE_KEY = "violet-language";

  const readLang = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "zh" ? "zh" : "en";
    } catch (error) {
      return "en";
    }
  };

  const saveLang = (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* storage can be blocked; the toggle still works for this page */
    }
  };

  /* ---------- language toggle ---------- */
  const translatable = Array.from(document.querySelectorAll("[data-zh]"));
  translatable.forEach((el) => {
    el.dataset.en = el.textContent;
  });

  const toggle = document.querySelector(".lang-toggle");

  const applyLanguage = (lang) => {
    translatable.forEach((el) => {
      el.textContent = lang === "zh" ? el.dataset.zh : el.dataset.en;
    });
    root.lang = lang === "zh" ? "zh-CN" : "en";
    if (toggle) {
      toggle.textContent = lang === "zh" ? "English" : "中文";
      toggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    }
    root.classList.remove("lang-pending");
  };

  let currentLang = readLang();
  applyLanguage(currentLang);

  if (toggle) {
    toggle.addEventListener("click", () => {
      currentLang = currentLang === "zh" ? "en" : "zh";
      saveLang(currentLang);
      applyLanguage(currentLang);
    });
  }

  /* ---------- reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- contact form (opens the visitor's email app) ---------- */
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const setStatus = (en, zh, isError) => {
    status.textContent = currentLang === "zh" ? zh : en;
    status.className = "form-status " + (isError ? "error" : "ok");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Please fill in every field with a valid email.", "请填写所有字段，并使用有效的邮箱。", true);
      return;
    }

    const data = new FormData(form);
    const get = (key) => String(data.get(key) || "").trim();
    const body = `Name: ${get("name")}\nEmail: ${get("email")}\n\n${get("message")}`;
    const href =
      `mailto:${form.dataset.recipient}` +
      `?subject=${encodeURIComponent(get("subject"))}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus(
      "Your email app should open with the message ready to send. If nothing happens, email me directly at violet.zimengye@berkeley.edu.",
      "你的邮件应用应该已经打开并填好了内容。如果没有反应，请直接发邮件到 violet.zimengye@berkeley.edu。",
      false
    );
  });
})();
