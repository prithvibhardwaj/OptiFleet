import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  FileText,
  Download,
  Calendar,
  Leaf,
  TrendingDown,
  Award,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const esgMetrics = [
  { label: 'Total CO₂ Saved', value: '3,124 kg', change: '+31%', icon: Leaf, color: 'emerald' },
  { label: 'Distance Reduced', value: '847 km', change: '+27%', icon: TrendingDown, color: 'blue' },
  { label: 'Fuel Saved', value: '594 L', change: '+29%', icon: Target, color: 'amber' },
  { label: 'Trees Equivalent', value: '142 trees', change: '+31%', icon: Award, color: 'green' },
];

const monthlyData = [
  { month: 'September 2025', co2: 334, distance: 87, fuel: 62 },
  { month: 'October 2025', co2: 368, distance: 96, fuel: 68 },
  { month: 'November 2025', co2: 401, distance: 105, fuel: 74 },
  { month: 'December 2025', co2: 387, distance: 101, fuel: 71 },
  { month: 'January 2026', co2: 432, distance: 112, fuel: 79 },
  { month: 'February 2026', co2: 574, distance: 149, fuel: 105 },
  { month: 'March 2026', co2: 628, distance: 197, fuel: 135 },
];

const certifications = [
  { name: 'ISO 14001 Environmental Management', status: 'eligible', description: 'Meets criteria for environmental management certification' },
  { name: 'Singapore Green Plan 2030', status: 'contributing', description: 'Actively contributing to national sustainability goals' },
  { name: 'EnterpriseSG Green Certification', status: 'eligible', description: 'Qualifies for government green business certification' },
];

type ReportVariant = 'full' | 'enterprisesg' | 'nea';

function buildPDF(variant: ReportVariant): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = margin;

  // ── Header bar ──
  doc.setFillColor(22, 163, 74); // green-600
  doc.rect(0, 0, pageW, 36, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('OptiFleet Solutions', margin, 14);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const titleMap: Record<ReportVariant, string> = {
    full: 'Sustainability Impact Report — H2 2025 / Q1 2026',
    enterprisesg: 'EnterpriseSG Green Business Report — H2 2025 / Q1 2026',
    nea: 'NEA Environmental Compliance Report — H2 2025 / Q1 2026',
  };
  doc.text(titleMap[variant], margin, 22);
  doc.text('Generated: 26 March 2026  |  Period: Sep 2025 – Mar 2026', margin, 30);

  y = 46;
  doc.setTextColor(30, 30, 30);

  // ── Impact score badge (full & enterprisesg only) ──
  if (variant !== 'nea') {
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(pageW - margin - 38, 38, 38, 18, 3, 3, 'F');
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Impact Score', pageW - margin - 37, 45);
    doc.setFontSize(16);
    doc.text('A+', pageW - margin - 26, 53);
    doc.setTextColor(30, 30, 30);
    y = 60;
  }

  // ── Section: Key Metrics ──
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Environmental Metrics', margin, y);
  y += 2;

  autoTable(doc, {
    startY: y,
    head: [['Metric', 'Value', 'vs Prior Period']],
    body: [
      ['Total CO₂ Saved', '3,124 kg', '+31%'],
      ['Distance Reduced', '847 km', '+27%'],
      ['Fuel Saved', '594 L', '+29%'],
      ['Trees Equivalent', '142 trees', '+31%'],
    ],
    headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [240, 253, 244] },
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 },
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // ── Section: Monthly Breakdown ──
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Monthly Environmental Breakdown', margin, y);
  y += 2;

  autoTable(doc, {
    startY: y,
    head: [['Month', 'CO₂ Saved (kg)', 'Distance Reduced (km)', 'Fuel Saved (L)', 'Status']],
    body: monthlyData.map(d => [d.month, d.co2, d.distance, d.fuel, 'Verified']),
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [239, 246, 255] },
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 },
    columnStyles: { 4: { textColor: [22, 163, 74], fontStyle: 'bold' } },
  });

  y = (doc as any).lastAutoTable.finalY + 6;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(219, 234, 254);
  doc.rect(margin, y, pageW - margin * 2, 9, 'F');
  doc.setTextColor(30, 64, 175);
  doc.text(
    'Total: 3,124 kg CO₂ saved  •  847 km reduced  •  594 L fuel saved',
    margin + 3,
    y + 6,
  );
  doc.setTextColor(30, 30, 30);
  y += 16;

  // ── Section: Certifications (full & enterprisesg) ──
  if (variant !== 'nea') {
    if (y > 230) { doc.addPage(); y = margin; }
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Certifications & Compliance', margin, y);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [['Certification', 'Status', 'Description']],
      body: certifications.map(c => [c.name, c.status === 'eligible' ? 'Eligible' : 'Contributing', c.description]),
      headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [240, 253, 244] },
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 },
      columnStyles: { 1: { fontStyle: 'bold', textColor: [22, 101, 52] } },
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ── Section: variant-specific narrative ──
  if (y > 240) { doc.addPage(); y = margin; }

  if (variant === 'enterprisesg') {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('EnterpriseSG Grant Compliance Summary', margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(
      'OptiFleet Solutions demonstrates sustained reduction in carbon emissions and fuel consumption through AI-powered route optimisation. ' +
      'The data in this report supports the Green Lane application under the Enterprise Development Grant (EDG) scheme. ' +
      'All figures are system-generated, timestamped, and available for third-party audit.',
      pageW - margin * 2,
    );
    doc.text(lines, margin, y);
    y += lines.length * 5 + 6;
  }

  if (variant === 'nea') {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('NEA Compliance Declaration', margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(
      'This report is prepared in accordance with the National Environment Agency (NEA) reporting guidelines for logistics operators. ' +
      'Emissions savings are calculated using the IPCC Tier 1 methodology (2.68 kg CO₂ per litre of diesel). ' +
      'OptiFleet Solutions commits to continuous improvement in line with the Singapore Green Plan 2030 targets.',
      pageW - margin * 2,
    );
    doc.text(lines, margin, y);
    y += lines.length * 5 + 6;
  }

  // ── Footer on every page ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `OptiFleet Solutions  •  Confidential  •  Generated 26 Mar 2026  •  Page ${i} of ${pageCount}`,
      pageW / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'center' },
    );
  }

  return doc;
}

