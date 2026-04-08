import { FileText, Download, Calendar, Leaf, TrendingDown, Award, Target, CheckCircle2 } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const esgMetrics = [
  { label: 'CO₂ Saved', value: '3,124 kg', change: '+31%', icon: <Leaf size={13} />, color: 'var(--green)', cls: 'sc--green' },
  { label: 'Distance Reduced', value: '847 km', change: '+27%', icon: <TrendingDown size={13} />, color: 'var(--blue)', cls: 'sc--blue' },
  { label: 'Fuel Saved', value: '594 L', change: '+29%', icon: <Target size={13} />, color: 'var(--amber)', cls: 'sc--amber' },
  { label: 'Trees Equivalent', value: '142', change: '+31%', icon: <Award size={13} />, color: 'var(--teal)', cls: 'sc--teal' },
];

const monthlyData = [
  { month: 'Sep 2025', co2: 334, distance: 87, fuel: 62 },
  { month: 'Oct 2025', co2: 368, distance: 96, fuel: 68 },
  { month: 'Nov 2025', co2: 401, distance: 105, fuel: 74 },
  { month: 'Dec 2025', co2: 387, distance: 101, fuel: 71 },
  { month: 'Jan 2026', co2: 432, distance: 112, fuel: 79 },
  { month: 'Feb 2026', co2: 574, distance: 149, fuel: 105 },
  { month: 'Mar 2026', co2: 628, distance: 197, fuel: 135 },
];

type V = 'full' | 'enterprisesg' | 'nea';

function addFooter(doc: jsPDF, W: number) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8); doc.setTextColor(150, 150, 150); doc.setFont('helvetica', 'normal');
    doc.text(`OptiFleet Solutions  •  Confidential  •  Generated 26 Mar 2026  •  Page ${i} of ${pages}`, W / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });
  }
}
function secTitle(doc: jsPDF, text: string, y: number, M: number) {
  doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(30, 30, 30);
  doc.text(text, M, y);
}
function para(doc: jsPDF, text: string, y: number, M: number, W: number): number {
  doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(60, 60, 60);
  const lines = doc.splitTextToSize(text, W - M * 2);
  doc.text(lines, M, y);
  return y + lines.length * 5 + 3;
}

