import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div style={{ margin: "30px 0", textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="pub-2872346905892741"
        data-ad-slot="5950275109"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
