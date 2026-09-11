"use client";
import { useEffect, useState } from "react";
import styles from "./content.module.css";

const sections = [
  { id: "section1", label: "What Data We Collect" },
  { id: "section2", label: "How We Use It" },
  { id: "section3", label: "Third-Party Sharing" },
  { id: "section4", label: "Data Retention" },
  { id: "section5", label: "Your Rights – GDPR" },
  { id: "section6", label: "Contact the DPO" },
];

export default function Content() {
  const [activeId, setActiveId] = useState("section1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.wrapper}>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <p className={styles.contents}>Contents</p>
        <ul className={styles.sidebarList}>
          {sections.map((item) => (
            <li key={item.id} className={styles.sidebarItem}>
              <a
                href={`#${item.id}`}
                className={`${styles.sidebarLink} ${activeId === item.id ? styles.sidebarLinkActive : ""}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Main content ── */}
      <div className={styles.main}>

        <p className={styles.intro}>
          Kayana Ltd ("Fiscal", "we", "us") is committed to protecting your personal data. This policy describes what we collect, why we collect it, and how you can exercise your rights under UK GDPR and EU GDPR.
        </p>

        {/* 1 */}
        <section id="section1" className={styles.section}>
          <h2 className={styles.sectionTitle}>1. What Data We Collect</h2>
          <p>
            We collect only the data necessary to provide the Fiscal platform and meet our legal obligations. Data is gathered in three ways: information you provide directly when signing up or using the service, data generated automatically as you interact with the platform, and information received from trusted third-party integrations you choose to connect.
          </p>
          <p><b>Identity data</b> — your full name, date of birth, and national insurance number, required to verify your identity for regulatory compliance.</p>
          <p><b>Contact data</b>  — email address, phone number, and postal address, used to communicate account activity and service updates.</p>
          <p><b>Financial data</b> — bank account details, invoices, expense receipts, and payroll records you upload or connect. Processed under contract to deliver core platform features.</p>
          <p><b>Usage data</b> — page views, feature interactions, and session duration, collected automatically to improve the product under legitimate interest.</p>
          <p><b>Device data</b>  — IP address, browser type, and operating system, used for security monitoring and fraud prevention.</p>
          <p>We do not knowingly collect special category data. If you share such information in a support message, we handle it under explicit consent and delete it once the query is resolved.</p>
        </section>

        {/* 2 */}
        <section id="section2" className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How We Use It</h2>
          <p>
            Personal data is used strictly for the purposes disclosed at the time of collection. We do not repurpose data without notifying you and, where required by law, obtaining your prior consent.
          </p>
          <p><b>Service delivery</b> — provisioning accounts, processing transactions, generating reports and tax summaries, and sending account notifications.</p>
          <p><b>Legal compliance</b> — meeting obligations under the Companies Act 2006, HMRC Making Tax Digital requirements, and Anti-Money Laundering regulations.</p>
          <p><b>Product improvement</b>  — analysing aggregated usage patterns to prioritise features and resolve bugs, using anonymised data wherever possible.</p>
          <p><b>Security</b> — detecting fraudulent logins, monitoring for platform abuse, and maintaining audit logs for up to 12 months.</p>
          <p><b>Communications</b>  — sending transactional emails, product digests (opt-out available), and occasional feedback surveys.</p>
          <p>We do not use your financial data to train machine learning models or sell derived insights to third parties. Automated decision-making with significant legal effects is not performed on the Fiscal platform.</p>
        </section>

        {/* 3 */}
        <section id="section3" className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Third-Party Sharing</h2>
          <p>
            We share personal data with third parties only where necessary to operate the service, satisfy a legal obligation, or protect our legitimate interests. We never sell personal data.
          </p>
          <p><b>Amazon Web Services (EU-West-2, London)</b> — all Fiscal data is hosted on AWS under a Data Processing Agreement. Data does not leave the UK/EU region.</p>
          <p><b>Stripe Payments Europe Ltd</b>— handles subscription billing. Stripe is the data controller for payment card data and maintains PCI-DSS certification independently.</p>
          <p><b>Postmark (Wildbit LLC) </b> — delivers transactional and notification emails. Data is processed within the EU under a standard contractual clauses agreement.</p>
          <p><b>Sentry (Functional Software, Inc.)</b> — captures anonymised error traces for debugging. PII scrubbing is enabled and EU data residency is configured.</p>
          <p><b>Plausible Analytics</b>  — cookie-free, privacy-first page analytics hosted in the EU. No personal identifiers are collected or stored.</p>
          <p>All sub-processors are contractually bound to process data only on our documented instructions, maintain appropriate security controls, and notify us without undue delay of any personal data breach.</p>
        </section>

        {/* 4 */}
        <section id="section4" className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Data Retention</h2>
          <p>We keep personal data only for as long as necessary to fulfil the purpose it was collected for, or as required by applicable law.</p>
          <p><b>Active account data</b> is retained for the duration of your subscription and deleted or anonymised within 30 days of a verified account closure request.</p>
          <p><b>Financial transaction records</b> are retained for seven years to comply with HMRC requirements and UK tax legislation.</p>
          <p><b>Security and audit logs</b> are held on a rolling 12-month window, with older entries deleted automatically.</p>
          <p><b>Support communications</b>  are retained for three years to help resolve future disputes and identify recurring issues.</p>
          <p><b>Encrypted backup snapshots</b> are rotated on a 90-day cycle.</p>
          <p>
            You may request early deletion of your data at any time by emailing{" "}
            <a href="mailto:privacy@kayana.co.uk" className={styles.link}> privacy@kayana.co.uk</a>.
            Requests are processed within 30 days. Note that certain financial records must be retained regardless of a deletion request to satisfy statutory obligations.
          </p>
        </section>

        {/* 5 */}
        <section id="section5" className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Your Rights – GDPR</h2>
          <p>
            If you are based in the UK or European Economic Area, you have the following rights under UK GDPR and EU GDPR. All rights are free to exercise and we will respond within one calendar month (extendable by two months for complex requests, with prior notice).
          </p>
          <p><b>Right of access</b>  — request a copy of all personal data we hold about you.</p>
          <p><b>Right to rectification</b> — ask us to correct inaccurate or incomplete data.</p>
          <p><b>Right to erasure</b>  — request deletion where there is no overriding legal basis to retain it.</p>
          <p><b>Right to restriction</b>  — ask us to pause processing while a complaint is investigated.</p>
          <p><b>Right to portability</b> — receive your data in a structured, machine-readable format.</p>
          <p><b>Right to object</b>  — object to processing based on legitimate interest or for direct marketing</p>
          <p>
            To exercise any right, email{" "}
            <a href="mailto:dpo@kayana.co.uk" className={styles.link}>dpo@kayana.co.uk</a>{" "}
            with the subject "Data Subject Request – [Right]". We may ask you to verify your identity first. If you are unsatisfied with our response, you may complain to the{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className={styles.link}>
              Information Commissioner's Office (ICO)
            </a>{" "}
            in the UK, or the supervisory authority in your EU member state.
          </p>
        </section>

        {/* 6 */}
        <section id="section6" className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Contact the DPO</h2>
          <p>Kayana Ltd has appointed a Data Protection Officer in accordance with Article 37 of UK GDPR. The DPO oversees this policy and our compliance with data protection law.</p>
          <p><b>James Hartley, Data Protection Officer</b></p>
          <p><a href="mailto:dpo@kayana.co.uk" className={styles.link}>dpo@kayana.co.uk</a></p>
          <p>Response time: within 3 business days</p>
          <p><b>Registered address</b></p>
          <p>Kayana Ltd, 1 Canada Square, Level 27, Canary Wharf, London, E14 5AB, United Kingdom</p>
          <p className={styles.footnote}>
            This policy was last reviewed by the DPO on 4 June 2026. We will notify active subscribers by email at least 14 days before any material changes take effect.
          </p>
        </section>

      </div>
    </section>
  );
}