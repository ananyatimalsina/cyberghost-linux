// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Output;

use tokio::process::Command;

mod auth;
mod definitions;
mod app_state;

// TODO: Check for valid installation of cyberghost cli

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn perf_login(username: String, password: String) -> Result<bool, definitions::Error> {
    auth::perform_login(username, password).await?;

    Ok(true.into())
}

#[tauri::command]
async fn val_login() -> Result<bool, definitions::Error> {
    auth::validate_login().await?;

    Ok(true.into())
}

#[tauri::command]
async fn connect(service: String, server: app_state::Server) -> Result<bool, definitions::Error> {
    let arg_city: String = if server.city.is_empty() { String::from("") } else { format!("--city {}", server.city) };

    Command::new("cyberghostvpn")
                    .arg(format!("-- {}", service))
                    .arg(format!("--server-type {}", server.server_type.to_string()))
                    .arg(format!("--country-code {}", server.country))
                    .arg(arg_city)
                    .arg("--connect")
                    .status()
                    .await?;

    Ok(true.into())
}

#[tauri::command]
async fn disconnect() -> Result<bool, definitions::Error> {
    Command::new("cyberghostvpn")
                    .arg("--stop")
                    .status()
                    .await?;

    Ok(true.into())
}

#[tauri::command]
async fn get_status() -> Result<bool, definitions::Error> {
    let output: Output = Command::new("cyberghostvpn")
                    .arg("--status")
                    .output()
                    .await?;

    let output: String = String::from_utf8(output.stdout).unwrap();

    if output == "No VPN connections found." {
        Ok(false.into())
    } else {
        Ok(true.into())
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![val_login, perf_login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}