import { useState } from "react";
import "../StyleSheets/Packages.css";

const Packages = () => {
  const [billingCycle, setBillingCycle] = useState("person");

  const packages = [
    {
      id: 1,
      name: "Weekend Getaway",
      type: "Basic",
      price: billingCycle === "person" ? "$299" : "$499",
      billing: billingCycle === "person" ? "/ person" : "/ couple",
      duration: "3 Days, 2 Nights",
      featured: false,
      features: [
        "3-Star Hotel Accommodation",
        "Round-trip Airport Transfers",
        "Daily Breakfast",
        "Half-day City Tour",
        "24/7 Phone Support"
      ]
    },
    {
      id: 2,
      name: "Tropical Escape",
      type: "Popular",
      price: billingCycle === "person" ? "$799" : "$1,399",
      billing: billingCycle === "person" ? "/ person" : "/ couple",
      duration: "7 Days, 6 Nights",
      featured: true,
      badgeText: "Best Value",
      features: [
        "4-Star Beachfront Resort",
        "All Flights & Transfers",
        "All-inclusive Meals & Drinks",
        "2 Guided Excursions",
        "Snorkeling Gear Rental",
        "Spa Discount (20%)"
      ]
    },
    {
      id: 3,
      name: "Luxury Retreat",
      type: "Premium",
      price: billingCycle === "person" ? "$1,899" : "$3,499",
      billing: billingCycle === "person" ? "/ person" : "/ couple",
      duration: "10 Days, 9 Nights",
      featured: false,
      features: [
        "5-Star Luxury Villa",
        "First-class Flight Upgrades",
        "Private Chef & Dining",
        "Private Yacht Tour (1 Day)",
        "VIP Fast-track Airport Entry",
        "Dedicated Concierge Service"
      ]
    }
  ];

  return (
    <div className="packages-page">
      <div className="packages-hero">
        <div className="hero-content">
          <h1>Curated Travel Packages</h1>
          <p>Find the perfect itinerary for your next adventure.</p>
        </div>
      </div>

      <div className="packages-content container">
        <div className="billing-toggle-container">
          <div className="billing-toggle">
            <button
              className={billingCycle === "person" ? "active" : ""}
              onClick={() => setBillingCycle("person")}
            >
              Per Person
            </button>
            <button
              className={billingCycle === "couple" ? "active" : ""}
              onClick={() => setBillingCycle("couple")}
            >
              For Couples
            </button>
          </div>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`package-card ${pkg.featured ? "featured" : ""}`}>
              {pkg.featured && (
                <div className="package-badge">{pkg.badgeText}</div>
              )}
              
              <div className="package-header">
                <h4>{pkg.type}</h4>
                <h3>{pkg.name}</h3>
                <div className="package-price">
                  <span className="amount">{pkg.price}</span>
                  <span className="billing">{pkg.billing}</span>
                </div>
                <div className="package-duration">
                  <span className="icon">⏱️</span> {pkg.duration}
                </div>
              </div>

              <div className="package-features">
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-footer">
                <button className={`btn-book ${pkg.featured ? "btn-primary" : "btn-outline"}`}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