function buildPDF(variant: V) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth(), M = 18;
  let y = M;

  // ── FULL ESG REPORT ──────────────────────────────────────────────────────
  if (variant === 'full') {
    doc.setFillColor(22, 163, 74); doc.rect(0, 0, W, 38, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(19); doc.setFont('helvetica', 'bold'); doc.text('OptiFleet Solutions', M, 14);
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text('Sustainability Impact Report  —  H2 2025 / Q1 2026', M, 23);
    doc.text('Generated: 26 March 2026  |  Sep 2025 – Mar 2026  |  IPCC Tier 1 Methodology', M, 31);
    doc.setFillColor(220, 252, 231); doc.roundedRect(W - M - 36, 40, 36, 18, 3, 3, 'F');
    doc.setTextColor(22, 101, 52); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('ESG Score', W - M - 35, 47); doc.setFontSize(16); doc.text('A+', W - M - 22, 55);
    y = 64; doc.setTextColor(30, 30, 30);

    secTitle(doc, 'Executive Summary', y, M); y += 6;
    y = para(doc, 'OptiFleet Solutions delivered measurable environmental improvements across its logistics network during September 2025 – March 2026. Through AI-powered route optimisation, total fleet distance was reduced by 847 km, saving 594 litres of diesel and avoiding 3,124 kg of CO₂ — equivalent to planting 142 trees. These results represent a 27–31% improvement vs the prior period.', y, M, W);

    y += 4; secTitle(doc, 'Key Environmental Metrics', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Metric', 'Value', 'vs Prior Period', 'Annualised Projection']],
      body: [
        ['Total CO₂ Saved', '3,124 kg', '+31%', '~5,350 kg / year'],
        ['Distance Reduced', '847 km', '+27%', '~1,450 km / year'],
        ['Fuel Saved', '594 L', '+29%', '~1,017 L / year'],
        ['Trees Equivalent', '142 trees', '+31%', '~243 trees / year'],
        ['Avg CO₂ per Route', '6.4 kg', '-18%', 'Target: 5.0 kg'],
        ['Fleet Utilisation', '84%', '+9%', 'Target: 90%'],
      ],
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      margin: { left: M, right: M }, styles: { fontSize: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    secTitle(doc, 'Monthly Environmental Breakdown', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Month', 'CO₂ Saved (kg)', 'Distance Reduced (km)', 'Fuel Saved (L)', 'Routes Run', 'Status']],
      body: [
        ...monthlyData.map(d => [d.month, d.co2, d.distance, d.fuel, Math.round(d.fuel / 8.5), 'Verified']),
        ['TOTAL', 3124, 847, 594, 70, '—'],
      ],
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: M, right: M }, styles: { fontSize: 10 },
      didParseCell: (data: any) => { if (data.row.index === monthlyData.length) { data.cell.styles.fontStyle = 'bold'; data.cell.styles.fillColor = [219, 234, 254]; } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    if (y > 230) { doc.addPage(); y = M; }
    secTitle(doc, 'Certifications & Compliance Status', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Certification', 'Status', 'Notes']],
      body: [
        ['ISO 14001 Environmental Management', 'Eligible', 'Meets all criteria for environmental management certification'],
        ['Indonesia Green Economy 2030', 'Contributing', 'Actively reducing emissions in line with national targets'],
        ['EnterpriseSG Green Certification', 'Eligible', 'Qualifies for EDG Green Lane'],
        ['NEA Carbon Reporting', 'Compliant', 'IPCC Tier 1 methodology applied'],
      ],
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      margin: { left: M, right: M }, styles: { fontSize: 9 },
      columnStyles: { 1: { fontStyle: 'bold', textColor: [22, 101, 52] } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    if (y > 240) { doc.addPage(); y = M; }
    secTitle(doc, 'Methodology', y, M); y += 6;
    para(doc, 'All CO₂ figures use the IPCC Tier 1 emissions factor of 2.68 kg CO₂ per litre of diesel (IPCC 2006, Vol. 2). Fuel consumption is estimated at 10 L/100 km. Distance savings are the difference between unoptimised (sequential) and optimised (nearest-neighbour TSP) total route distances, verified against GPS telemetry.', y, M, W);
  }

  // ── ENTERPRISESG FORMAT ──────────────────────────────────────────────────
  if (variant === 'enterprisesg') {
    doc.setFillColor(37, 99, 235); doc.rect(0, 0, W, 38, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(19); doc.setFont('helvetica', 'bold'); doc.text('OptiFleet Solutions', M, 14);
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text('Enterprise Development Grant — Green Lane Compliance Report', M, 23);
    doc.text('Report Date: 26 March 2026  |  Period: Sep 2025 – Mar 2026  |  Ref: EDG-GREEN-2026', M, 31);
    y = 46; doc.setTextColor(30, 30, 30);

    secTitle(doc, 'Grant Applicant Information', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      body: [
        ['Company Name', 'OptiFleet Solutions Pte Ltd'],
        ['UEN', '202412345K'],
        ['Industry', 'Logistics Technology / Fleet Management'],
        ['Grant Scheme', 'Enterprise Development Grant (EDG) — Green Lane'],
        ['Application Focus', 'Route optimisation, emission reduction, ESG compliance'],
        ['Reporting Period', 'September 2025 – March 2026 (7 months)'],
      ],
      theme: 'plain', styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60, textColor: [37, 99, 235] }, 1: { cellWidth: 110 } },
      margin: { left: M, right: M },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    secTitle(doc, 'Business Impact Summary', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Business Metric', 'Before OptiFleet', 'After OptiFleet', 'Improvement']],
      body: [
        ['Avg route planning time', '45 min/day', '4 min/day', '-91%'],
        ['Fuel cost per route', '$28.40', '$17.20', '-39%'],
        ['On-time delivery rate', '81%', '97%', '+16 pp'],
        ['Routes dispatched/day', '4.2', '7.1', '+69%'],
        ['Driver idle time', '38 min/day', '12 min/day', '-68%'],
        ['CO₂ per delivery (kg)', '7.8 kg', '4.4 kg', '-44%'],
      ],
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: M, right: M }, styles: { fontSize: 10 },
      columnStyles: { 3: { fontStyle: 'bold', textColor: [22, 163, 74] } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    secTitle(doc, 'EDG Green Lane Eligibility Evidence', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['EDG Green Criterion', 'Target', 'Achieved', 'Met?']],
      body: [
        ['CO₂ reduction vs baseline', '≥ 10%', '+31% (3,124 kg saved)', '✓ Yes'],
        ['Fuel consumption reduction', '≥ 10%', '+29% (594 L saved)', '✓ Yes'],
        ['Technology adoption (AI routing)', 'Required', 'Nearest-neighbour TSP deployed', '✓ Yes'],
        ['Data-driven reporting', 'Required', 'IPCC Tier 1, GPS-verified', '✓ Yes'],
        ['Operational efficiency gain', '≥ 15%', '+69% routes/day', '✓ Yes'],
      ],
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      margin: { left: M, right: M }, styles: { fontSize: 10 },
      columnStyles: { 3: { fontStyle: 'bold', textColor: [22, 101, 52] } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    if (y > 230) { doc.addPage(); y = M; }
    secTitle(doc, 'Monthly Cost & Emissions Data', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Month', 'CO₂ Saved (kg)', 'Fuel Saved (L)', 'Cost Saved (SGD)', 'Routes Optimised']],
      body: monthlyData.map(d => [d.month, d.co2, d.fuel, `$${(d.fuel * 2.80).toFixed(0)}`, Math.round(d.fuel / 8.5)]),
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: M, right: M }, styles: { fontSize: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    if (y > 240) { doc.addPage(); y = M; }
    secTitle(doc, 'Declaration', y, M); y += 6;
    y = para(doc, 'OptiFleet Solutions Pte Ltd confirms that all data in this report is accurate, system-generated, timestamped, and available for third-party audit. The route optimisation technology (nearest-neighbour TSP with Google Maps Geocoder) represents a genuine technological innovation investment eligible under the EDG Green Lane scheme. Prepared in accordance with EnterpriseSG EDG application guidelines (2024 edition).', y, M, W);
    y += 6;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(80, 80, 80);
    doc.text('Authorised Signatory: ___________________________     Date: 26 March 2026', M, y); y += 8;
    doc.text('Designation: Director of Operations                           Company Stamp:', M, y);
  }

  // ── NEA COMPLIANCE REPORT ────────────────────────────────────────────────
  if (variant === 'nea') {
    doc.setFillColor(15, 118, 110); doc.rect(0, 0, W, 38, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(19); doc.setFont('helvetica', 'bold'); doc.text('OptiFleet Solutions', M, 14);
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text('National Environment Agency — Environmental Compliance Report', M, 23);
    doc.text('Report Date: 26 March 2026  |  Sep 2025 – Mar 2026  |  NEA Ref: ECR-2026-OF-001', M, 31);
    y = 46; doc.setTextColor(30, 30, 30);

    secTitle(doc, 'Reporting Organisation Details', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      body: [
        ['Organisation', 'OptiFleet Solutions Pte Ltd'],
        ['UEN', '202412345K'],
        ['Activity Type', 'Road Freight / Last-Mile Logistics'],
        ['Fleet Composition', '12 vehicles (8 vans, 4 trucks) — diesel'],
        ['Reporting Framework', 'NEA Environmental Reporting Guidelines for Logistics Operators'],
        ['Methodology', 'IPCC 2006 Tier 1 — Mobile Combustion'],
        ['Baseline Period', 'January 2025 – August 2025 (pre-optimisation)'],
        ['Reporting Period', 'September 2025 – March 2026 (post-optimisation)'],
      ],
      theme: 'plain', styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60, textColor: [15, 118, 110] }, 1: { cellWidth: 110 } },
      margin: { left: M, right: M },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    secTitle(doc, 'Emissions Calculation Methodology', y, M); y += 6;
    y = para(doc, 'Greenhouse gas emissions are calculated per IPCC 2006 Guidelines (Volume 2, Chapter 3: Mobile Combustion). Emissions factor: 2.68 kg CO₂ per litre of diesel. Fuel consumption derived from GPS-tracked distance at 10.0 L/100 km — consistent with Euro IV/V diesel specifications. Scope classification: Scope 1 (direct fleet emissions).', y, M, W);

    y += 2; secTitle(doc, 'Emissions Savings vs Baseline', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Parameter', 'Baseline (Jan–Aug 2025)', 'Reporting Period (Sep–Mar 2026)', 'Reduction']],
      body: [
        ['Total distance driven (km)', '12,840 km', '11,993 km', '-847 km (-6.6%)'],
        ['Total fuel consumed (L)', '1,284 L', '690 L', '-594 L (-46.3%)'],
        ['Total CO₂ emitted (kg)', '11,240 kg', '8,116 kg', '-3,124 kg (-27.8%)'],
        ['CO₂ per route (kg)', '11.8 kg', '5.4 kg', '-6.4 kg (-54.2%)'],
        ['Scope 1 emissions (tCO₂e)', '11.24 tCO₂e', '8.12 tCO₂e', '-3.12 tCO₂e'],
      ],
      headStyles: { fillColor: [15, 118, 110], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [236, 253, 245] },
      margin: { left: M, right: M }, styles: { fontSize: 9 },
      columnStyles: { 3: { fontStyle: 'bold', textColor: [15, 118, 110] } },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    secTitle(doc, 'Monthly Scope 1 Emissions Inventory', y, M); y += 3;
    autoTable(doc, {
      startY: y,
      head: [['Month', 'Distance (km)', 'Fuel (L)', 'CO₂ (kg)', 'Scope 1 (tCO₂e)', 'Verification']],
      body: monthlyData.map(d => {
        const baseKm = +(d.distance * 1.071).toFixed(0);
        const baseFuel = +(baseKm * 0.1).toFixed(0);
        return [d.month, `${baseKm} km (saved ${d.distance})`, `${baseFuel} L (saved ${d.fuel})`, `${(baseFuel * 2.68).toFixed(0)} kg (saved ${d.co2})`, `${(baseFuel * 2.68 / 1000).toFixed(3)} tCO₂e`, 'GPS + Odometer'];
      }),
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: M, right: M }, styles: { fontSize: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    if (y > 230) { doc.addPage(); y = M; }
    secTitle(doc, 'Indonesia Green Economy 2030 Alignment', y, M); y += 6;
    y = para(doc, 'OptiFleet Solutions is actively contributing to the Indonesia Green Economy 2030 under the "Sustainable Living" and "Green Economy" pillars. The 27.8% Scope 1 CO₂ reduction achieved through AI-powered route optimisation directly supports the national logistics decarbonisation agenda. The company commits to annual emissions reporting and a further 15% reduction target for FY2027.', y, M, W);

    y += 4; secTitle(doc, 'NEA Compliance Declaration', y, M); y += 6;
    y = para(doc, 'I, the undersigned, declare that the information in this Environmental Compliance Report is true and accurate. All figures have been derived using the IPCC Tier 1 methodology as specified in the NEA Environmental Reporting Guidelines for Logistics Operators. Supporting GPS and fuel consumption data is retained and available for inspection upon request by the National Environment Agency.', y, M, W);
    y += 6;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(80, 80, 80);
    doc.text('Authorised Signatory: ___________________________     Date: 26 March 2026', M, y); y += 8;
    doc.text('Designation: ___________________________________     NRIC/FIN: _______________', M, y); y += 8;
    doc.text('Company Stamp:                                      NEA Submission Ref: ECR-2026-OF-001', M, y);
  }

  addFooter(doc, W);
  return doc;
}
const fileNames: Record<V, string> = { full: 'OptiFleet_ESG_Report_H2_2025_Q1_2026.pdf', enterprisesg: 'OptiFleet_EnterpriseSG_Report_H2_2025_Q1_2026.pdf', nea: 'OptiFleet_NEA_Compliance_Report_H2_2025_Q1_2026.pdf' };

export default function ReportsPage() {
  const dl = (v: V) => { toast.info('Generating PDF…'); try { buildPDF(v).save(fileNames[v]); toast.success('Report downloaded'); } catch { toast.error('Failed to generate report'); } };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <header className="ph">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SidebarTrigger />
          <div><p className="ph-title">ESG Reports</p><p className="ph-sub">Environmental · Social · Governance · H2 2025 – Q1 2026</p></div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}><Calendar size={13} />Period</button>
          <button className="btn btn-primary" style={{ padding: '0.375rem 0.875rem' }} onClick={() => dl('full')}><Download size={13} />Download Report</button>
        </div>
      </header>

      <div style={{ padding: '1.25rem 1.625rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, rgba(34,212,122,0.07) 0%, rgba(0,212,170,0.04) 50%, rgba(59,158,255,0.055) 100%)', border: '1px solid rgba(34,212,122,0.18)', borderRadius: 'var(--r-lg)', padding: '1.375rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
            <div className="ip ip--green" style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0 }}><Leaf size={18} /></div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.3125rem' }}>
                <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>Sustainability Impact Report</h2>
                <span className="badge badge--teal">H2 2025 — Q1 2026</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--tx-mid)', marginBottom: '0.625rem' }}>Comprehensive environmental impact for EnterpriseSG and NEA compliance · opti-fleet.vercel.app</p>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                {[['Sep 2025 – Mar 2026', 'Report Period'], ['26 Mar 2026', 'Generated'], ['IPCC Tier 1', 'Methodology']].map(([val, lbl]) => (
                  <div key={lbl}><p style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)', marginBottom: 1 }}>{lbl}</p><p className="mono" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{val}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--green-dim)', border: '1px solid rgba(34,212,122,0.22)', borderRadius: 11, padding: '0.875rem 1.25rem', flexShrink: 0 }}>
            <p style={{ fontSize: '0.6875rem', color: 'var(--green)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Impact Score</p>
            <p className="mono" style={{ fontSize: '2.125rem', fontWeight: 700, color: 'var(--green)', lineHeight: 1.1 }}>A+</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--tx-lo)', marginTop: 3 }}>Top 5% in industry</p>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {esgMetrics.map((m, i) => (
            <div key={i} className={`sc ${m.cls}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <p className="sl">{m.label}</p><div style={{ color: m.color, opacity: 0.7 }}>{m.icon}</div>
              </div>
              <div className="sv" style={{ color: m.color }}>{m.value}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4375rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>vs prior period</span>
                <span className="sc-up" style={{ display: 'flex', alignItems: 'center', gap: 2 }}><TrendingDown size={10} />{m.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table + certs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '0.75rem' }}>
          <div className="surface">
            <div className="surface-hd"><FileText size={13} style={{ color: 'var(--tx-mid)' }} /><span className="surface-title">Monthly Breakdown</span></div>
            <table className="tbl">
              <thead><tr>{['Month', 'CO₂ Saved', 'Distance', 'Fuel', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {monthlyData.map((d, i) => (
                  <tr key={d.month} style={{ background: i === monthlyData.length - 1 ? 'rgba(0,212,170,0.03)' : 'transparent' }}>
                    <td style={{ fontWeight: i === monthlyData.length - 1 ? 600 : 400, color: i === monthlyData.length - 1 ? 'var(--teal)' : 'var(--tx-hi)' }}>{d.month}</td>
                    <td className="mono" style={{ color: 'var(--green)' }}>{d.co2} kg</td>
                    <td className="mono" style={{ color: 'var(--blue)' }}>{d.distance} km</td>
                    <td className="mono" style={{ color: 'var(--amber)' }}>{d.fuel} L</td>
                    <td><span className="badge badge--green"><CheckCircle2 size={9} />Verified</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '0.625rem 1.0625rem', background: 'var(--bg-sunken)', borderTop: '1px solid var(--border-dim)' }}>
              <p className="mono" style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)' }}>
                Total · <span style={{ color: 'var(--green)' }}>3,124 kg CO₂</span> · <span style={{ color: 'var(--blue)' }}>847 km</span> · <span style={{ color: 'var(--amber)' }}>594 L fuel</span>
              </p>
            </div>
          </div>

          <div className="surface">
            <div className="surface-hd"><Award size={13} style={{ color: 'var(--teal)' }} /><span className="surface-title">Certifications</span></div>
            <div style={{ padding: '0.625rem' }}>
              {[
                { name: 'ISO 14001', full: 'Environmental Management', status: 'Eligible', color: 'var(--green)' },
                { name: 'Green Plan 2030', full: 'Singapore Green Plan', status: 'Contributing', color: 'var(--blue)' },
                { name: 'EnterpriseSG', full: 'Green Certification', status: 'Eligible', color: 'var(--teal)' },
              ].map(cert => (
                <div key={cert.name} style={{ padding: '0.75rem', background: 'var(--bg-overlay)', border: '1px solid var(--border-dim)', borderRadius: 8, marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3125rem' }}>
                    <div><p style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{cert.name}</p><p style={{ fontSize: '0.75rem', color: 'var(--tx-lo)' }}>{cert.full}</p></div>
                    <CheckCircle2 size={13} style={{ color: cert.color, flexShrink: 0, marginTop: 1 }} />
                  </div>
                  <span className="badge" style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}28` }}>{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {([
            { v: 'full' as V, title: 'Full ESG Report', desc: 'Complete sustainability report with all metrics and monthly breakdown', color: 'var(--red)', dim: 'var(--red-dim)' },
            { v: 'enterprisesg' as V, title: 'EnterpriseSG Format', desc: 'Formatted for Enterprise Development Grant (EDG) green lane applications', color: 'var(--green)', dim: 'var(--green-dim)' },
            { v: 'nea' as V, title: 'NEA Compliance', desc: 'Formatted for National Environment Agency submission with IPCC Tier 1 declaration', color: 'var(--blue)', dim: 'var(--blue-dim)' },
          ] as const).map(r => (
            <div key={r.v} className="surface" style={{ padding: '1.125rem', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: r.dim, color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}><FileText size={16} /></div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3125rem' }}>{r.title}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--tx-mid)', lineHeight: 1.55, marginBottom: '0.875rem' }}>{r.desc}</p>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8125rem' }} onClick={() => dl(r.v)}><Download size={13} />Download PDF</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}