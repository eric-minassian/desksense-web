type ThresholdConfig = {
  yellow: number;
  red: number;
};

export const THRESHOLDS: Record<string, ThresholdConfig> = {
  temperature: {
    yellow: 25.0, // °C
    red: 30.0, // °C
  },
  humidity: {
    yellow: 60.0, // %
    red: 70.0, // %
  },
  light: {
    yellow: 70.0, // %
    red: 85.0, // %
  },
  noise: {
    yellow: 60.0, // dB
    red: 70.0, // dB
  },
  eco2: {
    yellow: 1000, // ppm
    red: 2000, // ppm
  },
  tvoc: {
    yellow: 220, // ppb
    red: 660, // ppb
  },
} as const;
