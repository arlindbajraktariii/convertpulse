/**
 * Guesswhere Analytics Tracker
 * Lightweight tracking script for landing page analytics
 */

(function() {
  'use strict';

  // Get site ID from script tag
  const script = document.currentScript || document.querySelector('script[data-site]');
  const siteId = script ? script.getAttribute('data-site') : null;
  
  if (!siteId) {
    console.warn('Guesswhere: No site ID found');
    return;
  }

  const API_URL = 'http://localhost:5000/api/track';
  const sessionId = getOrCreateSessionId();
  const pageData = {
    siteId,
    sessionId,
    url: window.location.href,
    pathname: window.location.pathname,
    referrer: document.referrer,
    timestamp: Date.now()
  };

  // ========== SESSION MANAGEMENT ==========
  function getOrCreateSessionId() {
    const key = `cp_session_${siteId}`;
    let session = sessionStorage.getItem(key);
    
    if (!session) {
      session = generateId();
      sessionStorage.setItem(key, session);
    }
    
    return session;
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // ========== 1. PAGE PERFORMANCE TRACKING ==========
  const performanceData = {
    ttfb: 0,
    domReady: 0,
    totalLoad: 0,
    pageSize: 0,
    requestCount: 0,
    lazyImages: 0,
    lcp: 0,
    cls: 0,
    fid: 0
  };

  function trackPerformance() {
    if (!window.performance) return;

    const perf = performance.getEntriesByType('navigation')[0];
    if (perf) {
      performanceData.ttfb = Math.round(perf.responseStart - perf.requestStart);
      performanceData.domReady = Math.round(perf.domContentLoadedEventEnd - perf.fetchStart);
      performanceData.totalLoad = Math.round(perf.loadEventEnd - perf.fetchStart);
    }

    // Count resources
    const resources = performance.getEntriesByType('resource');
    performanceData.requestCount = resources.length;
    performanceData.pageSize = Math.round(
      resources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024
    );

    // Detect lazy-loaded images
    performanceData.lazyImages = document.querySelectorAll('img[loading="lazy"]').length;

    // Core Web Vitals
    trackWebVitals();
  }

  function trackWebVitals() {
    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          performanceData.lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {}

      // CLS - Cumulative Layout Shift
      try {
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          }
          performanceData.cls = Math.round(clsScore * 1000) / 1000;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {}

      // FID - First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          performanceData.fid = Math.round(entries[0].processingStart - entries[0].startTime);
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {}
    }
  }

  // ========== 2. USER ENGAGEMENT METRICS ==========
  const engagementData = {
    timeOnPage: 0,
    scrollDepth: 0,
    maxScrollDepth: 0,
    ctaClicks: 0,
    totalClicks: 0,
    bounced: true
  };

  let startTime = Date.now();
  let isActive = true;
  let lastScrollTime = Date.now();

  // Track time on page
  function updateTimeOnPage() {
    if (isActive) {
      engagementData.timeOnPage = Math.round((Date.now() - startTime) / 1000);
    }
  }

  setInterval(updateTimeOnPage, 1000);

  // Track scroll depth
  function trackScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    engagementData.scrollDepth = Math.min(100, Math.max(0, scrollPercent));
    
    if (engagementData.scrollDepth > engagementData.maxScrollDepth) {
      engagementData.maxScrollDepth = engagementData.scrollDepth;
    }

    // Mark as not bounced if scrolled more than 25%
    if (engagementData.maxScrollDepth > 25) {
      engagementData.bounced = false;
    }

    lastScrollTime = Date.now();
  }

  window.addEventListener('scroll', debounce(trackScroll, 100));

  // Track clicks
  function trackClick(event) {
    engagementData.totalClicks++;
    engagementData.bounced = false;

    const target = event.target.closest('a, button, [role="button"], input[type="submit"]');
    if (!target) return;

    const isCTA = isCTAElement(target);
    if (isCTA) {
      engagementData.ctaClicks++;
      
      // Track conversion event
      sendEvent('cta_click', {
        element: target.tagName.toLowerCase(),
        text: target.textContent.trim().substring(0, 50),
        href: target.href || '',
        id: target.id || '',
        class: target.className || ''
      });
    }
  }

  function isCTAElement(element) {
    const text = element.textContent.toLowerCase();
    const ctaKeywords = ['buy', 'purchase', 'subscribe', 'sign up', 'get started', 
                         'download', 'contact', 'submit', 'register', 'join', 'book'];
    
    return ctaKeywords.some(keyword => text.includes(keyword)) ||
           element.type === 'submit' ||
           element.classList.contains('cta') ||
           element.classList.contains('btn-primary');
  }

  document.addEventListener('click', trackClick);

  // ========== 3. CONVERSION TRACKING ==========
  const conversionData = {
    formSubmissions: 0,
    navigationClicks: 0,
    conversionEvents: []
  };

  // Track form submissions
  function trackFormSubmit(event) {
    conversionData.formSubmissions++;
    engagementData.bounced = false;
    
    sendEvent('form_submit', {
      formId: event.target.id || '',
      formAction: event.target.action || '',
      fields: event.target.elements.length
    });
  }

  document.addEventListener('submit', trackFormSubmit);

  // Track navigation clicks
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && link.href && !link.href.startsWith('#')) {
      conversionData.navigationClicks++;
    }
  });

  // ========== 4. DESIGN/UX DIAGNOSTICS ==========
  const uxIssues = {
    missingAltTags: 0,
    longParagraphs: 0,
    brokenLinks: [],
    slowMedia: 0,
    outboundLinks: 0,
    ctaCount: 0
  };

  function analyzeUX() {
    // Missing alt tags
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt || img.alt.trim() === '') {
        uxIssues.missingAltTags++;
      }
    });

    // Long paragraphs
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p.textContent.length > 500) {
        uxIssues.longParagraphs++;
      }
    });

    // Outbound links
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.hostname !== window.location.hostname) {
          uxIssues.outboundLinks++;
        }
      } catch (e) {}
    });

    // CTA count
    uxIssues.ctaCount = document.querySelectorAll('button, [role="button"], input[type="submit"], a.cta, .btn-primary').length;

    // Slow media
    if (window.performance) {
      const resources = performance.getEntriesByType('resource');
      resources.forEach(resource => {
        if ((resource.initiatorType === 'img' || resource.initiatorType === 'video') && 
            resource.duration > 2000) {
          uxIssues.slowMedia++;
        }
      });
    }
  }

  // ========== 5. DEVICE & GEO DATA ==========
  const deviceData = {
    userAgent: navigator.userAgent,
    deviceType: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';
    return 'Other';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Other';
  }

  // ========== UTILITY FUNCTIONS ==========
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function sendEvent(eventType, data = {}) {
    const eventData = {
      ...pageData,
      eventType,
      eventData: data,
      timestamp: Date.now()
    };

    navigator.sendBeacon(`${API_URL}/event`, JSON.stringify(eventData));
  }

  function sendPageView() {
    const payload = {
      ...pageData,
      performance: performanceData,
      engagement: engagementData,
      conversion: conversionData,
      device: deviceData,
      uxIssues: uxIssues
    };

    // Send via fetch with keepalive
    fetch(`${API_URL}/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {
      // Fallback to sendBeacon
      navigator.sendBeacon(`${API_URL}/pageview`, JSON.stringify(payload));
    });
  }

  // ========== INITIALIZATION ==========
  function init() {
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          trackPerformance();
          analyzeUX();
          trackScroll();
        }, 1000);
      });
    } else {
      setTimeout(() => {
        trackPerformance();
        analyzeUX();
        trackScroll();
      }, 1000);
    }

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isActive = false;
        sendPageView();
      } else {
        isActive = true;
        startTime = Date.now() - (engagementData.timeOnPage * 1000);
      }
    });

    // Send data before page unload
    window.addEventListener('beforeunload', () => {
      updateTimeOnPage();
      sendPageView();
    });

    // Send initial pageview after 3 seconds
    setTimeout(sendPageView, 3000);

    // Send periodic updates every 30 seconds
    setInterval(() => {
      if (isActive) {
        sendPageView();
      }
    }, 30000);
  }

  init();

  // Expose public API
  window.Guesswhere = {
    trackEvent: sendEvent,
    trackConversion: (name, value) => {
      sendEvent('conversion', { name, value });
    }
  };

})();
