import Script from "next/script";

interface StructuredDataProps {
  type?: "person" | "website" | "breadcrumb";
  data?: Record<string, unknown>;
}

export function StructuredData({ type = "person", data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = "https://raafy.dev";

    if (type === "person") {
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Raafy Shiham",
        url: baseUrl,
        image: `${baseUrl}/og-image.png`,
        jobTitle: "Software Developer",
        description:
          "Software Developer specializing in React.js, Next.js, and TypeScript. Building scalable, high-performance web applications.",
        email: "raafyshiham@gmail.com",
        telephone: "+60115404355",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kuala Lumpur",
          addressCountry: "MY",
        },
        sameAs: [
          "https://github.com/raafy",
          "https://linkedin.com/in/raafyshiham",
          "https://twitter.com/raafyshiham",
        ],
        knowsAbout: [
          "React.js",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Web Development",
          "Frontend Development",
          "Full Stack Development",
        ],
        ...data,
      };
    }

    if (type === "website") {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Raafy - Software Developer",
        url: baseUrl,
        description:
          "Professional portfolio showcasing software development expertise in React.js, Next.js, and modern web technologies.",
        author: {
          "@type": "Person",
          name: "Raafy Shiham",
        },
        inLanguage: ["en-US", "ms-MY"],
        ...data,
      };
    }

    return data || {};
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
