/**
 * Elite Plumbing — Mid2 Template (Drill-inspired) — Plumber variant
 * main.js — Side panel nav, sticky header shadow, smooth scroll,
 * stats counter, scroll fade-in, contact form validation
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     1. SIDE PANEL MOBILE MENU
     Slides in from the right (Drill-style)
  ═══════════════════════════════════════════ */
  var menuBtn = document.getElementById('hamburger');
  var sidePanel = document.getElementById('side-panel');
  var closeBtn = document.getElementById('side-panel-close');
  var overlay = document.getElementById('side-panel-overlay');

  function openSidePanel() {
    if (sidePanel) sidePanel.classList.add('active');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidePanel() {
    if (sidePanel) sidePanel.classList.remove('active');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openSidePanel);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidePanel);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidePanel);
  }

  // Close side panel when a nav link is clicked
  if (sidePanel) {
    sidePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeSidePanel);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidePanel && sidePanel.classList.contains('active')) {
      closeSidePanel();
    }
  });

  /* ═══════════════════════════════════════════
     2. STICKY HEADER SHADOW
  ═══════════════════════════════════════════ */
  var headerNav = document.getElementById('header-nav');

  if (headerNav) {
    function checkScroll() {
      if (window.scrollY > 100) {
        headerNav.classList.add('scrolled');
      } else {
        headerNav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ═══════════════════════════════════════════
     3. SMOOTH SCROLL
  ═══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ═══════════════════════════════════════════
     4. STATS COUNTER ANIMATION
  ═══════════════════════════════════════════ */
  var statNumbers = document.querySelectorAll('.stat-number[data-target], .counter[data-target]');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statsObserver.unobserve(entry.target);
        animateCounter(entry.target);
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      statsObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
    var duration = 2000;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;
      el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.round(current)) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════
     5. SCROLL FADE-IN
  ═══════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    var fadeTargets = document.querySelectorAll(
      '.service-project, .testimonial-card, .feature-card, .counter-item, .title-area-left, .about-grid, .contact-grid'
    );

    fadeTargets.forEach(function (el) {
      el.classList.add('fade-in-hidden');
    });

    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var parent = entry.target.parentElement;
        var siblings = parent ? Array.from(parent.children) : [];
        var idx = siblings.indexOf(entry.target);
        var delay = Math.min(idx * 80, 400);

        setTimeout(function () {
          entry.target.classList.remove('fade-in-hidden');
          entry.target.classList.add('fade-in-visible');
        }, delay);

        fadeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    fadeTargets.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ═══════════════════════════════════════════
     5B. SERVICE CARDS FLY-IN FROM BOTTOM-RIGHT
  ═══════════════════════════════════════════ */
  var serviceCards = document.querySelectorAll('.service-card');

  if (serviceCards.length && 'IntersectionObserver' in window) {
    serviceCards.forEach(function (card) {
      card.classList.add('service-fly-in');
    });

    var serviceObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var parent = entry.target.parentElement;
        var siblings = parent ? Array.from(parent.children) : [];
        var idx = siblings.indexOf(entry.target);
        var delay = Math.min(idx * 100, 800);

        setTimeout(function () {
          entry.target.classList.add('fly-in-visible');
        }, delay);

        serviceObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    serviceCards.forEach(function (card) {
      serviceObserver.observe(card);
    });
  }

  /* ═══════════════════════════════════════════
     5C. REVIEW CARDS FLY-IN FROM BOTTOM
  ═══════════════════════════════════════════ */
  var reviewCards = document.querySelectorAll('.review-card');

  if (reviewCards.length && 'IntersectionObserver' in window) {
    reviewCards.forEach(function (card) {
      card.classList.add('review-fly-in');
    });

    var reviewObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var parent = entry.target.parentElement;
        var siblings = parent ? Array.from(parent.children) : [];
        var idx = siblings.indexOf(entry.target);
        var delay = idx * 150;

        setTimeout(function () {
          entry.target.classList.add('fly-in-visible');
        }, delay);

        reviewObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reviewCards.forEach(function (card) {
      reviewObserver.observe(card);
    });
  }

  /* ═══════════════════════════════════════════
     5D. ABOUT IMAGE FLY-IN
  ═══════════════════════════════════════════ */
  var flyInTargets = document.querySelectorAll('.about-img-fly-in');

  if (flyInTargets.length && 'IntersectionObserver' in window) {
    var flyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fly-in-visible');
        flyObserver.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    flyInTargets.forEach(function (el) {
      flyObserver.observe(el);
    });
  }

  /* ═══════════════════════════════════════════
     6. DYNAMIC FOOTER YEAR
  ═══════════════════════════════════════════ */
  var yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ═══════════════════════════════════════════
     7. CONTACT FORM VALIDATION & SUBMISSION
  ═══════════════════════════════════════════ */
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var successMsg = document.getElementById('form-success');
  var errorMsg = document.getElementById('form-error');

  if (!form) return;

  // Stamp page_url + form_rendered_at on render so the n8n time-trap can
  // verify the visitor took at least 3 seconds to fill the form.
  var pageUrlField = form.querySelector('input[name="page_url"]');
  var renderedAtField = form.querySelector('input[name="form_rendered_at"]');
  if (pageUrlField) pageUrlField.value = location.href;
  if (renderedAtField) renderedAtField.value = String(Date.now());

  ['contact-name', 'contact-email', 'contact-phone', 'contact-message'].forEach(function (id) {
    var field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('input', function () {
      clearError(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      showSuccess();
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    // Capture the lead values now in case we need a mailto: fallback.
    var name = document.getElementById('contact-name').value.trim();
    var email = document.getElementById('contact-email').value.trim();
    var phone = document.getElementById('contact-phone').value.trim();
    var message = document.getElementById('contact-message').value.trim();

    // Build a JSON body so the n8n webhook gets a clean object.
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    // 6-second timeout via AbortController for cross-browser support.
    var controller = new AbortController();
    var timeoutId = setTimeout(function () { controller.abort(); }, 6000);

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal
    })
      .then(function (res) {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Server error: ' + res.status);
        showSuccess();
      })
      .catch(function () {
        clearTimeout(timeoutId);
        setLoading(false);
        showServerError(name, email, phone, message);
      });
  });

  function validateForm() {
    var valid = true;

    var nameField = document.getElementById('contact-name');
    var emailField = document.getElementById('contact-email');
    var phoneField = document.getElementById('contact-phone');
    var messageField = document.getElementById('contact-message');

    if (!nameField.value.trim()) {
      showError(nameField, 'err-name', 'Please enter your name.');
      valid = false;
    }

    if (!emailField.value.trim()) {
      showError(emailField, 'err-email', 'Please enter your email address.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
      showError(emailField, 'err-email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!phoneField.value.trim()) {
      showError(phoneField, 'err-phone', 'Please enter your phone number.');
      valid = false;
    } else {
      var cleaned = phoneField.value.replace(/\D/g, '');
      if (cleaned.length < 8 || cleaned.length > 12) {
        showError(phoneField, 'err-phone', 'Please enter a valid phone number.');
        valid = false;
      }
    }

    return valid;
  }

  function showError(field, errorId, message) {
    field.classList.add('has-error');
    var errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(field) {
    field.classList.remove('has-error');
    var errorId = field.getAttribute('aria-describedby');
    var errorEl = errorId ? document.getElementById(errorId) : null;
    if (errorEl) errorEl.textContent = '';
  }

  function setLoading(loading) {
    var defaultText = submitBtn.querySelector('.btn-default-text');
    var loadingText = submitBtn.querySelector('.btn-loading-text');
    submitBtn.disabled = loading;
    if (defaultText) defaultText.hidden = loading;
    if (loadingText) loadingText.hidden = !loading;
  }

  function showSuccess() {
    setLoading(false);
    form.reset();
    form.hidden = true;
    if (successMsg) successMsg.hidden = false;
    if (errorMsg) errorMsg.hidden = true;
  }

  function showServerError(name, email, phone, message) {
    // Build a mailto: fallback so the lead isn't lost if the webhook fails.
    var mailto = document.getElementById('mailto-fallback');
    if (mailto) {
      var notifyEmailField = form.querySelector('input[name="notify_email"]');
      var notifyEmail = notifyEmailField ? notifyEmailField.value : '';
      var subject = encodeURIComponent('Website enquiry from ' + (name || ''));
      var bodyText = 'Name: ' + (name || '') + '\nEmail: ' + (email || '') + '\nPhone: ' + (phone || '') + '\n\n' + (message || '');
      mailto.href = 'mailto:' + notifyEmail + '?subject=' + subject + '&body=' + encodeURIComponent(bodyText);
    }
    form.hidden = true;
    if (errorMsg) errorMsg.hidden = false;
    if (successMsg) successMsg.hidden = true;
  }

})();
