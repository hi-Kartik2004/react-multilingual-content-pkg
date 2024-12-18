import React, { useEffect, useState } from "react";
import "./GoogleTranslator.scss";

type Props = {
  className?: string;
  selectStyles?: string;
};

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string },
          element: string
        ) => void;
      };
    };
  }
}

const GoogleTranslator: React.FC<Props> = ({ className, selectStyles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const scriptId = "google-translate-script";

    const addGoogleTranslateScript = () => {
      if (!document.getElementById(scriptId) && !loading) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => {
          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
              },
              "google_translate_element"
            );
          };
        };

        document.body.appendChild(script);
      }
    };

    addGoogleTranslateScript();
    setLoading(false);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [loading]);

  const style = document.createElement("style");
  document.head.appendChild(style);
  // background-color: #f1f1f1; 
  style.textContent = `.goog-te-combo{
    ${selectStyles}
  }`


  if (loading) return <p>Loading...</p>;

  return <div id="google_translate_element" className={className}></div>;
};

export default GoogleTranslator;