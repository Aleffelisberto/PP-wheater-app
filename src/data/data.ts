export interface IDataResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  elevation: number
  current_weather: {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
  }
  hourly_units: {
    time: string
    temperature_2m: string
    relativehumidity_2m: string
  }
  daily: {
    time: Array<string>
    temperature_2m_max: Array<number>
    temperature_2m_min: Array<number>
  }
  hourly: {
    time: Array<string>
    temperature_2m: Array<number>
    relativehumidity_2m: Array<number>
  }
}

export const getDayByCode = (code: number) => {
  switch (code) {
    case 0: return 'Segunda-feira'
    case 1: return 'Terça-feira'
    case 2: return 'Quarta-feira'
    case 3: return 'Quinta-feira'
    case 4: return 'Sexta-feira'
    case 5: return 'Sábado'
    case 6: return 'Domingo'
    default: return ''
  }
}

export const weatherCode = (code: number) => {
  switch (code) {
    case 0: return 'Céu limpo'
    case 1: return 'Majoritariamente limpo'
    case 2: return 'Parcialmente nublado'
    case 3: return 'Nublado'
    case 45: return 'Nebuloso'
    case 48: return 'Geada'
    case 51: return 'Garoa fraca'
    case 53: return 'Garoa moderada'
    case 55: return 'Garoa densa'
    case 56: return 'Garoa congelante fraca'
    case 57: return 'Garoa congelante densa'
    case 61: return 'Chuva fraca'
    case 63: return 'Chuva moderada'
    case 65: return 'Chuva forte'
    case 66: return 'Chuva congelante fraca'
    case 67: return 'Chuva congelante forte'
    case 71: return 'Nevasca fraca'
    case 73: return 'Nevasca moderada'
    case 75: return 'Nevasca forte'
    case 77: return 'Neve'
    case 80: return 'Pancadas de chuva fraca'
    case 81: return 'Pancadas de chuva moderada'
    case 82: return 'Pancadas de chuva violentas'
    case 85: return 'Chuva de neve leve'
    case 86: return 'Chuva de neve pesada'
    case 95: return 'Tempestade amena'
    case 96: return 'Tempestade violenta'
    default: return ''
  }
}
