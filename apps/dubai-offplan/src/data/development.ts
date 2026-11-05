/** Fictional development — never describe as actual inventory. */
export const development = {
  name: 'MARIS Residences',
  location: 'Dubai Islands, Dubai (fictional concept address)',
  developer: 'Maris Development Studio (fictional)',
  priceFrom: 1850000,
  payment: [20,50,30],
  handover: 'Q4 2029',
  propertyTypes: [
    { label:'One-bedroom', bedrooms:1, area:'72–88 m²', price:'From AED 1.85M', plan:'one-bedroom.svg' },
    { label:'Two-bedroom', bedrooms:2, area:'112–145 m²', price:'From AED 2.75M', plan:'two-bedroom.svg' },
    { label:'Three-bedroom', bedrooms:3, area:'175–210 m²', price:'From AED 4.3M', plan:'three-bedroom.svg' },
  ],
} as const;
