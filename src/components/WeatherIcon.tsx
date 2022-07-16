import {
  CircleNotch,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Lightning,
  Moon,
  MoonStars,
  Snowflake,
  Sun,
  SunDim,
  UmbrellaSimple
} from "phosphor-react"

export const WeatherIcon = (props: WeatherIconProps): JSX.Element => {
  const { code, hour } = props
  const size = 160
  const isDay = (hour >= 6 && hour < 18) ? true : false

  if (code === 0) return isDay ? <Sun size={size} /> : <MoonStars size={size} />
  if (code === 1) return isDay ? <SunDim size={size} /> : <Moon size={size} />
  if (code === 2 || code === 3) return isDay ? <CloudSun size={size} /> : <CloudMoon size={size} />
  if (code === 45 || code === 48) return <CloudFog size={size} />
  if (code === 51 || code === 53 || code === 55) return <UmbrellaSimple size={size} />
  if (code === 56 || code === 57 || code === 66 || code === 67 || code === 85 || code === 86) return <CloudSnow size={size} />
  if (code === 61 || code === 63 || code === 65) return <CloudRain size={size} />
  if (code === 71 || code === 73 || code === 75 || code === 77) return <Snowflake size={size} />
  if (code === 80 || code === 81 || code === 82) return <CloudLightning size={size} />
  if (code === 95 || code === 96) return <Lightning size={size} />
  return <CircleNotch size={size} />
}

interface WeatherIconProps {
  code: number
  hour: number
}
