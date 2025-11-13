const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Site = require('../models/Site');
const auth = require('../middleware/auth');

const PageView = require('../models/PageView');

// GET /api/stats/:siteId - Get comprehensive stats for a site
router.get('/:siteId', auth, async (req, res) => {
  try {
    const { siteId } = req.params;
    const { timeframe = '7d' } = req.query;

    // Verify user owns this site
    const site = await Site.findOne({ apiKey: siteId, userId: req.userId });
    if (!site) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeframe) {
      case '24h':
        startDate.setHours(now.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Get all pageviews and events for the timeframe
    const pageViews = await PageView.find({
      siteId: site._id,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: 1 });

    const events = await Event.find({
      siteId: site._id,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: 1 });

    // Calculate scroll depth statistics
    const scrollEvents = events.filter(e => e.eventType === 'scroll');
    const scrollDepths = scrollEvents.map(e => parseFloat(e.value));
    const avgScrollDepth = scrollDepths.length > 0
      ? scrollDepths.reduce((a, b) => a + b, 0) / scrollDepths.length
      : 0;

    // Calculate scroll depth distribution
    const scrollDistribution = {
      '0-25%': 0,
      '25-50%': 0,
      '50-75%': 0,
      '75-100%': 0
    };

    scrollDepths.forEach(depth => {
      if (depth <= 25) scrollDistribution['0-25%']++;
      else if (depth <= 50) scrollDistribution['25-50%']++;
      else if (depth <= 75) scrollDistribution['50-75%']++;
      else scrollDistribution['75-100%']++;
    });

    // Calculate top clicked buttons
    const clickEvents = events.filter(e => e.eventType === 'click');
    const clickCounts = {};
    
    clickEvents.forEach(e => {
      const element = e.section || 'unknown';
      clickCounts[element] = (clickCounts[element] || 0) + 1;
    });

    const topClicks = Object.entries(clickCounts)
      .map(([element, count]) => ({ element, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate average time on page
    const timeEvents = events.filter(e => e.eventType === 'time');
    const times = timeEvents.map(e => parseFloat(e.value));
    const avgTimeOnPage = times.length > 0
      ? times.reduce((a, b) => a + b, 0) / times.length
      : 0;

    // Calculate drop-off sections
    const sectionViews = {};
    events.forEach(e => {
      if (e.section) {
        sectionViews[e.section] = (sectionViews[e.section] || 0) + 1;
      }
    });

    const dropoffSections = Object.entries(sectionViews)
      .map(([section, views]) => ({ section, views }))
      .sort((a, b) => a.views - b.views)
      .slice(0, 5);

    // Calculate pageviews and unique sessions
    const pageviews = events.filter(e => e.eventType === 'pageview').length;
    const uniqueSessions = new Set(events.map(e => e.sessionId).filter(Boolean)).size;

    // Daily breakdown
    const dailyStats = {};
    events.forEach(e => {
      const date = e.timestamp.toISOString().split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = {
          date,
          pageviews: 0,
          clicks: 0,
          avgScrollDepth: []
        };
      }
      
      if (e.eventType === 'pageview') dailyStats[date].pageviews++;
      if (e.eventType === 'click') dailyStats[date].clicks++;
      if (e.eventType === 'scroll') dailyStats[date].avgScrollDepth.push(parseFloat(e.value));
    });

    const dailyBreakdown = Object.values(dailyStats).map(day => ({
      date: day.date,
      pageviews: day.pageviews,
      clicks: day.clicks,
      avgScrollDepth: day.avgScrollDepth.length > 0
        ? day.avgScrollDepth.reduce((a, b) => a + b, 0) / day.avgScrollDepth.length
        : 0
    }));

    // === NEW COMPREHENSIVE STATS ===
    
    // 1. Performance Metrics
    const performanceMetrics = {
      avgTTFB: 0,
      avgDomReady: 0,
      avgTotalLoad: 0,
      avgPageSize: 0,
      avgLCP: 0,
      avgCLS: 0,
      avgFID: 0
    };

    if (pageViews.length > 0) {
      performanceMetrics.avgTTFB = Math.round(pageViews.reduce((sum, pv) => sum + (pv.ttfb || 0), 0) / pageViews.length);
      performanceMetrics.avgDomReady = Math.round(pageViews.reduce((sum, pv) => sum + (pv.domReady || 0), 0) / pageViews.length);
      performanceMetrics.avgTotalLoad = Math.round(pageViews.reduce((sum, pv) => sum + (pv.totalLoad || 0), 0) / pageViews.length);
      performanceMetrics.avgPageSize = Math.round(pageViews.reduce((sum, pv) => sum + (pv.pageSize || 0), 0) / pageViews.length);
      performanceMetrics.avgLCP = Math.round(pageViews.reduce((sum, pv) => sum + (pv.lcp || 0), 0) / pageViews.length);
      performanceMetrics.avgCLS = Math.round((pageViews.reduce((sum, pv) => sum + (pv.cls || 0), 0) / pageViews.length) * 1000) / 1000;
      performanceMetrics.avgFID = Math.round(pageViews.reduce((sum, pv) => sum + (pv.fid || 0), 0) / pageViews.length);
    }

    // 2. Engagement Metrics
    const engagementMetrics = {
      avgTimeOnPage: 0,
      avgScrollDepth: 0,
      totalCTAClicks: 0,
      bounceRate: 0,
      conversionRate: 0
    };

    if (pageViews.length > 0) {
      engagementMetrics.avgTimeOnPage = Math.round(pageViews.reduce((sum, pv) => sum + (pv.timeOnPage || 0), 0) / pageViews.length);
      engagementMetrics.avgScrollDepth = Math.round(pageViews.reduce((sum, pv) => sum + (pv.scrollDepth || 0), 0) / pageViews.length);
      engagementMetrics.totalCTAClicks = pageViews.reduce((sum, pv) => sum + (pv.ctaClicks || 0), 0);
      
      const bouncedViews = pageViews.filter(pv => pv.bounced).length;
      engagementMetrics.bounceRate = Math.round((bouncedViews / pageViews.length) * 100);
      
      const conversions = pageViews.filter(pv => pv.formSubmissions > 0 || pv.ctaClicks > 0).length;
      engagementMetrics.conversionRate = Math.round((conversions / pageViews.length) * 100);
    }

    // 3. Device & Browser Breakdown
    const deviceBreakdown = {};
    const browserBreakdown = {};
    const osBreakdown = {};
    
    pageViews.forEach(pv => {
      deviceBreakdown[pv.deviceType] = (deviceBreakdown[pv.deviceType] || 0) + 1;
      browserBreakdown[pv.browser] = (browserBreakdown[pv.browser] || 0) + 1;
      osBreakdown[pv.os] = (osBreakdown[pv.os] || 0) + 1;
    });

    // 4. Geo Breakdown (mock data for now - implement with IP geolocation later)
    const geoBreakdown = {
      'United States': Math.floor(pageViews.length * 0.35),
      'United Kingdom': Math.floor(pageViews.length * 0.15),
      'Canada': Math.floor(pageViews.length * 0.12),
      'Germany': Math.floor(pageViews.length * 0.10),
      'France': Math.floor(pageViews.length * 0.08)
    };

    // 5. UX Issues Summary
    const uxIssues = {
      totalMissingAltTags: 0,
      totalLongParagraphs: 0,
      totalSlowMedia: 0,
      avgCTACount: 0,
      avgOutboundLinks: 0
    };

    if (pageViews.length > 0) {
      uxIssues.totalMissingAltTags = pageViews.reduce((sum, pv) => sum + (pv.missingAltTags || 0), 0);
      uxIssues.totalLongParagraphs = pageViews.reduce((sum, pv) => sum + (pv.longParagraphs || 0), 0);
      uxIssues.totalSlowMedia = pageViews.reduce((sum, pv) => sum + (pv.slowMedia || 0), 0);
      uxIssues.avgCTACount = Math.round(pageViews.reduce((sum, pv) => sum + (pv.ctaCount || 0), 0) / pageViews.length);
      uxIssues.avgOutboundLinks = Math.round(pageViews.reduce((sum, pv) => sum + (pv.outboundLinks || 0), 0) / pageViews.length);
    }

    // 6. Conversion Funnel
    const totalVisitors = uniqueSessions;
    const totalCTAClicks = events.filter(e => e.eventType === 'cta_click').length;
    const totalFormSubmits = events.filter(e => e.eventType === 'form_submit').length;
    
    const conversionFunnel = {
      visitors: totalVisitors,
      ctaClicks: totalCTAClicks,
      formSubmissions: totalFormSubmits,
      conversionRate: totalVisitors > 0 ? Math.round((totalFormSubmits / totalVisitors) * 100) : 0
    };

    // 7. Top Pages
    const pageStats = {};
    pageViews.forEach(pv => {
      if (!pageStats[pv.pathname]) {
        pageStats[pv.pathname] = {
          pathname: pv.pathname,
          views: 0,
          avgTimeOnPage: [],
          avgScrollDepth: []
        };
      }
      pageStats[pv.pathname].views++;
      pageStats[pv.pathname].avgTimeOnPage.push(pv.timeOnPage || 0);
      pageStats[pv.pathname].avgScrollDepth.push(pv.scrollDepth || 0);
    });

    const topPages = Object.values(pageStats)
      .map(page => ({
        pathname: page.pathname,
        views: page.views,
        avgTimeOnPage: Math.round(page.avgTimeOnPage.reduce((a, b) => a + b, 0) / page.avgTimeOnPage.length),
        avgScrollDepth: Math.round(page.avgScrollDepth.reduce((a, b) => a + b, 0) / page.avgScrollDepth.length)
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    res.json({
      siteId,
      timeframe,
      summary: {
        pageviews: pageViews.length,
        uniqueSessions,
        avgScrollDepth: engagementMetrics.avgScrollDepth,
        avgTimeOnPage: engagementMetrics.avgTimeOnPage,
        bounceRate: engagementMetrics.bounceRate,
        conversionRate: engagementMetrics.conversionRate,
        totalEvents: events.length
      },
      performance: performanceMetrics,
      engagement: engagementMetrics,
      deviceBreakdown,
      browserBreakdown,
      osBreakdown,
      geoBreakdown,
      uxIssues,
      conversionFunnel,
      topPages,
      scrollDistribution,
      topClicks,
      dropoffSections,
      dailyBreakdown
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
