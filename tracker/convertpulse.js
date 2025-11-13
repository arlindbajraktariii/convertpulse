/**
 * Guesswhere Analytics Tracker
 * Lightweight JavaScript snippet for tracking user behavior
 * Usage: <script src="guesswhere.min.js" data-site-id="YOUR_API_KEY"></script>
 */

(function() {
  'use strict';

  // Configuration
  const API_ENDPOINT = 'http://localhost:5000/api/events';
  const BATCH_SIZE = 10;
  const BATCH_INTERVAL = 5000; // 5 seconds

  // Get site ID from script tag
  const script = document.currentScript || document.querySelector('script[data-site-id]');
  const SITE_ID = script ? script.getAttribute('data-site-id') : null;

  if (!SITE_ID) {
    console.error('Guesswhere: Missing data-site-id attribute');
    return;
  }

  // Generate session ID
  const SESSION_ID = 'cp_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();

  // Event queue for batching
  let eventQueue = [];
  let pageLoadTime = Date.now();
  let maxScrollDepth = 0;
  let isExiting = false;

  /**
   * Send event to API
   */
  function sendEvent(eventType, section, value) {
    const event = {
      siteId: SITE_ID,
      eventType,
      section,
      value,
      sessionId: SESSION_ID,
      pageUrl: window.location.href,
      timestamp: new Date().toISOString()
    };

    eventQueue.push(event);

    // Send batch if queue is full
    if (eventQueue.length >= BATCH_SIZE) {
      flushEvents();
    }
  }

  /**
   * Flush event queue to API
   */
  function flushEvents() {
    if (eventQueue.length === 0) return;

    const events = [...eventQueue];
    eventQueue = [];

    // Use sendBeacon for reliable delivery (especially on page unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify({ siteId: SITE_ID, events })], {
        type: 'application/json'
      });
      navigator.sendBeacon(API_ENDPOINT + '/batch', blob);
    } else {
      // Fallback to fetch
      fetch(API_ENDPOINT + '/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: SITE_ID, events }),
        keepalive: true
      }).catch(err => console.error('Guesswhere: Error sending events', err));
    }
  }

  /**
   * Track scroll depth
   */
  function trackScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = Math.min(scrollPercent, 100);
      sendEvent('scroll', null, maxScrollDepth);
    }
  }

  /**
   * Track clicks on elements
   */
  function trackClick(event) {
    const target = event.target;
    
    // Identify the element
    let elementId = target.id || 
                    target.className || 
                    target.tagName.toLowerCase();
    
    // Check for common CTA attributes
    if (target.hasAttribute('data-track')) {
      elementId = target.getAttribute('data-track');
    } else if (target.textContent) {
      elementId = target.textContent.trim().substring(0, 50);
    }

    // Track buttons, links, and elements with data-track attribute
    if (
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' || 
      target.hasAttribute('data-track') ||
      target.classList.contains('cta') ||
      target.classList.contains('btn')
    ) {
      sendEvent('click', elementId, 1);
    }
  }

  /**
   * Track time on page
   */
  function trackTimeOnPage() {
    const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000); // in seconds
    sendEvent('time', null, timeSpent);
  }

  /**
   * Track pageview
   */
  function trackPageview() {
    sendEvent('pageview', null, 1);
  }

  /**
   * Initialize tracking
   */
  function init() {
    // Track initial pageview
    trackPageview();

    // Track scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScroll, 100);
    }, { passive: true });

    // Track clicks
    document.addEventListener('click', trackClick, true);

    // Track time on page before exit
    window.addEventListener('beforeunload', function() {
      if (!isExiting) {
        isExiting = true;
        trackTimeOnPage();
        flushEvents();
      }
    });

    // Track visibility changes (tab switches)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        trackTimeOnPage();
        flushEvents();
      }
    });

    // Periodic batch send
    setInterval(flushEvents, BATCH_INTERVAL);

    // Initial scroll tracking
    setTimeout(trackScroll, 1000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose public API
  window.Guesswhere = {
    track: sendEvent,
    flush: flushEvents
  };
})();
