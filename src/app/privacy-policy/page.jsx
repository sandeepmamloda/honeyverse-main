import Heroprivacy from "@/components/privacy-policy/heroprivacy/heroprivacy";
import Content from "@/components/privacy-policy/content/content";

export const metadata = {
  title: "Privacy Policy | Honeyverse",
  description:
    "How Kayana Ltd collects, uses, and protects personal data in connection with the Fiscal platform.",
};

const PrivacyPolicyPage = function () {
  return (
    <main>
      <Heroprivacy />
      <Content/>
      {/* Privacy Policy body content goes here — sections, headings, paragraphs etc. */}
    </main>
  );
};

export default PrivacyPolicyPage;