const { hasOwnProperty } = Object.prototype;

interface PlatformObject {
  [key: string]: any;
  default: any;
}

const Platform = {
  OS: 'unknown',
  Version: 0,
  select: (obj: PlatformObject) => {
    if (hasOwnProperty.call(obj, Platform.OS)) {
      return obj[Platform.OS];
    }
    return obj.default;
  },
  inject: (platform: { OS: string; Version: number; }) => {
    Platform.OS = platform.OS;
    Platform.Version = platform.Version;
  },
};

export default Platform;
