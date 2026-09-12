const fs = require('fs');
const file = 'node_modules/expo-modules-core/android/src/main/java/expo/modules/adapters/react/permissions/PermissionsService.kt';
if(fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('requestedPermissions.contains(permission)', 'requestedPermissions?.contains(permission) == true');
  fs.writeFileSync(file, content);
}

const tpFile = 'node_modules/react-native-track-player/android/src/main/java/com/doublesymmetry/trackplayer/HeadlessJsMediaService.java';
if(fs.existsSync(tpFile)) {
  let tpContent = fs.readFileSync(tpFile, 'utf8');
  tpContent = tpContent.replace(/reactHost\.addReactInstanceEventListener\([\s\S]*?reactHost\.removeReactInstanceEventListener\(this\);\s*\}\s*\}\s*\);/m, `new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            ReactContext rc = reactHost.getCurrentReactContext();
                            while(rc == null) {
                                Thread.sleep(50);
                                rc = reactHost.getCurrentReactContext();
                            }
                            invokeStartTask(rc, taskConfig);
                        } catch (Exception e) {}
                    }
                }).start();`);
  fs.writeFileSync(tpFile, tpContent);
}

