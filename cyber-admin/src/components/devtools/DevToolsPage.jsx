import SectionHeading from "../ui/SectionHeading";
import SnippetVault from "./SnippetVault";
import WebhookTester from "./WebhookTester";

export default function DevToolsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="DevTools & Code Snippet Vault"
        description="Reusable bot/web snippets, plus a live webhook ping simulator."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SnippetVault />
        <WebhookTester />
      </div>
    </div>
  );
}
