export {};
declare global {
  interface Window {
    electron: {
      send: (channel: string, data: any) => void;
      receive: (channel: string, func: Function) => void;
    };
    api: {
      requestData: () => Promise<Event[]>;
    };
  }
}
