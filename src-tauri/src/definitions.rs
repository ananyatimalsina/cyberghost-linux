#[derive(Debug, thiserror::Error)]
pub(crate) enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Reqwest(#[from] reqwest::Error),
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

impl Error {
    pub(crate) fn new(msg: &str) -> Self {
        Self::Io(std::io::Error::new(std::io::ErrorKind::Other, msg))
    }
}