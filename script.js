const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".side-nav a");

const translations = {
  "Violet Ledger": "Violet 档案",
  "Resume Portfolio": "简历作品集",
  "Overview": "概览",
  "Experience": "经历",
  "Research": "研究",
  "Projects": "项目",
  "Contact": "联系",
  "About": "关于",
  "Home": "首页",
  "Open Resume PDF": "打开英文简历",
  "Vault": "简历库",
  "Log Entry": "联系我",
  "Detailed Snapshot · Updated April 2026": "详细快照 · 更新于 2026 年 4 月",
  "Violet Ye Financial-Style Resume Overview": "叶梓萌金融风格简历概览",
  "Education": "教育",
  "UC Berkeley": "加州大学伯克利分校",
  "Data Science + EEP · GPA 3.844": "数据科学 + 环境经济与政策 · GPA 3.844",
  "Experience": "经历",
  "3 Internships": "3 段实习",
  "Analyst + AIGC Fullstack": "分析师 + AIGC 全栈",
  "Research": "研究",
  "2 Major Tracks": "2 条主要研究方向",
  "Green finance + electric bus modeling": "绿色金融 + 电动公交建模",
  "Skills": "技能",
  "Python / JS / SQL": "Python / JS / SQL",
  "C++, R, Matlab, SPSS, Excel": "C++, R, Matlab, SPSS, Excel",
  "Current Snapshot": "当前快照",
  "Use the sidebar to open each resume area as its own page: experience, research, projects, contact, and about.": "使用侧栏打开各个独立页面：经历、研究、项目、联系和关于。",
  "Professional Timeline": "职业时间线",
  "Experience Ledger": "经历档案",
  "AIGC Fullstack Engineer Intern · Tezign (Shanghai)": "AIGC 全栈工程师实习生 · 特赞（上海）",
  "Mar 2026 - Present": "2026 年 3 月 - 至今",
  "Built AI simulation evaluation system for Atypica AI and practiced production-level vibe coding workflows.": "为 Atypica AI 搭建 AI 模拟评估系统，并实践生产级 AI 辅助开发流程。",
  "Data Analyst Intern · China-U.S. Green Fund": "数据分析实习生 · 中美绿色基金",
  "Jul 2025 - Aug 2025": "2025 年 7 月 - 2025 年 8 月",
  "Analyzed commercial solar and investment performance data and converted findings into ESG trend reports.": "分析商业太阳能与投资绩效数据，并将结果转化为 ESG 行业趋势报告。",
  "Business Analyst · Harvard AUSCR Program": "商业分析员 · 哈佛 AUSCR 项目",
  "Apr 2023 - Sep 2023": "2023 年 4 月 - 2023 年 9 月",
  "Built an AI inventory forecasting model for Haidilao from HBS ESG case study analysis.": "基于哈佛商学院 ESG 案例分析，为海底捞构建 AI 库存预测模型。",
  "Recent Logs": "近期记录",
  "First contributor paper in SCI journal": "SCI 期刊第一贡献者论文",
  "School bulletin board platform launched": "校园公告板平台上线",
  "GreenGrid desert research leadership": "GreenGrid 沙漠研究负责人",
  "Producer · T.I.n.Y Theater Club": "制作人 · T.I.n.Y 中文戏剧社",
  "Energy Club President experience": "能源社社长经历",
  "Research Portfolio": "研究作品集",
  "Research Breakdown": "研究拆解",
  "Commercial Bank Green Finance · SJTU": "商业银行绿色金融 · 上海交通大学",
  "Electric Bus Transition Math Modeling · SJTU": "公交电动化数学建模 · 上海交通大学",
  "Green energy investment analysis · Green Fund": "绿色能源投资分析 · 中美绿色基金",
  "Builder Archive": "建设者档案",
  "Projects, Awards, and Leadership Vault": "项目、奖项与领导力档案",
  "Projects & Leadership": "项目与领导力",
  "Founder of School Bulletin Board Platform, GreenGrid Research Lead, T.I.n.Y Theater Club Producer, Energy Club President.": "校园公告板平台创始人、GreenGrid 研究负责人、T.I.n.Y 中文戏剧社制作人、能源社社长。",
  "Awards": "奖项",
  "AIME 11 (USAMO qualified), HiMCM Finalist (top 6%), National Economics Challenge China 1st Place Gold.": "AIME 11 分（晋级 USAMO）、HiMCM 决赛奖（全球前 6%）、全国经济学挑战赛中国区冠军与全国金奖。",
  "Languages": "语言",
  "English, Mandarin, Japanese (basic).": "英语、中文、日语（初级）。",
  "Contact Desk": "联系台",
  "Contact Entry": "联系入口",
  "Name": "姓名",
  "Email": "邮箱",
  "Subject": "主题",
  "Message": "消息",
  "Send Message": "发送消息",
  "About Me": "关于我",
  "A student, researcher, and visual thinker.": "学生、研究者，也是一名视觉思考者。",
  "I study Data Science and Environmental Economics at UC Berkeley. My work sits between analytics and storytelling:": "我在加州大学伯克利分校学习数据科学与环境经济和政策。我的工作连接数据分析与叙事表达：",
  "I enjoy building data-informed decisions while keeping people and context at the center.": "我喜欢在以人为中心的语境中，用数据支持更好的决策。",
  "Outside coursework and research, I explore photography, travel, illustration, and skiing.": "在课程和研究之外，我也探索摄影、旅行、插画和滑雪。",
  "These interests shape how I approach problem solving and design.": "这些兴趣塑造了我理解问题和进行设计的方式。",
  "Life Outside Class": "课堂之外",
  "Gallery": "图集"
};

