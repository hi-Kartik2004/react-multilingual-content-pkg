import React, { useState, useEffect, useRef } from "react";
import "./GoogleTranslator.scss";

type Props = {
  className?: string;
  selectClassName?: string;
  languages?: string[]; // Update type to string[]
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

const GoogleTranslator: React.FC<Props> = ({
  className,
  selectClassName = "testing",
  languages = [],
}) => {
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<MutationObserver | null>(null);
  console.log(languages);

  useEffect(() => {
    const scriptId = "google-translate-script";

    const addGoogleTranslateScript = () => {
      if (!document.getElementById(scriptId)) {
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
          setLoading(false);
        };

        document.body.appendChild(script);
      } else {
        // Script already exists, initialize immediately
        if (window.google && window.google.translate) {
          window.googleTranslateElementInit();
          setLoading(false);
        }
      }
    };

    let selectElement = document.querySelector<HTMLSelectElement>(
      "#google_translate_element select"
    );

    if (selectElement) {
      document.body.removeChild(selectElement);
    }

    addGoogleTranslateScript();

    // Set up a MutationObserver to watch for changes in the DOM
    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const selectElement = document.querySelector<HTMLSelectElement>(
            "#google_translate_element select"
          );
          if (
            selectElement &&
            !selectElement.classList.contains(selectClassName)
          ) {
            let selectClassNameArray = new Set<string>();

            let classArray = selectClassName.trim().split(/\s+/);
            classArray.forEach((className) =>
              selectClassNameArray.add(className)
            );

            if (selectElement) {
              selectClassNameArray.forEach((className) => {
                selectElement.classList.add(className);
              });

              // Hide unwanted language options
              if (languages.length > 0) {
                const options =
                  selectElement.querySelectorAll<HTMLOptionElement>("option");
                options.forEach((option) => {
                  if (languages.indexOf(option.value) === -1) {
                    option.classList.add("hidden");
                  }
                });
              }
            }
            observerRef.current?.disconnect();
          }
        }
      });
    });

    // Start observing the document with the configured parameters
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      observerRef.current?.disconnect();
    };
  }, [selectClassName, languages]);

  if (loading) return <p>Loading...</p>;

  return <div id="google_translate_element" className={className}></div>;
};

export default GoogleTranslator;
