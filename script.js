const reveals = document.querySelectorAll(".reveal");

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
