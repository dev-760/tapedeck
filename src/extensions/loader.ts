import QuickCrypto from 'react-native-quick-crypto';
import * as FileSystem from 'expo-file-system';
import JSZip from 'jszip';
import { RegistryEntry, ExtensionManifest } from './types';

const EXTENSIONS_DIR = `${FileSystem.documentDirectory}extensions/`;

export async function downloadAndInstallExtension(
  entry: RegistryEntry
): Promise<{ manifest: ExtensionManifest; code: string }> {
  // 1. Download the .sflx package
  const response = await fetch(entry.download_url);
  const arrayBuffer = await response.arrayBuffer();

  // 2. Verify SHA-256 checksum
  const hashBuffer = QuickCrypto.createHash('sha256')
    .update(Buffer.from(arrayBuffer))
    .digest();
  const computedHash = Buffer.from(hashBuffer).toString('hex');

  if (computedHash !== entry.sha256) {
    throw new Error(
      `Checksum mismatch for ${entry.id}: expected ${entry.sha256}, got ${computedHash}`
    );
  }

  // 3. Extract the ZIP archive (.sflx is a renamed ZIP)
  const zip = await JSZip.loadAsync(arrayBuffer);

  // 4. Read manifest.json and index.js
  const manifestFile = zip.file('manifest.json');
  const codeFile = zip.file('index.js');

  if (!manifestFile || !codeFile) {
    throw new Error(
      `Extension ${entry.id} is missing manifest.json or index.js`
    );
  }

  const manifestText = await manifestFile.async('string');
  const manifest: ExtensionManifest = JSON.parse(manifestText);
  const code = await codeFile.async('string');

  // 5. Persist to disk for future loads
  const extDir = `${EXTENSIONS_DIR}${entry.id}/`;
  await FileSystem.makeDirectoryAsync(extDir, { intermediates: true });
  await FileSystem.writeAsStringAsync(`${extDir}manifest.json`, manifestText);
  await FileSystem.writeAsStringAsync(`${extDir}index.js`, code);

  return { manifest, code };
}
