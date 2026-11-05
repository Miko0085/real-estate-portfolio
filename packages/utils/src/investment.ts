/** Illustrative unleveraged rental yield. Not a return forecast or financial advice. */
export type YieldAssumptions={price:number;rent:number;service:number;management:number;occupancy:number};
export type YieldSummary={grossYield:number|null;netYield:number|null;netIncome:number};
export function calculateIllustrativeYield(a:YieldAssumptions):YieldSummary{
 const safe=(x:number)=>Number.isFinite(x)?Math.max(0,x):0;
 const price=safe(a.price),rent=safe(a.rent),service=safe(a.service),management=safe(a.management);
 const occupancy=Math.min(100,safe(a.occupancy));
 const netIncome=rent*occupancy/100-service-management;
 return {grossYield:price>0?rent/price*100:null,netYield:price>0?netIncome/price*100:null,netIncome};
}