const reverseTranslations = Object.fromEntries(
  Object.entries(translations).map(([english, chinese]) => [chinese, english])
);

const translateTextNodes = (language) => {
  const dictionary = language === "zh" ? translations : reverseTranslations;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    const text = node.textContent;
    const trimmed = text.trim();

    if (!trimmed || !dictionary[trimmed]) {
      return;
    }

    node.textContent = text.replace(trimmed, dictionary[trimmed]);
  });
};

const setupLanguageToggle = () => {
  const anchor = document.querySelector(".side-cta") || document.querySelector(".nav-links");

  if (!anchor) {
    return;
  }

  const button = document.createElement("button");
  button.className = "lang-toggle";
  button.type = "button";
  anchor.insertAdjacentElement(anchor.classList.contains("side-cta") ? "beforebegin" : "afterend", button);

  const applyLanguage = (language) => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    translateTextNodes(language);
    button.textContent = language === "zh" ? "English" : "中文";
    window.localStorage.setItem("violet-language", language);
  };

  button.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "zh-CN" ? "en" : "zh";
    applyLanguage(nextLanguage);
  });

  applyLanguage(window.localStorage.getItem("violet-language") === "zh" ? "zh" : "en");
};

setupLanguageToggle();

if (navLinks.length > 0) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("#")[0];

    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
      link.classList.add("is-clicking");
      window.setTimeout(() => {
        link.classList.remove("is-clicking");
      }, 260);
    });
  });
}

if ("IntersectionObserver" in window && reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("visible"));
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const submitButton = document.getElementById("contactSubmit");
  const statusMessage = document.getElementById("formStatus");

  const setStatus = (message, isError = false) => {
    if (!statusMessage) {
      return;
    }
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "#8d1f1f" : "#375b45";
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      setStatus("Please complete all required fields.", true);
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const endpoint = contactForm.dataset.endpoint?.trim();
    const recipient = contactForm.dataset.recipient?.trim();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    setStatus("Sending your message...");

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message
          })
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        contactForm.reset();
        setStatus("Message sent successfully. Thank you!");
      } else if (recipient) {
        const rawBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(rawBody)}`;

        window.location.href = mailtoUrl;
        contactForm.reset();
        setStatus("Your email app has opened with this message draft.");
      } else {
        throw new Error("Contact destination missing");
      }
    } catch (error) {
      setStatus(
        "Unable to send right now. Please try again or reach out via LinkedIn.",
        true
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}
