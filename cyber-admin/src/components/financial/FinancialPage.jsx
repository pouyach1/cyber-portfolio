import SectionHeading from "../ui/SectionHeading";
import InvoiceGenerator from "./InvoiceGenerator";
import UnpaidInstallmentsTable from "./UnpaidInstallmentsTable";

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Financials & Automated Invoicing"
        description="Generate invoices and keep on top of overdue payments."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InvoiceGenerator />
        <UnpaidInstallmentsTable />
      </div>
    </div>
  );
}
