export interface RegistryEntry {
  id: string;
  display_name: string;
  description: string;
  version: string;
  download_url: string;
  sha256: string;
  category: string;
  min_app_version: string;
  icon_url?: string;
}

export interface ExtensionManifest {
  name: string;
  displayName: string;
  version: string;
  description: string;
  type: string[];
  minAppVersion?: string;
  permissions: {
    network: string[];
    storage: boolean;
    file: boolean;
  };
  settings?: any[];
  qualityOptions?: any[];
  [key: string]: any;
}
