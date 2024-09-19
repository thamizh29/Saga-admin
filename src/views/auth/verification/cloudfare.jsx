import React, { useEffect, useRef } from 'react';

const TurnstileWidget = ({ siteKey, onVerify }) => {
  const turnstileRef = useRef(null);
  const widgetId = useRef(null); // Store the widget's ID to prevent re-render

  useEffect(() => {
    // Ensure window.turnstile exists and the widget isn't already rendered
    if (window.turnstile && !widgetId.current) {
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: onVerify,
      });
    }
  }, [siteKey, onVerify]);

  return <div ref={turnstileRef}></div>;
};

export default TurnstileWidget;
