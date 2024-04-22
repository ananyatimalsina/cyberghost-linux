enum ServerType {
    Traffic = 'Traffic',
    Torrent = 'Torrent',
    Streaming = 'Streaming',
}
  
interface Server {
    country: string;
    city: string;
    serverType: ServerType;
}

export {ServerType };
export type { Server };
