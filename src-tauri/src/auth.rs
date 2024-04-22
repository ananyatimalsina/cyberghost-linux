use reqwest::{header::{HeaderMap, AUTHORIZATION}, Client, Response};
use serde_json::Value;
use std::collections::HashMap;
use dirs;
extern crate ini;
use ini::Ini;
use std::fs::File;
use std::io::{Read, Write};

use crate::definitions;

async fn get_device(bearer: &str) -> Result<(String, String, String), definitions::Error> {
    let client: Client = Client::new();

    let mut headers: HeaderMap = HeaderMap::new();
    headers.insert(AUTHORIZATION, format!("Bearer {}", bearer).parse().unwrap());
    headers.insert("x-app-key", "QzgDsDNUXlgF9jehkTHHtBJwwI4RyInkZQDRJfLyz".parse().unwrap());

    let mut payload: HashMap<String, Value> = HashMap::new();
    payload.insert("linuxApp".to_owned(), Value::Bool(true));
    payload.insert("machineName".to_owned(), Value::String(String::new()));

    let res: Response = client.post("https://v2-api.cyberghostvpn.com/v2/my/devices")
        .headers(headers)
        .json(&payload)
        .send()
        .await?;

    let rj: Value = res.json().await?;

    let name = rj["oauthConsumers"]["appName"].as_str().unwrap().to_string();
    let device_token: String = rj["token"].as_str().unwrap().to_string();
    let device_secret: String = rj["tokenSecret"].as_str().unwrap().to_string();
    
    Ok((name, device_token, device_secret))
}

async fn login(username: &str, password: &str) -> Result<String, definitions::Error> {
    let client: Client = Client::new();

    let mut headers: HeaderMap = HeaderMap::new();
    headers.insert("x-app-key", "QzgDsDNUXlgF9jehkTHHtBJwwI4RyInkZQDRJfLyz".parse().unwrap());

    let mut payload = HashMap::new();
    payload.insert("username", username);
    payload.insert("password", password);

    let res: Response = client.get("https://v2-api.cyberghostvpn.com/v2/my/account/jwt?language=en")
        .headers(headers)
        .json(&payload)
        .send()
        .await?;

    let rj: Value = res.json().await?;

    let token: String = rj["jwt"].as_str().unwrap().to_string();
    
    Ok(token)
}

pub(crate) async fn validate_login() -> Result<bool, definitions::Error> {
    match dirs::home_dir() {
        Some(home) => match home.to_str() {
            Some(home_str) => {
                let token_path_str: String = format!("{}/.cyberghost/token", home_str);

                let mut token_file: File = File::open(token_path_str).expect("Unable to open the token file");
                let mut token_val: String = String::new();
                token_file.read_to_string(&mut token_val).expect("Unable to read the token file");

                // TODO: Validate Token
            },
            None => println!("Unable to convert your home dir to str!"),
        },
        None => println!("Unable to get your home dir!")
    }

    Ok(true.into())
}


pub(crate) async fn perform_login(username: String, password: String) -> Result<bool, definitions::Error> {
    match dirs::home_dir() {
        Some(home) => match home.to_str() {
            Some(home_str) => {
                let path_str: String = format!("{}/.cyberghost/config.ini", home_str);

                let mut config = Ini::load_from_file(path_str.clone()).unwrap();

                let token_path_str: String = format!("{}/.cyberghost/token", home_str);

                let token: String = login(&username, &password).await?;

                let (name, device_token, device_secret) = get_device(&token).await?;

                config.with_section(Some("account"))
                    .set("username", username)
                    .set("password", password);

                config.with_section(Some("device"))
                    .set("name", name)
                    .set("token", device_token)
                    .set("secret", device_secret);

                config.write_to_file(path_str).unwrap();

                let mut token_file: File = File::create(token_path_str).expect("Unable to create the token file");
                token_file.write_all(token.as_bytes()).expect("Unable to write to the token file");
            },
            None => println!("Unable to convert your home dir to str!"),
        },
        None => println!("Unable to get your home dir!")
    }

    Ok(true.into())
}