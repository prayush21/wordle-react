import { useEffect } from "react";

const useImportScriptHook = (resourceUrl: string) => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = resourceUrl;
      script.async = true;
      script.type="text/javascript"
      document.body.appendChild(script);
  return () => {
        document.body.removeChild(script);
      }
    }, [resourceUrl]);
  };

  export default useImportScriptHook;