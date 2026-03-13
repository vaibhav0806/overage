import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { createElement } from "react";
import { getReportByToken } from "@/lib/actions/reports";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  metaLabel: {
    color: "#666666",
    width: 110,
  },
  metaValue: {
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#999999",
    marginBottom: 10,
    marginTop: 28,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 40,
  },
  summaryItem: {},
  summaryLabel: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 3,
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginTop: 20,
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 6,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#999999",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fafafa",
  },
  tableCell: {
    fontSize: 10,
  },
  tableCellBold: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#cccccc",
    paddingTop: 8,
    marginTop: 4,
  },
  colNum: { width: 25 },
  colDesc: { width: 170 },
  colDate: { width: 80 },
  colHours: { width: 45, textAlign: "right" },
  colRate: { width: 60, textAlign: "right" },
  colValue: { width: 70, textAlign: "right" },
  colStatus: { width: 55 },
  noteBlock: {
    marginTop: 28,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#cccccc",
  },
  noteText: {
    fontSize: 10,
    color: "#444444",
    fontStyle: "italic",
    lineHeight: 1.6,
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 48,
    right: 48,
    textAlign: "center",
    fontSize: 9,
    color: "#aaaaaa",
  },
});

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    absorbed: "Absorbed",
  };
  return labels[status] ?? status;
}

type ReportData = NonNullable<Awaited<ReturnType<typeof getReportByToken>>>;

