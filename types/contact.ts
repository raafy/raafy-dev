export interface ContactMessages {
  title: string;
  subtitle: string;
  description: string;
  info: {
    title: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
  };
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
  };
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    messageRequired: string;
  };
  toast: {
    success: string;
    error: string;
  };
  social: {
    title: string;
    description: string;
  };
}
