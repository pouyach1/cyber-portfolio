import SectionHeading from "../ui/SectionHeading";
import InvoiceGenerator from "./InvoiceGenerator";
import UnpaidInstallmentsTable from "./UnpaidInstallmentsTable";

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="سیستم مالی و فاکتور ساز"
        description="صدور فاکتور و پیگیری پرداخت‌های معوقه با یک کلیک."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InvoiceGenerator />
        <UnpaidInstallmentsTable />
      </div>
    </div>
  );
}
