/**
 * monetization.js
 * Simplified Monetization Manager (Premium features unlocked for everyone, ads disabled)
 */

class LoveMonetizationManager {
  constructor() {
    // All premium features are unlocked by default
    this.isPremium = true;
    this.dailyGenerations = {
      date: new Date().toDateString(),
      count: 0
    };
  }

  checkDayReset() {
    // No-op
  }

  saveGenerations() {
    // No-op
  }

  setPremium(status) {
    // No-op
  }

  canGenerate() {
    return true; // Always allow generation
  }

  incrementGeneration() {
    return 0;
  }

  getRemainingGenerations() {
    return Infinity;
  }

  updateAdsVisibility() {
    // Hide all ads
    const ads = document.querySelectorAll('.ad-banner, .ad-inline');
    ads.forEach(ad => {
      ad.style.display = 'none';
    });
  }

  /**
   * No-op interstitial ad simulation (runs callback immediately with no display)
   */
  triggerInterstitialAd(container, onAdComplete) {
    if (onAdComplete) onAdComplete();
  }
}

window.LoveMonetizationManager = LoveMonetizationManager;
