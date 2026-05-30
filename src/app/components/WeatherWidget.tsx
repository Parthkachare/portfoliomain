import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cloud, Sun, CloudRain, MapPin } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 28,
    condition: 'sunny',
    location: 'Mumbai, India'
  });

  useEffect(() => {
    // Mock weather data - in real app, fetch from weather API
    const conditions: ('sunny' | 'cloudy' | 'rainy')[] = ['sunny', 'cloudy', 'rainy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    setWeather({
      temp: 22 + Math.floor(Math.random() * 15),
      condition: randomCondition,
      location: 'Mumbai, India'
    });
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="size-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="size-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="size-6 text-blue-500" />;
    }
  };

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotate: weather.condition === 'sunny' ? 360 : 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {getWeatherIcon()}
      </motion.div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold dark:text-white">{weather.temp}°C</span>
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
          <MapPin className="size-3" />
          <span>{weather.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
