import { prisma } from '@/lib/prisma';

function daysBetween(a: Date, b: Date){ return Math.abs(+a - +b)/86400000 }

export async function POST(){
  const since = new Date(Date.now() - 90*86400000);
  const opps = await prisma.opportunity.findMany({ where: { updatedAt: { gte: since }}});
  const won = opps.filter(o=>o.stageName.toLowerCase().includes('won')).length;
  const lost = opps.filter(o=>o.stageName.toLowerCase().includes('lost')).length;
  const winRate = (won + lost) ? won / (won + lost) : null;

  const pipelineStages = ['Proposal','Negotiation','Commit','Closed Won'];
  const pipelineAmount = opps.filter(o=>pipelineStages.includes(o.stageName)).reduce((s,o)=>s+(o.amount||0),0);
  const quota = Number(process.env.SE_QUOTA_NEXT_90D || '100000');
  const pipelineCoverage = quota ? pipelineAmount / quota : null;

  const wonOpps = opps.filter(o=>o.stageName.toLowerCase().includes('won') && o.closeDate);
  const ct = wonOpps.length ? wonOpps.reduce((s,o)=> s + daysBetween(o.createdAt, o.closeDate!), 0)/wonOpps.length : null;

  const activeOpps = opps.filter(o=>!o.stageName.toLowerCase().includes('won') && !o.stageName.toLowerCase().includes('lost')).length;
  const activeProjects = await prisma.project.count({ where: { status: { in: ['ACTIVE','PLANNING']}}});
  const w1 = Number(process.env.SE_LOAD_W1 || '1.0');
  const w2 = Number(process.env.SE_LOAD_W2 || '1.5');
  const seLoadIndex = w1*activeOpps + w2*activeProjects;

  const skills = await prisma.skill.findMany();
  const nowMs = Date.now();
  const skillsIndex = skills.length ? skills.reduce((s,sk)=>{
    const weeks = (nowMs - new Date(sk.updatedAt).getTime()) / (7*86400000);
    const weight = Math.pow(0.95, Math.max(0,weeks));
    return s + weight * sk.level;
  },0) / skills.length : null;

  const snap = await prisma.kpiSnapshot.create({ data: { period: new Date(), winRate, pipelineCoverage, cycleTimeDays: ct, seLoadIndex, skillsIndex } });
  return Response.json(snap);
}
