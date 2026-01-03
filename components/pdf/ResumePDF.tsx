import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";

// Register fonts (optional - using built-in fonts for now)
// You can add custom fonts here later

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fafafa",
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 70,
    fontFamily: "Helvetica",
  },
  headerSection: {
    backgroundColor: "#0f0f0f",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 45,
    paddingRight: 45,
    marginLeft: -45,
    marginRight: -45,
    marginBottom: 0,
    position: "relative",
  },
  headerGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#3b82f6",
  },
  headerGradientAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "30%",
    height: 6,
    backgroundColor: "#8b5cf6",
  },
  contentSection: {
    flexDirection: "column",
  },
  logo: {
    fontSize: 32,
    fontFamily: "Courier-Bold",
    color: "#3b82f6",
    marginBottom: 12,
    letterSpacing: 3,
  },
  name: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  label: {
    fontSize: 14,
    color: "#93c5fd",
    marginBottom: 14,
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  contactItem: {
    fontSize: 9.5,
    color: "#d1d5db",
    backgroundColor: "#1a1a1a",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  contactSeparator: {
    fontSize: 10,
    color: "#3b82f6",
    paddingHorizontal: 2,
  },
  summary: {
    marginTop: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f0f0f",
    marginTop: 18,
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    backgroundColor: "#ffffff",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionTitleAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#8b5cf6",
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    textAlign: "justify",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 6,
  },
  workItem: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#e5e7eb",
    breakInside: "avoid",
  },
  workItemHighlight: {
    borderLeftColor: "#3b82f6",
  },
  workHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  position: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f0f0f",
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    color: "#3b82f6",
    marginBottom: 2,
    fontWeight: "medium",
  },
  dateLocation: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "right",
  },
  highlights: {
    marginTop: 8,
  },
  highlight: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#374151",
    marginBottom: 4,
    paddingLeft: 12,
    textAlign: "left",
  },
  educationItem: {
    marginBottom: 10,
    breakInside: "avoid",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 6,
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f0f0f",
    marginBottom: 3,
  },
  institution: {
    fontSize: 9.5,
    color: "#3b82f6",
    marginBottom: 2,
  },
  educationLocation: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
    marginTop: 2,
    textAlign: "left",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  skillCategory: {
    width: "48%",
    marginBottom: 10,
    breakInside: "avoid",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 3,
    borderTopColor: "#e5e7eb",
  },
  skillCategoryExpert: {
    borderTopColor: "#3b82f6",
  },
  skillCategoryAdvanced: {
    borderTopColor: "#8b5cf6",
  },
  skillCategoryIntermediate: {
    borderTopColor: "#ec4899",
  },
  skillName: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#0f0f0f",
    marginBottom: 4,
  },
  skillLevel: {
    fontSize: 8,
    color: "#ffffff",
    marginBottom: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
  skillLevelExpert: {
    backgroundColor: "#3b82f6",
  },
  skillLevelAdvanced: {
    backgroundColor: "#8b5cf6",
  },
  skillLevelIntermediate: {
    backgroundColor: "#ec4899",
  },
  skillKeywords: {
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.4,
    textAlign: "left",
  },
  skillBar: {
    height: 3,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginBottom: 6,
    overflow: "hidden",
  },
  skillBarFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    breakInside: "avoid",
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 4,
  },
  languageName: {
    fontSize: 10,
    color: "#0f0f0f",
    fontWeight: "medium",
  },
  languageFluency: {
    fontSize: 8.5,
    color: "#ffffff",
    backgroundColor: "#3b82f6",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 7.5,
    color: "#9ca3af",
    paddingTop: 8,
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  accentBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    marginTop: 28,
    marginBottom: 12,
    borderRadius: 2,
  },
  accentBarGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "60%",
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  section: {
    marginBottom: 16,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 0,
    fontSize: 8,
    color: "#9ca3af",
  },
});

interface ResumePDFProps {
  data: ResumeData;
  translations?: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    present: string;
  };
}

