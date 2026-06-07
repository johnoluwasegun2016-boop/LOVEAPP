/**
 * calendar.js (Expanded)
 * Relationship Calendar, Countdowns, and Memories Timeline manager
 */

class RelationshipCalendarManager {
  constructor() {
    this.dates = window.safeJsonParse(window.safeStorage.getItem('love_calendar_dates'), {
      firstMeeting: "2024-02-14",
      anniversary: "2024-06-05", 
      birthday: "1998-10-12",
      weddingDay: "2027-08-28", // Seed a default Wedding Day countdown!
      customEvents: []
    });
    
    this.memories = window.safeJsonParse(window.safeStorage.getItem('love_memories'), [
      { id: "m1", title: "First Coffee Date ☕", date: "2024-02-14", desc: "We talked for three hours straight and forgot to drink our coffee. Best day ever.", mood: "romantic" },
      { id: "m2", title: "Our First Road Trip 🚗", date: "2024-08-20", desc: "Got lost in the mountains, but we listened to our favorite playlists and sang along.", mood: "happy" },
      { id: "m3", title: "Anniversary Celebration 🌹", date: "2025-06-05", desc: "Fine dining and sharing memories. Celebrating one beautiful year together.", mood: "celebrating" }
    ]);
  }

  saveDates() {
    window.safeStorage.setItem('love_calendar_dates', JSON.stringify(this.dates));
  }

  saveMemories() {
    window.safeStorage.setItem('love_memories', JSON.stringify(this.memories));
  }

  updateCoreDate(type, dateStr) {
    if (this.dates.hasOwnProperty(type)) {
      this.dates[type] = dateStr;
      this.saveDates();
      return true;
    }
    return false;
  }

  addCustomEvent(title, dateStr, type = "anniversary") {
    const newEvent = {
      id: "ev_" + Date.now(),
      title,
      date: dateStr,
      type
    };
    this.dates.customEvents.push(newEvent);
    this.saveDates();
    return newEvent;
  }

  deleteCustomEvent(id) {
    this.dates.customEvents = this.dates.customEvents.filter(ev => ev.id !== id);
    this.saveDates();
  }

  addMemory(title, dateStr, desc, mood) {
    const newMemory = {
      id: "mem_" + Date.now(),
      title,
      date: dateStr,
      desc,
      mood: mood || "happy"
    };
    this.memories.push(newMemory);
    this.memories.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.saveMemories();
    return newMemory;
  }

  deleteMemory(id) {
    this.memories = this.memories.filter(m => m.id !== id);
    this.saveMemories();
  }

  getRelationshipLength() {
    const startDate = new Date(this.dates.firstMeeting || this.dates.anniversary);
    const today = new Date();
    
    let diffTime = Math.abs(today - startDate);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();
    
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return {
      years,
      months,
      days,
      totalDays
    };
  }

  getCountdownDays(dateStr) {
    const targetDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let targetAnniversary = new Date(today.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    if (targetAnniversary < today) {
      targetAnniversary.setFullYear(today.getFullYear() + 1);
    }
    
    // For fixed future dates (like a future Wedding day)
    const fixedFuture = new Date(dateStr);
    fixedFuture.setHours(0, 0, 0, 0);
    
    const useDate = fixedFuture > today ? fixedFuture : targetAnniversary;
    
    const diffTime = useDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  
  getUpcomingEvents() {
    const list = [
      { name: "Anniversary", date: this.dates.anniversary, icon: "🌹" },
      { name: "First Meeting", date: this.dates.firstMeeting, icon: "💑" },
      { name: "Partner's Birthday", date: this.dates.birthday, icon: "🎂" }
    ];

    // Add Valentine's Day
    const today = new Date();
    let valYear = today.getFullYear();
    if (today.getMonth() > 1 || (today.getMonth() === 1 && today.getDate() > 14)) {
      valYear++;
    }
    list.push({ name: "Valentine's Day", date: `${valYear}-02-14`, icon: "💝" });

    // Add Wedding Day countdown if configured
    if (this.dates.weddingDay) {
      list.push({ name: "Wedding Day", date: this.dates.weddingDay, icon: "💍" });
    }
    
    this.dates.customEvents.forEach(ev => {
      list.push({ name: ev.title, date: ev.date, icon: ev.type === "birthday" ? "🎂" : "💖" });
    });
    
    return list.map(ev => ({
      ...ev,
      daysLeft: this.getCountdownDays(ev.date)
    })).sort((a, b) => a.daysLeft - b.daysLeft);
  }
}

window.RelationshipCalendarManager = RelationshipCalendarManager;