function ReportPDF({ report, project, additions }: ReportData) {
  const totalValue = additions.reduce(
    (sum, a) => sum + Number(a.estimatedHours) * Number(a.hourlyRate),
    0,
  );
  const originalQuote = Number(project.originalQuote);
  const percentOfQuote =
    originalQuote > 0 ? ((totalValue / originalQuote) * 100).toFixed(1) : null;

  const generatedDate = new Date(report.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return createElement(
    Document,
    null,
    createElement(
      Page,
      { size: "A4", style: styles.page },

      // Logo
      ...(report.brandingLogoUrl
        ? [
            createElement(Image, {
              key: "logo",
              src: report.brandingLogoUrl,
              style: { maxWidth: 100, maxHeight: 50, marginBottom: 12 },
            }),
          ]
        : []),

      // Title
      createElement(
        Text,
        {
          style: report.brandingColor
            ? { ...styles.title, color: report.brandingColor }
            : styles.title,
        },
        report.title,
      ),

      // Meta
      createElement(
        View,
        { style: styles.metaRow },
        createElement(Text, { style: styles.metaLabel }, "Prepared for:"),
        createElement(Text, { style: styles.metaValue }, project.clientName),
      ),
      createElement(
        View,
        { style: styles.metaRow },
        createElement(Text, { style: styles.metaLabel }, "Project:"),
        createElement(Text, { style: styles.metaValue }, project.name),
      ),
      createElement(
        View,
        { style: styles.metaRow },
        createElement(Text, { style: styles.metaLabel }, "Date range:"),
        createElement(
          Text,
          { style: styles.metaValue },
          `${formatDate(report.dateRangeStart)} — ${formatDate(report.dateRangeEnd)}`,
        ),
      ),
      createElement(
        View,
        { style: styles.metaRow },
        createElement(Text, { style: styles.metaLabel }, "Generated:"),
        createElement(Text, { style: styles.metaValue }, generatedDate),
      ),

      // Summary
      createElement(View, { style: styles.divider }),
      createElement(Text, { style: styles.sectionTitle }, "Summary"),
      createElement(
        View,
        { style: styles.summaryRow },
        createElement(
          View,
          { style: styles.summaryItem },
          createElement(Text, { style: styles.summaryLabel }, "Total Additions"),
          createElement(
            Text,
            { style: styles.summaryValue },
            String(additions.length),
          ),
        ),
        createElement(
          View,
          { style: styles.summaryItem },
          createElement(Text, { style: styles.summaryLabel }, "Total Value"),
          createElement(
            Text,
            {
              style: report.brandingColor
                ? { ...styles.summaryValue, color: report.brandingColor }
                : styles.summaryValue,
            },
            formatCurrency(totalValue, project.currency),
          ),
        ),
        ...(percentOfQuote
          ? [
              createElement(
                View,
                { style: styles.summaryItem, key: "pct" },
                createElement(
                  Text,
                  { style: styles.summaryLabel },
                  "% of Original Quote",
                ),
                createElement(
                  Text,
                  { style: styles.summaryValue },
                  `${percentOfQuote}%`,
                ),
              ),
            ]
          : []),
      ),

      // Table
      createElement(View, { style: styles.divider }),
      createElement(Text, { style: styles.sectionTitle }, "Scope Additions"),

      // Table header
      createElement(
        View,
        { style: styles.tableHeader },
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colNum } },
          "#",
        ),
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colDesc } },
          "Description",
        ),
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colDate } },
          "Date",
        ),
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colHours } },
          "Hours",
        ),
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colRate } },
          "Rate",
        ),
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colValue } },
          "Value",
        ),
        createElement(
          Text,
          { style: { ...styles.tableHeaderCell, ...styles.colStatus } },
          "Status",
        ),
      ),

      // Table rows
      ...additions.map((addition, i) => {
        const value =
          Number(addition.estimatedHours) * Number(addition.hourlyRate);
        return createElement(
          View,
          {
            style: i % 2 === 1 ? styles.tableRowAlt : styles.tableRow,
            key: addition.id,
          },
          createElement(
            Text,
            { style: { ...styles.tableCell, ...styles.colNum, color: "#999" } },
            String(i + 1),
          ),
          createElement(
            Text,
            { style: { ...styles.tableCellBold, ...styles.colDesc } },
            addition.description,
          ),
          createElement(
            Text,
            { style: { ...styles.tableCell, ...styles.colDate } },
            formatDate(addition.dateRequested),
          ),
          createElement(
            Text,
            { style: { ...styles.tableCell, ...styles.colHours } },
            String(Number(addition.estimatedHours)),
          ),
          createElement(
            Text,
            { style: { ...styles.tableCell, ...styles.colRate } },
            formatCurrency(Number(addition.hourlyRate), project.currency),
          ),
          createElement(
            Text,
            { style: { ...styles.tableCellBold, ...styles.colValue } },
            formatCurrency(value, project.currency),
          ),
          createElement(
            Text,
            { style: { ...styles.tableCell, ...styles.colStatus } },
            statusLabel(addition.status),
          ),
        );
      }),

      // Total row
      createElement(
        View,
        { style: styles.totalRow },
        createElement(Text, { style: styles.colNum }, ""),
        createElement(Text, { style: styles.colDesc }, ""),
        createElement(Text, { style: styles.colDate }, ""),
        createElement(Text, { style: styles.colHours }, ""),
        createElement(
          Text,
          {
            style: {
              ...styles.tableCellBold,
              ...styles.colRate,
              ...(report.brandingColor ? { color: report.brandingColor } : {}),
            },
          },
          "Total",
        ),
        createElement(
          Text,
          {
            style: {
              ...styles.tableCellBold,
              ...styles.colValue,
              ...(report.brandingColor ? { color: report.brandingColor } : {}),
            },
          },
          formatCurrency(totalValue, project.currency),
        ),
        createElement(Text, { style: styles.colStatus }, ""),
      ),

      // Freelancer note
      ...(report.freelancerNote
        ? [
            createElement(
              View,
              { style: styles.divider, key: "note-divider" },
            ),
            createElement(
              Text,
              { style: styles.sectionTitle, key: "note-title" },
              "Note",
            ),
            createElement(
              View,
              { style: styles.noteBlock, key: "note-block" },
              createElement(
                Text,
                { style: styles.noteText },
                report.freelancerNote,
              ),
            ),
          ]
        : []),

      // Footer
      ...(report.showPoweredBy
        ? [
            createElement(
              Text,
              { style: styles.footer, key: "footer" },
              "Generated with Overage — overage.app",
            ),
          ]
        : []),
    ),
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const data = await getReportByToken(token);

  if (!data) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const pdfElement = ReportPDF(data);
  const buffer = await renderToBuffer(pdfElement);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="scope-report.pdf"',
    },
  });
}