const filenameMap: Record<ReportVariant, string> = {
  full: 'OptiFleet_ESG_Report_H2_2025_Q1_2026.pdf',
  enterprisesg: 'OptiFleet_EnterpriseSG_Report_H2_2025_Q1_2026.pdf',
  nea: 'OptiFleet_NEA_Compliance_Report_H2_2025_Q1_2026.pdf',
};

export default function ReportsPage() {
  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleDownload = (variant: ReportVariant) => {
    toast.info('Generating PDF…');
    try {
      const doc = buildPDF(variant);
      doc.save(filenameMap[variant]);
      toast.success('Report downloaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate report');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl">ESG Reports</h1>
                <p className="text-sm text-muted-foreground">
                  Environmental, Social & Governance reporting
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Select Period
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleDownload('full')}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white border-none">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white hover:bg-white/20 border-white/30">
                    H2 2025 — Q1 2026 Report
                  </Badge>
                </div>
                <h2 className="text-3xl mb-2">Sustainability Impact Report</h2>
                <p className="text-green-100 text-lg max-w-2xl">
                  OptiFleet Solutions - Comprehensive environmental impact analysis for EnterpriseSG and NEA compliance
                </p>
                <div className="flex items-center gap-6 mt-6">
                  <div>
                    <p className="text-green-100 text-sm">Report Period</p>
                    <p className="text-xl">Sep 2025 — Mar 2026</p>
                  </div>
                  <div className="h-8 w-px bg-white/30"></div>
                  <div>
                    <p className="text-green-100 text-sm">Generated</p>
                    <p className="text-xl">26 Mar 2026</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-green-100 text-sm mb-2">Total Impact Score</p>
                  <p className="text-5xl mb-1">A+</p>
                  <p className="text-green-100 text-sm">Top 5% in industry</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {esgMetrics.map((metric) => {
            const colors = getColorClasses(metric.color);
            return (
              <Card key={metric.label} className={`border-l-4 border-l-${metric.color}-600`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <h3 className="text-3xl mb-1">{metric.value}</h3>
                      <p className={`text-xs ${colors.text} flex items-center gap-1`}>
                        <TrendingDown className="w-3 h-3" />
                        {metric.change} vs last period
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Monthly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Monthly Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Month</th>
                    <th className="text-left py-3 px-4">CO₂ Saved (kg)</th>
                    <th className="text-left py-3 px-4">Distance Reduced (km)</th>
                    <th className="text-left py-3 px-4">Fuel Saved (L)</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data) => (
                    <tr key={data.month} className="border-b border-border hover:bg-gray-50">
                      <td className="py-4 px-4">{data.month}</td>
                      <td className="py-4 px-4">{data.co2} kg</td>
                      <td className="py-4 px-4">{data.distance} km</td>
                      <td className="py-4 px-4">{data.fuel} L</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Total for Period:</strong> 3,124 kg CO₂ saved • 847 km reduced • 594 L fuel saved
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Certifications & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4>{cert.name}</h4>
                      <Badge className={
                        cert.status === 'eligible'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                      }>
                        {cert.status === 'eligible' ? 'Eligible' : 'Contributing'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Download Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="mb-2">Full ESG Report</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Complete sustainability report with all metrics and analysis
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleDownload('full')}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="mb-2">EnterpriseSG Format</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Report formatted for EnterpriseSG grant applications
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleDownload('enterprisesg')}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="mb-2">NEA Compliance</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Environmental impact report for NEA compliance
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleDownload('nea')}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2 text-blue-900">About This Report</h4>
                <p className="text-sm text-blue-700">
                  This ESG report is automatically generated from real operational data collected by OptiFleet.
                  All metrics are verified and timestamped. The report includes CO₂ emissions saved through route
                  optimization, total distance reduced, and fuel consumption savings. This data is suitable for
                  submission to EnterpriseSG for green business certifications and NEA for environmental compliance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
