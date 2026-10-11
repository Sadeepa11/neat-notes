import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight, BookOpenText, ChartNoAxesCombined, Check, Heart,
  Mail, Menu, X, NotebookPen, PenLine, Sparkles, Star, MessageCircle,
  Phone, ChevronDown, ArrowRight, Clock, ShieldCheck,
  Send, Calculator, ChevronUp, Palette, FileCheck2,
  Receipt, Truck, Zap, AlertCircle, CheckCircle2, FileText, Book,
  MapPin, User, Package, Copy, ExternalLink, RefreshCw, Camera, Download
} from "lucide-react";
import html2canvas from "html2canvas";
import "./styles.css";

// Main Writing Categories (The 3 primary writing formats)
const WRITING_CATEGORIES = [
  {
    id: "normal",
    title: "Normal Writing",
    subTitle: "Single Colour (Blue / Black Pen)",
    shortName: "Normal Single Ink",
    emoji: "✍️",
    badge: "Clean & Simple",
    desc: "Single ink uniform handwriting (blue or black ink). Ruled or plain paper/books included.",
    features: [
      "Standard blue or black ballpoint/gel pen",
      "Clean margins & uniform line spacing",
      "Ruled or blank paper/books included"
    ]
  },
  {
    id: "coloured",
    title: "Coloured Writing",
    subTitle: "Multi-Colour Headings & Highlights",
    shortName: "Coloured & Headings",
    emoji: "🎨",
    badge: "Most Popular",
    desc: "Multi-colour ink with prominent titles, colored subheadings & highlighted key terms. Ruled or plain included.",
    features: [
      "Color-coded headings, subheadings & bullets",
      "Highlighter accents & boxed formulas",
      "Ruled or blank paper/books included"
    ]
  },
  {
    id: "diagrams",
    title: "With Diagrams & Graphs",
    subTitle: "Drawings, Mind Maps & Tables",
    shortName: "Diagrams & Sketches",
    emoji: "📐",
    badge: "Detailed Work",
    desc: "Hand-drawn figures, scientific illustrations, flowcharts, graphs & mind maps. Ruled or plain included.",
    features: [
      "Neat scientific, anatomical & technical diagrams",
      "Labelled graphs, tables & flowcharts",
      "Ruled or blank paper/books included"
    ]
  }
];

// Page Sizes with Per-Category Rates (Paper & Book included in rate)
const PAGE_SIZES = [
  {
    id: "a4",
    title: "A4 Size",
    subTitle: "Standard A4 Sheets or Notebooks",
    shortName: "A4 Size",
    emoji: "📄",
    badge: "Standard A4",
    desc: "Standard 210 × 297 mm loose sheets or A4 books. Perfect for university assignments & lecture notes.",
    rates: {
      normal: 25,
      coloured: 35,
      diagrams: 45
    }
  },
  {
    id: "cr",
    title: "CR Size",
    subTitle: "Standard CR Exercise Book or Sheets",
    shortName: "CR Size",
    emoji: "📘",
    badge: "CR Exercise Book",
    desc: "Standard Sri Lankan CR exercise book or CR pages. Ideal for school & tuition full-subject notes.",
    rates: {
      normal: 25,
      coloured: 35,
      diagrams: 45
    }
  },
  {
    id: "a5",
    title: "A5 / Half-Sheet Size",
    subTitle: "Compact Notes or Half-Sheet Pages",
    shortName: "A5 / Half-Sheet",
    emoji: "📝",
    badge: "Compact A5",
    desc: "Compact 148 × 210 mm pages or half sheets. Great for pocket summaries, revision cards & short notes.",
    rates: {
      normal: 15,
      coloured: 25,
      diagrams: 35
    }
  }
];

const services = [
  {
    id: "notes",
    category: "Notes",
    icon: <NotebookPen size={24} />,
    title: "Handwritten Notes & Summaries",
    badge: "Rs. 20 - 30 / page",
    text: "Neat, crisp, and high-legibility handwritten study notes, lecture summaries, and textbook outlines.",
    features: ["Color-coded key points", "Structured headings & bullets", "Physical hard copy courier delivery"],
    estTime: "1 - 2 Days"
  },
  {
    id: "letters",
    category: "Letters",
    icon: <BookOpenText size={24} />,
    title: "Letters & Special Messages",
    badge: "Personal Touch",
    text: "Thoughtful personal letters, anniversary wishes, thank-you cards, and heartfelt handwritten keepsakes.",
    features: ["Aesthetic cursive or print", "Premium paper styling", "Custom envelopes & ribbon decor"],
    estTime: "1 Day"
  },
  {
    id: "graphs",
    category: "Diagrams",
    icon: <ChartNoAxesCombined size={24} />,
    title: "Graphs, Charts & Diagrams",
    badge: "Rs. 40 - 50 / page",
    text: "Clean, tidy science and math graphs, biological diagrams, and structured flowcharts drawn with care.",
    features: ["Accurate scale & labels", "Neat ink lines & shading", "Organized layout"],
    estTime: "1 - 3 Days"
  },
  {
    id: "custom",
    category: "Custom",
    icon: <PenLine size={24} />,
    title: "Custom Writing & Assignments",
    badge: "Tailored to You",
    text: "Have a unique idea, special notebook project, journal entries, or custom assignment? We'll make it happen.",
    features: ["Custom ink colors & pens", "Flexible formatting", "Direct friendly consultation"],
    estTime: "Flexible"
  }
];

const categories = ["All", "Notes", "Letters", "Diagrams", "Custom"];

const steps = [
  {
    number: "01",
    title: "Calculate & Place Order",
    description: "Select your writing style, pages, paper or book format. Calculate your bill and keep a screenshot for verification.",
    tag: "Live Calculation"
  },
  {
    number: "02",
    title: "Send Notes & 50% Advance",
    description: "Send your content/notes via WhatsApp (+94 76 329 6496) and pay the 50% advance to confirm your order slot.",
    tag: "50% Advance"
  },
  {
    number: "03",
    title: "Courier Delivery to Your Door",
    description: "We neatly write your pages and dispatch the physical hard copy islandwide by courier.",
    tag: "Islandwide Delivery"
  }
];

const perks = [
  {
    icon: <Star size={20} />,
    title: "Crystal-Clear Handwriting",
    desc: "100% human-written with consistent, neat lettering that is a joy to read."
  },
  {
    icon: <Clock size={20} />,
    title: "On-Time Delivery",
    desc: "Strictly adhere to your deadlines with optional +50% urgent rush handling."
  },
  {
    icon: <Palette size={20} />,
    title: "Aesthetic Layouts",
    desc: "Pleasing highlight accents, clean margins, and balanced spacing."
  },
  {
    icon: <Truck size={20} />,
    title: "Islandwide Courier",
    desc: "Carefully packaged hard copies delivered safely across Sri Lanka."
  }
];