export function ResumePDF({ data, translations }: ResumePDFProps) {
  const t = translations || {
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Technical Skills",
    languages: "Languages",
    present: "Present",
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return t.present;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Dark Background */}
        <View style={styles.headerSection}>
          <Text style={styles.logo}>{"{R}"}</Text>
          <Text style={styles.name}>{data.basics.name}</Text>
          <Text style={styles.label}>{data.basics.label.toUpperCase()}</Text>

          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{data.basics.email}</Text>
            <Text style={styles.contactItem}>{data.basics.phone}</Text>
            <Link src={data.basics.url} style={[styles.contactItem, styles.link]}>
              {data.basics.url.replace("https://", "")}
            </Link>
            <Text style={styles.contactItem}>
              {data.basics.location.city}, {data.basics.location.countryCode}
            </Text>
          </View>

          {data.basics.profiles && data.basics.profiles.length > 0 && (
            <View style={[styles.contactInfo, { marginTop: 8 }]}>
              {data.basics.profiles.map((profile, index) => (
                <Link key={index} src={profile.url} style={[styles.contactItem, styles.link]}>
                  {profile.network}
                </Link>
              ))}
            </View>
          )}

          {/* Gradient Accent Bars */}
          <View style={styles.headerGradient} />
          <View style={styles.headerGradientAccent} />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Summary */}
          <View style={[styles.section, styles.summary]}>
            <Text style={styles.sectionTitle}>{t.summary}</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.text}>{data.basics.summary}</Text>
            </View>
          </View>

          {/* Work Experience */}
          {data.work && data.work.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.experience}</Text>
              {data.work.map((job, index) => (
                <View
                  key={index}
                  style={[
                    styles.workItem,
                    ...(index === 0 ? [styles.workItemHighlight] : [])
                  ]}
                >
                  <View style={styles.workHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{job.position}</Text>
                      <Text style={styles.company}>{job.name}</Text>
                    </View>
                    <View style={{ maxWidth: "40%" }}>
                      <Text style={styles.dateLocation}>
                        {formatDate(job.startDate)} - {formatDate(job.endDate)}
                      </Text>
                      {job.location && (
                        <Text style={styles.dateLocation}>
                          {job.location}
                        </Text>
                      )}
                    </View>
                  </View>
                  {job.highlights && job.highlights.length > 0 && (
                    <View style={styles.highlights}>
                      {job.highlights.map((highlight, idx) => (
                        <Text key={idx} style={styles.highlight}>
                          • {highlight}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.studyType}</Text>
                  <Text style={styles.institution}>
                    {edu.institution} • {formatDate(edu.startDate)} -{" "}
                    {formatDate(edu.endDate)}
                  </Text>
                  {edu.location && (
                    <Text style={styles.educationLocation}>
                      {edu.location}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsGrid}>
                {data.skills.map((skill, index) => {
                  const levelStyle =
                    skill.level === "Expert" ? styles.skillCategoryExpert :
                    skill.level === "Advanced" ? styles.skillCategoryAdvanced :
                    styles.skillCategoryIntermediate;

                  const levelBadgeStyle =
                    skill.level === "Expert" ? styles.skillLevelExpert :
                    skill.level === "Advanced" ? styles.skillLevelAdvanced :
                    styles.skillLevelIntermediate;

                  const skillPercentage =
                    skill.level === "Expert" ? "95%" :
                    skill.level === "Advanced" ? "75%" : "60%";

                  return (
                    <View key={index} style={[styles.skillCategory, levelStyle]}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <Text style={[styles.skillLevel, levelBadgeStyle]}>
                        {skill.level}
                      </Text>
                      <View style={styles.skillBar}>
                        <View style={[styles.skillBarFill, { width: skillPercentage }]} />
                      </View>
                      <Text style={styles.skillKeywords}>
                        {skill.keywords.join(" • ")}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {data.languages.map((lang, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.language}</Text>
                  <Text style={styles.languageFluency}>{lang.fluency}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Accent Bar with Gradient */}
          <View style={styles.accentBar}>
            <View style={styles.accentBarGradient} />
          </View>
        </View>

        {/* Footer - Fixed on every page */}
        <View style={styles.footer} fixed>
          <Text>
            Generated from raafy.dev • Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>

        {/* Page Numbers */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
