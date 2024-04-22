use std::fmt;

pub enum Service {
    Wireguard,
    OpenVPN,
}

impl fmt::Display for Service {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", match self {
            Service::Wireguard => "wireguard",
            Service::OpenVPN => "openvpn",
        })
    }
}

pub enum ServerType {
    Traffic,
    Torrent,
    Streaming,
}

impl fmt::Display for ServerType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", match self {
            ServerType::Traffic => "traffic",
            ServerType::Torrent => "torrent",
            ServerType::Streaming => "streaming",
        })
    }
}

pub struct Server {
    pub country: String,
    pub city: String,
    pub server_type: ServerType,
}