const faqs = [
  {
    q: "How does the pricing work for pages and books/paper?",
    a: "Writing cost is calculated per page: Normal writing is Rs. 20/page, Colored Headings Rs. 30/page, and Diagrams/Graphs Rs. 40-50/page. In addition, papers and books price add වෙනවා (මිල ගණන් වෙනස් විය හැකි බැවින් කොළ සහ පොත් සඳහා මිල වෙළඳපොළ මිල අනුව වෙනම එකතු කරනු ලැබේ, නැතහොත් ඔබ විසින් පොත්/කොළ ලබා දිය හැක)."
  },
  {
    q: "Do you create original content or write assignments from scratch?",
    a: "No. Original content එකක් හදලා දෙන සේවාවක් නොවේ. Customer විසින් ලියන්න ඕන content/notes ලබා දිය යුතුයි. ලබාදෙන notes පමණක් පැහැදිලිව හා ලස්සනට පිටපත් කර ලියා දෙනු ලැබේ."
  },
  {
    q: "Why is a 50% advance payment required?",
    a: "Since every handwritten order requires dedicated physical materials and significant manual effort, a 50% advance payment is required to confirm your order and begin writing."
  },
  {
    q: "How are the completed notes delivered?",
    a: "All completed notes are delivered as physical hard copies islandwide via courier. Delivery charges are borne by the customer upon delivery."
  },
  {
    q: "How do I handle urgent orders?",
    a: "Urgent rush orders are accommodated with a +50% extra surcharge on the writing cost. Simply toggle the 'Urgent Order' option in the order calculator."
  }
];

