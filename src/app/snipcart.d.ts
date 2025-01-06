declare global {
    interface Window {
      SnipcartSettings: {
        publicApiKey: string;
        loadStrategy: string;
        protocol?: string;  // Optional
        domain?: string;    // Optional
        version?:string;
      };
    }
  }
  
  export {};
  