const reviews = [
  {
    name: "Kavindi R.",
    role: "Medical Student",
    text: "My pharmacology notes were so neat and beautifully highlighted! It made memorizing 10x easier. Truly amazing work!",
    rating: 5
  },
  {
    name: "Dineth M.",
    role: "A/L Student",
    text: "Fast delivery and the handwriting was so uniform and clean. Everyone in my class asked where I got them written!",
    rating: 5
  },
  {
    name: "Shenali P.",
    role: "University Student",
    text: "Ordered a complete CR book for my chemistry lecture notes. Very neatly written with diagrams. Excellent islandwide courier delivery!",
    rating: 5
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);
  const [likesCount, setLikesCount] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [floatingHeart, setFloatingHeart] = useState(false);

  // Order & Calculation Form State
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [district, setDistrict] = useState("Colombo");
  const [selectedCategoryId, setSelectedCategoryId] = useState("normal");
  const [selectedPageSizeId, setSelectedPageSizeId] = useState("a4");
  const [pageCount, setPageCount] = useState(10);
  const [isUrgent, setIsUrgent] = useState(false);
  const [notesInstructions, setNotesInstructions] = useState("");
  const [formError, setFormError] = useState("");

  // Receipt & Full-Page Bill State
  const [activeReceiptOrder, setActiveReceiptOrder] = useState(null);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const billRef = useRef(null);
  const orderSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
      setFloatingHeart(true);
      setTimeout(() => setFloatingHeart(false), 1200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Calculations based on Writing Category & Page Size (Paper & Book included in rate!)
  const currentCategory = WRITING_CATEGORIES.find(c => c.id === selectedCategoryId) || WRITING_CATEGORIES[0];
  const currentSize = PAGE_SIZES.find(s => s.id === selectedPageSizeId) || PAGE_SIZES[0];

  const ratePerPage = currentSize.rates[currentCategory.id];
  const baseCost = ratePerPage * pageCount;
  const urgentSurcharge = isUrgent ? Math.round(baseCost * 0.5) : 0;
  const totalAmount = baseCost + urgentSurcharge;
  const advanceAmount = Math.ceil(totalAmount * 0.5);
  const balanceAmount = totalAmount - advanceAmount;

  // Download Bill as PNG Image using html2canvas
  const handleDownloadBillImage = async () => {
    if (!billRef.current) return;
    try {
      setDownloadingImage(true);
      const canvas = await html2canvas(billRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });
      const imageUri = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUri;
      link.download = `NeatNotes_Bill_${activeReceiptOrder ? activeReceiptOrder.orderId : "Order"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating bill image:", err);
      alert("Could not generate image. Please take a screenshot of the bill.");
    } finally {
      setDownloadingImage(false);
    }
  };

  // Handle Order Submit & Show Full Page Bill View
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!phoneNumber.trim()) {
      setFormError("Please enter your phone or WhatsApp number.");
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError("Please enter your delivery address for courier.");
      return;
    }
    if (pageCount < 1) {
      setFormError("Please specify at least 1 page.");
      return;
    }

    setFormError("");

    const orderId = `${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const newOrder = {
      orderId: `NN-${now.getFullYear()}-${orderId}`,
      status: "PENDING (50% Advance Required)",
      date: formattedDate,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      deliveryAddress: deliveryAddress.trim(),
      district,
      pageCount,
      writingCategory: currentCategory,
      pageSize: currentSize,
      ratePerPage,
      baseCost,
      isUrgent,
      urgentSurcharge,
      totalAmount,
      advanceAmount,
      balanceAmount,
      notesInstructions: notesInstructions.trim()
    };

    setActiveReceiptOrder(newOrder);

    // Scroll smoothly to order section to view the bill
    setTimeout(() => {
      const orderEl = document.getElementById("order");
      if (orderEl) {
        orderEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter(s => s.category === activeCategory);

  const getWhatsAppOrderUrl = (order) => {
    const text = encodeURIComponent(
      `*✨ NEW ORDER - NEAT NOTES SRI LANKA ✨*\n` +
      `----------------------------------------\n` +
      `*Order ID:* #${order.orderId}\n` +
      `⏳ *Status:* Pending (50% Advance Required)\n` +
      `▪️ *Customer:* ${order.customerName}\n` +
      `☎️ *Phone:* ${order.phoneNumber}\n` +
      `▪️ *Delivery Address:* ${order.deliveryAddress}, ${order.district}\n\n` +
      `✍️ *Writing Style:* ${order.writingCategory.title}\n` +
      `▪️ *Page Size:* ${order.pageSize.title} (Paper/Book Included)\n` +
      `▪️ *Pages:* ${order.pageCount} pages\n` +
      `▪️ *Rate per Page:* Rs. ${order.ratePerPage} / page\n` +
      `⚡ *Urgent Rush Order:* ${order.isUrgent ? "YES (+50%)" : "NO"}\n` +
      (order.notesInstructions ? `▪️ *Notes Details:* ${order.notesInstructions}\n\n` : `\n`) +
      `⭐ *Total Amount:* Rs. ${order.totalAmount.toLocaleString()}\n` +
      `✅ *50% Advance Required:* Rs. ${order.advanceAmount.toLocaleString()}\n` +
      `▪️ *Balance on Delivery:* Rs. ${order.balanceAmount.toLocaleString()}\n` +
      `▪️ *Courier Fee:* Customer bears delivery cost upon delivery\n` +
      `----------------------------------------\n` +
      `මම මෙම බිල්පතෙහි Image එකක් Download කරගෙන ඇත. කරුණාකර advance payment විස්තර ලබා දෙන්න.`
    );
    return `https://wa.me/94763296496?text=${text}`;
  };

  return (
    <div className="site-shell">
      {/* Top Banner Announcement */}
      <div className="announcement">
        <div className="announcement-content">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Handwritten with warmth & care</span>
          <span className="announcement-sep">•</span>
          <span className="announcement-badge">Normal Writing Rs. 20 | Islandwide Courier</span>
          <span className="announcement-sep">•</span>
          <button
            onClick={handleLike}
            className={`announcement-like-btn ${hasLiked ? "liked" : ""}`}
            aria-label="Send love to Neat Notes"
          >
            <Heart size={13} fill={hasLiked ? "currentColor" : "none"} />
            <span>{likesCount}</span>
          </button>
        </div>
        {floatingHeart && <span className="burst-heart">💖</span>}
      </div>

      {/* Main Responsive Header */}
      <header className="navbar">
        <div className="navbar-container">
          <a className="brand" href="#home" aria-label="Neat Notes home" onClick={closeMenu}>
            <div className="brand-logo-frame">
              <img src="/images/neat-notes-logo.png" alt="Neat Notes Logo" />
              <span className="brand-pulse-dot" />
            </div>
            <div className="brand-text">
              <span className="brand-title">Neat <b>Notes</b></span>
              <small className="brand-subtitle">NEAT WRITING, BEAUTIFUL RESULTS</small>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#services">Services</a>
            <a href="#pricing">Price List</a>
            <a href="#order">Order & Calculator</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="navbar-actions">
            <a className="nav-cta desktop-only-cta" href="#order">
              <span>Order Now</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? "is-active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`} onClick={closeMenu}>
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-label">Quick Navigation</span>
            <button className="mobile-drawer-close" onClick={closeMenu} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <nav className="mobile-nav-links">
            <a href="#home" onClick={closeMenu}><span>🏠</span> Home</a>
            <a href="#services" onClick={closeMenu}><span>✎</span> Services & Options</a>
            <a href="#pricing" onClick={closeMenu}><span>🏷️</span> Official Price List</a>
            <a href="#order" onClick={closeMenu}><span>📊</span> Instant Order & Calculator</a>
            <a href="#how-it-works" onClick={closeMenu}><span>⚡</span> How to Order (1-2-3)</a>
            <a href="#reviews" onClick={closeMenu}><span>★</span> Client Reviews</a>
            <a href="#faq" onClick={closeMenu}><span>❓</span> Frequently Asked Questions</a>
            <a href="#contact" onClick={closeMenu} className="mobile-menu-highlight">
              <span>✉</span> Contact & Inquiries
            </a>
          </nav>
          <div className="mobile-drawer-footer">
            <a
              className="button button-primary mobile-drawer-btn"
              href="#order"
              onClick={closeMenu}
            >
              Place Your Order <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/94763296496"
              target="_blank"
              rel="noreferrer"
              className="button button-whatsapp-primary"
              style={{ marginTop: "10px", width: "100%", textDecoration: "none" }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp: +94 76 329 6496</span>
            </a>
            <p className="mobile-drawer-tagline">Neat writing, guaranteed satisfaction ♡</p>
          </div>
        </div>
      </div>

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-container">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>HANDWRITTEN WITH LOVE & CARE</span>
              </div>

              <h1>
                Every page deserves<br />
                <em>a little</em> <span>pretty.</span>
              </h1>

              <p className="hero-lead">
                Beautifully handwritten notes, summaries, diagrams, and assignments —
                crafted with patience, laser-focused tidiness, and delivered islandwide in hard copy.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#order">
                  <span>Calculate & Order Now</span>
                  <ArrowUpRight size={17} />
                </a>
                <a className="button button-ghost" href="#pricing">
                  <span>View Price List</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="trust-row">
                <div className="avatar-stack">
                  <span title="Neat Notes">N</span>
                  <span title="Care">♡</span>
                  <span title="Ink & Pen">✎</span>
                </div>
                <div className="trust-info">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <small>500+ happy pages & 5-star student reviews</small>
                </div>
              </div>

              {/* Decorative floating doodles */}
              <span className="doodle doodle-heart" aria-hidden="true">♡</span>
              <span className="doodle doodle-sparkle" aria-hidden="true">✳</span>
            </div>

            <div className="hero-art-wrapper">
              <div className="hero-art">
                <div className="art-frame">
                  <img
                    src="/images/neat-notes-cover.png"
                    alt="Neat Notes pastel stationery, notebook, and handwritten calligraphy"
                    loading="eager"
                  />
                  <div className="art-overlay-gradient" />
                </div>

                {/* Floating Badges */}
                <div className="floating-note note-top">
                  <Heart size={15} fill="currentColor" />
                  <span>From Rs. 20 / Page</span>
                </div>

                <div className="floating-note note-bottom">
                  <Truck size={16} />
                  <span>Islandwide Courier</span>
                </div>

                <div className="hero-sticker" title="Your ideas, beautifully written">
                  <span className="sticker-icon">✦</span>
                  <small>neat handwriting,<br />physical delivery</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INFINITE MARQUEE TICKER */}
        <section className="marquee-wrapper" aria-label="Services highlights ticker">
          <div className="marquee-track">
            <div className="marquee-content">
              <span>A4 & CR NORMAL RS. 25/PG</span><i>✦</i>
              <span>COLOURED WRITING RS. 35/PG</span><i>♡</i>
              <span>WITH DIAGRAMS RS. 45/PG</span><i>✦</i>
              <span>A5 / HALF-SHEET FROM RS. 15/PG</span><i>♡</i>
              <span>ALL PAPERS & BOOKS INCLUDED</span><i>✦</i>
              <span>50% ADVANCE PAYMENT</span><i>♡</i>
              <span>ISLANDWIDE COURIER DELIVERY</span><i>✦</i>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span>A4 & CR NORMAL RS. 25/PG</span><i>✦</i>
              <span>COLOURED WRITING RS. 35/PG</span><i>♡</i>
              <span>WITH DIAGRAMS RS. 45/PG</span><i>✦</i>
              <span>A5 / HALF-SHEET FROM RS. 15/PG</span><i>♡</i>
              <span>ALL PAPERS & BOOKS INCLUDED</span><i>✦</i>
              <span>50% ADVANCE PAYMENT</span><i>♡</i>
              <span>ISLANDWIDE COURIER DELIVERY</span><i>✦</i>
            </div>
          </div>
        </section>

        {/* OFFICIAL PRICING & SERVICE POLICY SECTION */}
        <section className="pricing-section section-wrap" id="pricing">
          <div className="section-heading">
            <span className="eyebrow">OFFICIAL ALL-INCLUSIVE PRICING</span>
            <h2>Transparent rates by <em>Writing Style & Page Size.</em></h2>
            <p>පොත් වලට හෝ තනි කොළ වලට, Ruled (රූල්) හෝ Blank (සුදු කොළ) වලට වෙනම අයකිරීමක් නැත. මිල තීරණය වන්නේ පිටුවේ ප්‍රමාණය සහ ලිවීමේ විලාසය අනුව පමණි!</p>
          </div>

          {/* Pricing Highlight Banner */}
          <div className="all-inclusive-notice-banner" style={{ maxWidth: "860px", margin: "0 auto 32px" }}>
            <Sparkles size={20} className="all-inclusive-sparkle" />
            <div>
              <strong>No Separate Material or Book Charges (ද්‍රව්‍ය සඳහා වෙනම අය නොකෙරේ)</strong>
              <p>Exercise Book එකක් වුවද, Single Loose Sheets වුවද, Ruled හෝ Plain වුවද එකම මිලකට ලිවීම සහ කඩදාසි යන සියල්ලම අන්තර්ගතය. මිල තීරණය වන්නේ පහත කාණ්ඩ 3 සහ පිටු ප්‍රමාණය මත පමණි:</p>
            </div>
          </div>

          {/* 3 Main Writing Categories Grid */}
          <div className="pricing-cards-grid">
            {WRITING_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`pricing-rate-card ${cat.id === "coloured" ? "featured" : ""}`}
              >
                {cat.id === "coloured" && <div className="rate-popular-tag">Most Popular</div>}
                <div className="rate-card-icon">{cat.emoji}</div>
                <div className="rate-badge">{cat.badge}</div>
                <h3>{cat.title}</h3>
                <small style={{ color: "var(--muted)", display: "block", marginBottom: "14px", fontWeight: "500" }}>
                  {cat.subTitle}
                </small>

                {/* Per-Page Rates by Page Size */}
                <div className="category-size-rates-box">
                  <div className="size-rate-row">
                    <span className="size-name">📄 A4 Size:</span>
                    <strong className="size-cost">Rs. {PAGE_SIZES[0].rates[cat.id]} <small>/ pg</small></strong>
                  </div>
                  <div className="size-rate-row">
                    <span className="size-name">📘 CR Size:</span>
                    <strong className="size-cost">Rs. {PAGE_SIZES[1].rates[cat.id]} <small>/ pg</small></strong>
                  </div>
                  <div className="size-rate-row">
                    <span className="size-name">📝 A5 / Half:</span>
                    <strong className="size-cost">Rs. {PAGE_SIZES[2].rates[cat.id]} <small>/ pg</small></strong>
                  </div>
                </div>

                <p className="rate-desc">{cat.desc}</p>
                <ul className="rate-features">
                  {cat.features.map((feat, fi) => (
                    <li key={fi}><Check size={14} /> {feat}</li>
                  ))}
                </ul>

                <a
                  href="#order"
                  className="button button-primary select-pricing-btn"
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setActiveReceiptOrder(null);
                  }}
                  style={{ width: "100%", marginTop: "18px", justifyContent: "center" }}
                >
                  <span>Select & Calculate</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            ))}
          </div>

          {/* Complete Pricing Matrix Table */}
          <div className="style-addons-card">
            <div className="style-addons-header">
              <Calculator size={20} className="addons-icon" />
              <div>
                <h4>Complete Price Matrix (සම්පූර්ණ මිල ගණන් සටහන)</h4>
                <p>One simple rate per page — Paper or Book included. Pay 50% advance to confirm writing slot:</p>
              </div>
            </div>

            <div className="matrix-table-wrap">
              <table className="neat-matrix-table">
                <thead>
                  <tr>
                    <th>Page Size / Format</th>
                    <th>✍️ Normal (Single Ink)</th>
                    <th>🎨 Coloured (Multi-Colour)</th>
                    <th>📐 With Diagrams & Graphs</th>
                  </tr>
                </thead>
                <tbody>
                  {PAGE_SIZES.map((sz) => (
                    <tr key={sz.id}>
                      <td>
                        <strong>{sz.emoji} {sz.title}</strong>
                        <div style={{ fontSize: "11px", color: "var(--muted)" }}>{sz.subTitle}</div>
                      </td>
                      <td><b>Rs. {sz.rates.normal}</b> / page</td>
                      <td><b style={{ color: "var(--pink-deep)" }}>Rs. {sz.rates.coloured}</b> / page</td>
                      <td><b>Rs. {sz.rates.diagrams}</b> / page</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="urgent-badge-strip">
              <span>⚡ <b>Urgent Rush Orders:</b> +50% extra surcharge for tight deadline fast-tracking</span>
              <span>🚚 <b>Courier Delivery:</b> Islandwide delivery (customer bears delivery cost upon delivery)</span>
            </div>
          </div>

          {/* Terms & Conditions Highlight Banner */}
          <div className="service-policy-card">
            <div className="policy-header">
              <ShieldCheck size={24} className="policy-icon" />
              <div>
                <h3>Important Ordering Guidelines & Terms (සේවා කොන්දේසි)</h3>
                <p>Please review our service policies before placing your order:</p>
              </div>
            </div>

            <div className="policy-items-grid">
              <div className="policy-item">
                <span className="policy-check">✅</span>
                <div>
                  <strong>All-Inclusive Page Rates</strong>
                  <p>පොත් සඳහා හෝ කොළ සඳහා වෙනම අයකිරීමක් නොමැත. සියලුම ද්‍රව්‍ය හා ලිවීම පිටුවේ මිලට ඇතුළත් වේ.</p>
                </div>
              </div>

              <div className="policy-item">
                <span className="policy-check">✅</span>
                <div>
                  <strong>50% Advance Payment Required</strong>
                  <p>Order එක confirm කර ලිවීම ආරම්භ කිරීමට 50% ක අත්තිකාරම් මුදලක් (Advance Payment) ගෙවිය යුතුය.</p>
                </div>
              </div>

              <div className="policy-item">
                <span className="policy-check">✅</span>
                <div>
                  <strong>Customer Must Provide Content/Notes</strong>
                  <p>Customer විසින් ලියන්න ඕන content / lecture notes හෝ photos පැහැදිලිව ලබා දිය යුතුයි. (Original content එකක් හදලා දෙන සේවාවක් නොවේ).</p>
                </div>
              </div>

              <div className="policy-item">
                <span className="policy-check">✅</span>
                <div>
                  <strong>Islandwide Courier Delivery</strong>
                  <p>Delivery islandwide by courier. Courier Charges: Customer bears the delivery cost upon receiving the parcel.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services-section section-wrap" id="services">
          <div className="section-heading">
            <span className="eyebrow">WHAT WE OFFER</span>
            <h2>Little details. <em>Lovely</em> results.</h2>
            <p>From an individual lecture summary to a full assignment or heartfelt keepsake letter, we have you covered.</p>

            {/* Filter Pills */}
            <div className="category-filter-bar" role="tablist" aria-label="Filter services">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="service-cards-grid">
            {filteredServices.map((service, index) => (
              <article className="service-card" key={service.id}>
                <div className="service-card-header">
                  <div className={`service-icon icon-${index % 4}`}>
                    {service.icon}
                  </div>
                  <span className="service-badge">{service.badge}</span>
                </div>

                <h3>{service.title}</h3>
                <p className="service-desc">{service.text}</p>

                <ul className="service-features-list">
                  {service.features.map((feat, i) => (
                    <li key={i}>
                      <Check size={14} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-footer">
                  <span className="service-time">
                    <Clock size={13} /> {service.estTime}
                  </span>
                  <a
                    className="service-order-link"
                    href="#order"
                    onClick={() => {
                      if (service.id === "graphs") setSelectedCategoryId("diagrams");
                      else if (service.id === "notes") setSelectedCategoryId("coloured");
                      else setSelectedCategoryId("normal");
                      setActiveReceiptOrder(null);
                    }}
                    aria-label={`Order ${service.title}`}
                  >
                    <span>Select & Order</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* VALUE PROPOSITION HIGHLIGHTS */}
        <section className="perks-section">
          <div className="section-wrap perks-container">
            <div className="perks-grid">
              {perks.map((perk, idx) => (
                <div className="perk-card" key={idx}>
                  <div className="perk-icon-wrap">
                    {perk.icon}
                  </div>
                  <h4>{perk.title}</h4>
                  <p>{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE ORDER BOOKING & INSTANT CALCULATOR SECTION */}
        <section className="order-calculator-section section-wrap" id="order" ref={orderSectionRef}>
          {activeReceiptOrder ? (
            /* FULL PAGE OFFICIAL BILL VIEW (NO POPUP MODAL) */
            <div className="full-page-bill-view">
              {/* Top Bar with Status and Edit Option */}
              <div className="bill-view-top-bar">
                <div className="bill-view-title-wrap">
                  <Receipt size={24} className="receipt-icon-pink" />
                  <div>
                    <h3>Official Order Bill & Invoice</h3>
                    <small>Order Ref: #{activeReceiptOrder.orderId} • Status: Pending (50% Advance)</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="button button-ghost edit-order-btn"
                  onClick={() => setActiveReceiptOrder(null)}
                >
                  <RefreshCw size={15} />
                  <span>Edit Order Details</span>
                </button>
              </div>

              {/* Prominent Verification & Download Alert Banner */}
              <div className="bill-screenshot-notice-box">
                <div className="screenshot-notice-badge">
                  <Camera size={26} />
                </div>
                <div className="screenshot-notice-content">
                  <strong className="screenshot-notice-title">
                    විශ්වසනීය භාවය සඳහා බිල්පතෙහි Image එකක් Download කර ළඟ තබා ගන්න
                  </strong>
                  <p className="screenshot-notice-sub">
                    පහත <b>"Download Bill as Image (PNG)"</b> බොත්තම ඔබා බිල්පත Image එකක් ලෙස ඔබගේ දුරකථනයට හෝ පරිගණකයට සුරැකීමට හැකිය (හෝ Screenshot එකක් ලබා ගත හැක). ඉන්පසු WhatsApp හරහා අප වෙත එවන්න.
                  </p>
                </div>
              </div>

              {/* Top Action Toolbar (Download Image & WhatsApp) */}
              <div className="bill-action-toolbar">
                <button
                  type="button"
                  className="button button-download-bill-image"
                  onClick={handleDownloadBillImage}
                  disabled={downloadingImage}
                >
                  <Download size={18} />
                  <span>{downloadingImage ? "Generating Image..." : "Download Bill as Image (PNG)"}</span>
                </button>

                <a
                  className="button button-whatsapp-primary"
                  href={getWhatsAppOrderUrl(activeReceiptOrder)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  <span>Confirm Order via WhatsApp (+94 76 329 6496)</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Official Printable & Capturable Bill Sheet */}
              <div className="printable-receipt-sheet full-page-receipt-sheet" ref={billRef}>
                {/* Receipt Header */}
                <div className="receipt-header-row">
                  <div className="receipt-logo-wrap">
                    <div className="receipt-brand-name">Neat <span>Notes</span></div>
                    <small className="receipt-slogan">Handwritten Hard Copies • Islandwide Courier Delivery</small>
                  </div>
                  <div className="receipt-status-wrap">
                    <span className="status-badge-pending">
                      🟡 PENDING (50% ADVANCE REQUIRED)
                    </span>
                  </div>
                </div>

                {/* Order Meta Details */}
                <div className="receipt-meta-grid">
                  <div className="meta-box">
                    <span className="meta-lbl">ORDER REFERENCE</span>
                    <strong className="meta-val highlight-ref">#{activeReceiptOrder.orderId}</strong>
                  </div>
                  <div className="meta-box">
                    <span className="meta-lbl">DATE & TIME</span>
                    <strong className="meta-val">{activeReceiptOrder.date}</strong>
                  </div>
                  <div className="meta-box">
                    <span className="meta-lbl">CUSTOMER NAME</span>
                    <strong className="meta-val">{activeReceiptOrder.customerName}</strong>
                  </div>
                  <div className="meta-box">
                    <span className="meta-lbl">PHONE / WHATSAPP</span>
                    <strong className="meta-val">{activeReceiptOrder.phoneNumber}</strong>
                  </div>
                  <div className="meta-box full-span">
                    <span className="meta-lbl">DELIVERY ADDRESS & DISTRICT</span>
                    <strong className="meta-val">{activeReceiptOrder.deliveryAddress}, {activeReceiptOrder.district}</strong>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="receipt-table-wrap">
                  <table className="receipt-items-table">
                    <thead>
                      <tr>
                        <th>Writing Style & Page Size</th>
                        <th>Rate / Page</th>
                        <th className="text-right">Pages</th>
                        <th className="text-right">Amount (LKR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>{activeReceiptOrder.writingCategory.emoji} {activeReceiptOrder.writingCategory.title}</strong>
                          <div className="table-subtext">
                            {activeReceiptOrder.pageSize.emoji} {activeReceiptOrder.pageSize.title} • All papers/notebook materials included (No extra book/sheet charges)
                          </div>
                        </td>
                        <td>Rs. {activeReceiptOrder.ratePerPage} / pg</td>
                        <td className="text-right">{activeReceiptOrder.pageCount} pgs</td>
                        <td className="text-right">Rs. {activeReceiptOrder.baseCost.toLocaleString()}</td>
                      </tr>
                      {activeReceiptOrder.isUrgent && (
                        <tr>
                          <td>
                            <strong>⚡ Urgent Rush Order (+50% Extra Surcharge)</strong>
                            <div className="table-subtext">Fast-track expedited priority queue</div>
                          </td>
                          <td>+50% rush</td>
                          <td className="text-right">-</td>
                          <td className="text-right">Rs. {activeReceiptOrder.urgentSurcharge.toLocaleString()}</td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <strong>🚚 Islandwide Courier Delivery</strong>
                          <div className="table-subtext">Customer bears delivery cost upon delivery</div>
                        </td>
                        <td>Courier</td>
                        <td className="text-right">1 Parcel</td>
                        <td className="text-right" style={{ color: "#7e7074", fontStyle: "italic" }}>Pay at Delivery</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Calculations Box */}
                <div className="receipt-totals-panel">
                  <div className="receipt-row-calc">
                    <span>Writing Style:</span>
                    <strong>{activeReceiptOrder.writingCategory.title}</strong>
                  </div>
                  <div className="receipt-row-calc">
                    <span>Page Size / Format:</span>
                    <strong>{activeReceiptOrder.pageSize.title} (Paper/Book Included)</strong>
                  </div>
                  {activeReceiptOrder.isUrgent && (
                    <div className="receipt-row-calc">
                      <span>Urgent Rush Handling (+50%):</span>
                      <strong>Rs. {activeReceiptOrder.urgentSurcharge.toLocaleString()}</strong>
                    </div>
                  )}
                  <div className="receipt-row-calc total-sum">
                    <span>Total Order Amount:</span>
                    <span className="total-amt-text">Rs. {activeReceiptOrder.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="receipt-row-calc advance-sum">
                    <span>✅ 50% Advance Payment Required to Start:</span>
                    <span className="advance-amt-text">Rs. {activeReceiptOrder.advanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="receipt-row-calc balance-sum">
                    <span>Remaining 50% Balance on Delivery:</span>
                    <strong>Rs. {activeReceiptOrder.balanceAmount.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Next Steps Guidelines */}
                <div className="receipt-terms-box">
                  <div className="terms-title">Next Steps & Service Guidelines (ඊළඟ පියවර):</div>
                  <ul>
                    <li>1. <b>Download Image:</b> ඉහත ඇති "Download Bill as Image" බොත්තම ඔබා මෙම බිල්පතෙහි Image එකක් සුරැක ගන්න (හෝ Screenshot එකක් ගන්න).</li>
                    <li>2. <b>Send via WhatsApp:</b> බිල්පතේ image එක සහ ඔබට ලියාගැනීමට අවශ්‍ය lecture notes හෝ photos අපගේ WhatsApp අංකයට (<b>+94 76 329 6496</b>) Order Ref <b>#{activeReceiptOrder.orderId}</b> සමඟ එවන්න.</li>
                    <li>3. <b>All-Inclusive Pricing:</b> පොත් හෝ තනි කොළ සඳහා වෙනම අයකිරීමක් නැත. සියලුම ද්‍රව්‍ය හා ලිවීම ඉහත මුදලට ඇතුළත් වේ.</li>
                    <li>4. <b>Pay 50% Advance:</b> ලිවීම ආරම්භ කිරීමට අදාළ 50% advance මුදල (<b>Rs. {activeReceiptOrder.advanceAmount.toLocaleString()}</b>) ගෙවන්න.</li>
                    <li>5. <b>Courier Delivery:</b> වැඩ නිම වූ පසු ආරක්ෂිතව hard copy එක ඔබගේ ලිපිනයටම Courier මඟින් එවනු ලැබේ.</li>
                  </ul>
                </div>

                {/* Receipt Footer Attribution */}
                <div className="receipt-footer-stamp">
                  <p>Neat Notes • WhatsApp: <b>+94 76 329 6496</b> • Handwritten with utmost neatness, love & care ♡</p>
                  <p className="developer-tag">
                    Developed by <a href="https://www.modulaversystems.com" target="_blank" rel="noopener noreferrer">Modulaver Systems</a> (www.modulaversystems.com)
                  </p>
                </div>
              </div>

              {/* Bottom Action Toolbar */}
              <div className="bill-action-toolbar bottom-toolbar">
                <button
                  type="button"
                  className="button button-download-bill-image"
                  onClick={handleDownloadBillImage}
                  disabled={downloadingImage}
                >
                  <Download size={18} />
                  <span>{downloadingImage ? "Generating Image..." : "Download Bill as Image"}</span>
                </button>

                <a
                  className="button button-whatsapp-primary"
                  href={getWhatsAppOrderUrl(activeReceiptOrder)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  <span>Confirm on WhatsApp (+94 76 329 6496)</span>
                </a>

                <button
                  type="button"
                  className="button button-ghost"
                  onClick={() => setActiveReceiptOrder(null)}
                >
                  <span>Edit Order Details</span>
                </button>
              </div>
            </div>
          ) : (
            /* INTERACTIVE ORDER BOOKING FORM & SIDE CALCULATOR */
            <div className="order-booking-card">
              <div className="order-form-column">
                <div className="order-header-wrap">
                  <span className="eyebrow">ONLINE ORDER & INSTANT ESTIMATOR</span>
                  <h2>Configure your order & get your <em>official bill.</em></h2>
                  <p>Select your writing style, page size, and enter page count. Your full bill will be generated instantly for download as an image!</p>
                </div>

                {formError && (
                  <div className="form-error-banner" role="alert">
                    <AlertCircle size={18} />
                    <span>{formError}</span>
                  </div>
                )}

                <form id="neat-order-form" onSubmit={handlePlaceOrder} className="neat-order-form">
                  {/* Step 1: Writing Style Category Selection */}
                  <div className="form-section-title">
                    <span className="step-badge">1</span>
                    <PenLine size={16} />
                    <span>Select Writing Style (ලිවීමේ විලාසය)</span>
                  </div>

                  <div className="writing-categories-selector-grid">
                    {WRITING_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategoryId === cat.id;
                      return (
                        <div
                          key={cat.id}
                          className={`category-option-card ${isSelected ? "active" : ""}`}
                          onClick={() => setSelectedCategoryId(cat.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedCategoryId(cat.id); }}
                        >
                          <div className="category-card-top">
                            <span className="category-emoji">{cat.emoji}</span>
                            <span className={`category-badge ${isSelected ? "selected" : ""}`}>{cat.badge}</span>
                          </div>
                          <strong className="category-title">{cat.title}</strong>
                          <small className="category-subtitle">{cat.subTitle}</small>
                          <div className="category-sample-rates">
                            <span>A4: Rs. {PAGE_SIZES[0].rates[cat.id]}/pg</span> • <span>CR: Rs. {PAGE_SIZES[1].rates[cat.id]}/pg</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 2: Page Size Selection */}
                  <div className="form-section-title" style={{ marginTop: "12px" }}>
                    <span className="step-badge">2</span>
                    <Book size={16} />
                    <span>Select Page Size (පිටු ප්‍රමාණය - Paper & Book Included)</span>
                  </div>

                  <div className="all-inclusive-notice-banner">
                    <Sparkles size={18} className="all-inclusive-sparkle" />
                    <div>
                      <strong>All-Inclusive Page Rates (පොත් හෝ කොළ වලට වෙනම අය නොකෙරේ)</strong>
                      <p>පොතක් වුවද, තනි කොළ වුවද, Ruled (රූල්) හෝ Blank (සුදු කොළ) වුවද එකම මිලකට ලිවීම හා ද්‍රව්‍ය සියල්ල ඇතුළත් වේ.</p>
                    </div>
                  </div>

                  <div className="page-format-selector-grid">
                    {PAGE_SIZES.map((sz) => {
                      const isSelected = selectedPageSizeId === sz.id;
                      return (
                        <div
                          key={sz.id}
                          className={`format-option-card ${isSelected ? "active" : ""}`}
                          onClick={() => setSelectedPageSizeId(sz.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedPageSizeId(sz.id); }}
                        >
                          <div className="format-card-top">
                            <span className="format-emoji">{sz.emoji}</span>
                            <span className={`format-badge ${isSelected ? "selected" : ""}`}>{sz.badge}</span>
                          </div>
                          <strong className="format-title">{sz.title}</strong>
                          <div className="format-price">
                            <span className="currency">Rs.</span>
                            <span className="amt">{sz.rates[selectedCategoryId]}</span>
                            <span className="unit">/ page</span>
                          </div>
                          <small className="format-desc">{sz.desc}</small>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 3: Page Count Stepper, Quick Presets & Slider */}
                  <div className="form-section-title" style={{ marginTop: "12px" }}>
                    <span className="step-badge">3</span>
                    <FileText size={16} />
                    <span>Number of Pages to Write (ලියන්න අවශ්‍ය පිටු ගණන)</span>
                  </div>

                  <div className="calc-group page-counter-box">
                    <div className="range-header">
                      <label htmlFor="page-slider-order" className="counter-label">
                        Enter or Adjust Pages:
                      </label>
                      <div className="stepper-controls">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => setPageCount(prev => Math.max(1, prev - 1))}
                          aria-label="Decrease page count"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="500"
                          value={pageCount}
                          onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="page-number-input"
                          aria-label="Direct page count input"
                        />
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => setPageCount(prev => prev + 1)}
                          aria-label="Increase page count"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <input
                      id="page-slider-order"
                      type="range"
                      min="1"
                      max="100"
                      value={pageCount > 100 ? 100 : pageCount}
                      onChange={(e) => setPageCount(Math.max(1, Number(e.target.value)))}
                      className="neat-slider"
                    />

                    <div className="page-presets-bar">
                      <span className="presets-label">Quick Presets:</span>
                      <div className="presets-pills">
                        {[10, 25, 50, 100].map(cnt => (
                          <button
                            key={cnt}
                            type="button"
                            className={`preset-pill ${pageCount === cnt ? "active" : ""}`}
                            onClick={() => setPageCount(cnt)}
                          >
                            {cnt} Pages
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Customer & Delivery Details */}
                  <div className="form-section-title" style={{ marginTop: "12px" }}>
                    <span className="step-badge">4</span>
                    <User size={16} />
                    <span>Customer & Delivery Details (පාරිභෝගික සහ ඩිලිවරි තොරතුරු)</span>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="cust-name">
                        <User size={13} className="label-icon" /> Your Full Name *
                      </label>
                      <input
                        id="cust-name"
                        type="text"
                        placeholder="e.g. Kasun Perera"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="cust-phone">
                        <Phone size={13} className="label-icon" /> WhatsApp / Phone Number *
                      </label>
                      <input
                        id="cust-phone"
                        type="tel"
                        placeholder="e.g. 077 123 4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="cust-address">
                        <MapPin size={13} className="label-icon" /> Delivery Address (for Courier) *
                      </label>
                      <input
                        id="cust-address"
                        type="text"
                        placeholder="e.g. No. 45, Temple Road, Nugegoda"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="cust-district">
                        <Truck size={13} className="label-icon" /> District / City *
                      </label>
                      <select
                        id="cust-district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        <option value="Colombo">Colombo</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Matale">Matale</option>
                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                        <option value="Galle">Galle</option>
                        <option value="Matara">Matara</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Monaragala">Monaragala</option>
                        <option value="Ratnapura">Ratnapura</option>
                        <option value="Kegalle">Kegalle</option>
                        <option value="Other District">Other District (Islandwide)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 5: Options & Instructions */}
                  <div className="form-section-title" style={{ marginTop: "12px" }}>
                    <span className="step-badge">5</span>
                    <Zap size={16} />
                    <span>Options & Guidelines (අමතර විස්තර)</span>
                  </div>

                  {/* Urgent Order Toggle */}
                  <div className={`urgent-toggle-box ${isUrgent ? "is-active" : ""}`}>
                    <label className="urgent-toggle-label" htmlFor="urgent-checkbox">
                      <input
                        id="urgent-checkbox"
                        type="checkbox"
                        checked={isUrgent}
                        onChange={(e) => setIsUrgent(e.target.checked)}
                      />
                      <div className="urgent-toggle-content">
                        <div className="urgent-title">
                          <Zap size={17} className="zap-icon" />
                          <span>⚡ Urgent Rush Order (+50% Extra Surcharge)</span>
                        </div>
                        <p>Check this if you have a tight deadline. We will fast-track your pages in our priority queue.</p>
                      </div>
                    </label>
                  </div>

                  {/* Notes Instructions */}
                  <div className="form-field">
                    <label htmlFor="notes-info">Notes Content / Special Guidelines (Optional)</label>
                    <textarea
                      id="notes-info"
                      rows="2"
                      placeholder="e.g. Subject: Biology Unit 3, Blue ink with pink headings, single-sided pages..."
                      value={notesInstructions}
                      onChange={(e) => setNotesInstructions(e.target.value)}
                    />
                    <small className="field-hint">
                      You will send the actual photos/lecture notes via WhatsApp once your official bill is created.
                    </small>
                  </div>
                </form>
              </div>

              {/* LIVE CALCULATION SUMMARY COLUMN (SIDE EKE BILL EKA) */}
              <div className="order-summary-column">
                <div className="live-summary-card">
                  <div className="summary-header">
                    <div className="summary-header-lead">
                      <Calculator size={18} />
                      <span>Live Price Calculation</span>
                    </div>
                    <span className="summary-live-badge">
                      <span className="live-dot" /> Instant
                    </span>
                  </div>

                  <div className="live-breakdown-list">
                    <div className="breakdown-row">
                      <span className="item-label">
                        {currentCategory.emoji} {currentCategory.title}
                        <small>{currentSize.emoji} {currentSize.title} (Paper/Book included)</small>
                      </span>
                      <span className="item-val">Rs. {ratePerPage} / pg</span>
                    </div>

                    <div className="breakdown-row">
                      <span className="item-label">
                        <span>Total Pages:</span>
                        <small>Rs. {ratePerPage} × {pageCount} {pageCount === 1 ? "page" : "pages"}</small>
                      </span>
                      <span className="item-val">Rs. {baseCost.toLocaleString()}</span>
                    </div>

                    {isUrgent && (
                      <div className="breakdown-row urgent-row">
                        <span className="item-label">
                          ⚡ Urgent Rush Surcharge
                          <small>+50% priority fast-track handling</small>
                        </span>
                        <span className="item-val">+ Rs. {urgentSurcharge.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="breakdown-row courier-row">
                      <span className="item-label">
                        🚚 Islandwide Courier Delivery
                        <small>Pay courier charges upon parcel arrival</small>
                      </span>
                      <span className="item-val courier-note">Pay at Delivery</span>
                    </div>
                  </div>

                  <div className="summary-divider" />

                  <div className="total-calculation-block">
                    <div className="total-grand-row">
                      <span>Total Order Amount:</span>
                      <strong className="grand-price">Rs. {totalAmount.toLocaleString()}</strong>
                    </div>

                    <div className="advance-highlight-card">
                      <div className="advance-badge">
                        <CheckCircle2 size={13} /> 50% Advance Required to Start
                      </div>
                      <div className="advance-price-row">
                        <span>Payable Now (50%):</span>
                        <strong className="advance-amt">Rs. {advanceAmount.toLocaleString()}</strong>
                      </div>
                      <div className="balance-info-row">
                        <span>Balance on Courier Delivery:</span>
                        <strong>Rs. {balanceAmount.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="summary-guarantees">
                    <div className="guarantee-item">
                      <CheckCircle2 size={15} />
                      <span>All-Inclusive: පොත් හෝ කොළ සඳහා වෙනම අයකිරීමක් නැත!</span>
                    </div>
                    <div className="guarantee-item">
                      <CheckCircle2 size={15} />
                      <span>Instant official bill with PNG image download</span>
                    </div>
                    <div className="guarantee-item">
                      <CheckCircle2 size={15} />
                      <span>Islandwide hard copy doorstep courier delivery</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="neat-order-form"
                    className="button button-primary calculator-place-order-btn"
                  >
                    <Receipt size={18} />
                    <span>Place Order & View Official Bill (නිල බිල්පත ලබා ගන්න)</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* HOW IT WORKS PROCESS */}
        <section className="process-section section-wrap" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">SIMPLE AS 1, 2, 3</span>
            <h2>Your order, <em>made effortless.</em></h2>
            <p>From placing the order to receiving your hard copy pages, we keep the process crystal-clear.</p>
          </div>

          <div className="steps-cards-grid">
            {steps.map((step, idx) => (
              <div className="step-card" key={step.number}>
                <div className="step-card-top">
                  <div className="step-number-pill">
                    <span>{step.number}</span>
                    <Heart size={12} fill="currentColor" className="step-heart" />
                  </div>
                  <span className="step-tag">{step.tag}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {idx < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS & TESTIMONIALS */}
        <section className="reviews-section section-wrap" id="reviews">
          <div className="section-heading">
            <span className="eyebrow">HAPPY CLIENTS</span>
            <h2>Loved by students & professionals across Sri Lanka.</h2>
            <p>Here is what our clients say about their Neat Notes experience.</p>
          </div>

          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="review-stars">
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <strong className="review-name">{r.name}</strong>
                    <span className="review-role">{r.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="faq-section section-wrap" id="faq">
          <div className="section-heading">
            <span className="eyebrow">COMMON QUESTIONS</span>
            <h2>Frequently Asked Questions.</h2>
            <p>Tap any question to view the answer.</p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section" id="contact">
          <div className="contact-decoration" aria-hidden="true">♡</div>
          <div className="contact-container">
            <span className="eyebrow eyebrow-light">HAVE A SPECIAL PROJECT IN MIND?</span>
            <h2>Let's make your next page<br /><em>something truly special.</em></h2>
            <p>Ready to place your order or have a special request? Connect with us directly!</p>

            <div className="contact-options-grid">
              <a
                className="contact-card-btn whatsapp-btn"
                href={`https://wa.me/94763296496?text=${encodeURIComponent("Hello Neat Notes! I would like to inquire about handwriting services and pricing.")}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="btn-icon-wrap"><MessageCircle size={22} /></div>
                <div className="btn-text-wrap">
                  <strong>Message on WhatsApp (+94 76 329 6496)</strong>
                  <small>Send notes, photos & get instant quotes</small>
                </div>
                <ArrowUpRight size={18} className="btn-arrow" />
              </a>

              <a
                className="contact-card-btn facebook-btn"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="btn-icon-wrap"><MessageCircle size={22} /></div>
                <div className="btn-text-wrap">
                  <strong>Message on Facebook</strong>
                  <small>Official Neat Notes page</small>
                </div>
                <ArrowUpRight size={18} className="btn-arrow" />
              </a>

              <a
                className="contact-card-btn email-btn"
                href="mailto:neatnotes.contact@gmail.com"
              >
                <div className="btn-icon-wrap"><Mail size={22} /></div>
                <div className="btn-text-wrap">
                  <strong>Send an Email</strong>
                  <small>For larger assignments or documents</small>
                </div>
                <ArrowUpRight size={18} className="btn-arrow" />
              </a>
            </div>

            <p className="contact-note">
              Reminder: Customer must provide the content/notes to write. Islandwide courier delivery available.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand-wrap">
            <a className="footer-brand" href="#home">
              <img src="/images/neat-notes-logo.png" alt="Neat Notes" />
              <span>Neat <b>Notes</b></span>
            </a>
            <p className="footer-tagline">
              Neat writing, beautiful results. Physical hard copies delivered islandwide. <Heart size={13} fill="currentColor" />
            </p>
          </div>

          <div className="footer-links-wrap">
            <a href="#services">Services</a>
            <a href="#pricing">Price List</a>
            <a href="#order">Order & Calculator</a>
            <a href="#how-it-works">How to Order</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
            <a
              href="https://wa.me/94763296496"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#128c7e", fontWeight: "700" }}
            >
              WhatsApp: +94 76 329 6496
            </a>
          </div>

          {/* Modulaver Systems attribution and copyright */}
          <div className="footer-bottom-row">
            <span className="copyright">© {new Date().getFullYear()} Neat Notes. All rights reserved.</span>

            <div className="footer-credit">
              <span>Developed by </span>
              <a
                href="https://www.modulaversystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="modulaver-systems-link"
              >
                Modulaver Systems
              </a>
            </div>

            <div className="footer-badge">Handwritten with Care ♡</div>
          </div>
        </div>
      </footer>



      {/* Floating Action Button / Back to top */}
      {showBackToTop && (
        <button
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Mobile Sticky Quick Order Pill */}
      <div className="mobile-sticky-bar">
        <a
          href="#order"
          className="mobile-sticky-btn"
        >
          <Receipt size={18} />
          <span>Place Order & Calculate</span>
          <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
